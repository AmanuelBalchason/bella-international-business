
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
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
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-12">
            <Link to="/our-story" className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Our Story</Link>
            <Link to="/articles" className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Articles</Link>
            <Link to="/sectors" className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Sectors</Link>
            <Link to="/leadership" className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Leadership</Link>
            <Link to="/contact" className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Contact</Link>
          </nav>
          
          {/* CTA Button */}
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-3 rounded-none hover:scale-105 transition-all duration-200 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-[100%]">
            Get In Touch
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
