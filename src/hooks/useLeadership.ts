
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type PublicLeadershipProfile = {
  id: string;
  name: string;
  job_position: string;
  bio: string | null;
  expertise: string[] | null;
  quote: string | null;
  years_experience: number | null;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
  profile_image_id: string | null;
  status: string;
};

export const useLeadershipProfiles = () => {
  return useQuery({
    queryKey: ['leadership-profiles'],
    queryFn: async (): Promise<PublicLeadershipProfile[]> => {
      const { data, error } = await supabase
        .rpc('get_public_leadership_profiles');
      
      if (error) throw error;
      return data || [];
    },
  });
};
