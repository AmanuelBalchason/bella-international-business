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
            from: "Bella International <no-reply@bellainternational.com>",
            to: [email],
            subject: "Welcome to Bella International Newsletter!",
            html: `
              <h1>Welcome to Bella International!</h1>
              <p>Thank you for verifying your email address. You're now subscribed to our newsletter.</p>
              <p>You'll receive updates on:</p>
              <ul>
                <li>Business excellence strategies</li>
                <li>Industry insights and trends</li>
                <li>Strategic partnership opportunities</li>
                <li>Success stories from Eastern Africa</li>
              </ul>
              <p>Best regards,<br>The Bella International Team</p>
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