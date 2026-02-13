
SELECT cron.schedule(
  'keep-supabase-alive',
  '0 0 */5 * *',
  $$
  SELECT net.http_post(
    url := 'https://xztjwxosevpwciappbyq.supabase.co/functions/v1/keep-supabase-alive',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6dGp3eG9zZXZwd2NpYXBwYnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNjYyOTksImV4cCI6MjA3OTc0MjI5OX0.x3zX6yaz1zHiItRPgN5dgZmJbXHFjPf0SIBv0RNzGiU"}'::jsonb,
    body := '{"trigger": "cron"}'::jsonb
  ) AS request_id;
  $$
);
