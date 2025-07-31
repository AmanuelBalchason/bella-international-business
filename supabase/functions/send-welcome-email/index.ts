import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source = 'website' }: EmailRequest = await req.json();

    console.log('Sending welcome email to:', email);

    const emailResponse = await resend.emails.send({
      from: "Bella International <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Bella International Newsletter!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Bella International</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 30px; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: white; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #1a1a1a; font-family: 'Marcellus', serif; font-size: 24px; font-weight: bold;">B</span>
              </div>
              <h1 style="color: white; font-family: 'Marcellus', serif; font-size: 28px; margin: 0; font-weight: normal;">Welcome to Bella International</h1>
              <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 10px 0 0 0;">Excellence in Business Partnership</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1a1a1a; font-family: 'Marcellus', serif; font-size: 24px; margin: 0 0 20px 0; font-weight: normal;">Thank you for subscribing!</h2>
              
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                We're excited to have you join our community of business leaders and entrepreneurs across Eastern Africa.
              </p>
              
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                You'll receive regular updates on:
              </p>
              
              <ul style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Business excellence insights and strategies</li>
                <li style="margin-bottom: 8px;">Strategic partnership opportunities</li>
                <li style="margin-bottom: 8px;">Industry developments across Eastern Africa</li>
                <li style="margin-bottom: 8px;">Exclusive content from our leadership team</li>
              </ul>
              
              <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #1a1a1a; margin: 30px 0;">
                <p style="color: #2d3748; font-size: 14px; margin: 0; font-style: italic;">
                  "At Bella International, we believe in the power of strategic partnerships to drive sustainable growth and create lasting impact in our communities."
                </p>
              </div>
              
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                Stay tuned for our next newsletter, and feel free to reach out if you have any questions.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 14px; margin: 0 0 10px 0;">
                Bella International<br>
                Ethio-China Street, Addis Ababa, Ethiopia
              </p>
              <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                You received this email because you subscribed to our newsletter via ${source}.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error sending welcome email:", error);
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