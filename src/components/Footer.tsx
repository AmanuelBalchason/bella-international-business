
import React from 'react';
import { Link } from 'react-router-dom';
import LocationLink from './LocationLink';
import InteractiveDotPattern from './InteractiveDotPattern';
import { sectorNavLinks } from '@/data/sectors';
import LanguageToggle from './LanguageToggle';
import { useT } from '@/i18n/LanguageProvider';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useT();

  return (
    <footer className="bg-white py-16 relative overflow-hidden">
      <InteractiveDotPattern />
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
            <LanguageToggle />
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-inter font-semibold text-foreground mb-6">{t('Sectors')}</h4>
            <div className="space-y-3">
              {/* Temporarily hidden: Our Story and Articles pages
              <Link to="/our-story" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200">Our Story</Link>
              <Link to="/articles" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200">Articles</Link>
              */}
              {sectorNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
                >
                  {t(link.title)}
                </Link>
              ))}
              <Link to="/leadership" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">{t('Leadership')}</Link>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-inter font-semibold text-foreground mb-6">{t('Contact')}</h4>
            <div className="space-y-3">
              <a href="tel:+251962777777" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">+251 962 777777</a>
              <a href="tel:+251913328000" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">+251 913 328000</a>
              <a href="tel:+251911827024" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">+251 911 827024</a>
              <a href="mailto:info@bellainter.com" className="block text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">info@bellainter.com</a>
            </div>
          </div>
          
          {/* Company Vision */}
          <div>
            <h4 className="font-marcellus text-lg font-normal text-foreground mb-6">
              {t('Excellence in Every Partnership')}
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/bella-healthcare/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bella International on LinkedIn"
                className="w-9 h-9 bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@bella_healthcare_et"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('Bella Healthcare on TikTok')}
                className="w-9 h-9 bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M16.5 3c.4 2.2 1.7 3.6 3.9 3.8v2.5c-1.4.1-2.7-.3-3.9-1v5.9c0 4.1-3.6 7-7.3 5.7-2.4-.8-3.9-3-3.9-5.4.1-3.4 3.2-6 6.6-5.4v2.7c-.5-.1-1-.2-1.5-.1-1.4.2-2.4 1.4-2.3 2.8.1 1.4 1.3 2.5 2.7 2.4 1.4 0 2.6-1.2 2.6-2.7V3h3.1z" />
                </svg>
              </a>
            </div>

          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground font-inter text-sm">
            © {currentYear} Bella International Business. {t('All rights reserved.')} | {t('Privacy Policy')} | {t('Terms of Service')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
