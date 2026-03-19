import React from 'react';
import { Link } from 'react-router-dom';
import LocationLink from './LocationLink';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cape-cod-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/lovable-uploads/c24d2544-5172-490b-ac93-2e853c8ea806.png"
                  alt="Bella International Logo"
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <div className="ml-3">
                <h3 className="font-marcellus text-lg font-normal text-cape-cod-50">Bella International</h3>
              </div>
            </Link>
            <div className="space-y-2 text-cape-cod-400 font-inter text-sm">
              <LocationLink />
            </div>
          </div>

          <div>
            <h4 className="font-inter font-semibold text-cape-cod-50 mb-6">Quick Links</h4>
            <div className="space-y-3">
              {[
                { to: '/our-story', label: 'Our Story' },
                { to: '/articles', label: 'Articles' },
                { to: '/sectors', label: 'Sectors' },
                { to: '/leadership', label: 'Leadership' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="block text-cape-cod-400 font-inter text-sm hover:text-cape-cod-100 transition-colors duration-200">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-inter font-semibold text-cape-cod-50 mb-6">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+251961777777" className="block text-cape-cod-400 font-inter text-sm hover:text-cape-cod-100 transition-colors duration-200">+251 961 777777</a>
              <a href="tel:+251913328000" className="block text-cape-cod-400 font-inter text-sm hover:text-cape-cod-100 transition-colors duration-200">+251 913 328000</a>
              <a href="tel:+251911827024" className="block text-cape-cod-400 font-inter text-sm hover:text-cape-cod-100 transition-colors duration-200">+251 911 827024</a>
              <a href="mailto:info@bellainter.com" className="block text-cape-cod-400 font-inter text-sm hover:text-cape-cod-100 transition-colors duration-200">info@bellainter.com</a>
            </div>
          </div>

          <div>
            <h4 className="font-marcellus text-lg font-normal text-cape-cod-50 mb-6">
              Excellence in Every Partnership
            </h4>
            <div className="flex space-x-4">
              {['LI', 'TW', 'FB'].map(icon => (
                <div key={icon} className="w-8 h-8 bg-cape-cod-800 flex items-center justify-center hover:bg-cape-cod-700 transition-colors duration-200">
                  <span className="text-cape-cod-400 text-xs">{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cape-cod-800 mt-12 pt-8 text-center">
          <p className="text-cape-cod-600 font-inter text-sm">
            © {currentYear} Bella International Business. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
