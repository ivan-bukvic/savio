import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    console.log("Seeding demo data for user:", user.id);

    // Demo income data - January to September 2025 with varied sources
    const incomeData = [
      // January
      { user_id: user.id, source: "Monthly Salary", amount: 5800, date: "2025-01-01" },
      { user_id: user.id, source: "Freelance Project", amount: 1200, date: "2025-01-12" },
      { user_id: user.id, source: "Investment Returns", amount: 350, date: "2025-01-20" },
      // February
      { user_id: user.id, source: "Monthly Salary", amount: 5800, date: "2025-02-01" },
      { user_id: user.id, source: "Side Gig", amount: 450, date: "2025-02-10" },
      { user_id: user.id, source: "Freelance Project", amount: 2100, date: "2025-02-18" },
      { user_id: user.id, source: "Investment Returns", amount: 280, date: "2025-02-25" },
      // March
      { user_id: user.id, source: "Monthly Salary", amount: 5800, date: "2025-03-01" },
      { user_id: user.id, source: "Freelance Project", amount: 3200, date: "2025-03-15" },
      { user_id: user.id, source: "Side Gig", amount: 600, date: "2025-03-22" },
      // April
      { user_id: user.id, source: "Monthly Salary", amount: 6000, date: "2025-04-01" },
      { user_id: user.id, source: "Investment Returns", amount: 520, date: "2025-04-10" },
      { user_id: user.id, source: "Freelance Project", amount: 1800, date: "2025-04-20" },
      { user_id: user.id, source: "Side Gig", amount: 380, date: "2025-04-28" },
      // May
      { user_id: user.id, source: "Monthly Salary", amount: 6000, date: "2025-05-01" },
      { user_id: user.id, source: "Freelance Project", amount: 2500, date: "2025-05-12" },
      { user_id: user.id, source: "Investment Returns", amount: 410, date: "2025-05-22" },
      // June
      { user_id: user.id, source: "Monthly Salary", amount: 6000, date: "2025-06-01" },
      { user_id: user.id, source: "Side Gig", amount: 720, date: "2025-06-08" },
      { user_id: user.id, source: "Freelance Project", amount: 2800, date: "2025-06-18" },
      { user_id: user.id, source: "Investment Returns", amount: 380, date: "2025-06-26" },
      // July
      { user_id: user.id, source: "Monthly Salary", amount: 6200, date: "2025-07-01" },
      { user_id: user.id, source: "Freelance Project", amount: 1500, date: "2025-07-14" },
      { user_id: user.id, source: "Side Gig", amount: 550, date: "2025-07-25" },
      // August
      { user_id: user.id, source: "Monthly Salary", amount: 6200, date: "2025-08-01" },
      { user_id: user.id, source: "Investment Returns", amount: 620, date: "2025-08-12" },
      { user_id: user.id, source: "Freelance Project", amount: 3500, date: "2025-08-20" },
      { user_id: user.id, source: "Side Gig", amount: 480, date: "2025-08-28" },
      // September
      { user_id: user.id, source: "Monthly Salary", amount: 6200, date: "2025-09-01" },
      { user_id: user.id, source: "Freelance Project", amount: 2200, date: "2025-09-10" },
      { user_id: user.id, source: "Investment Returns", amount: 450, date: "2025-09-18" },
      { user_id: user.id, source: "Side Gig", amount: 350, date: "2025-09-25" },
    ];

    // Demo expense data - January to September 2025 with varied categories
    const expenseData = [
      // January
      { user_id: user.id, category: "Food & Dining", amount: 680, date: "2025-01-05", description: "Groceries" },
      { user_id: user.id, category: "Transportation", amount: 320, date: "2025-01-08", description: "Gas & transit" },
      { user_id: user.id, category: "Entertainment", amount: 150, date: "2025-01-15", description: "Streaming services" },
      { user_id: user.id, category: "Bills & Utilities", amount: 420, date: "2025-01-20", description: "Electric & internet" },
      { user_id: user.id, category: "Shopping", amount: 280, date: "2025-01-25", description: "Clothing" },
      // February
      { user_id: user.id, category: "Food & Dining", amount: 720, date: "2025-02-04", description: "Groceries & dining out" },
      { user_id: user.id, category: "Transportation", amount: 290, date: "2025-02-10", description: "Fuel" },
      { user_id: user.id, category: "Entertainment", amount: 200, date: "2025-02-14", description: "Concert tickets" },
      { user_id: user.id, category: "Healthcare", amount: 180, date: "2025-02-18", description: "Pharmacy" },
      { user_id: user.id, category: "Bills & Utilities", amount: 450, date: "2025-02-22", description: "Utilities" },
      // March
      { user_id: user.id, category: "Food & Dining", amount: 650, date: "2025-03-03", description: "Groceries" },
      { user_id: user.id, category: "Transportation", amount: 350, date: "2025-03-08", description: "Car maintenance" },
      { user_id: user.id, category: "Shopping", amount: 420, date: "2025-03-15", description: "Electronics" },
      { user_id: user.id, category: "Entertainment", amount: 180, date: "2025-03-20", description: "Movies & games" },
      { user_id: user.id, category: "Bills & Utilities", amount: 400, date: "2025-03-28", description: "Phone & internet" },
      // April
      { user_id: user.id, category: "Food & Dining", amount: 700, date: "2025-04-02", description: "Groceries" },
      { user_id: user.id, category: "Transportation", amount: 280, date: "2025-04-09", description: "Gas" },
      { user_id: user.id, category: "Travel", amount: 850, date: "2025-04-15", description: "Weekend trip" },
      { user_id: user.id, category: "Entertainment", amount: 220, date: "2025-04-22", description: "Dining out" },
      { user_id: user.id, category: "Bills & Utilities", amount: 380, date: "2025-04-28", description: "Utilities" },
      // May
      { user_id: user.id, category: "Food & Dining", amount: 680, date: "2025-05-05", description: "Groceries" },
      { user_id: user.id, category: "Transportation", amount: 310, date: "2025-05-12", description: "Fuel & parking" },
      { user_id: user.id, category: "Healthcare", amount: 250, date: "2025-05-18", description: "Doctor visit" },
      { user_id: user.id, category: "Entertainment", amount: 160, date: "2025-05-24", description: "Subscriptions" },
      { user_id: user.id, category: "Shopping", amount: 350, date: "2025-05-30", description: "Home goods" },
      // June
      { user_id: user.id, category: "Food & Dining", amount: 750, date: "2025-06-03", description: "Groceries & dining" },
      { user_id: user.id, category: "Transportation", amount: 340, date: "2025-06-10", description: "Gas" },
      { user_id: user.id, category: "Entertainment", amount: 280, date: "2025-06-16", description: "Events" },
      { user_id: user.id, category: "Bills & Utilities", amount: 420, date: "2025-06-22", description: "AC & utilities" },
      { user_id: user.id, category: "Shopping", amount: 180, date: "2025-06-28", description: "Accessories" },
      // July
      { user_id: user.id, category: "Food & Dining", amount: 720, date: "2025-07-04", description: "BBQ supplies" },
      { user_id: user.id, category: "Transportation", amount: 260, date: "2025-07-11", description: "Fuel" },
      { user_id: user.id, category: "Travel", amount: 1200, date: "2025-07-18", description: "Vacation" },
      { user_id: user.id, category: "Entertainment", amount: 190, date: "2025-07-24", description: "Theme park" },
      { user_id: user.id, category: "Bills & Utilities", amount: 480, date: "2025-07-30", description: "Summer utilities" },
      // August
      { user_id: user.id, category: "Food & Dining", amount: 690, date: "2025-08-05", description: "Groceries" },
      { user_id: user.id, category: "Transportation", amount: 300, date: "2025-08-12", description: "Gas & repairs" },
      { user_id: user.id, category: "Education", amount: 450, date: "2025-08-18", description: "Online course" },
      { user_id: user.id, category: "Entertainment", amount: 210, date: "2025-08-24", description: "Streaming" },
      { user_id: user.id, category: "Shopping", amount: 520, date: "2025-08-30", description: "Back to school" },
      // September
      { user_id: user.id, category: "Food & Dining", amount: 660, date: "2025-09-03", description: "Groceries" },
      { user_id: user.id, category: "Transportation", amount: 290, date: "2025-09-10", description: "Commute" },
      { user_id: user.id, category: "Entertainment", amount: 175, date: "2025-09-17", description: "Movies" },
      { user_id: user.id, category: "Bills & Utilities", amount: 390, date: "2025-09-24", description: "Utilities" },
      { user_id: user.id, category: "Healthcare", amount: 120, date: "2025-09-28", description: "Pharmacy" },
    ];

    // Demo savings goals
    const savingsGoals = [
      { user_id: user.id, goal_name: "Emergency Fund", target_amount: 10000, current_progress: 6500, due_date: "2025-12-31" },
      { user_id: user.id, goal_name: "Vacation Trip", target_amount: 3000, current_progress: 1800, due_date: "2025-08-15" },
      { user_id: user.id, goal_name: "New Laptop", target_amount: 2000, current_progress: 1200, due_date: "2025-06-30" },
    ];

    // Demo debts
    const debts = [
      { user_id: user.id, debt_name: "Student Loan", balance: 25000, interest_rate: 4.5, minimum_payment: 280, due_date: "2030-05-01" },
      { user_id: user.id, debt_name: "Car Loan", balance: 12000, interest_rate: 6.0, minimum_payment: 350, due_date: "2027-03-15" },
      { user_id: user.id, debt_name: "Credit Card", balance: 2500, interest_rate: 18.9, minimum_payment: 75, due_date: "2025-12-01" },
    ];

    // Clear existing data first
    await supabase.from("income").delete().eq("user_id", user.id);
    await supabase.from("expenses").delete().eq("user_id", user.id);
    await supabase.from("savings_goals").delete().eq("user_id", user.id);
    await supabase.from("debts").delete().eq("user_id", user.id);

    // Insert all demo data
    const { error: incomeError } = await supabase.from("income").insert(incomeData);
    if (incomeError) {
      console.error("Income insert error:", incomeError);
      throw incomeError;
    }

    const { error: expenseError } = await supabase.from("expenses").insert(expenseData);
    if (expenseError) {
      console.error("Expense insert error:", expenseError);
      throw expenseError;
    }

    const { error: goalsError } = await supabase.from("savings_goals").insert(savingsGoals);
    if (goalsError) {
      console.error("Goals insert error:", goalsError);
      throw goalsError;
    }

    const { error: debtsError } = await supabase.from("debts").insert(debts);
    if (debtsError) {
      console.error("Debts insert error:", debtsError);
      throw debtsError;
    }

    console.log("Successfully seeded demo data for user:", user.id);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Demo data seeded successfully",
      counts: {
        income: incomeData.length,
        expenses: expenseData.length,
        goals: savingsGoals.length,
        debts: debts.length,
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error seeding demo data:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
