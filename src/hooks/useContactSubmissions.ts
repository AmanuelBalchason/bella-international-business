import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useContactSubmissions = () => {
  return useQuery({
    queryKey: ['contact-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateContactSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      subject?: string;
      message: string;
      form_type?: string;
      metadata?: any;
    }) => {
      console.log('[CONTACT] Starting submission with data:', formData);
      
      try {
        const { data, error } = await supabase.functions.invoke('contact-email', {
          body: formData
        });
        
        console.log('[CONTACT] Edge function response:', { data, error });
        
        if (error) {
          console.error('[CONTACT] Edge function error:', error);
          throw error;
        }
        if (!data?.success) {
          console.error('[CONTACT] Edge function returned failure:', data);
          throw new Error(data?.error || 'Unknown error occurred');
        }
        
        console.log('[CONTACT] Submission successful:', data);
        return data;
      } catch (err) {
        console.error('[CONTACT] Mutation error:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
    },
  });
};