
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useLeadershipProfiles = () => {
  return useQuery({
    queryKey: ['leadership-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_public_leadership_profiles');
      
      if (error) throw error;
      return data;
    },
  });
};
