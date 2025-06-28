
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="ml-3">
                <div className="w-20 h-4 bg-gray-400 rounded"></div>
                <div className="w-14 h-2 bg-gray-300 rounded mt-1"></div>
              </div>
            </div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">COMPANY LOGO</span>
            
            <div className="mt-6 space-y-2">
              <div className="w-32 h-3 bg-gray-400 rounded"></div>
              <div className="w-28 h-3 bg-gray-400 rounded"></div>
            </div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">ADDRESS</span>
          </div>
          
          {/* Pages Links */}
          <div>
            <div className="w-16 h-4 bg-gray-500 rounded mb-6"></div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">PAGES</span>
            
            <div className="space-y-3 mt-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="w-20 h-3 bg-gray-400 rounded"></div>
              ))}
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <div className="w-16 h-4 bg-gray-500 rounded mb-6"></div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">CONTACT</span>
            
            <div className="space-y-3 mt-4">
              <div className="w-28 h-3 bg-gray-400 rounded"></div>
              <div className="w-32 h-3 bg-gray-400 rounded"></div>
            </div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">PHONE & EMAIL</span>
          </div>
          
          {/* Tagline & Social */}
          <div>
            <div className="w-3/4 h-6 bg-gray-500 rounded mb-6"></div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">COMPANY TAGLINE</span>
            
            <div className="flex space-x-4 mt-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="w-8 h-8 bg-gray-400 rounded"></div>
              ))}
            </div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">SOCIAL ICONS</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <div className="w-48 h-3 bg-gray-400 rounded mx-auto"></div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">COPYRIGHT TEXT</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
