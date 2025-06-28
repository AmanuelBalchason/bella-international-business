import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Play } from 'lucide-react';

const OurStory = () => {
  const timeline = [
    {
      year: '2008',
      title: 'Foundation & Vision',
      content: 'Bella International was founded with a vision to become the foremost provider of strategic business solutions in the Horn of Africa. Starting as a small consultancy, we laid the groundwork for what would become a diversified business conglomerate.',
      details: 'Our founders, Abel Yeshitila and Mulugeta Demissie, identified key opportunities in the emerging Ethiopian market and established the company with a focus on real estate development and strategic partnerships.',
      images: ['Foundation', 'Vision', 'Strategy']
    },
    {
      year: '2012',
      title: 'Healthcare Integration',
      content: 'Expanded into healthcare services, recognizing the critical need for quality medical facilities and services across the region. This marked our commitment to improving community health outcomes.',
      details: 'We established our first medical facility in Addis Ababa and began developing comprehensive healthcare management systems. This expansion allowed us to serve over 1,000 patients in our first year of healthcare operations.',
      images: ['Healthcare', 'Medical Facilities', 'Community Health']
    },
    {
      year: '2015',
      title: 'Acha Forest Coffee Heritage',
      content: 'Launched Acha Forest Coffee operations, embracing Ethiopia\'s rich coffee heritage and establishing sustainable farming partnerships with local communities.',
      details: 'Our coffee division was built on principles of fair trade and environmental sustainability. We began working with 8 partner farms and established direct trade relationships with international buyers, exporting to our first 5 countries.',
      images: ['Coffee Heritage', 'Sustainable Farming', 'Fair Trade']
    },
    {
      year: '2018',
      title: 'Automotive Solutions',
      content: 'Entered the automotive sector with comprehensive fleet management and transportation infrastructure development services, supporting regional economic growth.',
      details: 'We identified the growing need for reliable transportation solutions and established partnerships with major automotive brands. Our fleet management services began serving over 50 clients across various industries.',
      images: ['Automotive', 'Fleet Management', 'Transportation']
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      content: 'Embraced digital transformation across all sectors, implementing cutting-edge technology solutions to enhance service delivery and operational efficiency.',
      details: 'During the global pandemic, we accelerated our digital initiatives, implementing telemedicine services, digital coffee trading platforms, and IoT-enabled fleet management systems.',
      images: ['Digital Innovation', 'Technology', 'Digital Platforms']
    },
    {
      year: '2023',
      title: 'Regional Expansion',
      content: 'Achieved significant regional expansion, establishing strategic partnerships across the Horn of Africa and reaching 100+ strategic partners.',
      details: 'Our expansion strategy focused on building strong local partnerships while maintaining our core values of quality, integrity, and community development. We now operate in 5 major cities across the region.',
      images: ['Regional Growth', 'Strategic Partnerships', 'Market Leadership']
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(
    timeline.reduce((acc, item, index) => {
      acc[index] = 0;
      return acc;
    }, {} as Record<number, number>)
  );

  React.useEffect(() => {
    const intervals = timeline.map((_, index) => 
      setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [index]: (prev[index] + 1) % timeline[index].images.length
        }));
      }, 3000 + index * 500)
    );

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
                Our Story
              </h1>
              <p className="text-muted-foreground font-inter text-xl leading-relaxed mb-8">
                From humble beginnings to regional leadership - discover the journey of Bella International Business across the Horn of Africa.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-4 rounded-none inline-flex items-center gap-2"
                onClick={() => window.open('#company-profile-video', '_blank')}
              >
                <Play className="w-5 h-5" />
                Learn More
              </Button>
            </div>
            
            <div className="w-full h-[500px] bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <span className="text-primary font-marcellus text-3xl">B</span>
                </div>
                <p className="text-muted-foreground font-inter text-sm">Bella International Journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-secondary py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-marcellus text-4xl font-normal text-foreground mb-6">
              Our Journey Through Time
            </h2>
            <p className="text-muted-foreground font-inter text-lg">
              Explore the key milestones that shaped Bella International into the company it is today.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border animate-fade-in"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  {/* Year Circle */}
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10 hover:scale-110 transition-transform duration-200">
                    <span className="text-primary-foreground font-inter font-bold text-sm">
                      {item.year}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div className="bg-white border border-border p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      {/* Slideshow Image Placeholder */}
                      <div className="w-full h-48 bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center mb-6 overflow-hidden relative hover:scale-105 transition-transform duration-300">
                        <div 
                          key={currentImageIndex[index]}
                          className="text-center animate-fade-in"
                        >
                          <div className="w-12 h-12 bg-primary/10 mx-auto flex items-center justify-center mb-3">
                            <span className="text-primary font-marcellus text-lg">{item.year}</span>
                          </div>
                          <p className="text-muted-foreground font-inter text-sm">
                            {item.images[currentImageIndex[index]]}
                          </p>
                        </div>
                      </div>
                      
                      <Accordion type="single" collapsible defaultValue={`item-${index}`}>
                        <AccordionItem value={`item-${index}`} className="border-none">
                          <AccordionTrigger className="hover:no-underline text-left p-0 group">
                            <div>
                              <h3 className="font-marcellus text-2xl font-normal text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                                {item.title}
                              </h3>
                              <p className="text-muted-foreground font-inter leading-relaxed">
                                {item.content}
                              </p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4">
                            <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                              {item.details}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="animate-fade-in">
              <h3 className="font-marcellus text-3xl font-normal text-foreground mb-6">Our Vision</h3>
              <p className="text-muted-foreground font-inter text-lg leading-relaxed mb-8">
                To become the foremost provider of Real Estate, Healthcare, Acha Forest Coffee and Automotives in the Horn of Africa. We strive to be the employer of choice for professionals in the region.
              </p>
              <div className="w-full h-64 bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center mb-4">
                    <span className="text-primary font-marcellus text-2xl">V</span>
                  </div>
                  <p className="text-muted-foreground font-inter text-sm">Vision Statement</p>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-marcellus text-3xl font-normal text-foreground mb-6">Our Mission</h3>
              <p className="text-muted-foreground font-inter text-lg leading-relaxed mb-8">
                We are committed to realizing our vision by building a highly motivated, research-focused workforce dedicated to cultivating long-term relationships with our strategic partners and the communities we serve.
              </p>
              <div className="w-full h-64 bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center mb-4">
                    <span className="text-primary font-marcellus text-2xl">M</span>
                  </div>
                  <p className="text-muted-foreground font-inter text-sm">Mission Statement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default OurStory;
