import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  form_type?: string;
  metadata?: any;
}

// Enhanced logging with timestamps and request tracking
const log = (level: 'INFO' | 'ERROR' | 'WARN', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [CONTACT-EMAIL] [${level}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
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
      function: 'contact-email',
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
    let contactData: ContactRequest;
    try {
      contactData = await req.json();
      log('INFO', 'Request body parsed', { requestId, hasData: !!contactData });
    } catch (parseError) {
      log('ERROR', 'Failed to parse request body', { requestId, error: parseError });
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body', requestId }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      log('WARN', 'Missing required fields', { 
        requestId, 
        hasName: !!contactData.name,
        hasEmail: !!contactData.email,
        hasMessage: !!contactData.message
      });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, message', requestId }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      log('WARN', 'Invalid email format', { requestId, email: contactData.email });
      return new Response(
        JSON.stringify({ error: 'Invalid email format', requestId }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    log('INFO', 'Contact data validated', { 
      requestId,
      email: contactData.email,
      name: contactData.name,
      formType: contactData.form_type
    });

    // Save to database
    log('INFO', 'Saving to database', { requestId });
    const { data: submission, error: insertError } = await supabase
      .from('contact_submissions')
      .insert({
        name: contactData.name,
        email: contactData.email.toLowerCase(),
        phone: contactData.phone,
        company: contactData.company,
        subject: contactData.subject,
        message: contactData.message,
        form_type: contactData.form_type || 'general',
        status: 'new',
        metadata: contactData.metadata || {}
      })
      .select()
      .single();

    if (insertError) {
      log('ERROR', 'Database insert failed', { requestId, error: insertError });
      return new Response(
        JSON.stringify({ error: 'Failed to save contact submission', requestId }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    log('INFO', 'Database save successful', { requestId, submissionId: submission.id });

    // Send confirmation email
    let emailSent = false;
    let emailError = null;

    if (resend) {
      try {
        log('INFO', 'Sending confirmation email', { requestId, to: contactData.email });
        
        const emailResponse = await resend.emails.send({
          from: "Bella International <info@bellainter.com>",
          to: [contactData.email],
          subject: "Thank you for contacting Bella International",
          html: `
            <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
              
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #456653; margin: 0; font-size: 28px; font-family: 'Marcellus', serif;">Bella International</h1>
                <p style="color: #64748b; margin: 5px 0; font-family: 'Inter', sans-serif;">Leading Business Excellence Solutions</p>
              </div>
              
              <div style="background: linear-gradient(135deg, #456653 0%, #3d5a47 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0; font-size: 24px; font-family: 'Marcellus', serif;">🙏 Thank You for Reaching Out!</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9; font-family: 'Inter', sans-serif;">We've received your message and will respond soon</p>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">Dear ${contactData.name},</p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">Thank you for contacting <strong>Bella International</strong>. We have received your message and appreciate you taking the time to reach out to us.</p>
              
              <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #456653;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-family: 'Marcellus', serif;">📋 Your Message Details</h3>
                <table style="width: 100%; color: #374151; font-family: 'Inter', sans-serif;">
                  <tr><td style="padding: 8px 0; vertical-align: top; width: 100px;"><strong>Name:</strong></td><td style="padding: 8px 0;">${contactData.name}</td></tr>
                  <tr><td style="padding: 8px 0; vertical-align: top;"><strong>Email:</strong></td><td style="padding: 8px 0;">${contactData.email}</td></tr>
                  ${contactData.company ? `<tr><td style="padding: 8px 0; vertical-align: top;"><strong>Company:</strong></td><td style="padding: 8px 0;">${contactData.company}</td></tr>` : ''}
                  ${contactData.phone ? `<tr><td style="padding: 8px 0; vertical-align: top;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${contactData.phone}</td></tr>` : ''}
                  ${contactData.subject ? `<tr><td style="padding: 8px 0; vertical-align: top;"><strong>Subject:</strong></td><td style="padding: 8px 0;">${contactData.subject}</td></tr>` : ''}
                </table>
                <div style="margin-top: 15px;">
                  <strong style="color: #374151; font-family: 'Inter', sans-serif;">Message:</strong>
                  <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin-top: 8px; border-left: 3px solid #456653; color: #374151; line-height: 1.6; font-family: 'Inter', sans-serif;">
                    ${contactData.message}
                  </div>
                </div>
              </div>
              
              <div style="background-color: #f0f7f4; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #456653;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-family: 'Marcellus', serif;">⏰ What happens next?</h3>
                <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8; font-family: 'Inter', sans-serif;">
                  <li>Our team will review your inquiry within the next few hours</li>
                  <li>You'll receive a personalized response within 24-48 hours</li>
                  <li>For urgent matters, you can also call us directly at +251 962 777777</li>
                  <li>We'll provide detailed information about how we can help your business</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #374151; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">Thank you for considering Bella International as your business excellence partner.</p>
              </div>
              
              <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
              
              <div style="text-align: center;">
                <p style="color: #456653; font-weight: bold; margin: 0; font-size: 18px; font-family: 'Marcellus', serif;">Bella International</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 14px; font-family: 'Inter', sans-serif;">Leading Business Excellence Solutions</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 12px; font-family: 'Inter', sans-serif;">
                  Request ID: ${requestId}<br>
                  This email was sent to ${contactData.email}
                </p>
              </div>
            </div>
          `,
        });

        log('INFO', 'Email sent successfully', { 
          requestId, 
          emailId: emailResponse.data?.id,
          to: contactData.email
        });
        
        emailSent = true;
        await logEmailAttempt(supabase, contactData.email, 'contact_form', 'success');
        
      } catch (err: any) {
        log('ERROR', 'Email sending failed', { requestId, error: err.message, stack: err.stack });
        emailError = err.message;
        await logEmailAttempt(supabase, contactData.email, 'contact_form', 'failed', err.message);
      }
    } else {
      log('WARN', 'Resend not configured - skipping email', { requestId });
      await logEmailAttempt(supabase, contactData.email, 'contact_form', 'failed', 'Resend API key not configured');
    }

    // Return success response
    const response = {
      success: true,
      message: emailSent 
        ? "Thank you for your message! We've sent a confirmation email and will get back to you within 24-48 hours."
        : "Thank you for your message! We'll get back to you within 24-48 hours.",
      submissionId: submission.id,
      emailSent,
      requestId,
      timestamp: new Date().toISOString()
    };

    log('INFO', 'Request completed successfully', { requestId, emailSent });

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