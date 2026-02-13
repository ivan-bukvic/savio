
CREATE TABLE public.system_heartbeat (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  last_ping timestamp with time zone NOT NULL DEFAULT now(),
  note text NOT NULL DEFAULT 'supabase_keepalive'
);

ALTER TABLE public.system_heartbeat ENABLE ROW LEVEL SECURITY;

-- Insert the single keepalive row
INSERT INTO public.system_heartbeat (note) VALUES ('supabase_keepalive');

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
