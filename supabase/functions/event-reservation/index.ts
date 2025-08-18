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

    console.log(`Processing event reservation for: ${reservationData.email}`);

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
        await resend.emails.send({
          from: "Bella International <no-reply@bellainternational.com>",
          to: [reservationData.email],
          subject: "Your Business Excellence Summit 2025 Reservation Confirmed",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #333; text-align: center;">Reservation Confirmed!</h1>
              
              <p>Dear ${reservationData.firstName} ${reservationData.lastName},</p>
              
              <p>Thank you for reserving your spot at the <strong>Business Excellence Summit 2025</strong>!</p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Event Details</h3>
                <p><strong>Event:</strong> Business Excellence Summit 2025</p>
                <p><strong>Date:</strong> March 15-16, 2025</p>
                <p><strong>Location:</strong> Addis Ababa, Ethiopia</p>
                <p><strong>Time:</strong> 9:00 AM - 6:00 PM</p>
              </div>
              
              <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Your Registration Details</h3>
                <p><strong>Name:</strong> ${reservationData.firstName} ${reservationData.lastName}</p>
                <p><strong>Company:</strong> ${reservationData.company}</p>
                ${reservationData.position ? `<p><strong>Position:</strong> ${reservationData.position}</p>` : ''}
                ${reservationData.industry ? `<p><strong>Industry:</strong> ${reservationData.industry}</p>` : ''}
                <p><strong>Email:</strong> ${reservationData.email}</p>
                ${reservationData.phone ? `<p><strong>Phone:</strong> ${reservationData.phone}</p>` : ''}
              </div>
              
              <p><strong>What's Next?</strong></p>
              <ul>
                <li>You'll receive a detailed agenda and venue information 1 week before the event</li>
                <li>Please bring a valid ID for registration at the event</li>
                <li>Business casual attire is recommended</li>
                <li>Lunch and refreshments will be provided</li>
              </ul>
              
              <p>We're excited to see you at the summit! If you have any questions, please don't hesitate to contact us.</p>
              
              <hr style="margin: 30px 0;">
              
              <p style="font-size: 12px; color: #666; text-align: center;">
                <strong>Bella International</strong><br>
                Leading Business Excellence Solutions<br>
                If you need to make changes to your reservation, please reply to this email.
              </p>
            </div>
          `,
        });

        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the reservation if email fails
      }
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