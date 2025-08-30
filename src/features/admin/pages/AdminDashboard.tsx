import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  Building2, 
  MessageSquareQuote, 
  HelpCircle, 
  Mail,
  Eye,
  Clock,
  Plus,
  Upload,
  Settings,
  TrendingUp
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch dashboard stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const [
        articlesResponse,
        sectorsResponse,
        leadershipResponse,
        testimonialsResponse,
        faqsResponse,
        newsletterResponse,
        contactResponse
      ] = await Promise.all([
        supabase.from('articles').select('id, status'),
        supabase.from('business_sectors').select('id, status'),
        supabase.from('leadership_profiles').select('id, status'),
        supabase.from('testimonials').select('id, status'),
        supabase.from('faqs').select('id, status'),
        supabase.from('newsletter_subscriptions').select('id, is_verified, is_active').eq('is_active', true),
        supabase.from('contact_submissions').select('id, status').eq('status', 'new')
      ]);

      return {
        articles: {
          total: articlesResponse.data?.length || 0,
          published: articlesResponse.data?.filter(a => a.status === 'published').length || 0,
          draft: articlesResponse.data?.filter(a => a.status === 'draft').length || 0
        },
        sectors: {
          total: sectorsResponse.data?.length || 0,
          published: sectorsResponse.data?.filter(s => s.status === 'published').length || 0
        },
        leadership: {
          total: leadershipResponse.data?.length || 0,
          published: leadershipResponse.data?.filter(l => l.status === 'published').length || 0
        },
        testimonials: {
          total: testimonialsResponse.data?.length || 0,
          published: testimonialsResponse.data?.filter(t => t.status === 'published').length || 0
        },
        faqs: {
          total: faqsResponse.data?.length || 0,
          published: faqsResponse.data?.filter(f => f.status === 'published').length || 0
        },
        newsletter: {
          total: newsletterResponse.data?.length || 0,
          verified: newsletterResponse.data?.filter(sub => sub.is_verified).length || 0
        },
        contact: {
          new: contactResponse.data?.length || 0
        }
      };
    }
  });

  const { data: recentArticles } = useQuery({
    queryKey: ['recent-articles'],
    queryFn: async () => {
      const { data } = await supabase
        .from('articles')
        .select('id, title, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    }
  });

  const quickActions = [
    {
      title: 'Create New Article',
      description: 'Start writing a new blog post',
      icon: Plus,
      action: () => navigate('/admin/articles/new'),
      variant: 'default' as const
    },
    {
      title: 'View Contact Forms',
      description: `${stats?.contact.new || 0} new submissions`,
      icon: Mail,
      action: () => navigate('/admin/contact-submissions'),
      variant: stats?.contact.new ? 'destructive' as const : 'outline' as const
    },
    {
      title: 'Manage Newsletter',
      description: 'Send campaigns and view subscribers',
      icon: Mail,
      action: () => navigate('/admin/newsletter'),
      variant: 'outline' as const
    },
    {
      title: 'Upload Media',
      description: 'Add images and documents',
      icon: Upload,
      action: () => navigate('/admin/media'),
      variant: 'outline' as const
    }
  ];

  const statCards = [
    {
      title: 'Articles',
      value: stats?.articles.published || 0,
      total: stats?.articles.total || 0,
      icon: FileText,
      description: `${stats?.articles.published || 0} published, ${stats?.articles.draft || 0} drafts`,
      link: '/admin/articles',
      color: 'text-blue-600'
    },
    {
      title: 'Business Sectors',
      value: stats?.sectors.published || 0,
      total: stats?.sectors.total || 0,
      icon: Building2,
      description: 'Active sector pages',
      link: '/admin/sectors',
      color: 'text-green-600'
    },
    {
      title: 'Leadership',
      value: stats?.leadership.published || 0,
      total: stats?.leadership.total || 0,
      icon: Users,
      description: 'Team members featured',
      link: '/admin/leadership',
      color: 'text-purple-600'
    },
    {
      title: 'Newsletter',
      value: stats?.newsletter.verified || 0,
      total: stats?.newsletter.total || 0,
      icon: Mail,
      description: `${stats?.newsletter.verified || 0} verified subscribers`,
      link: '/admin/newsletter',
      color: 'text-orange-600'
    },
    {
      title: 'Testimonials',
      value: stats?.testimonials.published || 0,
      total: stats?.testimonials.total || 0,
      icon: MessageSquareQuote,
      description: 'Client testimonials',
      link: '/admin/testimonials',
      color: 'text-pink-600'
    },
    {
      title: 'FAQs',
      value: stats?.faqs.published || 0,
      total: stats?.faqs.total || 0,
      icon: HelpCircle,
      description: 'Published FAQ items',
      link: '/admin/faqs',
      color: 'text-indigo-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-100';
      case 'draft':
        return 'text-yellow-600 bg-yellow-100';
      case 'in_review':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-muted rounded w-48 mb-2"></div>
            <div className="h-4 bg-muted rounded w-32"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.email?.split('@')[0]}! Here's what's happening with your site.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} to={stat.link}>
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  {stat.total > stat.value && (
                    <div className="text-sm text-muted-foreground">/ {stat.total}</div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">Live content</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                className="w-full justify-start h-auto p-4"
                onClick={action.action}
              >
                <action.icon className="h-5 w-5 mr-3" />
                <div className="text-left flex-1">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm opacity-80">{action.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Recent Articles
            </CardTitle>
            <CardDescription>
              Latest articles in the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentArticles?.length ? (
              <>
                {recentArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{article.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(article.status)}`}>
                        {article.status}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/articles/${article.id}/edit`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={() => navigate('/admin/articles')}
                >
                  View All Articles
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No articles yet</p>
                <Button onClick={() => navigate('/admin/articles/new')}>
                  Create your first article
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;