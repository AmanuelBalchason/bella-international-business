
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import OurStory from "./pages/OurStory";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Sectors from "./pages/Sectors";
import SectorDetail from "./pages/SectorDetail";
import Leadership from "./pages/Leadership";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useAuth } from "@/hooks/useAuth";
import AdminAuth from "@/components/AdminAuth";
import AdminLayout from "@/features/admin/components/AdminLayout";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import ArticlesAdmin from "@/features/articles/pages/ArticlesAdmin";
import ArticleEditor from "@/features/articles/pages/ArticleEditor";
// Force cache refresh with explicit default import
import ContactSubmissionsAdmin from "@/features/admin/pages/ContactSubmissionsAdmin";
import EmailDiagnosticsAdmin from "@/features/admin/pages/EmailDiagnosticsAdmin";
import { useEffect, useState } from "react";
import AdminSetup from "@/components/AdminSetup";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!user || !isAdmin) {
    return <AdminAuth />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/sectors/:slug" element={<SectorDetail />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
              <Route index element={<AdminDashboard />} />
              <Route path="articles" element={<ArticlesAdmin />} />
              <Route path="articles/new" element={<ArticleEditor />} />
              <Route path="articles/:id/edit" element={<ArticleEditor />} />
              <Route path="contact-submissions" element={<ContactSubmissionsAdmin />} />
              <Route path="email-diagnostics" element={<EmailDiagnosticsAdmin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
