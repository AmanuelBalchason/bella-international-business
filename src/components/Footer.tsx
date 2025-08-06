
import React from 'react';
import { Link } from 'react-router-dom';
import LocationLink from './LocationLink';
import StaticDotPattern from './StaticDotPattern';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-16 relative overflow-hidden">
      <StaticDotPattern />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/c24d2544-5172-490b-ac93-2e853c8ea806.png" 
                  alt="Bella International Logo"
                  className="w-full h-full object-contain"
                />
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
              <Link to="/our-story" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Our Story</Link>
              <Link to="/articles" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Articles</Link>
              <Link to="/sectors" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Sectors</Link>
              <Link to="/leadership" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Leadership</Link>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-inter font-semibold text-foreground mb-6">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+251962777777" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">+251 962 777777</a>
              <a href="mailto:info@bellainter.com" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">info@bellainter.com</a>
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
