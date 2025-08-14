-- Fix leadership_profiles security issue by dropping problematic policies and creating secure ones
-- Drop all current policies on leadership_profiles 
DROP POLICY IF EXISTS "Public can read published leadership (excluding contact info)" ON public.leadership_profiles;
DROP POLICY IF EXISTS "Authenticated users can read published leadership with contact info" ON public.leadership_profiles;
DROP POLICY IF EXISTS "Anyone can read published leadership" ON public.leadership_profiles;

-- Create a restrictive policy that completely blocks direct access to the table
CREATE POLICY "Block direct access to leadership profiles" 
ON public.leadership_profiles 
FOR SELECT 
USING (false);

-- Admins can still manage leadership profiles
CREATE POLICY "Admins can manage leadership profiles" 
ON public.leadership_profiles 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Update the security function to be the only way to access public leadership data
CREATE OR REPLACE FUNCTION public.get_public_leadership_profiles()
RETURNS TABLE (
  id uuid,
  name text,
  position text,
  bio text,
  expertise text[],
  quote text,
  years_experience integer,
  sort_order integer,
  created_at timestamptz,
  updated_at timestamptz,
  profile_image_id uuid,
  status content_status
)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 
    lp.id,
    lp.name,
    lp.position,
    lp.bio,
    lp.expertise,
    lp.quote,
    lp.years_experience,
    lp.sort_order,
    lp.created_at,
    lp.updated_at,
    lp.profile_image_id,
    lp.status
  FROM public.leadership_profiles lp
  WHERE lp.status = 'published'::content_status
  ORDER BY lp.sort_order;
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.get_public_leadership_profiles() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_leadership_profiles() TO authenticated;