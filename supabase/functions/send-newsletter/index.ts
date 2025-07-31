import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  subject: string;
  content: string;
  articles?: Array<{
    title: string;
    excerpt: string;
    slug: string;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, content, articles }: NewsletterRequest = await req.json();

    console.log('Sending newsletter:', subject);

    // Get all active subscribers
    const { data: subscribers, error: subError } = await supabase
      .from('newsletter_subscriptions')
      .select('email')
      .eq('is_active', true);

    if (subError) {
      throw new Error(`Failed to fetch subscribers: ${subError.message}`);
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ message: "No active subscribers found" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Generate newsletter HTML
    const newsletterHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 30px; text-align: center;">
            <div style="width: 60px; height: 60px; background-color: white; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #1a1a1a; font-family: 'Marcellus', serif; font-size: 24px; font-weight: bold;">B</span>
            </div>
            <h1 style="color: white; font-family: 'Marcellus', serif; font-size: 28px; margin: 0; font-weight: normal;">Bella International</h1>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 10px 0 0 0;">Newsletter</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1a1a1a; font-family: 'Marcellus', serif; font-size: 24px; margin: 0 0 20px 0; font-weight: normal;">${subject}</h2>
            
            <div style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              ${content}
            </div>
            
            ${articles && articles.length > 0 ? `
            <div style="border-top: 2px solid #e2e8f0; padding-top: 30px; margin-top: 30px;">
              <h3 style="color: #1a1a1a; font-family: 'Marcellus', serif; font-size: 20px; margin: 0 0 20px 0;">Latest Articles</h3>
              ${articles.map(article => `
                <div style="margin-bottom: 25px; padding-bottom: 25px; border-bottom: 1px solid #e2e8f0;">
                  <h4 style="color: #1a1a1a; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">
                    <a href="https://yourwebsite.com/articles/${article.slug}" style="color: #1a1a1a; text-decoration: none;">
                      ${article.title}
                    </a>
                  </h4>
                  <p style="color: #4a5568; font-size: 14px; line-height: 1.5; margin: 0;">
                    ${article.excerpt}
                  </p>
                </div>
              `).join('')}
            </div>
            ` : ''}
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #718096; font-size: 14px; margin: 0 0 10px 0;">
              Bella International<br>
              Ethio-China Street, Addis Ababa, Ethiopia
            </p>
            <p style="color: #a0aec0; font-size: 12px; margin: 0;">
              You're receiving this because you subscribed to our newsletter.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send emails to all subscribers (in batches for large lists)
    const emailPromises = subscribers.map(subscriber => 
      resend.emails.send({
        from: "Bella International <newsletter@resend.dev>",
        to: [subscriber.email],
        subject: subject,
        html: newsletterHtml,
      })
    );

    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    console.log(`Newsletter sent: ${successful} successful, ${failed} failed`);

    return new Response(JSON.stringify({ 
      message: `Newsletter sent to ${successful} subscribers`,
      successful,
      failed,
      total: subscribers.length
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error sending newsletter:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);