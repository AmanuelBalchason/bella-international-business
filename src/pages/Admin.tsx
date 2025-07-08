
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AdminAuth from '@/components/AdminAuth';
import AdminSetup from '@/components/AdminSetup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Users, FileText, MessageSquare, Settings, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [hasAdminUsers, setHasAdminUsers] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminUsers = async () => {
      try {
        const { count, error } = await supabase
          .from('admin_users')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'admin');
        
        if (error) throw error;
        setHasAdminUsers((count || 0) > 0);
      } catch (error) {
        console.error('Error checking admin users:', error);
        setHasAdminUsers(false);
      }
    };

    checkAdminUsers();
  }, []);

  if (loading || hasAdminUsers === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If no admin users exist, show the setup page
  if (!hasAdminUsers) {
    return <AdminSetup />;
  }

  if (!user || !isAdmin) {
    return <AdminAuth />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button onClick={signOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Business Sectors */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Business Sectors</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Manage sector information
              </p>
            </CardContent>
          </Card>

          {/* Leadership */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leadership</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Manage team profiles
              </p>
            </CardContent>
          </Card>

          {/* Articles */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Manage blog content
              </p>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Manage client feedback
              </p>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Site Settings</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Global</div>
              <p className="text-xs text-muted-foreground">
                Configure site settings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 mb-4">
              Welcome to the Bella International CMS! The database has been set up successfully. 
              Content management features will be added in the next phase.
            </p>
            <div className="flex gap-4">
              <Button>Add New Article</Button>
              <Button variant="outline">Manage Media</Button>
              <Button variant="outline">View Analytics</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
