import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

// Enhanced logging with timestamps and request tracking
const log = (level: 'INFO' | 'ERROR' | 'WARN', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [EVENT-RESERVATION] [${level}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
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
      function: 'event-reservation',
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
    let reservationData: ReservationRequest;
    try {
      reservationData = await req.json();
      log('INFO', 'Request body parsed', { requestId, hasData: !!reservationData });
    } catch (parseError) {
      log('ERROR', 'Failed to parse request body', { requestId, error: parseError });
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body', requestId }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate required fields
    if (!reservationData.firstName || !reservationData.lastName || !reservationData.email || !reservationData.company) {
      log('WARN', 'Missing required fields', { 
        requestId, 
        hasFirstName: !!reservationData.firstName,
        hasLastName: !!reservationData.lastName,
        hasEmail: !!reservationData.email,
        hasCompany: !!reservationData.company
      });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: firstName, lastName, email, company', requestId }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(reservationData.email)) {
      log('WARN', 'Invalid email format', { requestId, email: reservationData.email });
      return new Response(
        JSON.stringify({ error: 'Invalid email format', requestId }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    log('INFO', 'Reservation data validated', { 
      requestId,
      email: reservationData.email,
      name: `${reservationData.firstName} ${reservationData.lastName}`,
      company: reservationData.company
    });

    // Save to database
    log('INFO', 'Saving reservation to database', { requestId });
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
        event_name: 'Business Excellence Summit 2025',
        status: 'confirmed'
      })
      .select()
      .single();

    if (insertError) {
      log('ERROR', 'Database insert failed', { requestId, error: insertError });
      return new Response(
        JSON.stringify({ error: 'Failed to save reservation', requestId }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    log('INFO', 'Database save successful', { requestId, reservationId: reservation.id });

    // Send confirmation email
    let emailSent = false;
    let emailError = null;

    if (resend) {
      try {
        log('INFO', 'Sending confirmation email', { requestId, to: reservationData.email });
        
        const emailResponse = await resend.emails.send({
          from: "Bella International <info@bellainter.com>",
          to: [reservationData.email],
          subject: "Your Business Excellence Summit 2025 Reservation Confirmed",
          html: `
            <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
              
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #456653; margin: 0; font-size: 28px; font-family: 'Marcellus', serif;">Bella International</h1>
                <p style="color: #64748b; margin: 5px 0; font-family: 'Inter', sans-serif;">Leading Business Excellence Solutions</p>
              </div>
              
              <div style="background: linear-gradient(135deg, #456653 0%, #3d5a47 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0; font-size: 24px; font-family: 'Marcellus', serif;">🎉 Reservation Confirmed!</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9; font-family: 'Inter', sans-serif;">Your spot at the Business Excellence Summit 2025 is secured</p>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">Dear ${reservationData.firstName} ${reservationData.lastName},</p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">Thank you for reserving your spot at the <strong>Business Excellence Summit 2025</strong>! We're excited to have you join us for this transformative event focused on business excellence across the Horn of Africa.</p>
              
              <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #456653;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-family: 'Marcellus', serif;">📅 Event Details</h3>
                <table style="width: 100%; color: #374151; font-family: 'Inter', sans-serif;">
                  <tr><td style="padding: 8px 0; width: 120px;"><strong>Event:</strong></td><td style="padding: 8px 0;">Business Excellence Summit 2025</td></tr>
                  <tr><td style="padding: 8px 0;"><strong>Date:</strong></td><td style="padding: 8px 0;">March 15-16, 2025</td></tr>
                  <tr><td style="padding: 8px 0;"><strong>Location:</strong></td><td style="padding: 8px 0;">Addis Ababa, Ethiopia</td></tr>
                  <tr><td style="padding: 8px 0;"><strong>Time:</strong></td><td style="padding: 8px 0;">9:00 AM - 6:00 PM both days</td></tr>
                  <tr><td style="padding: 8px 0;"><strong>Venue:</strong></td><td style="padding: 8px 0;">Detailed venue information will be sent 1 week before</td></tr>
                </table>
              </div>
              
              <div style="background-color: #f0f7f4; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #456653;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-family: 'Marcellus', serif;">👤 Your Registration Details</h3>
                <table style="width: 100%; color: #374151; font-family: 'Inter', sans-serif;">
                  <tr><td style="padding: 5px 0; width: 100px;"><strong>Name:</strong></td><td style="padding: 5px 0;">${reservationData.firstName} ${reservationData.lastName}</td></tr>
                  <tr><td style="padding: 5px 0;"><strong>Company:</strong></td><td style="padding: 5px 0;">${reservationData.company}</td></tr>
                  ${reservationData.position ? `<tr><td style="padding: 5px 0;"><strong>Position:</strong></td><td style="padding: 5px 0;">${reservationData.position}</td></tr>` : ''}
                  ${reservationData.industry ? `<tr><td style="padding: 5px 0;"><strong>Industry:</strong></td><td style="padding: 5px 0;">${reservationData.industry}</td></tr>` : ''}
                  <tr><td style="padding: 5px 0;"><strong>Email:</strong></td><td style="padding: 5px 0;">${reservationData.email}</td></tr>
                  ${reservationData.phone ? `<tr><td style="padding: 5px 0;"><strong>Phone:</strong></td><td style="padding: 5px 0;">${reservationData.phone}</td></tr>` : ''}
                </table>
              </div>
              
              <div style="background-color: #fdfaf0; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #456653;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-family: 'Marcellus', serif;">✅ What's Next?</h3>
                <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8; font-family: 'Inter', sans-serif;">
                  <li>You'll receive a detailed agenda and venue information 1 week before the event</li>
                  <li>Please bring a valid ID for registration at the event</li>
                  <li>Business casual attire is recommended</li>
                  <li>All meals and refreshments will be provided</li>
                  <li>Excellent networking opportunities throughout both days</li>
                  <li>Digital materials and presentations will be shared post-event</li>
                </ul>
              </div>
              
              <div style="background-color: #f0f7f4; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #456653;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-family: 'Marcellus', serif;">🎯 What to Expect</h3>
                <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8; font-family: 'Inter', sans-serif;">
                  <li>Keynote presentations from industry leaders</li>
                  <li>Interactive workshops on business excellence strategies</li>
                  <li>Panel discussions on Horn of Africa market opportunities</li>
                  <li>One-on-one networking sessions with potential partners</li>
                  <li>Case studies of successful business transformations</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #374151; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">We're excited to see you at the summit! If you have any questions or need to make changes to your reservation, please don't hesitate to contact us.</p>
              </div>
              
              <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
              
              <div style="text-align: center;">
                <p style="color: #456653; font-weight: bold; margin: 0; font-size: 18px; font-family: 'Marcellus', serif;">Bella International</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 14px; font-family: 'Inter', sans-serif;">Leading Business Excellence Solutions</p>
                <p style="color: #64748b; margin: 5px 0; font-size: 14px; font-family: 'Inter', sans-serif;">
                  📧 info@bellainter.com | 📞 +251 962 777777
                </p>
                <p style="color: #64748b; margin: 5px 0; font-size: 12px; font-family: 'Inter', sans-serif;">
                  If you need to make changes to your reservation, please reply to this email.<br>
                  Reservation ID: ${reservation.id}<br>
                  Request ID: ${requestId}<br>
                  This email was sent to ${reservationData.email}
                </p>
              </div>
            </div>
          `,
        });

        log('INFO', 'Email sent successfully', { 
          requestId, 
          emailId: emailResponse.data?.id,
          to: reservationData.email
        });
        
        emailSent = true;
        await logEmailAttempt(supabase, reservationData.email, 'event_reservation', 'success');
        
      } catch (err: any) {
        log('ERROR', 'Email sending failed', { requestId, error: err.message, stack: err.stack });
        emailError = err.message;
        await logEmailAttempt(supabase, reservationData.email, 'event_reservation', 'failed', err.message);
      }
    } else {
      log('WARN', 'Resend not configured - skipping email', { requestId });
      await logEmailAttempt(supabase, reservationData.email, 'event_reservation', 'failed', 'Resend API key not configured');
    }

    // Return success response
    const response = {
      success: true,
      message: emailSent 
        ? "Your reservation has been confirmed! We've sent a confirmation email with event details."
        : "Your reservation has been confirmed! We'll send you event details closer to the date.",
      reservationId: reservation.id,
      emailSent,
      requestId,
      timestamp: new Date().toISOString()
    };

    log('INFO', 'Request completed successfully', { requestId, emailSent, reservationId: reservation.id });

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