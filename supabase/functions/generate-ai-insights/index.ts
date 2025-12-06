import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function isValidUUID(str: string): boolean {
  if (!str || typeof str !== "string") return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();

    // Validate userId format
    if (!isValidUUID(userId)) {
      console.error("Invalid userId format provided:", userId);
      return new Response(
        JSON.stringify({ error: "Invalid user ID format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const openAIApiKey = Deno.env.get("OPEN_AI_API_KEY");

    if (!openAIApiKey) {
      console.error("OPEN_AI_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user is Pro
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("subscription_tier")
      .eq("user_id", userId)
      .single();

    if (profileError || profile?.subscription_tier !== "pro") {
      return new Response(
        JSON.stringify({ error: "Pro subscription required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch user's financial data
    const [incomeRes, expensesRes, goalsRes, debtsRes] = await Promise.all([
      supabase.from("income").select("*").eq("user_id", userId).order("date", { ascending: false }).limit(50),
      supabase.from("expenses").select("*").eq("user_id", userId).order("date", { ascending: false }).limit(100),
      supabase.from("savings_goals").select("*").eq("user_id", userId),
      supabase.from("debts").select("*").eq("user_id", userId),
    ]);

    const income = incomeRes.data || [];
    const expenses = expensesRes.data || [];
    const goals = goalsRes.data || [];
    const debts = debtsRes.data || [];

    // Calculate totals
    const totalIncome = income.reduce((sum, i) => sum + Number(i.amount), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalDebt = debts.reduce((sum, d) => sum + Number(d.balance), 0);
    const totalGoalTarget = goals.reduce((sum, g) => sum + Number(g.target_amount), 0);
    const totalGoalProgress = goals.reduce((sum, g) => sum + Number(g.current_progress), 0);

    // Group expenses by category
    const expensesByCategory: Record<string, number> = {};
    expenses.forEach((e) => {
      expensesByCategory[e.category] = (expensesByCategory[e.category] || 0) + Number(e.amount);
    });

    const financialSummary = {
      income: { total: totalIncome, count: income.length, sources: [...new Set(income.map((i) => i.source))] },
      expenses: { total: totalExpenses, count: expenses.length, byCategory: expensesByCategory },
      goals: { count: goals.length, totalTarget: totalGoalTarget, totalProgress: totalGoalProgress },
      debts: { count: debts.length, totalBalance: totalDebt },
      savingsRate: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0,
    };

    console.log("Financial summary prepared for AI analysis:", JSON.stringify(financialSummary));

    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a professional financial advisor AI. Analyze the user's financial data and provide actionable insights. Always respond with valid JSON matching this exact structure:
{
  "summary": "A 2-3 sentence overview of their financial health",
  "spendingPatterns": {
    "topCategory": "The category with highest spending",
    "trend": "increasing" | "decreasing" | "stable",
    "suggestion": "One specific suggestion to improve spending"
  },
  "incomeStability": {
    "status": "stable" | "variable" | "declining",
    "description": "A brief description of their income situation"
  },
  "savingsAnalysis": {
    "rate": <number between 0-100>,
    "goalProgress": "On track" | "Behind" | "Ahead",
    "recommendation": "A specific savings recommendation"
  },
  "recommendedActions": ["action1", "action2", "action3"],
  "riskFlags": ["risk1", "risk2"] or [] if no risks
}`
          },
          {
            role: "user",
            content: `Analyze this financial data and provide insights:\n\n${JSON.stringify(financialSummary, null, 2)}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate analysis" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const analysisText = data.choices[0]?.message?.content;

    if (!analysisText) {
      return new Response(
        JSON.stringify({ error: "No analysis generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON response
    let analysis;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = analysisText.match(/```json\n?([\s\S]*?)\n?```/) || 
                        analysisText.match(/```\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : analysisText;
      analysis = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, analysisText);
      return new Response(
        JSON.stringify({ error: "Failed to parse analysis" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save report to database
    await supabase.from("ai_reports").insert({
      user_id: userId,
      summary: analysis.summary,
      suggestions: analysis.recommendedActions.join("\n"),
    });

    console.log("AI analysis completed successfully");

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-ai-insights:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
