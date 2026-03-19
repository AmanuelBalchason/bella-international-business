
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import EventBanner from '../components/EventBanner';
import ClientLogos from '../components/ClientLogos';
import AnimatedAboutSection from '../components/AnimatedAboutSection';
import BusinessSectors from '../components/BusinessSectors';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { Toaster } from '../components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <EventBanner />
      <ClientLogos />
      <AnimatedAboutSection />
      <BusinessSectors />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
