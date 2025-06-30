
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useLeadershipProfiles = () => {
  return useQuery({
    queryKey: ['leadership-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leadership_profiles')
        .select('*')
        .eq('status', 'published')
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
  });
};
