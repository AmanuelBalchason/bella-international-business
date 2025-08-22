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
                    <h2 style="font-family: 'Marcellus', serif; margin: 0; font-size: 24px;">📧 Newsletter Confirmation</h2>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">You're already part of our community!</p>
                  </div>
                  
                  <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for your continued interest in <strong>Bella International</strong>!</p>
                  
                  <p style="color: #374151; font-size: 16px; line-height: 1.6;">We're delighted to confirm that you're already subscribed to our newsletter. You'll continue to receive our latest updates, insights, and business excellence content.</p>
                  
                  <div style="background-color: #f0f4f2; padding: 25px; margin: 25px 0; border-left: 4px solid #456653;">
                    <h3 style="font-family: 'Marcellus', serif; color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📰 What to expect:</h3>
                    <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
                      <li>Weekly business insights and industry trends</li>
                      <li>Exclusive event invitations and early access</li>
                      <li>Success stories from across the Horn of Africa</li>
                      <li>Strategic partnership opportunities</li>
                    </ul>
                  </div>
                  
                  <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
                  
                  <div style="text-align: center;">
                    <p style="font-family: 'Marcellus', serif; color: #456653; font-weight: bold; margin: 0; font-size: 18px;">Bella International</p>
                    <p style="color: #64748b; margin: 5px 0; font-size: 14px;">Leading Business Excellence Solutions</p>
                    <p style="color: #64748b; margin: 5px 0; font-size: 12px;">
                      Request ID: ${requestId}<br>
                      This email was sent to ${sanitizedEmail}
                    </p>
                  </div>
                </div>
                </body>
                </html>
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
                <h2 style="font-family: 'Marcellus', serif; margin: 0; font-size: 24px;">✉️ Verify Your Subscription</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">One more step to join our community</p>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for subscribing to the <strong>Bella International newsletter</strong>!</p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Please click the button below to verify your email address and complete your subscription:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" 
                   style="background-color: #456653; color: white; padding: 15px 30px; 
                          text-decoration: none; display: inline-block; font-weight: bold;">
                  Verify My Email Address
                </a>
              </div>
              
              <div style="background-color: #f0f4f2; padding: 20px; margin: 25px 0; border-left: 4px solid #456653;">
                <p style="color: #374151; margin: 0; font-size: 14px;">
                  If the button doesn't work, you can copy and paste this link into your browser:<br>
                  <span style="word-break: break-all; color: #456653;">${verificationUrl}</span>
                </p>
              </div>
              
              <div style="background-color: #f9fafa; padding: 25px; margin: 30px 0;">
                <h3 style="font-family: 'Marcellus', serif; color: #456653; margin: 0 0 20px 0; font-size: 18px;">⏰ What happens next?</h3>
                
                <!-- Flow diagram -->
                <div style="position: relative; display: flex; justify-content: space-between; align-items: center; margin: 20px 0;">
                  <!-- Progress line -->
                  <div style="position: absolute; top: 20px; left: 50px; right: 50px; height: 2px; background-color: #e5e7eb; z-index: 1;"></div>
                  
                  <!-- Step 1: Sent -->
                  <div style="display: flex; flex-direction: column; align-items: center; z-index: 2;">
                    <div style="width: 40px; height: 40px; background-color: #456653; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                      <span style="color: white; font-size: 18px;">✉️</span>
                    </div>
                    <span style="background-color: #d1d5db; color: #374151; padding: 4px 8px; font-size: 11px; font-weight: bold; text-transform: uppercase;">sent</span>
                    <span style="font-size: 11px; color: #6b7280; margin-top: 4px;">Now</span>
                  </div>
                  
                  <!-- Step 2: Delivered -->
                  <div style="display: flex; flex-direction: column; align-items: center; z-index: 2;">
                    <div style="width: 40px; height: 40px; background-color: #456653; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                      <span style="color: white; font-size: 18px;">✓</span>
                    </div>
                    <span style="background-color: #bbf7d0; color: #15803d; padding: 4px 8px; font-size: 11px; font-weight: bold; text-transform: uppercase;">delivered</span>
                    <span style="font-size: 11px; color: #6b7280; margin-top: 4px;">2 mins</span>
                  </div>
                  
                  <!-- Step 3: Clicked -->
                  <div style="display: flex; flex-direction: column; align-items: center; z-index: 2;">
                    <div style="width: 40px; height: 40px; background-color: #f3f4f6; border: 2px solid #d1d5db; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                      <span style="color: #6b7280; font-size: 18px;">👆</span>
                    </div>
                    <span style="background-color: #f3f4f6; color: #6b7280; padding: 4px 8px; font-size: 11px; font-weight: bold; text-transform: uppercase;">verify</span>
                    <span style="font-size: 11px; color: #6b7280; margin-top: 4px;">Your action</span>
                  </div>
                </div>
                
                <div style="margin-top: 25px;">
                  <p style="color: #374151; margin: 0 0 10px 0; font-size: 14px;">Our team will process your verification instantly:</p>
                  <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6; font-size: 14px;">
                    <li>You'll receive a welcome message within minutes</li>
                    <li>Your subscription will be activated immediately</li>
                    <li>You'll start receiving our newsletter within 24 hours</li>
                    <li>For urgent matters, contact us at info@bellainter.com</li>
                  </ul>
                </div>
              </div>
              
              <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
                This verification link will expire in 24 hours. After verification, you'll receive our latest business insights, industry trends, and exclusive event invitations.
              </p>
              
              <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
              
              <div style="text-align: center;">
                <p style="font-family: 'Marcellus', serif; color: #456653; font-weight: bold; margin: 0; font-size: 18px;">Bella International</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 14px;">Leading Business Excellence Solutions</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 12px;">
                  If you didn't subscribe to this newsletter, you can safely ignore this email.<br>
                  To unsubscribe immediately, <a href="${unsubscribeUrl}" style="color: #64748b;">click here</a>.<br>
                  Request ID: ${requestId}
                </p>
              </div>
            </div>
            </body>
            </html>
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