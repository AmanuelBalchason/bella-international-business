import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-marcellus text-6xl font-normal text-foreground mb-4">404</h1>
          <p className="text-xl text-muted-foreground font-inter mb-8">Oops! Page not found</p>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-3 rounded-none">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
