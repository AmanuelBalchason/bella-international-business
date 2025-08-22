-- Fix multiple security issues

-- 1. Simplify and strengthen event_reservations RLS policy
-- Replace complex EXISTS query with simpler is_admin() function
DROP POLICY IF EXISTS "Admins can view all event reservations" ON public.event_reservations;

CREATE POLICY "Admin users can read event reservations" 
ON public.event_reservations 
FOR SELECT 
USING (is_admin());

-- Add explicit policies for other operations on event_reservations
CREATE POLICY "Admin users can update event reservations" 
ON public.event_reservations 
FOR UPDATE 
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admin users can delete event reservations" 
ON public.event_reservations 
FOR DELETE 
USING (is_admin());

-- 2. Add additional safeguards to admin_users table
-- Add policy to prevent even admins from accidentally exposing other admin data
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;

CREATE POLICY "Admin users can view admin users with restrictions" 
ON public.admin_users 
FOR SELECT 
USING (is_admin() AND is_active = true);

-- 3. Add validation trigger for admin_users to ensure only valid admins are created
CREATE OR REPLACE FUNCTION public.validate_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure the user exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = NEW.user_id) THEN
    RAISE EXCEPTION 'User must exist in auth.users before becoming admin';
  END IF;
  
  -- Ensure email matches auth.users email
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = NEW.user_id AND email = NEW.email) THEN
    RAISE EXCEPTION 'Admin email must match auth.users email';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER validate_admin_user_trigger
  BEFORE INSERT OR UPDATE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.validate_admin_user();

-- 4. Add additional validation for contact_submissions
-- Create a backup validation function in case is_admin() fails
CREATE OR REPLACE FUNCTION public.validate_admin_access()
RETURNS BOOLEAN AS $$
BEGIN
  -- Double-check admin status with explicit query
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN auth.users u ON u.id = au.user_id
    WHERE u.id = auth.uid() 
    AND au.is_active = true 
    AND au.role IN ('admin', 'editor')
    AND u.email_confirmed_at IS NOT NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;