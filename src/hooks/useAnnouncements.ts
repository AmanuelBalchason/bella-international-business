import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useAnnouncements = () => {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('status', 'published')
        .lte('start_date', new Date().toISOString())
        .gte('end_date', new Date().toISOString())
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
  });
};