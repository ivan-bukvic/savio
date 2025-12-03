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

    // Always ensure demo user has a profile with Pro access
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: userId,
        full_name: 'Demo User',
        subscription_tier: 'pro',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (profileError) {
      console.error('Profile upsert error:', profileError);
    } else {
      console.log('Demo user profile ensured');
    }

    // Check if user already has data - if so, delete it for fresh 12-month data
    const { data: existingIncome } = await supabase
      .from('income')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (existingIncome && existingIncome.length > 0) {
      console.log('Clearing existing demo data for refresh...');
      
      // Delete existing data to replace with full year data
      await supabase.from('income').delete().eq('user_id', userId);
      await supabase.from('expenses').delete().eq('user_id', userId);
      await supabase.from('savings_goals').delete().eq('user_id', userId);
      await supabase.from('debts').delete().eq('user_id', userId);
      await supabase.from('ai_reports').delete().eq('user_id', userId);
      
      console.log('Existing demo data cleared');
    }

    // Generate dates for all 12 months of current year (January - December)
    const months: string[] = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    
    for (let month = 0; month < 12; month++) {
      const date = new Date(currentYear, month, 15);
      months.push(date.toISOString().split('T')[0]);
    }

    // Income data with realistic variations across 12 months
    const incomeData = months.flatMap((date, index) => {
      const monthNum = index + 1;
      // Freelance varies - higher in Q2 and Q4
      const freelanceBonus = (monthNum >= 4 && monthNum <= 6) || (monthNum >= 10 && monthNum <= 12) ? 800 : 0;
      // Investment returns vary seasonally
      const investmentVariation = Math.floor(Math.sin(monthNum * 0.5) * 150) + 350;
      // Side gig varies
      const sideGigVariation = 150 + (index % 3) * 50;
      
      return [
        { user_id: userId, source: 'Monthly Salary', amount: 5600, date },
        { user_id: userId, source: 'Freelance Project', amount: 2500 + (index * 150) + freelanceBonus, date },
        { user_id: userId, source: 'Investment Returns', amount: investmentVariation, date },
        { user_id: userId, source: 'Side Gig', amount: sideGigVariation, date },
      ];
    });

    // Expenses data with realistic seasonal variations across 12 months
    const expenseData = months.flatMap((date, index) => {
      const monthNum = index + 1;
      // Utilities higher in winter months (Jan, Feb, Nov, Dec)
      const isWinter = monthNum <= 2 || monthNum >= 11;
      const utilitiesAmount = isWinter ? 280 : 160;
      // Entertainment higher in summer
      const isSummer = monthNum >= 6 && monthNum <= 8;
      const entertainmentAmount = isSummer ? 220 : 120;
      // Food varies slightly
      const foodVariation = 420 + (index % 4) * 35;
      // Transportation varies
      const transportVariation = 230 + (index % 3) * 30;
      
      return [
        { user_id: userId, category: 'Housing', amount: 1800, date, description: 'Rent payment' },
        { user_id: userId, category: 'Food', amount: foodVariation, date, description: 'Groceries & dining' },
        { user_id: userId, category: 'Utilities', amount: utilitiesAmount, date, description: 'Electric, water, internet' },
        { user_id: userId, category: 'Transportation', amount: transportVariation, date, description: 'Gas & maintenance' },
        { user_id: userId, category: 'Entertainment', amount: entertainmentAmount, date, description: 'Streaming & activities' },
        { user_id: userId, category: 'Subscriptions', amount: 85, date, description: 'Software & services' },
        { user_id: userId, category: 'Healthcare', amount: 150, date, description: 'Insurance & prescriptions' },
      ];
    });

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
        summary: "Your financial health is improving! You've maintained consistent income growth over the past 12 months with an average monthly income of $9,200. Your savings rate of 24% exceeds the recommended 20% benchmark.",
        suggestions: "1. Consider increasing your emergency fund contributions by $200/month to reach your goal faster.\n2. Your entertainment spending has grown 15% - review subscriptions for potential savings.\n3. Look into refinancing your student loan for potential interest savings.\n4. Great job on diversifying income sources - continue building your freelance portfolio."
      },
      {
        user_id: userId,
        summary: "Monthly spending analysis shows housing costs at 26% of income (within healthy 30% threshold). Food expenses trending upward - worth monitoring. Overall debt-to-income ratio is healthy at 11%.",
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

    console.log('Demo data seeded successfully with 12 months of data');

    return new Response(
      JSON.stringify({ message: 'Demo data seeded successfully with full year data', seeded: true }),
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
