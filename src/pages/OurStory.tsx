
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
import { Play, ChevronDown } from 'lucide-react';

const OurStory = () => {
  const timeline = [
    {
      year: '2008',
      title: 'Foundation & Vision',
      summary: 'Bella International was founded with a vision to become the foremost provider of strategic business solutions in the Horn of Africa.',
      content: 'Our founders, Abel Yeshitila and Mulugeta Demissie, identified key opportunities in the emerging Ethiopian market and established the company with a focus on real estate development and strategic partnerships. Starting as a small consultancy, we laid the groundwork for what would become a diversified business conglomerate with a clear mission to serve the regional business community.',
      images: [
        { title: 'Foundation Ceremony', description: 'The historic founding of Bella International Business', content: 'On a pivotal day in 2008, our founders gathered to establish what would become the leading business conglomerate in the Horn of Africa.' },
        { title: 'Vision Planning', description: 'Strategic planning sessions that shaped our future', content: 'Intensive planning sessions where our leadership team outlined the comprehensive vision for multi-sector expansion.' },
        { title: 'First Office', description: 'Our humble beginnings in Addis Ababa', content: 'The modest office space that served as the launching pad for our ambitious business goals and regional expansion plans.' }
      ]
    },
    {
      year: '2012',
      title: 'Healthcare Integration',
      summary: 'Expanded into healthcare services, recognizing the critical need for quality medical facilities across the region.',
      content: 'We established our first medical facility in Addis Ababa and began developing comprehensive healthcare management systems. This expansion allowed us to serve over 1,000 patients in our first year of healthcare operations, marking our commitment to improving community health outcomes through strategic partnerships with medical professionals and international healthcare organizations.',
      images: [
        { title: 'First Medical Facility', description: 'Opening of our flagship healthcare center', content: 'The grand opening of our first medical facility marked our entry into the healthcare sector with state-of-the-art equipment.' },
        { title: 'Medical Team', description: 'Assembling our expert healthcare professionals', content: 'Recruitment of top medical professionals from across the region to deliver world-class healthcare services.' },
        { title: 'Community Outreach', description: 'Healthcare programs reaching rural communities', content: 'Mobile healthcare units and community programs extending our medical services to underserved areas.' }
      ]
    },
    {
      year: '2015',
      title: 'Acha Forest Coffee Heritage',
      summary: 'Launched Acha Forest Coffee operations, embracing Ethiopia\'s rich coffee heritage and establishing sustainable farming partnerships.',
      content: 'Our coffee division was built on principles of fair trade and environmental sustainability. We began working with 8 partner farms and established direct trade relationships with international buyers, exporting to our first 5 countries. This venture connected us directly to Ethiopia\'s legendary coffee origins, where the story of Khaldi and the discovery of coffee beans continues to inspire our sustainable agricultural practices.',
      images: [
        { title: 'Coffee Heritage', description: 'Connecting to Ethiopia\'s coffee legacy', content: 'Establishing our operations near the legendary birthplace of coffee, honoring the rich heritage of Ethiopian coffee culture.' },
        { title: 'Sustainable Farming', description: 'Implementing eco-friendly cultivation methods', content: 'Working with local farmers to develop sustainable farming practices that protect the environment while producing premium coffee.' },
        { title: 'Global Export', description: 'Reaching international coffee markets', content: 'Successfully establishing export relationships with buyers across 5 countries, bringing Ethiopian coffee to the world.' }
      ]
    },
    {
      year: '2018',
      title: 'Automotive Solutions',
      summary: 'Entered the automotive sector with comprehensive fleet management and transportation infrastructure development services.',
      content: 'We identified the growing need for reliable transportation solutions and established partnerships with major automotive brands. Our fleet management services began serving over 50 clients across various industries, supporting regional economic growth through improved mobility and logistics solutions. This expansion included vehicle import operations, maintenance services, and transportation infrastructure development projects.',
      images: [
        { title: 'Fleet Launch', description: 'Introduction of comprehensive fleet services', content: 'Launching our automotive division with a modern fleet of vehicles and comprehensive management solutions.' },
        { title: 'Partnership Network', description: 'Building relationships with automotive brands', content: 'Establishing strategic partnerships with leading automotive manufacturers and service providers across the region.' },
        { title: 'Infrastructure Projects', description: 'Supporting transportation development', content: 'Contributing to regional transportation infrastructure projects that enhance connectivity and economic development.' }
      ]
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      summary: 'Embraced digital transformation across all sectors, implementing cutting-edge technology solutions.',
      content: 'During the global pandemic, we accelerated our digital initiatives, implementing telemedicine services, digital coffee trading platforms, and IoT-enabled fleet management systems. This technological advancement enhanced our service delivery and operational efficiency across all business sectors, positioning us as an innovative leader in the regional market.',
      images: [
        { title: 'Digital Innovation', description: 'Implementing advanced technology solutions', content: 'Rolling out comprehensive digital transformation initiatives across all business sectors during the global pandemic.' },
        { title: 'Telemedicine Launch', description: 'Revolutionizing healthcare delivery', content: 'Launching telemedicine services to maintain healthcare access during challenging times while embracing digital innovation.' },
        { title: 'Smart Systems', description: 'IoT and smart technology integration', content: 'Implementing IoT-enabled systems for fleet management and digital platforms for coffee trading operations.' }
      ]
    },
    {
      year: '2023',
      title: 'Regional Expansion',
      summary: 'Achieved significant regional expansion, establishing strategic partnerships across the Horn of Africa.',
      content: 'Our expansion strategy focused on building strong local partnerships while maintaining our core values of quality, integrity, and community development. We now operate in 5 major cities across the region, reaching 100+ strategic partners and creating employment opportunities for over 400 permanent and contract employees. This growth represents our commitment to becoming the foremost business partner in the Horn of Africa.',
      images: [
        { title: 'Regional Presence', description: 'Expanding across the Horn of Africa', content: 'Establishing operations in 5 major cities across the region, building a comprehensive network of business partnerships.' },
        { title: 'Strategic Alliances', description: 'Building lasting business relationships', content: 'Developing over 100 strategic partnerships that drive mutual growth and regional economic development.' },
        { title: 'Employment Growth', description: 'Creating opportunities for 400+ employees', content: 'Generating meaningful employment opportunities while contributing to regional economic development and community growth.' }
      ]
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
      }, 4000 + index * 500)
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
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border animate-fade-in"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10 hover:scale-110 transition-transform duration-200">
                    <span className="text-primary-foreground font-inter font-bold text-sm">
                      {item.year}
                    </span>
                  </div>
                  
                  <div className="ml-8 flex-1">
                    <div className="bg-white border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                      {/* Image Slideshow */}
                      <div className="w-full h-64 bg-gradient-to-br from-secondary to-muted border-b border-border overflow-hidden relative">
                        <div 
                          key={currentImageIndex[index]}
                          className="w-full h-full flex items-center justify-center animate-fade-in"
                        >
                          <div className="text-center space-y-4 p-6">
                            <div className="w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center">
                              <span className="text-primary font-marcellus text-2xl">{item.year}</span>
                            </div>
                            <h4 className="font-marcellus text-xl text-foreground">
                              {item.images[currentImageIndex[index]].title}
                            </h4>
                            <p className="text-muted-foreground font-inter text-sm">
                              {item.images[currentImageIndex[index]].description}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Accordion type="single" collapsible className="p-6">
                        <AccordionItem value={`item-${index}`} className="border-none">
                          <AccordionTrigger className="hover:no-underline text-left p-0 group">
                            <div className="w-full">
                              <h3 className="font-marcellus text-2xl font-normal text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                                {item.title}
                              </h3>
                              <p className="text-muted-foreground font-inter leading-relaxed">
                                {item.summary}
                              </p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4">
                            <div className="space-y-4">
                              <p className="text-muted-foreground font-inter leading-relaxed">
                                {item.content}
                              </p>
                              <div 
                                key={`content-${currentImageIndex[index]}`}
                                className="bg-secondary border border-border p-4 animate-fade-in"
                              >
                                <h5 className="font-inter font-semibold text-foreground mb-2">
                                  {item.images[currentImageIndex[index]].title}
                                </h5>
                                <p className="text-muted-foreground font-inter text-sm">
                                  {item.images[currentImageIndex[index]].content}
                                </p>
                              </div>
                            </div>
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
