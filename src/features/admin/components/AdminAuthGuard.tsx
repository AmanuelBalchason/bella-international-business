import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';
import AdminAuth from '@/components/AdminAuth';
import AdminSetup from '@/components/AdminSetup';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const [hasAdminUsers, setHasAdminUsers] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setError('Failed to check admin configuration');
        setHasAdminUsers(false);
      }
    };

    checkAdminUsers();
  }, []);

  // Show loading state
  if (loading || hasAdminUsers === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading admin panel...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-8 w-8 text-destructive mb-4" />
            <p className="text-destructive font-medium">Configuration Error</p>
            <p className="text-muted-foreground text-sm text-center mt-2">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If no admin users exist, show the setup page
  if (!hasAdminUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <AdminSetup />
      </div>
    );
  }

  // If user is not authenticated or not admin, show auth page  
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <AdminAuth />
      </div>
    );
  }

  // User is authenticated and is admin, show the admin panel
  return <>{children}</>;
};

export default AdminAuthGuard;