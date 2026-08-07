-- Retire internal pg_cron keep-alive job (replaced by Vercel Cron /api/cron/keep-alive).
-- Idempotent: no-op if the job or pg_cron is already gone.
DO $$
BEGIN
  PERFORM cron.unschedule('keep-supabase-alive');
EXCEPTION
  WHEN undefined_table THEN
    NULL;
  WHEN undefined_function THEN
    NULL;
  WHEN OTHERS THEN
    IF SQLERRM ILIKE '%could not find%' OR SQLERRM ILIKE '%does not exist%' THEN
      NULL;
    ELSE
      RAISE;
    END IF;
END $$;
