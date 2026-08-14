-- 1. Newsletter: remove open UPDATE policy (verification is handled server-side with service role)
DROP POLICY IF EXISTS "Anyone can verify subscription" ON public.newsletter_subscriptions;

-- 2. Admin users: require true 'admin' role for management
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
      AND is_active = true
      AND role = 'admin'::user_role
  );
$$;

DROP POLICY IF EXISTS "Admins can insert admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can delete admin users" ON public.admin_users;

CREATE POLICY "Super admins can insert admin users"
ON public.admin_users FOR INSERT TO authenticated
WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can update admin users"
ON public.admin_users FOR UPDATE TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can delete admin users"
ON public.admin_users FOR DELETE TO authenticated
USING (public.is_super_admin());

-- 3. Site settings: explicit is_public flag instead of key-name pattern matching
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false;

UPDATE public.site_settings
SET is_public = true
WHERE setting_key NOT LIKE '%secret%'
  AND setting_key NOT LIKE '%key%'
  AND setting_key NOT LIKE '%token%'
  AND setting_key NOT LIKE '%password%';

DROP POLICY IF EXISTS "Public can read published site settings" ON public.site_settings;

CREATE POLICY "Public can read public site settings"
ON public.site_settings FOR SELECT
USING (is_public = true);

-- 4. Lock down SECURITY DEFINER functions not meant to be called from the API
REVOKE ALL ON FUNCTION public.create_first_admin(text, text) FROM anon;
REVOKE ALL ON FUNCTION public.clean_expired_verification_tokens() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.validate_admin_user() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.is_super_admin() FROM anon;
REVOKE ALL ON FUNCTION public.validate_admin_access() FROM anon;
REVOKE ALL ON FUNCTION public.is_admin() FROM anon;