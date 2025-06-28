
import React from 'react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary rounded-none flex items-center justify-center">
              <span className="text-primary-foreground font-marcellus text-xl font-bold">B</span>
            </div>
            <div className="ml-4">
              <h1 className="font-marcellus text-xl font-normal text-foreground">Bella International</h1>
              <p className="text-sm text-muted-foreground font-inter">Business Excellence</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-12">
            <a href="#" className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-200">About</a>
            <a href="#" className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-200">Services</a>
            <a href="#" className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-200">Sectors</a>
            <a href="#" className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-200">Leadership</a>
            <a href="#" className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-200">Contact</a>
          </nav>
          
          {/* CTA Button */}
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-3 rounded-none">
            Get In Touch
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
