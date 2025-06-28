
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ClientLogos from '../components/ClientLogos';
import AnimatedAboutSection from '../components/AnimatedAboutSection';
import BusinessSectors from '../components/BusinessSectors';
import LeadershipSlideshow from '../components/LeadershipSlideshow';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ClientLogos />
      <AnimatedAboutSection />
      <BusinessSectors />
      <LeadershipSlideshow />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
