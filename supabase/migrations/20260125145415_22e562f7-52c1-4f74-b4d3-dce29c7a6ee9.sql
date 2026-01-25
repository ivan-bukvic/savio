-- Drop the RESTRICTIVE policies and recreate them as PERMISSIVE
-- Income table
DROP POLICY IF EXISTS "Users can delete their own income" ON public.income;
DROP POLICY IF EXISTS "Users can insert their own income" ON public.income;
DROP POLICY IF EXISTS "Users can update their own income" ON public.income;
DROP POLICY IF EXISTS "Users can view their own income" ON public.income;

CREATE POLICY "Users can view their own income" ON public.income
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own income" ON public.income
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own income" ON public.income
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own income" ON public.income
  FOR DELETE USING (auth.uid() = user_id);

-- Expenses table
DROP POLICY IF EXISTS "Users can delete their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can insert their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can update their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can view their own expenses" ON public.expenses;

CREATE POLICY "Users can view their own expenses" ON public.expenses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own expenses" ON public.expenses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses" ON public.expenses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses" ON public.expenses
  FOR DELETE USING (auth.uid() = user_id);

-- Savings goals table
DROP POLICY IF EXISTS "Users can delete their own savings goals" ON public.savings_goals;
DROP POLICY IF EXISTS "Users can insert their own savings goals" ON public.savings_goals;
DROP POLICY IF EXISTS "Users can update their own savings goals" ON public.savings_goals;
DROP POLICY IF EXISTS "Users can view their own savings goals" ON public.savings_goals;

CREATE POLICY "Users can view their own savings goals" ON public.savings_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own savings goals" ON public.savings_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own savings goals" ON public.savings_goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own savings goals" ON public.savings_goals
  FOR DELETE USING (auth.uid() = user_id);

-- Debts table
DROP POLICY IF EXISTS "Users can delete their own debts" ON public.debts;
DROP POLICY IF EXISTS "Users can insert their own debts" ON public.debts;
DROP POLICY IF EXISTS "Users can update their own debts" ON public.debts;
DROP POLICY IF EXISTS "Users can view their own debts" ON public.debts;

CREATE POLICY "Users can view their own debts" ON public.debts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own debts" ON public.debts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own debts" ON public.debts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own debts" ON public.debts
  FOR DELETE USING (auth.uid() = user_id);