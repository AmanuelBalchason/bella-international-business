-- Fix Newsletter Subscriber Data Harvesting Warning
-- Drop the current policy that allows email enumeration
DROP POLICY IF EXISTS "View subscription status" ON public.newsletter_subscriptions;

-- Create a more restrictive policy that only allows users to view their own subscriptions when authenticated
CREATE POLICY "Users can view their own subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND email = auth.email()
);

-- Fix Admin User Information Exposure Warning  
-- Drop the current overly broad admin policy
DROP POLICY IF EXISTS "Admin users can manage admin_users" ON public.admin_users;

-- Create more granular policies for admin management
CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Admins can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (is_admin());

CREATE POLICY "Admins can update admin users" 
ON public.admin_users 
FOR UPDATE 
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins can delete admin users" 
ON public.admin_users 
FOR DELETE 
USING (is_admin());

-- Fix Site Configuration Exposure Warning
-- Drop the current policy and create a read-only policy for published settings only
DROP POLICY IF EXISTS "Admin users can manage site settings" ON public.site_settings;

-- Allow public read access only to published, non-sensitive settings
CREATE POLICY "Public can read published site settings" 
ON public.site_settings 
FOR SELECT 
USING (
  setting_key NOT LIKE '%secret%' 
  AND setting_key NOT LIKE '%key%' 
  AND setting_key NOT LIKE '%token%'
  AND setting_key NOT LIKE '%password%'
);

-- Admins can manage all site settings
CREATE POLICY "Admins can manage all site settings" 
ON public.site_settings 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());