import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Building2, 
  MessageSquareQuote, 
  HelpCircle, 
  Mail,
  Image,
  Settings,
  BarChart3,
  Home
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const adminMenuItems = [
  { title: 'Dashboard', url: '/admin', icon: BarChart3 },
  { title: 'Articles', url: '/admin/articles', icon: FileText },
  { title: 'Sectors', url: '/admin/sectors', icon: Building2 },
  { title: 'Leadership', url: '/admin/leadership', icon: Users },
  { title: 'Testimonials', url: '/admin/testimonials', icon: MessageSquareQuote },
  { title: 'FAQs', url: '/admin/faqs', icon: HelpCircle },
  { title: 'Newsletter', url: '/admin/newsletter', icon: Mail },
  { title: 'Media Library', url: '/admin/media', icon: Image },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');
  const getNavClass = (path: string) =>
    isActive(path) ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link to="/" className="flex items-center gap-2 hover:opacity-80">
              <Home className="h-4 w-4" />
              {!isCollapsed && <span>Back to Site</span>}
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const AdminLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-xl font-semibold text-card-foreground">
              Bella International - Admin Panel
            </h1>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;