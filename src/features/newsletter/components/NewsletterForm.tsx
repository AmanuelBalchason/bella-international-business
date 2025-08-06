import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NewsletterFormProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: {
          email: email.trim().toLowerCase(),
          source: 'website'
        }
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Success!",
          description: data.message,
        });
        setEmail('');
      } else {
        throw new Error(data?.error || 'Unknown error occurred');
      }
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      
      let errorMessage = "There was an error subscribing to our newsletter. Please try again.";
      
      if (error.message?.includes('already subscribed')) {
        errorMessage = "This email is already subscribed to our newsletter.";
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

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const inputSizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  const buttonSizeClasses = {
    sm: 'h-8 px-4',
    md: 'h-10 px-6',
    lg: 'h-12 px-8'
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${sizeClasses[size]} ${className}`}>
      <Input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 bg-background border-input text-foreground placeholder:text-muted-foreground font-inter ${inputSizeClasses[size]}`}
        required
        disabled={isLoading}
      />
      <Button 
        type="submit"
        disabled={isLoading}
        className={`bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium ${buttonSizeClasses[size]}`}
      >
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
};

export default NewsletterForm;