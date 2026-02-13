
-- No user should access this table directly, but we need a policy to satisfy the linter
-- Only service_role can access it (via the edge function)
CREATE POLICY "Service role only" ON public.system_heartbeat
  FOR ALL
  USING (false);
