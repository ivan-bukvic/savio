import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = user.id;
    console.log(`Seeding demo data for user: ${userId}`);

    // Check if user already has data
    const { data: existingIncome } = await supabase
      .from('income')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (existingIncome && existingIncome.length > 0) {
      console.log('Demo data already exists');
      return new Response(
        JSON.stringify({ message: 'Demo data already exists', seeded: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate dates for last 6 months
    const months: string[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 15);
      months.push(date.toISOString().split('T')[0]);
    }

    // Income data (last 6 months)
    const incomeData = months.flatMap((date, index) => [
      { user_id: userId, source: 'Monthly Salary', amount: 5600, date },
      { user_id: userId, source: 'Freelance Project', amount: 2500 + (index * 340), date },
      { user_id: userId, source: 'Investment Returns', amount: 200 + (index * 60), date },
      { user_id: userId, source: 'Side Gig', amount: 150 + (index * 30), date },
    ]);

    // Expenses data (last 6 months)
    const expenseData = months.flatMap((date, index) => [
      { user_id: userId, category: 'Housing', amount: 1800, date, description: 'Rent payment' },
      { user_id: userId, category: 'Food', amount: 450 + (index * 25), date, description: 'Groceries & dining' },
      { user_id: userId, category: 'Utilities', amount: 180 + (index * 10), date, description: 'Electric, water, internet' },
      { user_id: userId, category: 'Transportation', amount: 250 + (index * 15), date, description: 'Gas & maintenance' },
      { user_id: userId, category: 'Entertainment', amount: 120 + (index * 20), date, description: 'Streaming & activities' },
      { user_id: userId, category: 'Subscriptions', amount: 85, date, description: 'Software & services' },
      { user_id: userId, category: 'Healthcare', amount: 150, date, description: 'Insurance & prescriptions' },
    ]);

    // Savings goals
    const savingsGoals = [
      { user_id: userId, goal_name: 'Emergency Fund', target_amount: 15000, current_progress: 8750 },
      { user_id: userId, goal_name: 'New Laptop', target_amount: 2500, current_progress: 1800 },
      { user_id: userId, goal_name: 'Vacation Savings', target_amount: 5000, current_progress: 2200 },
    ];

    // Debts
    const debts = [
      { 
        user_id: userId, 
        debt_name: 'Credit Card', 
        balance: 3200, 
        interest_rate: 18.99, 
        minimum_payment: 95,
        due_date: new Date(now.getFullYear(), now.getMonth() + 1, 15).toISOString().split('T')[0]
      },
      { 
        user_id: userId, 
        debt_name: 'Student Loan', 
        balance: 24500, 
        interest_rate: 5.5, 
        minimum_payment: 285,
        due_date: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString().split('T')[0]
      },
    ];

    // AI Reports (sample insights)
    const aiReports = [
      {
        user_id: userId,
        summary: "Your financial health is improving! You've maintained consistent income growth over the past 6 months with an average monthly income of $8,950. Your savings rate of 22% exceeds the recommended 20% benchmark.",
        suggestions: "1. Consider increasing your emergency fund contributions by $200/month to reach your goal faster.\n2. Your entertainment spending has grown 15% - review subscriptions for potential savings.\n3. Look into refinancing your student loan for potential interest savings.\n4. Great job on diversifying income sources - continue building your freelance portfolio."
      },
      {
        user_id: userId,
        summary: "Monthly spending analysis shows housing costs at 28% of income (within healthy 30% threshold). Food expenses trending upward - worth monitoring. Overall debt-to-income ratio is healthy at 12%.",
        suggestions: "1. Set up automatic transfers of $500/month to your vacation fund to stay on track.\n2. Consider meal planning to reduce food costs by an estimated $75/month.\n3. Your credit card balance carries high interest - prioritize paying this down.\n4. Investment returns are steady - consider increasing contributions when possible."
      }
    ];

    // Insert all data
    const { error: incomeError } = await supabase.from('income').insert(incomeData);
    if (incomeError) {
      console.error('Income insert error:', incomeError);
      throw incomeError;
    }

    const { error: expenseError } = await supabase.from('expenses').insert(expenseData);
    if (expenseError) {
      console.error('Expense insert error:', expenseError);
      throw expenseError;
    }

    const { error: savingsError } = await supabase.from('savings_goals').insert(savingsGoals);
    if (savingsError) {
      console.error('Savings insert error:', savingsError);
      throw savingsError;
    }

    const { error: debtsError } = await supabase.from('debts').insert(debts);
    if (debtsError) {
      console.error('Debts insert error:', debtsError);
      throw debtsError;
    }

    const { error: aiError } = await supabase.from('ai_reports').insert(aiReports);
    if (aiError) {
      console.error('AI reports insert error:', aiError);
      throw aiError;
    }

    console.log('Demo data seeded successfully');

    return new Response(
      JSON.stringify({ message: 'Demo data seeded successfully', seeded: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error seeding demo data:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
