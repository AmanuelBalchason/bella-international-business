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
        console.log('[CONTACT] About to call edge function...');
        
        const response = await supabase.functions.invoke('contact-email', {
          body: formData
        });
        
        console.log('[CONTACT] Raw response from edge function:', response);
        console.log('[CONTACT] Response data:', response.data);
        console.log('[CONTACT] Response error:', response.error);
        
        if (response.error) {
          console.error('[CONTACT] Edge function error details:', {
            message: response.error.message,
            context: response.error.context,
            details: response.error.details
          });
          throw new Error(`Edge function error: ${response.error.message}`);
        }
        
        if (!response.data) {
          console.error('[CONTACT] No data returned from edge function');
          throw new Error('No response data from server');
        }
        
        if (!response.data.success) {
          console.error('[CONTACT] Edge function returned failure:', response.data);
          throw new Error(response.data.error || 'Server returned failure status');
        }
        
        console.log('[CONTACT] Submission successful:', response.data);
        return response.data;
      } catch (err: any) {
        console.error('[CONTACT] Mutation error:', err);
        console.error('[CONTACT] Error name:', err.name);
        console.error('[CONTACT] Error message:', err.message);
        console.error('[CONTACT] Error stack:', err.stack);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
    },
  });
};