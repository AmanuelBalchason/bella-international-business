
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SectorDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const sectorData = {
    'real-estate': {
      title: 'Real Estate',
      description: 'Premium property development and strategic real estate investment solutions across Eastern Africa.',
      content: 'Our real estate division is committed to developing premium properties that meet international standards while addressing the unique needs of local markets. We focus on sustainable development practices and innovative architectural solutions.'
    },
    'healthcare': {
      title: 'Healthcare',
      description: 'Comprehensive healthcare services and medical facility management with focus on quality care.',
      content: 'We provide comprehensive healthcare solutions including medical facility management, healthcare service delivery, and medical equipment procurement. Our commitment to quality care drives everything we do.'
    },
    'agri-business': {
      title: 'Agri-Business',
      description: 'Sustainable agricultural practices and supply chain optimization for food security.',
      content: 'Our agri-business operations focus on sustainable agricultural practices, innovative farming techniques, and supply chain optimization to enhance food security across Eastern Africa.'
    },
    'automotives': {
      title: 'Automotives',
      description: 'Automotive solutions, fleet management, and transportation infrastructure development.',
      content: 'We offer comprehensive automotive services including vehicle sales, fleet management solutions, maintenance services, and transportation infrastructure development to support regional mobility.'
    }
  };

  const sector = sectorData[slug as keyof typeof sectorData];

  if (!sector) {
    return <div>Sector not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              {sector.title}
            </h1>
            <p className="text-muted-foreground font-inter text-xl leading-relaxed">
              {sector.description}
            </p>
          </div>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-muted-foreground font-inter text-lg leading-relaxed">
              {sector.content}
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SectorDetail;
