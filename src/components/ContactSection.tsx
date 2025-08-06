
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';

const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Check if email already exists
      const { data: existingSubscription } = await supabase
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', email)
        .single();

      if (existingSubscription) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
        });
        setEmail('');
        setIsLoading(false);
        return;
      }

      // Insert new subscription
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: email,
            source: 'website'
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter. You'll receive updates on business excellence and industry insights.",
      });

      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to our newsletter. Please try again.",
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
          <p className="text-primary-foreground/80 font-inter text-sm uppercase tracking-wider mb-4">Stay Connected</p>
          <h2 className="font-marcellus text-4xl font-normal text-primary-foreground leading-tight mb-8">
            Let Us Reach You
          </h2>
          <p className="text-primary-foreground/80 font-inter text-lg max-w-2xl mx-auto">
            Subscribe to our newsletter for insights on business excellence, strategic partnerships, and industry developments across Eastern Africa.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex">
            <Input
              type="email"
              placeholder="Enter your email address"
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
              {isLoading ? 'Subscribing...' : 'Send'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
