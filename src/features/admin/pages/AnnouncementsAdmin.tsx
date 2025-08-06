import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { format } from 'date-fns';

const AnnouncementsAdmin = () => {
  const { data: announcements, isLoading } = useAnnouncements();

  if (isLoading) {
    return <div>Loading announcements...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {announcements?.map((announcement) => (
          <Card key={announcement.id} className="card-enhanced">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant={announcement.banner_type === 'info' ? 'default' : 'secondary'}>
                    {announcement.banner_type}
                  </Badge>
                  <Badge variant={announcement.status === 'published' ? 'default' : 'secondary'}>
                    {announcement.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {announcement.content}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {announcement.start_date && (
                  <div>
                    <span className="font-medium">Start:</span>{' '}
                    {format(new Date(announcement.start_date), 'MMM dd, yyyy')}
                  </div>
                )}
                {announcement.end_date && (
                  <div>
                    <span className="font-medium">End:</span>{' '}
                    {format(new Date(announcement.end_date), 'MMM dd, yyyy')}
                  </div>
                )}
                {announcement.link_url && (
                  <div>
                    <span className="font-medium">Link:</span>{' '}
                    <a href={announcement.link_url} className="text-primary hover:underline">
                      {announcement.link_text || 'View'}
                    </a>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsAdmin;