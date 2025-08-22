import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const resendApiKey = Deno.env.get('RESEND_API_KEY');

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const token = url.searchParams.get('token');
    const action = url.searchParams.get('action') || 'verify';

    if (!email || !token) {
      return new Response(
        JSON.stringify({ error: 'Email and token are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log(`Processing ${action} request for email: ${email}`);

    if (action === 'verify') {
      // Verify subscription
      const { data: subscription, error: fetchError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .eq('email', email)
        .eq('verification_token', token)
        .maybeSingle();

      if (fetchError) {
        console.error('Database error:', fetchError);
        return new Response(
          JSON.stringify({ error: 'Database error' }),
          { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      if (!subscription) {
        return new Response(
          JSON.stringify({ error: 'Invalid verification link' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      if (subscription.token_expires_at && new Date(subscription.token_expires_at) < new Date()) {
        return new Response(
          JSON.stringify({ error: 'Verification link has expired' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      // Update subscription as verified
      const { error: updateError } = await supabase
        .from('newsletter_subscriptions')
        .update({
          is_verified: true,
          verification_token: null,
          token_expires_at: null,
          is_active: true
        })
        .eq('email', email)
        .eq('verification_token', token);

      if (updateError) {
        console.error('Update error:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to verify subscription' }),
          { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      // Send welcome email if Resend is configured
      if (resend) {
        try {
          await resend.emails.send({
            from: "Bella International <info@bellainter.com>",
            to: [email],
            subject: "Welcome to Bella International Newsletter!",
            html: `
              <html>
              <head>
                <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
              </head>
              <body>
              <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; background-image: radial-gradient(circle, #456653 1px, transparent 1px); background-size: 20px 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="font-family: 'Marcellus', serif; color: #456653; margin: 0; font-size: 28px;">Bella International</h1>
                  <p style="color: #64748b; margin: 5px 0;">Leading Business Excellence Solutions</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #456653 0%, #3d5a4a 100%); color: white; padding: 30px; text-align: center; margin-bottom: 30px;">
                  <h2 style="font-family: 'Marcellus', serif; margin: 0; font-size: 24px;">🎉 Welcome to Bella International!</h2>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">Your subscription is now active</p>
                </div>
                
                <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for verifying your email address! You're now part of our exclusive community.</p>
                
                <div style="background-color: #f0f4f2; padding: 25px; margin: 25px 0; border-left: 4px solid #456653;">
                  <h3 style="font-family: 'Marcellus', serif; color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📰 You'll receive updates on:</h3>
                  <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Business excellence strategies</li>
                    <li>Industry insights and trends</li>
                    <li>Strategic partnership opportunities</li>
                    <li>Success stories from Eastern Africa</li>
                  </ul>
                </div>
                
                <div style="background-color: #f9fafa; padding: 25px; margin: 30px 0;">
                  <h3 style="font-family: 'Marcellus', serif; color: #456653; margin: 0 0 20px 0; font-size: 18px;">⏰ What happens next?</h3>
                  
                  <!-- Flow diagram -->
                  <div style="position: relative; display: flex; justify-content: space-between; align-items: center; margin: 20px 0;">
                    <!-- Progress line -->
                    <div style="position: absolute; top: 20px; left: 50px; right: 50px; height: 2px; background-color: #456653; z-index: 1;"></div>
                    
                    <!-- Step 1: Verified -->
                    <div style="display: flex; flex-direction: column; align-items: center; z-index: 2;">
                      <div style="width: 40px; height: 40px; background-color: #456653; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                        <span style="color: white; font-size: 18px;">✓</span>
                      </div>
                      <span style="background-color: #bbf7d0; color: #15803d; padding: 4px 8px; font-size: 11px; font-weight: bold; text-transform: uppercase;">verified</span>
                      <span style="font-size: 11px; color: #6b7280; margin-top: 4px;">Now</span>
                    </div>
                    
                    <!-- Step 2: Processing -->
                    <div style="display: flex; flex-direction: column; align-items: center; z-index: 2;">
                      <div style="width: 40px; height: 40px; background-color: #456653; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                        <span style="color: white; font-size: 18px;">⚡</span>
                      </div>
                      <span style="background-color: #fef3c7; color: #d97706; padding: 4px 8px; font-size: 11px; font-weight: bold; text-transform: uppercase;">processing</span>
                      <span style="font-size: 11px; color: #6b7280; margin-top: 4px;">2-5 mins</span>
                    </div>
                    
                    <!-- Step 3: Active -->
                    <div style="display: flex; flex-direction: column; align-items: center; z-index: 2;">
                      <div style="width: 40px; height: 40px; background-color: #456653; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                        <span style="color: white; font-size: 18px;">📧</span>
                      </div>
                      <span style="background-color: #bbf7d0; color: #15803d; padding: 4px 8px; font-size: 11px; font-weight: bold; text-transform: uppercase;">active</span>
                      <span style="font-size: 11px; color: #6b7280; margin-top: 4px;">24 hours</span>
                    </div>
                  </div>
                  
                  <div style="margin-top: 25px;">
                    <p style="color: #374151; margin: 0 0 10px 0; font-size: 14px;">Our team will process your subscription automatically:</p>
                    <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6; font-size: 14px;">
                      <li>Your subscription is being added to our system</li>
                      <li>You'll receive your first newsletter within 24-48 hours</li>
                      <li>Weekly updates will be delivered every Tuesday</li>
                      <li>For any questions, contact us at info@bellainter.com</li>
                    </ul>
                  </div>
                </div>
                
                <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
                
                <div style="text-align: center;">
                  <p style="font-family: 'Marcellus', serif; color: #456653; font-weight: bold; margin: 0; font-size: 18px;">Bella International</p>
                  <p style="color: #64748b; margin: 5px 0; font-size: 14px;">Leading Business Excellence Solutions</p>
                  <p style="color: #64748b; margin: 5px 0; font-size: 12px;">
                    Best regards,<br>The Bella International Team
                  </p>
                </div>
              </div>
              </body>
              </html>
            `,
          });
        } catch (emailError) {
          console.error('Email error:', emailError);
          // Don't fail the verification if email fails
        }
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email verified successfully! Welcome to our newsletter.' 
        }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );

    } else if (action === 'unsubscribe') {
      // Unsubscribe
      const { data: subscription, error: fetchError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .eq('email', email)
        .eq('verification_token', token)
        .maybeSingle();

      if (fetchError || !subscription) {
        return new Response(
          JSON.stringify({ error: 'Invalid unsubscribe link' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      // Deactivate subscription
      const { error: updateError } = await supabase
        .from('newsletter_subscriptions')
        .update({ is_active: false })
        .eq('email', email);

      if (updateError) {
        console.error('Unsubscribe error:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to unsubscribe' }),
          { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'You have been successfully unsubscribed from our newsletter.' 
        }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error: any) {
    console.error('Newsletter verification error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);