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
  email: string;
  type: 'contact' | 'newsletter' | 'event' | 'system';
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
    const { email, type = 'system' }: EmailTestRequest = await req.json();

    // Validate required fields
    if (!email || !email.trim()) {
      return new Response(
        JSON.stringify({ error: 'Email address is required' }),
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

    console.log(`[EMAIL-TEST] Testing email delivery to: ${email}, type: ${type}`);
    console.log(`[EMAIL-CONFIG] Resend API Key configured: ${!!resendApiKey}`);

    if (!resend) {
      await logEmailAttempt(email, `test_${type}`, 'failed', 'Resend API key not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Send test email based on type
    let emailContent;
    let subject;

    switch (type) {
      case 'contact':
        subject = "Contact Form Test - Bella International";
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <h1 style="color: #2563eb;">Contact Form Test Email</h1>
            <p>This is a test email for the contact form functionality.</p>
            <p>If you received this email, the contact form email system is working correctly.</p>
          </div>
        `;
        break;
      case 'newsletter':
        subject = "Newsletter Test - Bella International";
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <h1 style="color: #2563eb;">Newsletter Test Email</h1>
            <p>This is a test email for the newsletter subscription functionality.</p>
            <p>If you received this email, the newsletter system is working correctly.</p>
          </div>
        `;
        break;
      case 'event':
        subject = "Event Reservation Test - Bella International";
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <h1 style="color: #2563eb;">Event Reservation Test Email</h1>
            <p>This is a test email for the event reservation functionality.</p>
            <p>If you received this email, the event reservation system is working correctly.</p>
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
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">This is a <strong>system test email</strong> from Bella International.</p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">If you received this email, it means:</p>
            
            <div style="background-color: #eff6ff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">🔧 System Status:</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>✅ Resend API integration is working</li>
                <li>✅ Domain configuration (bellainter.com) is correct</li>
                <li>✅ Email delivery system is operational</li>
                <li>✅ All edge functions can send emails</li>
              </ul>
            </div>
            
            <div style="background-color: #fefce8; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #eab308;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📧 Email Functions Ready:</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Contact form confirmations</li>
                <li>Newsletter subscriptions and verifications</li>
                <li>Event reservation confirmations</li>
                <li>System notifications</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Test completed successfully at ${new Date().toLocaleString()}</p>
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
      console.log(`[EMAIL] Attempting to send test email to: ${email}`);
      
      const emailResponse = await resend.emails.send({
        from: "Bella International <info@bellainter.com>",
        to: [email],
        subject,
        html: emailContent,
      });

      console.log(`[EMAIL] Test email sent successfully. Response:`, emailResponse);
      await logEmailAttempt(email, `test_${type}`, 'success');

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Test email sent successfully to ${email}`,
          emailId: emailResponse.data?.id
        }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );

    } catch (emailError: any) {
      console.error(`[EMAIL] Test email sending failed:`, emailError);
      console.error(`[EMAIL] Error details:`, {
        message: emailError.message,
        status: emailError.status,
        name: emailError.name
      });
      
      await logEmailAttempt(email, `test_${type}`, 'failed', emailError.message);
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send test email', 
          details: emailError.message 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

  } catch (error: any) {
    console.error('Email test error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);