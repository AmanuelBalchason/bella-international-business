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

    // Escape all user-provided values before placing them in HTML
    const esc = (v?: string) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
    contactData = {
      ...contactData,
      name: esc(contactData.name).slice(0, 100),
      company: contactData.company ? esc(contactData.company).slice(0, 150) : undefined,
      phone: contactData.phone ? esc(contactData.phone).slice(0, 40) : undefined,
      subject: contactData.subject ? esc(contactData.subject).slice(0, 200) : undefined,
      message: esc(contactData.message).slice(0, 2000).replace(/\n/g, '<br>'),
    };
    const rawEmail = submission.email as string;

    // Notify the team inbox
    const isHealthcare = (contactData.form_type || '').includes('healthcare');
    const brand = isHealthcare ? 'Bella Healthcare' : 'Bella International';
    const teamInbox = isHealthcare ? 'info@bella-healthcare.com' : 'info@bellainter.com';
    const fromAddress = isHealthcare
      ? 'Bella Healthcare <info@bella-healthcare.com>'
      : 'Bella International <info@bellainter.com>';
    if (resend) {
      const teamHtml = `<!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600&display=swap">
      </head>
      <body style="margin:0;padding:0;background-color:#f5f5f5;color:#1a1a1a;font-family:Inter,Arial,sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background-color:#f5f5f5;"><tr><td align="center" style="padding:32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;max-width:600px;background-color:#ffffff;border:1px solid #ebebeb;">
            <tr><td style="padding:32px 32px 28px;border-top:4px solid #3d4d47;">
              <p style="margin:0 0 10px;font-family:Marcellus,Georgia,serif;font-size:26px;line-height:1.3;color:#3d4d47;">${brand}</p>
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#545454;">NEW WEBSITE ENQUIRY</p>
            </td></tr>
            <tr><td style="background-color:#3d4d47;padding:28px 32px;color:#ffffff;">
              <h1 style="margin:0 0 8px;font-family:Marcellus,Georgia,serif;font-size:25px;font-weight:400;line-height:1.4;color:#ffffff;">New enquiry from the website</h1>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#ffffff;">A visitor has submitted the contact form on ${brand === 'Bella Healthcare' ? 'bella-healthcare.com' : 'bellainter.com'}.</p>
            </td></tr>
            <tr><td style="padding:30px 32px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background-color:#f5f5f5;border-left:3px solid #3d4d47;">
                <tr><td style="padding:22px;">
                  <h2 style="margin:0 0 12px;font-family:Marcellus,Georgia,serif;font-size:20px;font-weight:400;color:#1a1a1a;">Enquiry details</h2>
                  <p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>Name:</strong> ${contactData.name}</p>
                  <p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>Email:</strong> ${esc(rawEmail)}</p>
                  ${contactData.company ? `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>Company:</strong> ${contactData.company}</p>` : ''}
                  ${contactData.phone ? `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
                  ${contactData.subject ? `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>Subject:</strong> ${contactData.subject}</p>` : ''}
                  <p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>Form:</strong> ${esc(contactData.form_type || 'general')}</p>
                  ${submission.message && submission.message !== '(No message provided)' ? `<p style="margin:16px 0 0;font-size:14px;line-height:1.7;overflow-wrap:anywhere;"><strong>Message:</strong><br>${contactData.message}</p>` : ''}
                </td></tr>
              </table>
              <p style="margin:22px 0 0;font-size:13px;line-height:1.6;color:#545454;">Reply directly to this email to respond to the sender. Reference: ${submission.id}</p>
            </td></tr>
            <tr><td style="border-top:1px solid #ebebeb;padding:22px 32px 30px;">
              <p style="margin:0 0 6px;font-family:Marcellus,Georgia,serif;font-size:18px;color:#3d4d47;">${brand}</p>
              <p style="margin:0;font-size:13px;line-height:1.6;color:#545454;">This notification was sent automatically by the ${brand} website contact form.</p>
            </td></tr>
          </table>
        </td></tr></table>
      </body></html>`;

      try {
        const teamResponse = await resend.emails.send({
          from: fromAddress,
          to: [teamInbox],
          reply_to: rawEmail,
          subject: `New website enquiry: ${contactData.subject || contactData.name}`,
          html: teamHtml,
        });
        if (teamResponse.error) throw new Error(teamResponse.error.message);
        await logEmailAttempt(supabase, teamInbox, 'contact_notification', 'success');
      } catch (err: any) {
        log('ERROR', 'Team notification failed', { requestId, error: err.message });
        await logEmailAttempt(supabase, teamInbox, 'contact_notification', 'failed', err.message);
      }
    }

    // A submission carries the active page language. Treat any other value as English.
    const isChinese = contactData.metadata?.language === 'zh';
    const confirmationSubject = isChinese
      ? `感谢联系 ${brand}`
      : `Thank you for contacting ${brand}`;
    const confirmationHtml = `<!doctype html>
      <html lang="${isChinese ? 'zh-Hans' : 'en'}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600&display=swap">
      </head>
      <body style="margin:0;padding:0;background-color:#f5f5f5;color:#1a1a1a;font-family:Inter,Arial,sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background-color:#f5f5f5;"><tr><td align="center" style="padding:32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;max-width:600px;background-color:#ffffff;border:1px solid #ebebeb;">
            <tr><td style="padding:32px 32px 28px;border-top:4px solid #3d4d47;">
              <p style="margin:0 0 10px;font-family:Marcellus,Georgia,serif;font-size:26px;line-height:1.3;color:#3d4d47;">${brand}</p>
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#545454;">${isChinese ? '联系我们' : 'GET IN TOUCH'}</p>
            </td></tr>
            <tr><td style="background-color:#3d4d47;padding:28px 32px;color:#ffffff;">
              <h1 style="margin:0 0 8px;font-family:Marcellus,Georgia,serif;font-size:25px;font-weight:400;line-height:1.4;color:#ffffff;">${isChinese ? '感谢您的来信' : 'Thank you for reaching out'}</h1>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#ffffff;">${isChinese ? '我们已收到您的留言。' : 'We have received your message.'}</p>
            </td></tr>
            <tr><td style="padding:30px 32px 18px;">
              <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">${isChinese ? `${contactData.name}，您好：` : `Dear ${contactData.name},`}</p>
              <p style="margin:0;font-size:15px;line-height:1.7;">${isChinese ? `感谢您联系 ${brand}。我们的团队会查看您的咨询并尽快回复。` : `Thank you for contacting ${brand}. Our team will review your enquiry and get back to you as soon as possible.`}</p>
            </td></tr>
            <tr><td style="padding:10px 32px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background-color:#f5f5f5;border-left:3px solid #3d4d47;">
                <tr><td style="padding:22px;">
                  <h2 style="margin:0 0 12px;font-family:Marcellus,Georgia,serif;font-size:20px;font-weight:400;color:#1a1a1a;">${isChinese ? '您的咨询详情' : 'Your enquiry'}</h2>
                  <p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>${isChinese ? '姓名' : 'Name'}:</strong> ${contactData.name}</p>
                  <p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>${isChinese ? '邮箱' : 'Email'}:</strong> ${esc(rawEmail)}</p>
                  ${contactData.company ? `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>${isChinese ? '公司' : 'Company'}:</strong> ${contactData.company}</p>` : ''}
                  ${contactData.phone ? `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>${isChinese ? '电话' : 'Phone'}:</strong> ${contactData.phone}</p>` : ''}
                  ${contactData.subject ? `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong>${isChinese ? '咨询主题' : 'Subject'}:</strong> ${contactData.subject}</p>` : ''}
                  ${submission.message && submission.message !== '(No message provided)' ? `<p style="margin:16px 0 0;font-size:14px;line-height:1.7;overflow-wrap:anywhere;"><strong>${isChinese ? '留言' : 'Message'}:</strong><br>${contactData.message}</p>` : ''}
                </td></tr>
              </table>
            </td></tr>
            <tr><td style="border-top:1px solid #ebebeb;padding:22px 32px 30px;">
              <p style="margin:0 0 6px;font-family:Marcellus,Georgia,serif;font-size:18px;color:#3d4d47;">${brand}</p>
              <p style="margin:0;font-size:13px;line-height:1.6;color:#545454;">${isChinese ? '如需补充信息，欢迎直接回复此邮件。' : 'To add anything to your enquiry, simply reply to this email.'}</p>
            </td></tr>
          </table>
        </td></tr></table>
      </body></html>`;

    // Send confirmation email
    let emailSent = false;
    let emailError = null;

    if (resend) {
      try {
        log('INFO', 'Sending confirmation email', { requestId, to: contactData.email });
        
        const emailResponse = await resend.emails.send({
          from: fromAddress,
          to: [rawEmail],
          reply_to: teamInbox,
          subject: confirmationSubject,
          html: confirmationHtml,
        });

        if (emailResponse.error) throw new Error(emailResponse.error.message);
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