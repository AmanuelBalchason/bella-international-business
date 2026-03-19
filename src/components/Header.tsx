import React, { useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationLinks = [
    { to: "/our-story", label: "Our Story" },
    { to: "/articles", label: "Articles" },
    { to: "/sectors", label: "Sectors" },
    { to: "/leadership", label: "Leadership" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-12 h-12 rounded-none flex items-center justify-center">
              <img 
                src="/lovable-uploads/c24d2544-5172-490b-ac93-2e853c8ea806.png" 
                alt="Bella International Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="ml-4">
              <h1 className="font-marcellus text-xl font-normal text-foreground">Bella International</h1>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-12">
            {navigationLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          {/* Desktop CTA Button */}
          <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-3 rounded-none hover:scale-105 transition-all duration-200 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-[100%]">
            Get In Touch
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={toggleMobileMenu} />
      )}

      {/* Mobile Menu Panel - Changed background to light gray */}
      <div 
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-64 bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          {/* Mobile Menu Items with card-like styling */}
          <div className="flex-1 space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 text-lg font-inter font-medium text-gray-800 hover:text-primary hover:bg-white px-4 rounded-lg transition-all duration-200 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile CTA Button */}
          <div className="pt-6 border-t border-gray-200">
            <Button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium py-3 rounded-lg hover:scale-105 transition-all duration-200 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-[100%] shadow-md"
            >
              <Link to="/contact" className="w-full h-full flex items-center justify-center">
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;