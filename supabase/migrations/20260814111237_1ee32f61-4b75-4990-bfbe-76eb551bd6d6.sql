-- Remove default PUBLIC execute rights and grant only where needed
REVOKE ALL ON FUNCTION public.clean_expired_verification_tokens() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.clean_expired_verification_tokens() TO service_role;

REVOKE ALL ON FUNCTION public.create_first_admin(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_first_admin(text, text) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.validate_admin_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.is_super_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.validate_admin_access() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_admin_access() TO authenticated, service_role;

-- Public leadership listing stays available to visitors
REVOKE ALL ON FUNCTION public.get_public_leadership_profiles() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_leadership_profiles() TO anon, authenticated, service_role;