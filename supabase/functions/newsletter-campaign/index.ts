import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterContent {
  subject: string;
  preheader: string;
  hero_title: string;
  hero_subtitle: string;
  featured_article?: {
    title: string;
    excerpt: string;
    url: string;
  };
  business_insight?: {
    title: string;
    content: string;
  };
  cta?: {
    title: string;
    subtitle: string;
    button_text: string;
    button_url: string;
  };
}

const createNewsletterTemplate = (content: NewsletterContent, unsubscribeUrl: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.subject}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            line-height: 1.6; 
            color: #1a1a1a; 
            background-color: #ffffff;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #ffffff;
        }
        .header { 
            background: #8B9A8E; 
            padding: 40px 32px; 
            text-align: center;
            position: relative;
            background-image: radial-gradient(circle, rgba(139, 154, 142, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .logo { 
            font-family: 'Marcellus', serif; 
            font-size: 32px; 
            font-weight: 400; 
            color: #ffffff; 
            text-decoration: none;
            margin-bottom: 8px;
            display: block;
        }
        .tagline { 
            color: rgba(255, 255, 255, 0.9); 
            font-size: 14px; 
            font-weight: 400;
        }
        .hero { 
            padding: 48px 32px; 
            text-align: center; 
            background: #ffffff;
        }
        .hero h1 { 
            font-family: 'Marcellus', serif; 
            font-size: 28px; 
            color: #1a1a1a; 
            margin-bottom: 16px;
            line-height: 1.3;
        }
        .hero p { 
            color: #6b7280; 
            font-size: 16px; 
            max-width: 480px; 
            margin: 0 auto;
        }
        .content { 
            padding: 0 32px;
        }
        .section { 
            margin-bottom: 48px; 
            padding-bottom: 32px; 
            border-bottom: 1px solid #f3f4f6;
        }
        .section:last-child { 
            border-bottom: none; 
            margin-bottom: 0;
        }
        .section h2 { 
            font-family: 'Marcellus', serif; 
            font-size: 24px; 
            color: #8B9A8E; 
            margin-bottom: 20px;
        }
        .article-card { 
            border: 1px solid #e5e7eb; 
            padding: 24px; 
            background: #fafafa;
        }
        .article-title { 
            font-family: 'Marcellus', serif; 
            font-size: 20px; 
            color: #1a1a1a; 
            margin-bottom: 12px;
            text-decoration: none;
        }
        .article-excerpt { 
            color: #6b7280; 
            font-size: 14px; 
            line-height: 1.6;
        }
        .insight-box { 
            background: #f8f9fa; 
            border-left: 4px solid #8B9A8E; 
            padding: 24px; 
            margin: 24px 0;
        }
        .insight-title { 
            font-family: 'Marcellus', serif; 
            font-size: 18px; 
            color: #8B9A8E; 
            margin-bottom: 12px;
        }
        .cta-section { 
            background: #8B9A8E; 
            padding: 40px 32px; 
            text-align: center;
            margin: 48px 0;
            position: relative;
            background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .cta-title { 
            font-family: 'Marcellus', serif; 
            font-size: 24px; 
            color: #ffffff; 
            margin-bottom: 12px;
        }
        .cta-subtitle { 
            color: rgba(255, 255, 255, 0.9); 
            margin-bottom: 24px;
        }
        .cta-button { 
            display: inline-block; 
            background: #ffffff; 
            color: #8B9A8E; 
            padding: 14px 32px; 
            text-decoration: none; 
            font-weight: 600; 
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .cta-button:hover { 
            background: #f8f9fa; 
        }
        .next-steps { 
            background: #f8f9fa; 
            padding: 32px; 
            margin: 32px 0;
        }
        .next-steps h3 { 
            font-family: 'Marcellus', serif; 
            font-size: 20px; 
            color: #8B9A8E; 
            margin-bottom: 20px;
        }
        .flow-diagram { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin: 24px 0; 
            position: relative;
            background-image: radial-gradient(circle, rgba(139, 154, 142, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            padding: 20px;
        }
        .flow-step { 
            text-align: center; 
            flex: 1; 
            position: relative;
        }
        .flow-icon { 
            width: 48px; 
            height: 48px; 
            background: #8B9A8E; 
            color: white; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            margin: 0 auto 12px; 
            font-size: 20px;
            position: relative;
            z-index: 2;
        }
        .flow-step:not(:last-child)::after { 
            content: ''; 
            position: absolute; 
            top: 24px; 
            right: -50%; 
            width: 100%; 
            height: 2px; 
            background: #e5e7eb; 
            z-index: 1;
        }
        .flow-label { 
            font-size: 12px; 
            color: #6b7280; 
            font-weight: 500;
        }
        .footer { 
            background: #f8f9fa; 
            padding: 32px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px;
        }
        .footer a { 
            color: #8B9A8E; 
            text-decoration: none;
        }
        .unsubscribe { 
            margin-top: 16px; 
            font-size: 12px;
        }
        .unsubscribe a { 
            color: #9ca3af;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="https://xprrwkjotipgqhbchbju.supabase.co" class="logo">BELLA INTERNATIONAL</a>
            <div class="tagline">Excellence in Business Solutions</div>
        </div>
        
        <div class="hero">
            <h1>${content.hero_title}</h1>
            <p>${content.hero_subtitle}</p>
        </div>
        
        <div class="content">
            ${content.featured_article ? `
            <div class="section">
                <h2>Featured Insight</h2>
                <div class="article-card">
                    <a href="${content.featured_article.url}" class="article-title">${content.featured_article.title}</a>
                    <p class="article-excerpt">${content.featured_article.excerpt}</p>
                </div>
            </div>
            ` : ''}
            
            ${content.business_insight ? `
            <div class="section">
                <h2>Business Excellence Tip</h2>
                <div class="insight-box">
                    <div class="insight-title">${content.business_insight.title}</div>
                    <p>${content.business_insight.content}</p>
                </div>
            </div>
            ` : ''}
            
            <div class="next-steps">
                <h3>📧 What happens next?</h3>
                <div class="flow-diagram">
                    <div class="flow-step">
                        <div class="flow-icon">📤</div>
                        <div class="flow-label">SENT</div>
                    </div>
                    <div class="flow-step">
                        <div class="flow-icon">✅</div>
                        <div class="flow-label">DELIVERED</div>
                    </div>
                    <div class="flow-step">
                        <div class="flow-icon">📖</div>
                        <div class="flow-label">READ</div>
                    </div>
                </div>
                <ul style="text-align: left; color: #6b7280; margin: 16px 0;">
                    <li>You'll receive our insights every Thursday</li>
                    <li>Each newsletter features business strategies and market updates</li>
                    <li>Exclusive content for growing your business in Ethiopia</li>
                    <li>Direct access to our expertise and consultations</li>
                </ul>
            </div>
        </div>
        
        ${content.cta ? `
        <div class="cta-section">
            <div class="cta-title">${content.cta.title}</div>
            <p class="cta-subtitle">${content.cta.subtitle}</p>
            <a href="${content.cta.button_url}" class="cta-button">${content.cta.button_text}</a>
        </div>
        ` : ''}
        
        <div class="footer">
            <p><strong>Bella International Business Excellence Corporation</strong></p>
            <p>Leading business solutions in Addis Ababa, Ethiopia</p>
            <p>+251 962 777777 | info@bellainternational.et</p>
            
            <div class="unsubscribe">
                <a href="${unsubscribeUrl}">Unsubscribe from this newsletter</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    // Verify admin authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error("Missing authorization header");
      return new Response(JSON.stringify({ error: "Unauthorized - Missing authorization" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      console.error("Invalid or expired token:", userError);
      return new Response(JSON.stringify({ error: "Unauthorized - Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Check if user is admin
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id, role')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    if (adminError || !adminUser) {
      console.error("User is not an admin:", adminError);
      return new Response(JSON.stringify({ error: "Forbidden - Admin access required" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Admin user ${user.email} (${adminUser.role}) authorized for newsletter campaign`);

    const { content }: { content: NewsletterContent } = await req.json();

    console.log("Starting newsletter campaign:", content.subject);

    // Get all verified subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscriptions')
      .select('email, verification_token')
      .eq('is_verified', true);

    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      throw new Error("Failed to fetch subscribers");
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ 
        message: "No verified subscribers found",
        sent_count: 0 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Found ${subscribers.length} verified subscribers`);

    let successCount = 0;
    let failureCount = 0;
    const results = [];

    // Send emails to all subscribers
    for (const subscriber of subscribers) {
      try {
        const unsubscribeUrl = `${supabaseUrl}/functions/v1/newsletter-unsubscribe?token=${subscriber.verification_token}`;
        const htmlContent = createNewsletterTemplate(content, unsubscribeUrl);

        const emailResponse = await resend.emails.send({
          from: "Bella International <newsletter@bellainternational.et>",
          to: [subscriber.email],
          subject: content.subject,
          html: htmlContent,
        });

        if (emailResponse.error) {
          console.error(`Failed to send to ${subscriber.email}:`, emailResponse.error);
          failureCount++;
          results.push({ email: subscriber.email, status: 'failed', error: emailResponse.error.message });
        } else {
          console.log(`Successfully sent to ${subscriber.email}:`, emailResponse.data?.id);
          successCount++;
          results.push({ email: subscriber.email, status: 'sent', id: emailResponse.data?.id });
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (emailError) {
        console.error(`Error sending to ${subscriber.email}:`, emailError);
        failureCount++;
        results.push({ email: subscriber.email, status: 'failed', error: emailError.message });
      }
    }

    console.log(`Newsletter campaign completed: ${successCount} sent, ${failureCount} failed`);

    return new Response(JSON.stringify({
      message: "Newsletter campaign completed",
      sent_count: successCount,
      failed_count: failureCount,
      total_subscribers: subscribers.length,
      results: results
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in newsletter campaign:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);