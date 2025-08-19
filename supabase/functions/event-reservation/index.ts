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

interface ReservationRequest {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position?: string;
  phone?: string;
  industry?: string;
  message?: string;
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
    const reservationData: ReservationRequest = await req.json();

    // Validate required fields
    if (!reservationData.firstName || !reservationData.lastName || !reservationData.email || !reservationData.company) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(reservationData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log(`[EVENT-RESERVATION] Processing reservation for: ${reservationData.email}`);
    console.log(`[EMAIL-CONFIG] Resend API Key configured: ${!!resendApiKey}`);

    // Save reservation to database
    const { data: reservation, error: insertError } = await supabase
      .from('event_reservations')
      .insert({
        first_name: reservationData.firstName,
        last_name: reservationData.lastName,
        email: reservationData.email.toLowerCase(),
        company: reservationData.company,
        position: reservationData.position,
        phone: reservationData.phone,
        industry: reservationData.industry,
        message: reservationData.message,
        status: 'confirmed'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save reservation' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Send confirmation email if Resend is configured
    if (resend) {
      try {
        console.log(`[EMAIL] Attempting to send confirmation email to: ${reservationData.email}`);
        
        const emailResponse = await resend.emails.send({
          from: "Bella International <info@bellainter.com>",
          to: [reservationData.email],
          subject: "Your Business Excellence Summit 2025 Reservation Confirmed",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2563eb; margin: 0; font-size: 28px;">Bella International</h1>
                <p style="color: #64748b; margin: 5px 0;">Leading Business Excellence Solutions</p>
              </div>
              
              <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0; font-size: 24px;">🎉 Reservation Confirmed!</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Your spot at the Business Excellence Summit 2025 is secured</p>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${reservationData.firstName} ${reservationData.lastName},</p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for reserving your spot at the <strong>Business Excellence Summit 2025</strong>! We're excited to have you join us for this transformative event.</p>
              
              <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2563eb;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📅 Event Details</h3>
                <table style="width: 100%; color: #374151;">
                  <tr><td style="padding: 5px 0;"><strong>Event:</strong></td><td>Business Excellence Summit 2025</td></tr>
                  <tr><td style="padding: 5px 0;"><strong>Date:</strong></td><td>March 15-16, 2025</td></tr>
                  <tr><td style="padding: 5px 0;"><strong>Location:</strong></td><td>Addis Ababa, Ethiopia</td></tr>
                  <tr><td style="padding: 5px 0;"><strong>Time:</strong></td><td>9:00 AM - 6:00 PM</td></tr>
                </table>
              </div>
              
              <div style="background-color: #eff6ff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">👤 Your Registration Details</h3>
                <table style="width: 100%; color: #374151;">
                  <tr><td style="padding: 5px 0;"><strong>Name:</strong></td><td>${reservationData.firstName} ${reservationData.lastName}</td></tr>
                  <tr><td style="padding: 5px 0;"><strong>Company:</strong></td><td>${reservationData.company}</td></tr>
                  ${reservationData.position ? `<tr><td style="padding: 5px 0;"><strong>Position:</strong></td><td>${reservationData.position}</td></tr>` : ''}
                  ${reservationData.industry ? `<tr><td style="padding: 5px 0;"><strong>Industry:</strong></td><td>${reservationData.industry}</td></tr>` : ''}
                  <tr><td style="padding: 5px 0;"><strong>Email:</strong></td><td>${reservationData.email}</td></tr>
                  ${reservationData.phone ? `<tr><td style="padding: 5px 0;"><strong>Phone:</strong></td><td>${reservationData.phone}</td></tr>` : ''}
                </table>
              </div>
              
              <div style="background-color: #fefce8; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #eab308;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">✅ What's Next?</h3>
                <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>You'll receive a detailed agenda and venue information 1 week before the event</li>
                  <li>Please bring a valid ID for registration at the event</li>
                  <li>Business casual attire is recommended</li>
                  <li>Lunch and refreshments will be provided</li>
                  <li>Networking opportunities throughout both days</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #374151; font-size: 16px; line-height: 1.6;">We're excited to see you at the summit! If you have any questions, please don't hesitate to contact us.</p>
              </div>
              
              <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
              
              <div style="text-align: center;">
                <p style="color: #2563eb; font-weight: bold; margin: 0; font-size: 18px;">Bella International</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 14px;">Leading Business Excellence Solutions</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 12px;">
                  If you need to make changes to your reservation, please reply to this email.<br>
                  This email was sent to ${reservationData.email}
                </p>
              </div>
            </div>
          `,
        });

        console.log(`[EMAIL] Email sent successfully. Response:`, emailResponse);
        await logEmailAttempt(reservationData.email, 'event_reservation', 'success');
      } catch (emailError: any) {
        console.error(`[EMAIL] Email sending failed:`, emailError);
        console.error(`[EMAIL] Error details:`, {
          message: emailError.message,
          status: emailError.status,
          name: emailError.name
        });
        await logEmailAttempt(reservationData.email, 'event_reservation', 'failed', emailError.message);
        // Don't fail the reservation if email fails
      }
    } else {
      console.log(`[EMAIL] Resend not configured - skipping email send`);
      await logEmailAttempt(reservationData.email, 'event_reservation', 'failed', 'Resend API key not configured');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your reservation has been confirmed! We\'ll send you event details closer to the date.',
        reservationId: reservation.id
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error: any) {
    console.error('Event reservation error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);