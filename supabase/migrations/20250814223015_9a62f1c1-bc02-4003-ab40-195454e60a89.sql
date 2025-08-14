-- Fix leadership_profiles security issue by creating secure function and policies
-- First drop any existing problematic policies
DROP POLICY IF EXISTS "Anyone can read published leadership" ON public.leadership_profiles;
DROP POLICY IF EXISTS "Block direct access to leadership profiles" ON public.leadership_profiles;
DROP POLICY IF EXISTS "Admins can manage leadership profiles" ON public.leadership_profiles;

-- Create a secure function that excludes sensitive contact information
CREATE OR REPLACE FUNCTION public.get_public_leadership_profiles()
RETURNS TABLE (
  id uuid,
  name text,
  job_position text,
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
    lp.position as job_position,
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

-- Block direct table access for non-admins
CREATE POLICY "Block direct access to leadership profiles" 
ON public.leadership_profiles 
FOR SELECT 
USING (false);

-- Allow admins to manage leadership profiles
CREATE POLICY "Admins can manage leadership profiles" 
ON public.leadership_profiles 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Grant execute permission to all users for the secure function
GRANT EXECUTE ON FUNCTION public.get_public_leadership_profiles() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_leadership_profiles() TO authenticated;