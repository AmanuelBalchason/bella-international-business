import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Users, 
  Building2, 
  MessageSquareQuote, 
  HelpCircle, 
  Mail,
  Eye,
  Clock
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard: React.FC = () => {
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
        newsletterResponse
      ] = await Promise.all([
        supabase.from('articles').select('id, status').eq('status', 'published'),
        supabase.from('business_sectors').select('id, status').eq('status', 'published'),
        supabase.from('leadership_profiles').select('id, status').eq('status', 'published'),
        supabase.from('testimonials').select('id, status').eq('status', 'published'),
        supabase.from('faqs').select('id, status').eq('status', 'published'),
        supabase.from('newsletter_subscriptions').select('id, is_verified, is_active').eq('is_active', true)
      ]);

      return {
        articles: articlesResponse.data?.length || 0,
        sectors: sectorsResponse.data?.length || 0,
        leadership: leadershipResponse.data?.length || 0,
        testimonials: testimonialsResponse.data?.length || 0,
        faqs: faqsResponse.data?.length || 0,
        newsletter: newsletterResponse.data?.length || 0,
        verifiedSubscribers: newsletterResponse.data?.filter(sub => sub.is_verified).length || 0
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

  const statCards = [
    {
      title: 'Published Articles',
      value: stats?.articles || 0,
      icon: FileText,
      description: 'Articles live on the site'
    },
    {
      title: 'Business Sectors',
      value: stats?.sectors || 0,
      icon: Building2,
      description: 'Active sector pages'
    },
    {
      title: 'Leadership Profiles',
      value: stats?.leadership || 0,
      icon: Users,
      description: 'Team members featured'
    },
    {
      title: 'Newsletter Subscribers',
      value: stats?.newsletter || 0,
      icon: Mail,
      description: `${stats?.verifiedSubscribers || 0} verified`
    },
    {
      title: 'Testimonials',
      value: stats?.testimonials || 0,
      icon: MessageSquareQuote,
      description: 'Client testimonials published'
    },
    {
      title: 'FAQ Items',
      value: stats?.faqs || 0,
      icon: HelpCircle,
      description: 'Frequently asked questions'
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
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="card-enhanced">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Recent Articles
            </CardTitle>
            <CardDescription>
              Latest articles created in the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentArticles?.length ? (
              recentArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground truncate">{article.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(article.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(article.status)}`}>
                    {article.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No recent articles</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="font-medium text-foreground">Create New Article</div>
              <div className="text-sm text-muted-foreground">Start writing a new blog post</div>
            </button>
            <button className="w-full text-left p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="font-medium text-foreground">Manage Newsletter</div>
              <div className="text-sm text-muted-foreground">View subscribers and send campaigns</div>
            </button>
            <button className="w-full text-left p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="font-medium text-foreground">Upload Media</div>
              <div className="text-sm text-muted-foreground">Add images and documents</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;