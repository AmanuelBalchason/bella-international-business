-- Fix function search path security warnings

-- Update validate_admin_user function with proper search_path
CREATE OR REPLACE FUNCTION public.validate_admin_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

-- Update validate_admin_access function with proper search_path
CREATE OR REPLACE FUNCTION public.validate_admin_access()
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER 
STABLE
SET search_path = 'public'
AS $$
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
$$;