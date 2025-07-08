-- Phase 1: Fix Critical RLS Policy Infinite Recursion
-- Drop the problematic admin_users RLS policy
DROP POLICY IF EXISTS "Admin users can manage admin_users" ON public.admin_users;

-- Create a security definer function to safely check admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND is_active = true 
    AND role IN ('admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create new admin_users RLS policy using the security definer function
CREATE POLICY "Admin users can manage admin_users" ON public.admin_users
  FOR ALL USING (public.is_admin());

-- Phase 2: Bootstrap Admin Access
-- Create a function to create the first admin user (one-time use)
CREATE OR REPLACE FUNCTION public.create_first_admin(
  admin_email TEXT,
  admin_name TEXT
)
RETURNS VOID AS $$
DECLARE
  user_uuid UUID;
BEGIN
  -- Check if any admin users already exist
  IF EXISTS (SELECT 1 FROM public.admin_users WHERE role = 'admin') THEN
    RAISE EXCEPTION 'Admin user already exists. This function can only be used once.';
  END IF;
  
  -- Get the user ID from auth.users based on email
  SELECT id INTO user_uuid FROM auth.users WHERE email = admin_email;
  
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'User with email % not found in auth.users', admin_email;
  END IF;
  
  -- Insert the admin user
  INSERT INTO public.admin_users (user_id, email, full_name, role, is_active)
  VALUES (user_uuid, admin_email, admin_name, 'admin', true);
  
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update all other RLS policies to use the new security definer function
DROP POLICY IF EXISTS "Admin users can manage media" ON public.media_library;
CREATE POLICY "Admin users can manage media" ON public.media_library
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin users can manage categories" ON public.content_categories;
CREATE POLICY "Admin users can manage categories" ON public.content_categories
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin users can manage sectors" ON public.business_sectors;
CREATE POLICY "Admin users can manage sectors" ON public.business_sectors
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin users can manage leadership" ON public.leadership_profiles;
CREATE POLICY "Admin users can manage leadership" ON public.leadership_profiles
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin users can manage articles" ON public.articles;
CREATE POLICY "Admin users can manage articles" ON public.articles
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin users can manage testimonials" ON public.testimonials;
CREATE POLICY "Admin users can manage testimonials" ON public.testimonials
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin users can manage faqs" ON public.faqs;
CREATE POLICY "Admin users can manage faqs" ON public.faqs
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin users can manage page content" ON public.page_content;
CREATE POLICY "Admin users can manage page content" ON public.page_content
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin users can manage site settings" ON public.site_settings;
CREATE POLICY "Admin users can manage site settings" ON public.site_settings
  FOR ALL USING (public.is_admin());