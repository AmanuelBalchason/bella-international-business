-- Remove the overly permissive RLS policy on email_logs table
-- Edge functions use service_role_key and bypass RLS entirely,
-- so this policy allowing anyone to insert is unnecessary and potentially dangerous

DROP POLICY IF EXISTS "System can insert email logs" ON email_logs;