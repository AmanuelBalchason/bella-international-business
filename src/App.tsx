
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
// Temporarily hidden pages (restore routes when reactivated):
// import OurStory from "./pages/OurStory";
// import Articles from "./pages/Articles";
// import ArticleDetail from "./pages/ArticleDetail";
import Sectors from "./pages/Sectors";
import SectorPage from "./pages/SectorPage";
import { sectorData } from "@/data/sectors";
import { Navigate, useParams } from "react-router-dom";
import Leadership from "./pages/Leadership";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import NewsletterTest from "./pages/NewsletterTest";
import AdminAuthGuard from "@/features/admin/components/AdminAuthGuard";
import AdminLayout from "@/features/admin/components/AdminLayout";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import ArticlesAdmin from "@/features/articles/pages/ArticlesAdmin";
import ArticleEditor from "@/features/articles/pages/ArticleEditor";
import ContactSubmissionsAdmin from "@/features/admin/pages/ContactSubmissionsAdmin";
import EmailDiagnosticsAdmin from "@/features/admin/pages/EmailDiagnosticsAdmin";

const queryClient = new QueryClient();

const SectorSlugRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const target = slug && sectorData[slug] ? sectorData[slug].path : "/";
  return <Navigate to={target} replace />;
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
            {/* Temporarily hidden:
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            */}
            <Route path="/bella-real-estate" element={<SectorPage sector={sectorData['real-estate']} />} />
            <Route path="/bella-healthcare" element={<SectorPage sector={sectorData['healthcare']} />} />
            <Route path="/acha-forest-coffee" element={<SectorPage sector={sectorData['acha-forest-coffee']} />} />
            <Route path="/bella-automotives" element={<SectorPage sector={sectorData['automotives']} />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/sectors/:slug" element={<SectorSlugRedirect />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newsletter-test" element={<NewsletterTest />} />
            <Route path="/admin" element={<AdminAuthGuard><AdminLayout /></AdminAuthGuard>}>
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
