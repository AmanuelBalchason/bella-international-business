-- Fix search path security warning for the get_public_leadership_profiles function
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
SET search_path = public
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