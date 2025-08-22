import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NewsletterTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendInauguralNewsletter = async () => {
    setIsLoading(true);
    
    try {
      const newsletterContent = {
        subject: "Welcome to Bella International Weekly Newsletter 📈",
        preheader: "Your weekly dose of business excellence insights",
        hero_title: "Welcome to Business Excellence Weekly",
        hero_subtitle: "Thank you for joining our community of forward-thinking business leaders. Every Thursday, we'll share insights, strategies, and opportunities to accelerate your business growth in Ethiopia and beyond.",
        featured_article: {
          title: "5 Key Strategies for Business Growth in Ethiopia's Emerging Market",
          excerpt: "Ethiopia's economy is experiencing rapid transformation. Discover the proven strategies that successful businesses are using to capitalize on new opportunities and navigate the evolving market landscape.",
          url: "https://xprrwkjotipgqhbchbju.supabase.co/articles"
        },
        business_insight: {
          title: "This Week's Excellence Tip",
          content: "Focus on building strong local partnerships. In Ethiopia's business environment, relationships are the foundation of sustainable success. Invest time in understanding local customs, building trust with community leaders, and creating mutually beneficial partnerships that will support your long-term growth."
        },
        cta: {
          title: "Ready to Accelerate Your Business Growth?",
          subtitle: "Schedule a free consultation with our business excellence experts",
          button_text: "Book Your Consultation",
          button_url: "https://xprrwkjotipgqhbchbju.supabase.co/contact"
        }
      };

      const { data, error } = await supabase.functions.invoke('newsletter-campaign', {
        body: { content: newsletterContent }
      });

      if (error) {
        console.error('Newsletter error:', error);
        throw error;
      }

      console.log('Newsletter sent:', data);
      
      toast({
        title: "Newsletter Sent Successfully! 🎉",
        description: `Sent to ${data.sent_count} subscribers. ${data.failed_count} failed.`,
      });

    } catch (error: any) {
      console.error('Error sending newsletter:', error);
      toast({
        title: "Error sending newsletter",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Newsletter Campaign Test
          </h1>
          <p className="text-xl text-muted-foreground">
            Send the inaugural Bella International Weekly Newsletter to all verified subscribers
          </p>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Ready to Launch?</h2>
            <p className="text-muted-foreground">
              This will send a beautifully designed newsletter with Bella's branding to all verified subscribers.
            </p>
          </div>

          <div className="p-4 bg-muted rounded border-l-4 border-primary">
            <h3 className="font-medium mb-2">Newsletter Preview:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Subject: "Welcome to Bella International Weekly Newsletter 📈"</li>
              <li>• Featured article on business growth strategies</li>
              <li>• Business excellence tip of the week</li>
              <li>• Call-to-action for free consultation</li>
              <li>• Bella's signature sage green branding with sharp corners</li>
              <li>• Dotted pattern backgrounds and flow diagrams</li>
            </ul>
          </div>

          <Button 
            onClick={sendInauguralNewsletter}
            disabled={isLoading}
            size="lg"
            className="w-full"
          >
            {isLoading ? "Sending Newsletter..." : "Send Newsletter Now 🚀"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterTest;