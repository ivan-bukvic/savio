-- Add is_template column to all relevant tables
-- This marks template/demo data that should be cloned for new users

ALTER TABLE public.income ADD COLUMN is_template boolean NOT NULL DEFAULT false;
ALTER TABLE public.expenses ADD COLUMN is_template boolean NOT NULL DEFAULT false;
ALTER TABLE public.savings_goals ADD COLUMN is_template boolean NOT NULL DEFAULT false;
ALTER TABLE public.debts ADD COLUMN is_template boolean NOT NULL DEFAULT false;

-- Mark all existing demo data from template user as template data
UPDATE public.income SET is_template = true WHERE user_id = 'e64058d3-a8a4-4da6-94e1-5a4c623ed315';
UPDATE public.expenses SET is_template = true WHERE user_id = 'e64058d3-a8a4-4da6-94e1-5a4c623ed315';
UPDATE public.savings_goals SET is_template = true WHERE user_id = 'e64058d3-a8a4-4da6-94e1-5a4c623ed315';
UPDATE public.debts SET is_template = true WHERE user_id = 'e64058d3-a8a4-4da6-94e1-5a4c623ed315';

-- Create index for efficient template data lookups
CREATE INDEX idx_income_is_template ON public.income(is_template) WHERE is_template = true;
CREATE INDEX idx_expenses_is_template ON public.expenses(is_template) WHERE is_template = true;
CREATE INDEX idx_savings_goals_is_template ON public.savings_goals(is_template) WHERE is_template = true;
CREATE INDEX idx_debts_is_template ON public.debts(is_template) WHERE is_template = true;