
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo placeholder */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-400 rounded"></div>
            <div className="ml-3">
              <div className="w-24 h-4 bg-gray-400 rounded"></div>
              <div className="w-16 h-2 bg-gray-300 rounded mt-1"></div>
            </div>
            <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">LOGO + TEXT</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <div className="w-12 h-4 bg-gray-400 rounded"></div>
            <div className="w-16 h-4 bg-gray-400 rounded"></div>
            <div className="w-14 h-4 bg-gray-400 rounded"></div>
            <div className="w-18 h-4 bg-gray-400 rounded"></div>
            <div className="w-14 h-4 bg-gray-400 rounded"></div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded ml-2">NAV LINKS</span>
          </nav>
          
          {/* CTA Button */}
          <div className="flex items-center">
            <div className="w-24 h-8 bg-gray-500 rounded"></div>
            <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">CTA BUTTON</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
