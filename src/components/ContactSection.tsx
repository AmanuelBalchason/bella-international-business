
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';
import { useT } from '@/i18n/LanguageProvider';

const ContactSection = () => {
  const t = useT();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email.trim())) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Sanitize email
    const sanitizedEmail = email.trim().toLowerCase();

    setIsLoading(true);

    try {
      // The edge function handles new subscriptions, reactivations of
      // previously unsubscribed emails, and duplicate checks server-side.
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: {
          email: sanitizedEmail,
          source: 'website'
        }
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Successfully subscribed!",
          description: data.message,
        });
      } else {
        throw new Error(data?.error || 'Unknown error occurred');
      }

      setEmail('');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);

      let errorMessage = "There was an error subscribing to our newsletter. Please try again.";

      if (error.message?.includes('already subscribed')) {
        errorMessage = "This email is already subscribed to our newsletter.";
      } else if (error.message?.includes('Failed to fetch')) {
        errorMessage = "Network error. Please check your connection and try again.";
      }

      toast({
        title: "Subscription failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-primary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary-foreground/80 font-inter text-sm uppercase tracking-wider mb-4">{t('Stay Connected')}</p>
          <h2 className="font-marcellus text-4xl font-normal text-primary-foreground leading-tight mb-8">
            {t('Let Us Reach You')}
          </h2>
          <p className="text-primary-foreground/80 font-inter text-lg max-w-2xl mx-auto">
            {t('Subscribe to our newsletter for insights on business excellence, strategic partnerships, and industry developments across Eastern Africa.')}
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex">
            <Input
              type="email"
              placeholder={t('Enter your email address')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border-white text-foreground placeholder:text-muted-foreground font-inter rounded-none"
              required
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-foreground hover:bg-foreground/90 text-background font-inter font-medium px-8 rounded-none ml-0"
            >
              {isLoading ? t('Subscribing...') : t('Send')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
