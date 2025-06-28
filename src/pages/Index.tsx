
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ClientLogos from '../components/ClientLogos';
import AboutSection from '../components/AboutSection';
import BusinessSectors from '../components/BusinessSectors';
import LeadershipSection from '../components/LeadershipSection';
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
      <AboutSection />
      <BusinessSectors />
      <LeadershipSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
