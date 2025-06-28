
import React from 'react';
import { Link } from 'react-router-dom';
import LocationLink from './LocationLink';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-marcellus text-lg font-bold">B</span>
              </div>
              <div className="ml-3">
                <h3 className="font-marcellus text-lg font-normal text-foreground">Bella International</h3>
              </div>
            </Link>
            
            <div className="space-y-2">
              <LocationLink />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-inter font-semibold text-foreground mb-6">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/our-story" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 hover-underline">Our Story</Link>
              <Link to="/articles" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 hover-underline">Articles</Link>
              <Link to="/sectors" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 hover-underline">Sectors</Link>
              <Link to="/leadership" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 hover-underline">Leadership</Link>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-inter font-semibold text-foreground mb-6">Contact</h4>
            <div className="space-y-3">
              <p className="text-muted-foreground font-inter text-sm">+251 XXX XXX XXX</p>
              <p className="text-muted-foreground font-inter text-sm">info@bellainter.com</p>
            </div>
          </div>
          
          {/* Company Vision */}
          <div>
            <h4 className="font-marcellus text-lg font-normal text-foreground mb-6">
              Excellence in Every Partnership
            </h4>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-secondary border border-border flex items-center justify-center hover:border-primary/30 transition-colors duration-200 hover:scale-110">
                <span className="text-muted-foreground text-xs">LI</span>
              </div>
              <div className="w-8 h-8 bg-secondary border border-border flex items-center justify-center hover:border-primary/30 transition-colors duration-200 hover:scale-110">
                <span className="text-muted-foreground text-xs">TW</span>
              </div>
              <div className="w-8 h-8 bg-secondary border border-border flex items-center justify-center hover:border-primary/30 transition-colors duration-200 hover:scale-110">
                <span className="text-muted-foreground text-xs">FB</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground font-inter text-sm">
            © {currentYear} Bella International Business. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
