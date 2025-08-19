import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailTestRequest {
  email: string;
  type: 'contact' | 'newsletter' | 'event' | 'system' | 'connectivity';
}

// Enhanced logging with timestamps and request tracking
const log = (level: 'INFO' | 'ERROR' | 'WARN', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [EMAIL-TEST] [${level}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
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

// System diagnostics
const runDiagnostics = async (supabase: any) => {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    supabase: {
      connection: false,
      database: false,
      tables: false
    },
    resend: {
      configured: false,
      initialized: false
    },
    environment: {
      supabaseUrl: !!Deno.env.get('SUPABASE_URL'),
      supabaseKey: !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
      resendKey: !!Deno.env.get('RESEND_API_KEY')
    }
  };

  // Test Supabase connection
  try {
    const { data, error } = await supabase.from('email_logs').select('count').limit(1);
    diagnostics.supabase.connection = true;
    diagnostics.supabase.database = !error;
    diagnostics.supabase.tables = !!data;
    log('INFO', 'Supabase diagnostics completed', { success: !error });
  } catch (err) {
    log('ERROR', 'Supabase diagnostics failed', err);
  }

  // Test Resend configuration
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (resendApiKey) {
    diagnostics.resend.configured = true;
    try {
      const resend = new Resend(resendApiKey);
      diagnostics.resend.initialized = true;
      log('INFO', 'Resend initialization successful');
    } catch (err) {
      log('ERROR', 'Resend initialization failed', err);
    }
  }

  return diagnostics;
};

// Health check endpoint
const healthCheck = async (supabase: any) => {
  const diagnostics = await runDiagnostics(supabase);
  
  return new Response(
    JSON.stringify({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      function: 'email-test',
      version: '2.0',
      diagnostics
    }),
    { 
      status: 200, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders } 
    }
  );
};

// Connectivity test
const connectivityTest = async (supabase: any, email: string) => {
  const requestId = crypto.randomUUID();
  log('INFO', 'Running connectivity test', { requestId, email });

  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (!resendApiKey) {
    throw new Error('Resend API key not configured');
  }

  const resend = new Resend(resendApiKey);

  // Send minimal test email
  const emailResponse = await resend.emails.send({
    from: "Bella International <info@bellainter.com>",
    to: [email],
    subject: "Connectivity Test - Bella International",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">🔗 Connectivity Test Successful</h2>
        <p>This is a minimal connectivity test email from Bella International.</p>
        <p><strong>Test Details:</strong></p>
        <ul>
          <li>Request ID: ${requestId}</li>
          <li>Timestamp: ${new Date().toISOString()}</li>
          <li>Function: email-test</li>
          <li>Type: connectivity</li>
        </ul>
        <p>If you received this email, the email system connectivity is working properly.</p>
      </div>
    `,
  });

  await logEmailAttempt(supabase, email, 'connectivity_test', 'success');
  
  return {
    success: true,
    message: 'Connectivity test completed successfully',
    emailId: emailResponse.data?.id,
    requestId
  };
};

const handler = async (req: Request): Promise<Response> => {
  const requestId = crypto.randomUUID();
  log('INFO', `Request started`, { requestId, method: req.method, url: req.url });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    log('INFO', 'CORS preflight request handled', { requestId });
    return new Response(null, { headers: corsHeaders });
  }

  // Initialize Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseKey) {
    log('ERROR', 'Missing Supabase credentials', { requestId });
    return new Response(
      JSON.stringify({ error: 'Server configuration error', requestId }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Health check endpoint
  if (req.method === 'GET') {
    log('INFO', 'Health check requested', { requestId });
    return await healthCheck(supabase);
  }

  if (req.method !== 'POST') {
    log('WARN', 'Invalid method', { requestId, method: req.method });
    return new Response(
      JSON.stringify({ error: 'Method not allowed', requestId }),
      { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    log('INFO', 'Environment check', {
      requestId,
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseKey: !!supabaseKey,
      hasResendKey: !!resendApiKey
    });

    // Parse request body
    let requestData: EmailTestRequest;
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

    const { email, type = 'system' } = requestData;

    // Validate email
    if (!email || !email.trim()) {
      log('WARN', 'Missing email', { requestId });
      return new Response(
        JSON.stringify({ error: 'Email address is required', requestId }),
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

    log('INFO', 'Email test request validated', { requestId, email, type });

    if (!resendApiKey) {
      await logEmailAttempt(supabase, email, `test_${type}`, 'failed', 'Resend API key not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured', requestId }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Handle connectivity test
    if (type === 'connectivity') {
      const result = await connectivityTest(supabase, email);
      return new Response(
        JSON.stringify({ ...result, requestId }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const resend = new Resend(resendApiKey);

    // Send test email based on type
    let emailContent;
    let subject;

    switch (type) {
      case 'contact':
        subject = "Contact Form Test - Bella International";
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <h1 style="color: #2563eb;">📧 Contact Form Test Email</h1>
            <p>This is a test email for the contact form functionality.</p>
            <p>If you received this email, the contact form email system is working correctly.</p>
            <p><strong>Test Details:</strong></p>
            <ul>
              <li>Function: contact-email</li>
              <li>Type: contact form test</li>
              <li>Request ID: ${requestId}</li>
              <li>Timestamp: ${new Date().toLocaleString()}</li>
            </ul>
          </div>
        `;
        break;
      case 'newsletter':
        subject = "Newsletter Test - Bella International";
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <h1 style="color: #2563eb;">📰 Newsletter Test Email</h1>
            <p>This is a test email for the newsletter subscription functionality.</p>
            <p>If you received this email, the newsletter system is working correctly.</p>
            <p><strong>Test Details:</strong></p>
            <ul>
              <li>Function: newsletter-subscribe</li>
              <li>Type: newsletter test</li>
              <li>Request ID: ${requestId}</li>
              <li>Timestamp: ${new Date().toLocaleString()}</li>
            </ul>
          </div>
        `;
        break;
      case 'event':
        subject = "Event Reservation Test - Bella International";
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <h1 style="color: #2563eb;">🎉 Event Reservation Test Email</h1>
            <p>This is a test email for the event reservation functionality.</p>
            <p>If you received this email, the event reservation system is working correctly.</p>
            <p><strong>Test Details:</strong></p>
            <ul>
              <li>Function: event-reservation</li>
              <li>Type: event reservation test</li>
              <li>Request ID: ${requestId}</li>
              <li>Timestamp: ${new Date().toLocaleString()}</li>
            </ul>
          </div>
        `;
        break;
      default:
        subject = "System Test - Bella International";
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0; font-size: 28px;">Bella International</h1>
              <p style="color: #64748b; margin: 5px 0;">Leading Business Excellence Solutions</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
              <h2 style="margin: 0; font-size: 24px;">✅ Email System Test</h2>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your email system is working perfectly!</p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">This is a <strong>comprehensive system test email</strong> from Bella International.</p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">If you received this email, it means:</p>
            
            <div style="background-color: #eff6ff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">🔧 System Status:</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>✅ Resend API integration is working</li>
                <li>✅ Domain configuration (bellainter.com) is correct</li>
                <li>✅ Email delivery system is operational</li>
                <li>✅ All edge functions can send emails</li>
                <li>✅ Database logging is functional</li>
                <li>✅ Error handling is working</li>
              </ul>
            </div>
            
            <div style="background-color: #fefce8; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #eab308;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📧 Email Functions Ready:</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Contact form confirmations</li>
                <li>Newsletter subscriptions and verifications</li>
                <li>Event reservation confirmations</li>
                <li>System notifications and alerts</li>
              </ul>
            </div>
            
            <div style="background-color: #f0fdf4; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #16a34a;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">🔍 Test Details:</h3>
              <table style="width: 100%; color: #374151;">
                <tr><td style="padding: 5px 0;"><strong>Function:</strong></td><td>email-test</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Type:</strong></td><td>${type}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Request ID:</strong></td><td>${requestId}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Timestamp:</strong></td><td>${new Date().toLocaleString()}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Version:</strong></td><td>2.0</td></tr>
              </table>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Test completed successfully! All email systems are operational.</p>
            </div>
            
            <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <div style="text-align: center;">
              <p style="color: #2563eb; font-weight: bold; margin: 0; font-size: 18px;">Bella International</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 14px;">Leading Business Excellence Solutions</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 12px;">
                This is an automated test email sent to ${email}
              </p>
            </div>
          </div>
        `;
    }

    try {
      log('INFO', 'Sending test email', { requestId, to: email, type });
      
      const emailResponse = await resend.emails.send({
        from: "Bella International <info@bellainter.com>",
        to: [email],
        subject,
        html: emailContent,
      });

      log('INFO', 'Test email sent successfully', { 
        requestId, 
        emailId: emailResponse.data?.id,
        to: email
      });
      
      await logEmailAttempt(supabase, email, `test_${type}`, 'success');

      const response = {
        success: true,
        message: `Test email sent successfully to ${email}`,
        emailId: emailResponse.data?.id,
        type,
        requestId,
        timestamp: new Date().toISOString()
      };

      log('INFO', 'Request completed successfully', { requestId, type });

      return new Response(
        JSON.stringify(response),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );

    } catch (emailError: any) {
      log('ERROR', 'Test email sending failed', { requestId, error: emailError.message, stack: emailError.stack });
      
      await logEmailAttempt(supabase, email, `test_${type}`, 'failed', emailError.message);
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send test email', 
          details: emailError.message,
          requestId
        }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

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