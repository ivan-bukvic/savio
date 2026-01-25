-- Fix ai_reports policies
DROP POLICY IF EXISTS "Users can delete their own AI reports" ON public.ai_reports;
DROP POLICY IF EXISTS "Users can insert their own AI reports" ON public.ai_reports;
DROP POLICY IF EXISTS "Users can view their own AI reports" ON public.ai_reports;

CREATE POLICY "Users can view their own AI reports" ON public.ai_reports
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI reports" ON public.ai_reports
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI reports" ON public.ai_reports
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Fix profiles policies
DROP POLICY IF EXISTS "Profiles are viewable by the user who owns them" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" ON public.profiles
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Now fix income, expenses, savings_goals, debts with explicit PERMISSIVE
DROP POLICY IF EXISTS "Users can delete their own income" ON public.income;
DROP POLICY IF EXISTS "Users can insert their own income" ON public.income;
DROP POLICY IF EXISTS "Users can update their own income" ON public.income;
DROP POLICY IF EXISTS "Users can view their own income" ON public.income;

CREATE POLICY "Users can view their own income" ON public.income
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own income" ON public.income
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own income" ON public.income
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own income" ON public.income
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Expenses
DROP POLICY IF EXISTS "Users can delete their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can insert their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can update their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can view their own expenses" ON public.expenses;

CREATE POLICY "Users can view their own expenses" ON public.expenses
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own expenses" ON public.expenses
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses" ON public.expenses
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses" ON public.expenses
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Savings goals
DROP POLICY IF EXISTS "Users can delete their own savings goals" ON public.savings_goals;
DROP POLICY IF EXISTS "Users can insert their own savings goals" ON public.savings_goals;
DROP POLICY IF EXISTS "Users can update their own savings goals" ON public.savings_goals;
DROP POLICY IF EXISTS "Users can view their own savings goals" ON public.savings_goals;

CREATE POLICY "Users can view their own savings goals" ON public.savings_goals
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own savings goals" ON public.savings_goals
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own savings goals" ON public.savings_goals
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own savings goals" ON public.savings_goals
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Debts
DROP POLICY IF EXISTS "Users can delete their own debts" ON public.debts;
DROP POLICY IF EXISTS "Users can insert their own debts" ON public.debts;
DROP POLICY IF EXISTS "Users can update their own debts" ON public.debts;
DROP POLICY IF EXISTS "Users can view their own debts" ON public.debts;

CREATE POLICY "Users can view their own debts" ON public.debts
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own debts" ON public.debts
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own debts" ON public.debts
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own debts" ON public.debts
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (auth.uid() = user_id);