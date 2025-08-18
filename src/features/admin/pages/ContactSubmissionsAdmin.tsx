import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageSquare, Phone, Mail } from 'lucide-react';
import { useContactSubmissions } from '@/hooks/useContactSubmissions';
import { format } from 'date-fns';

const ContactSubmissionsAdmin = () => {
  console.log('ContactSubmissionsAdmin component loaded');
  const { data: submissions, isLoading } = useContactSubmissions();

  if (isLoading) {
    return <div>Loading contact submissions...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <div className="flex gap-2">
          <Badge variant="outline">Total: {submissions?.length || 0}</Badge>
          <Badge className="bg-blue-100 text-blue-800">
            New: {submissions?.filter(s => s.status === 'new').length || 0}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {submissions?.map((submission) => (
          <Card key={submission.id} className="card-enhanced">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{submission.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {submission.company && `${submission.company} • `}
                    {format(new Date(submission.created_at), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(submission.priority)}>
                    {submission.priority}
                  </Badge>
                  <Badge className={getStatusColor(submission.status)}>
                    {submission.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {submission.subject && (
                  <div>
                    <span className="font-medium">Subject:</span> {submission.subject}
                  </div>
                )}
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {submission.email}
                  </div>
                  {submission.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {submission.phone}
                    </div>
                  )}
                </div>
                <div>
                  <span className="font-medium">Message:</span>
                  <p className="text-sm mt-1 p-3 bg-muted rounded">
                    {submission.message}
                  </p>
                </div>
                {submission.response_sent && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <MessageSquare className="w-4 h-4" />
                    Response sent on {format(new Date(submission.response_date!), 'MMM dd, yyyy')}
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Respond
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactSubmissionsAdmin;