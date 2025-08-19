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

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  form_type?: string;
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
    const contactData: ContactRequest = await req.json();

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log(`[CONTACT-EMAIL] Processing submission from: ${contactData.email}`);
    console.log(`[EMAIL-CONFIG] Resend API Key configured: ${!!resendApiKey}`);

    // Save contact submission to database
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
        status: 'new'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save contact submission' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Send confirmation email if Resend is configured
    if (resend) {
      try {
        console.log(`[EMAIL] Attempting to send confirmation email to: ${contactData.email}`);
        
        const emailResponse = await resend.emails.send({
          from: "Bella International <info@bellainter.com>",
          to: [contactData.email],
          subject: "Thank you for contacting Bella International",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2563eb; margin: 0; font-size: 28px;">Bella International</h1>
                <p style="color: #64748b; margin: 5px 0;">Leading Business Excellence Solutions</p>
              </div>
              
              <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0; font-size: 24px;">🙏 Thank You for Reaching Out!</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your message and will respond soon</p>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${contactData.name},</p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for contacting <strong>Bella International</strong>. We have received your message and appreciate you taking the time to reach out to us.</p>
              
              <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2563eb;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📋 Your Message Details</h3>
                <table style="width: 100%; color: #374151;">
                  <tr><td style="padding: 8px 0; vertical-align: top; width: 100px;"><strong>Name:</strong></td><td style="padding: 8px 0;">${contactData.name}</td></tr>
                  <tr><td style="padding: 8px 0; vertical-align: top;"><strong>Email:</strong></td><td style="padding: 8px 0;">${contactData.email}</td></tr>
                  ${contactData.company ? `<tr><td style="padding: 8px 0; vertical-align: top;"><strong>Company:</strong></td><td style="padding: 8px 0;">${contactData.company}</td></tr>` : ''}
                  ${contactData.phone ? `<tr><td style="padding: 8px 0; vertical-align: top;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${contactData.phone}</td></tr>` : ''}
                  ${contactData.subject ? `<tr><td style="padding: 8px 0; vertical-align: top;"><strong>Subject:</strong></td><td style="padding: 8px 0;">${contactData.subject}</td></tr>` : ''}
                </table>
                <div style="margin-top: 15px;">
                  <strong style="color: #374151;">Message:</strong>
                  <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin-top: 8px; border-left: 3px solid #3b82f6; color: #374151; line-height: 1.6;">
                    ${contactData.message}
                  </div>
                </div>
              </div>
              
              <div style="background-color: #eff6ff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">⏰ What happens next?</h3>
                <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Our team will review your inquiry within the next few hours</li>
                  <li>You'll receive a personalized response within 24-48 hours</li>
                  <li>For urgent matters, you can also call us directly</li>
                  <li>We'll provide detailed information about how we can help your business</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #374151; font-size: 16px; line-height: 1.6;">In the meantime, feel free to explore our services and learn more about how we can help your business excel.</p>
              </div>
              
              <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
              
              <div style="text-align: center;">
                <p style="color: #2563eb; font-weight: bold; margin: 0; font-size: 18px;">Bella International</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 14px;">Leading Business Excellence Solutions</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 12px;">
                  This is an automated confirmation. Our team will respond personally within 24-48 hours.<br>
                  This email was sent to ${contactData.email}
                </p>
              </div>
            </div>
          `,
        });

        console.log(`[EMAIL] Email sent successfully. Response:`, emailResponse);
        await logEmailAttempt(contactData.email, 'contact_form', 'success');
      } catch (emailError: any) {
        console.error(`[EMAIL] Email sending failed:`, emailError);
        console.error(`[EMAIL] Error details:`, {
          message: emailError.message,
          status: emailError.status,
          name: emailError.name
        });
        await logEmailAttempt(contactData.email, 'contact_form', 'failed', emailError.message);
        // Don't fail the submission if email fails
      }
    } else {
      console.log(`[EMAIL] Resend not configured - skipping email send`);
      await logEmailAttempt(contactData.email, 'contact_form', 'failed', 'Resend API key not configured');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24-48 hours.',
        submissionId: submission.id
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error: any) {
    console.error('Contact submission error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);