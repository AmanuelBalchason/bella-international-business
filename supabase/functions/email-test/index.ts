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

// Enhanced logging
const logEmailAttempt = async (email: string, type: string, status: 'success' | 'failed', error?: string) => {
  try {
    await supabase.from('email_logs').insert({
      email,
      email_type: type,
      status,
      error_message: error,
      attempted_at: new Date().toISOString()
    });
  } catch (logError) {
    console.error('Failed to log email attempt:', logError);
  }
};

interface EmailTestRequest {
  testEmail: string;
  testType: 'contact' | 'newsletter' | 'event';
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
    const { testEmail, testType }: EmailTestRequest = await req.json();

    if (!testEmail) {
      return new Response(
        JSON.stringify({ error: 'Test email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmail)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log(`[EMAIL-TEST] Testing email delivery to: ${testEmail} (type: ${testType})`);
    console.log(`[EMAIL-CONFIG] Resend API Key configured: ${!!resendApiKey}`);

    if (!resend) {
      const error = 'Resend API key not configured';
      console.error(`[EMAIL-TEST] ${error}`);
      await logEmailAttempt(testEmail, `test_${testType}`, 'failed', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error,
          details: 'Please configure the RESEND_API_KEY secret in Supabase'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    try {
      let subject: string;
      let html: string;

      switch (testType) {
        case 'contact':
          subject = "🧪 Email Test - Contact Form Confirmation";
          html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 24px;">🧪 Email Test Successful!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Contact form email delivery is working</p>
              </div>
              <p>This is a test email to verify that contact form confirmations are being delivered properly.</p>
              <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #166534;"><strong>✅ Test Result: SUCCESS</strong></p>
                <p style="margin: 5px 0 0 0; color: #166534; font-size: 14px;">Your contact form email system is functioning correctly.</p>
              </div>
            </div>
          `;
          break;
        case 'newsletter':
          subject = "🧪 Email Test - Newsletter Verification";
          html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 24px;">🧪 Email Test Successful!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Newsletter email delivery is working</p>
              </div>
              <p>This is a test email to verify that newsletter verification emails are being delivered properly.</p>
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; color: #1e40af;"><strong>✅ Test Result: SUCCESS</strong></p>
                <p style="margin: 5px 0 0 0; color: #1e40af; font-size: 14px;">Your newsletter email system is functioning correctly.</p>
              </div>
            </div>
          `;
          break;
        case 'event':
          subject = "🧪 Email Test - Event Reservation Confirmation";
          html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 24px;">🧪 Email Test Successful!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Event reservation email delivery is working</p>
              </div>
              <p>This is a test email to verify that event reservation confirmations are being delivered properly.</p>
              <div style="background-color: #faf5ff; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                <p style="margin: 0; color: #6b21a8;"><strong>✅ Test Result: SUCCESS</strong></p>
                <p style="margin: 5px 0 0 0; color: #6b21a8; font-size: 14px;">Your event reservation email system is functioning correctly.</p>
              </div>
            </div>
          `;
          break;
        default:
          throw new Error('Invalid test type');
      }

      console.log(`[EMAIL-TEST] Sending test email...`);
      
      const emailResponse = await resend.emails.send({
        from: "Bella International <hello@bellainternational.app>",
        to: [testEmail],
        subject,
        html,
      });

      console.log(`[EMAIL-TEST] Test email sent successfully:`, emailResponse);
      await logEmailAttempt(testEmail, `test_${testType}`, 'success');

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Test email sent successfully to ${testEmail}`,
          emailId: emailResponse.data?.id,
          testType
        }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );

    } catch (emailError: any) {
      console.error(`[EMAIL-TEST] Failed to send test email:`, emailError);
      console.error(`[EMAIL-TEST] Error details:`, {
        message: emailError.message,
        status: emailError.status,
        name: emailError.name
      });
      
      await logEmailAttempt(testEmail, `test_${testType}`, 'failed', emailError.message);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to send test email',
          details: emailError.message,
          troubleshooting: {
            apiKeyConfigured: !!resendApiKey,
            fromDomain: 'hello@bellainternational.app',
            suggestions: [
              'Verify RESEND_API_KEY is set in Supabase secrets',
              'Ensure bellainternational.app domain is verified in Resend',
              'Check Resend dashboard for delivery logs',
              'Try with a different test email address'
            ]
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

  } catch (error: any) {
    console.error('[EMAIL-TEST] Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error',
        details: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);