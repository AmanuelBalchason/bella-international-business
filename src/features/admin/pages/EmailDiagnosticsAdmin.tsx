import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

export const EmailDiagnosticsAdmin = () => {
  const [testEmail, setTestEmail] = useState('');
  const [testType, setTestType] = useState<'contact' | 'newsletter' | 'event'>('contact');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch email logs
  const { data: emailLogs, isLoading: logsLoading } = useQuery({
    queryKey: ['email-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_logs')
        .select('*')
        .order('attempted_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    },
  });

  // Email test mutation
  const emailTestMutation = useMutation({
    mutationFn: async ({ email, type }: { email: string; type: string }) => {
      const { data, error } = await supabase.functions.invoke('email-test', {
        body: { testEmail: email, testType: type }
      });
      
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Test failed');
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "✅ Email Test Successful",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ['email-logs'] });
    },
    onError: (error: any) => {
      console.error('Email test error:', error);
      toast({
        title: "❌ Email Test Failed",
        description: error.message || 'Unknown error occurred',
        variant: "destructive",
      });
      queryClient.invalidateQueries({ queryKey: ['email-logs'] });
    },
  });

  const handleTestEmail = async () => {
    if (!testEmail) {
      toast({
        title: "Validation Error",
        description: "Please enter a test email address",
        variant: "destructive",
      });
      return;
    }

    emailTestMutation.mutate({ email: testEmail, type: testType });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'success':
        return 'default';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getEmailTypeColor = (type: string) => {
    if (type.includes('contact')) return 'bg-blue-100 text-blue-800';
    if (type.includes('newsletter')) return 'bg-green-100 text-green-800';
    if (type.includes('event')) return 'bg-purple-100 text-purple-800';
    if (type.includes('test')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  const stats = emailLogs ? {
    total: emailLogs.length,
    successful: emailLogs.filter(log => log.status === 'success').length,
    failed: emailLogs.filter(log => log.status === 'failed').length,
    successRate: emailLogs.length > 0 ? Math.round((emailLogs.filter(log => log.status === 'success').length / emailLogs.length) * 100) : 0
  } : { total: 0, successful: 0, failed: 0, successRate: 0 };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Mail className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Email Diagnostics</h1>
      </div>
      
      {/* Email Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Emails</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Mail className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold text-green-600">{stats.successful}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{stats.successRate}%</p>
              </div>
              <div className="flex items-center">
                {stats.successRate >= 90 ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : stats.successRate >= 70 ? (
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Testing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Email Testing
          </CardTitle>
          <CardDescription>
            Send test emails to verify delivery functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="test-email">Test Email Address</Label>
              <Input
                id="test-email"
                type="email"
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="test-type">Email Type</Label>
              <Select value={testType} onValueChange={(value: any) => setTestType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contact">Contact Form</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="event">Event Reservation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleTestEmail}
                disabled={emailTestMutation.isPending || !testEmail}
                className="w-full"
              >
                {emailTestMutation.isPending ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Test Email
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Email Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Email Activity</CardTitle>
          <CardDescription>
            Last 50 email delivery attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {logsLoading ? (
            <div className="text-center py-8">
              <Clock className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Loading email logs...</p>
            </div>
          ) : emailLogs && emailLogs.length > 0 ? (
            <div className="space-y-3">
              {emailLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(log.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{log.email}</span>
                        <Badge 
                          variant={getStatusBadgeVariant(log.status)}
                          className="text-xs"
                        >
                          {log.status}
                        </Badge>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmailTypeColor(log.email_type)}`}>
                          {log.email_type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(log.attempted_at).toLocaleString()}
                      </p>
                      {log.error_message && (
                        <p className="text-sm text-red-600 mt-1">
                          Error: {log.error_message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Email Logs Yet</h3>
              <p className="text-muted-foreground">
                Email delivery logs will appear here once emails are sent.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailDiagnosticsAdmin;