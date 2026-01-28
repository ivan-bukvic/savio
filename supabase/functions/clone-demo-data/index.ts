import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Template user ID (savio@test.com)
const TEMPLATE_USER_ID = "e64058d3-a8a4-4da6-94e1-5a4c623ed315";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Get user from auth header
    const supabaseAuth = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    
    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
    if (userError || !user) {
      throw new Error("Not authenticated");
    }

    console.log("Cloning demo data for new user:", user.id);

    // Fetch template data from all tables (where is_template = true)
    const [incomeRes, expensesRes, goalsRes, debtsRes] = await Promise.all([
      supabase.from("income").select("*").eq("user_id", TEMPLATE_USER_ID).eq("is_template", true),
      supabase.from("expenses").select("*").eq("user_id", TEMPLATE_USER_ID).eq("is_template", true),
      supabase.from("savings_goals").select("*").eq("user_id", TEMPLATE_USER_ID).eq("is_template", true),
      supabase.from("debts").select("*").eq("user_id", TEMPLATE_USER_ID).eq("is_template", true),
    ]);

    const templateIncome = incomeRes.data || [];
    const templateExpenses = expensesRes.data || [];
    const templateGoals = goalsRes.data || [];
    const templateDebts = debtsRes.data || [];

    console.log(`Found template data: ${templateIncome.length} income, ${templateExpenses.length} expenses, ${templateGoals.length} goals, ${templateDebts.length} debts`);

    // Clone income data
    if (templateIncome.length > 0) {
      const incomeClones = templateIncome.map(({ id, user_id, created_at, ...rest }) => ({
        ...rest,
        user_id: user.id,
        is_template: false,
      }));
      const { error: incomeError } = await supabase.from("income").insert(incomeClones);
      if (incomeError) {
        console.error("Error cloning income:", incomeError);
      } else {
        console.log(`Cloned ${incomeClones.length} income records`);
      }
    }

    // Clone expenses data
    if (templateExpenses.length > 0) {
      const expenseClones = templateExpenses.map(({ id, user_id, created_at, ...rest }) => ({
        ...rest,
        user_id: user.id,
        is_template: false,
      }));
      const { error: expenseError } = await supabase.from("expenses").insert(expenseClones);
      if (expenseError) {
        console.error("Error cloning expenses:", expenseError);
      } else {
        console.log(`Cloned ${expenseClones.length} expense records`);
      }
    }

    // Clone savings goals data
    if (templateGoals.length > 0) {
      const goalClones = templateGoals.map(({ id, user_id, created_at, updated_at, ...rest }) => ({
        ...rest,
        user_id: user.id,
        is_template: false,
      }));
      const { error: goalError } = await supabase.from("savings_goals").insert(goalClones);
      if (goalError) {
        console.error("Error cloning goals:", goalError);
      } else {
        console.log(`Cloned ${goalClones.length} goal records`);
      }
    }

    // Clone debts data
    if (templateDebts.length > 0) {
      const debtClones = templateDebts.map(({ id, user_id, created_at, updated_at, ...rest }) => ({
        ...rest,
        user_id: user.id,
        is_template: false,
      }));
      const { error: debtError } = await supabase.from("debts").insert(debtClones);
      if (debtError) {
        console.error("Error cloning debts:", debtError);
      } else {
        console.log(`Cloned ${debtClones.length} debt records`);
      }
    }

    console.log("Successfully cloned all demo data for user:", user.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        cloned: {
          income: templateIncome.length,
          expenses: templateExpenses.length,
          goals: templateGoals.length,
          debts: templateDebts.length,
        }
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error cloning demo data:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
