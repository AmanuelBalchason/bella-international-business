import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useClientLogos } from '@/hooks/useClientLogos';

const ClientLogosAdmin = () => {
  const { data: logos, isLoading } = useClientLogos();

  if (isLoading) {
    return <div>Loading client logos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Client Logos</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Client Logo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logos?.map((logo) => (
          <Card key={logo.id} className="card-enhanced">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{logo.company_name}</CardTitle>
                <Badge variant={logo.status === 'published' ? 'default' : 'secondary'}>
                  {logo.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {logo.logo_image && (
                <div className="mb-4">
                  <img
                    src={logo.logo_image.file_path}
                    alt={logo.company_name}
                    className="w-full h-24 object-contain bg-gray-50 rounded"
                  />
                </div>
              )}
              <div className="space-y-2">
                {logo.website_url && (
                  <p className="text-sm text-muted-foreground">
                    Website: {logo.website_url}
                  </p>
                )}
                {logo.is_featured && (
                  <Badge variant="outline">Featured</Badge>
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

export default ClientLogosAdmin;