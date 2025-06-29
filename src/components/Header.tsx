
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-12 h-12 bg-primary rounded-none flex items-center justify-center">
              <span className="text-primary-foreground font-marcellus text-xl font-bold">B</span>
            </div>
            <div className="ml-4">
              <h1 className="font-marcellus text-xl font-normal text-foreground">Bella International</h1>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-12">
            <Link to="/our-story" className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 hover-underline">Our Story</Link>
            <Link to="/articles" className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 hover-underline">Articles</Link>
            <Link to="/sectors" className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 hover-underline">Sectors</Link>
            <Link to="/leadership" className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 hover-underline">Leadership</Link>
            <Link to="/contact" className="font-inter font-medium text-muted-foreground hover:text-primary transition-colors duration-200 hover-underline">Contact</Link>
          </nav>
          
          {/* CTA Button */}
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-3 rounded-none hover:scale-105 transition-all duration-200">
            Get In Touch
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
