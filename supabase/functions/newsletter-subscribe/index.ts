import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubscribeRequest {
  email: string;
  source?: string;
}

// Enhanced logging with timestamps and request tracking
const log = (level: 'INFO' | 'ERROR' | 'WARN', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [NEWSLETTER-SUBSCRIBE] [${level}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
};

// Email logging to database
const logEmailAttempt = async (supabase: any, email: string, type: string, status: 'success' | 'failed', error?: string) => {
  try {
    const { error: logError } = await supabase.from('email_logs').insert({
      email,
      email_type: type,
      status,
      error_message: error,
      attempted_at: new Date().toISOString()
    });
    
    if (logError) {
      log('ERROR', 'Failed to log email attempt', logError);
    } else {
      log('INFO', `Email attempt logged: ${status}`, { email, type });
    }
  } catch (err) {
    log('ERROR', 'Exception in logEmailAttempt', err);
  }
};

// Health check endpoint
const healthCheck = () => {
  return new Response(
    JSON.stringify({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      function: 'newsletter-subscribe',
      version: '2.0'
    }),
    { 
      status: 200, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders } 
    }
  );
};

const handler = async (req: Request): Promise<Response> => {
  const requestId = crypto.randomUUID();
  log('INFO', `Request started`, { requestId, method: req.method, url: req.url });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    log('INFO', 'CORS preflight request handled', { requestId });
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.method === 'GET') {
    log('INFO', 'Health check requested', { requestId });
    return healthCheck();
  }

  if (req.method !== 'POST') {
    log('WARN', 'Invalid method', { requestId, method: req.method });
    return new Response(
      JSON.stringify({ error: 'Method not allowed', requestId }),
      { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  try {
    // Initialize clients
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    log('INFO', 'Environment check', {
      requestId,
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseKey: !!supabaseKey,
      hasResendKey: !!resendApiKey
    });

    if (!supabaseUrl || !supabaseKey) {
      log('ERROR', 'Missing Supabase credentials', { requestId });
      return new Response(
        JSON.stringify({ error: 'Server configuration error', requestId }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const resend = resendApiKey ? new Resend(resendApiKey) : null;

    // Parse request body
    let requestData: SubscribeRequest;
    try {
      requestData = await req.json();
      log('INFO', 'Request body parsed', { requestId, hasData: !!requestData });
    } catch (parseError) {
      log('ERROR', 'Failed to parse request body', { requestId, error: parseError });
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body', requestId }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const { email, source = 'website' } = requestData;

    // Validate email
    if (!email || !email.trim()) {
      log('WARN', 'Missing email', { requestId });
      return new Response(
        JSON.stringify({ error: 'Email is required', requestId }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      log('WARN', 'Invalid email format', { requestId, email });
      return new Response(
        JSON.stringify({ error: 'Invalid email format', requestId }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();
    log('INFO', 'Email validated', { requestId, email: sanitizedEmail, source });

    // Check for existing subscription
    log('INFO', 'Checking for existing subscription', { requestId });
    const { data: existingSubscription, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('email', sanitizedEmail)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      log('ERROR', 'Database check error', { requestId, error: checkError });
      return new Response(
        JSON.stringify({ error: 'Database error', requestId }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    let subscriptionData;
    let isNewSubscription = false;
    
    if (existingSubscription) {
      log('INFO', 'Found existing subscription', { 
        requestId, 
        isActive: existingSubscription.is_active,
        isVerified: existingSubscription.is_verified
      });

      if (existingSubscription.is_verified && existingSubscription.is_active) {
        // Send confirmation email for existing active subscribers
        if (resend) {
          try {
            await resend.emails.send({
              from: "Bella International <info@bellainter.com>",
              to: [sanitizedEmail],
              subject: "Thank you for your continued interest in Bella International",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2563eb; margin: 0; font-size: 28px;">Bella International</h1>
                    <p style="color: #64748b; margin: 5px 0;">Leading Business Excellence Solutions</p>
                  </div>
                  
                  <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                    <h2 style="margin: 0; font-size: 24px;">📧 Newsletter Confirmation</h2>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">You're already part of our community!</p>
                  </div>
                  
                  <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for your continued interest in <strong>Bella International</strong>!</p>
                  
                  <p style="color: #374151; font-size: 16px; line-height: 1.6;">We're delighted to confirm that you're already subscribed to our newsletter. You'll continue to receive our latest updates, insights, and business excellence content.</p>
                  
                  <div style="background-color: #eff6ff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
                    <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📰 What to expect:</h3>
                    <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
                      <li>Weekly business insights and industry trends</li>
                      <li>Exclusive event invitations and early access</li>
                      <li>Success stories from across the Horn of Africa</li>
                      <li>Strategic partnership opportunities</li>
                    </ul>
                  </div>
                  
                  <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
                  
                  <div style="text-align: center;">
                    <p style="color: #2563eb; font-weight: bold; margin: 0; font-size: 18px;">Bella International</p>
                    <p style="color: #64748b; margin: 5px 0; font-size: 14px;">Leading Business Excellence Solutions</p>
                    <p style="color: #64748b; margin: 5px 0; font-size: 12px;">
                      Request ID: ${requestId}<br>
                      This email was sent to ${sanitizedEmail}
                    </p>
                  </div>
                </div>
              `,
            });

            log('INFO', 'Confirmation email sent to existing subscriber', { requestId });
            await logEmailAttempt(supabase, sanitizedEmail, 'newsletter_existing', 'success');
          } catch (emailError) {
            log('ERROR', 'Failed to send confirmation email to existing subscriber', { requestId, error: emailError });
            await logEmailAttempt(supabase, sanitizedEmail, 'newsletter_existing', 'failed', emailError.message);
          }
        }
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Thank you! You're already subscribed. Check your email for confirmation.",
            requestId,
            timestamp: new Date().toISOString()
          }),
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
      
      // Reactivate and update existing subscription
      log('INFO', 'Reactivating existing subscription', { requestId });
      const { data: updated, error: updateError } = await supabase
        .from('newsletter_subscriptions')
        .update({
          is_active: true,
          verification_token: crypto.randomUUID(),
          token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          source,
          subscribed_at: new Date().toISOString()
        })
        .eq('email', sanitizedEmail)
        .select()
        .single();

      if (updateError) {
        log('ERROR', 'Failed to update subscription', { requestId, error: updateError });
        return new Response(
          JSON.stringify({ error: 'Failed to update subscription', requestId }),
          { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
      
      subscriptionData = updated;
    } else {
      // Create new subscription
      log('INFO', 'Creating new subscription', { requestId });
      isNewSubscription = true;
      
      const { data: created, error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: sanitizedEmail,
          source,
          is_active: true,
          is_verified: false,
          verification_token: crypto.randomUUID(),
          token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (insertError) {
        log('ERROR', 'Failed to create subscription', { requestId, error: insertError });
        return new Response(
          JSON.stringify({ error: 'Failed to create subscription', requestId }),
          { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
      
      subscriptionData = created;
    }

    log('INFO', 'Subscription data ready', { requestId, subscriptionId: subscriptionData.id, isNew: isNewSubscription });

    // Send verification email if Resend is configured
    let emailSent = false;
    if (resend && subscriptionData.verification_token) {
      try {
        const verificationUrl = `https://xprrwkjotipgqhbchbju.supabase.co/functions/v1/newsletter-verify?email=${encodeURIComponent(sanitizedEmail)}&token=${subscriptionData.verification_token}&action=verify`;
        const unsubscribeUrl = `https://xprrwkjotipgqhbchbju.supabase.co/functions/v1/newsletter-verify?email=${encodeURIComponent(sanitizedEmail)}&token=${subscriptionData.verification_token}&action=unsubscribe`;

        log('INFO', 'Sending verification email', { requestId, to: sanitizedEmail });

        await resend.emails.send({
          from: "Bella International <info@bellainter.com>",
          to: [sanitizedEmail],
          subject: "Please verify your subscription to Bella International Newsletter",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2563eb; margin: 0; font-size: 28px;">Bella International</h1>
                <p style="color: #64748b; margin: 5px 0;">Leading Business Excellence Solutions</p>
              </div>
              
              <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0; font-size: 24px;">✉️ Verify Your Subscription</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">One more step to join our community</p>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for subscribing to the <strong>Bella International newsletter</strong>!</p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Please click the button below to verify your email address and complete your subscription:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" 
                   style="background-color: #2563eb; color: white; padding: 15px 30px; 
                          text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                  Verify My Email Address
                </a>
              </div>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2563eb;">
                <p style="color: #374151; margin: 0; font-size: 14px;">
                  If the button doesn't work, you can copy and paste this link into your browser:<br>
                  <span style="word-break: break-all; color: #2563eb;">${verificationUrl}</span>
                </p>
              </div>
              
              <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
                This verification link will expire in 24 hours. After verification, you'll receive our latest business insights, industry trends, and exclusive event invitations.
              </p>
              
              <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
              
              <div style="text-align: center;">
                <p style="color: #2563eb; font-weight: bold; margin: 0; font-size: 18px;">Bella International</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 14px;">Leading Business Excellence Solutions</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 12px;">
                  If you didn't subscribe to this newsletter, you can safely ignore this email.<br>
                  To unsubscribe immediately, <a href="${unsubscribeUrl}" style="color: #64748b;">click here</a>.<br>
                  Request ID: ${requestId}
                </p>
              </div>
            </div>
          `,
        });

        log('INFO', 'Verification email sent successfully', { requestId });
        emailSent = true;
        await logEmailAttempt(supabase, sanitizedEmail, 'newsletter_verification', 'success');
        
      } catch (emailError: any) {
        log('ERROR', 'Failed to send verification email', { requestId, error: emailError.message });
        await logEmailAttempt(supabase, sanitizedEmail, 'newsletter_verification', 'failed', emailError.message);
      }
    } else {
      log('WARN', 'Resend not configured - skipping verification email', { requestId });
      await logEmailAttempt(supabase, sanitizedEmail, 'newsletter_verification', 'failed', 'Resend API key not configured');
    }

    const message = resend && emailSent
      ? 'Please check your email to verify your subscription.'
      : 'Subscription successful! Thank you for joining our newsletter.';

    const response = {
      success: true,
      message,
      requiresVerification: !!resend,
      emailSent,
      isNewSubscription,
      requestId,
      timestamp: new Date().toISOString()
    };

    log('INFO', 'Request completed successfully', { requestId, emailSent, isNewSubscription });

    return new Response(
      JSON.stringify(response),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error: any) {
    log('ERROR', 'Unhandled exception', { requestId, error: error.message, stack: error.stack });
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        requestId,
        timestamp: new Date().toISOString()
      }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);