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

interface SubscribeRequest {
  email: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  try {
    const { email, source = 'website' }: SubscribeRequest = await req.json();

    if (!email || !email.trim()) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();
    console.log(`Processing subscription for email: ${sanitizedEmail}`);

    // Check if email already exists
    const { data: existingSubscription, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('email', sanitizedEmail)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database check error:', checkError);
      return new Response(
        JSON.stringify({ error: 'Database error' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    let subscriptionData;
    
    if (existingSubscription) {
      if (existingSubscription.is_verified && existingSubscription.is_active) {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Email is already subscribed to our newsletter.' 
          }),
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
      
      // Reactivate and update verification token
      const { data: updated, error: updateError } = await supabase
        .from('newsletter_subscriptions')
        .update({
          is_active: true,
          verification_token: crypto.randomUUID(),
          token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          source
        })
        .eq('email', sanitizedEmail)
        .select()
        .single();

      if (updateError) {
        console.error('Update error:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update subscription' }),
          { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
      
      subscriptionData = updated;
    } else {
      // Create new subscription
      const { data: created, error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: sanitizedEmail,
          source,
          is_active: true,
          is_verified: false,
          verification_token: crypto.randomUUID(),
          token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to create subscription' }),
          { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
      
      subscriptionData = created;
    }

    // Send verification email if Resend is configured
    if (resend && subscriptionData.verification_token) {
      try {
        const verificationUrl = `https://xprrwkjotipgqhbchbju.supabase.co/functions/v1/newsletter-verify?email=${encodeURIComponent(sanitizedEmail)}&token=${subscriptionData.verification_token}&action=verify`;
        const unsubscribeUrl = `https://xprrwkjotipgqhbchbju.supabase.co/functions/v1/newsletter-verify?email=${encodeURIComponent(sanitizedEmail)}&token=${subscriptionData.verification_token}&action=unsubscribe`;

        await resend.emails.send({
          from: "Bella International <no-reply@bellainternational.com>",
          to: [sanitizedEmail],
          subject: "Please verify your subscription to Bella International Newsletter",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">Verify Your Subscription</h1>
              <p>Thank you for subscribing to the Bella International newsletter!</p>
              <p>Please click the button below to verify your email address and complete your subscription:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" 
                   style="background-color: #007bff; color: white; padding: 12px 24px; 
                          text-decoration: none; border-radius: 4px; display: inline-block;">
                  Verify My Email
                </a>
              </div>
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
              <p>This verification link will expire in 24 hours.</p>
              <hr style="margin: 30px 0;">
              <p style="font-size: 12px; color: #666;">
                If you didn't subscribe to this newsletter, you can safely ignore this email.
                <br>
                To unsubscribe, <a href="${unsubscribeUrl}">click here</a>.
              </p>
            </div>
          `,
        });

        console.log('Verification email sent successfully');
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the subscription if email fails
      }
    }

    const message = resend 
      ? 'Please check your email to verify your subscription.' 
      : 'Subscription successful! Thank you for joining our newsletter.';

    return new Response(
      JSON.stringify({ 
        success: true, 
        message,
        requiresVerification: !!resend
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);