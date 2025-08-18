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

    console.log(`Processing contact submission from: ${contactData.email}`);

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
        await resend.emails.send({
          from: "Bella International <no-reply@bellainternational.com>",
          to: [contactData.email],
          subject: "Thank you for contacting Bella International",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #333; text-align: center;">Thank You for Reaching Out!</h1>
              
              <p>Dear ${contactData.name},</p>
              
              <p>Thank you for contacting <strong>Bella International</strong>. We have received your message and will get back to you within 24-48 hours.</p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Your Message Details</h3>
                <p><strong>Name:</strong> ${contactData.name}</p>
                <p><strong>Email:</strong> ${contactData.email}</p>
                ${contactData.company ? `<p><strong>Company:</strong> ${contactData.company}</p>` : ''}
                ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
                ${contactData.subject ? `<p><strong>Subject:</strong> ${contactData.subject}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p style="background-color: #fff; padding: 10px; border-left: 3px solid #007bff;">${contactData.message}</p>
              </div>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your inquiry</li>
                <li>You'll receive a personalized response within 24-48 hours</li>
                <li>For urgent matters, you can also call us directly</li>
              </ul>
              
              <p>In the meantime, feel free to explore our services and learn more about how we can help your business excel.</p>
              
              <hr style="margin: 30px 0;">
              
              <p style="font-size: 12px; color: #666; text-align: center;">
                <strong>Bella International</strong><br>
                Leading Business Excellence Solutions<br>
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </div>
          `,
        });

        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the submission if email fails
      }
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