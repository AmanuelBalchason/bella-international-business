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
      year: '1956',
      title: 'The Seed of a Vision',
      summary: 'Yeshitla planted the first seeds of our legacy with a simple handful of corn and a profound question about lasting value.',
      content: 'Yeshitla, then a businessman, found himself at a crossroads. He sought to build something meaningful, asking himself, "What is a business I can do that lasts? Something I can pass down to my children?" One night, guided by a simple, industrious spirit, he took a small handful of corn and sowed it. Months later, he returned to that very spot to find a flourishing, fruitful patch, bursting with life from just those few seeds. This was his sign. He decided farming was the path forward, and using what little money he had saved from his business days, he began his new journey.',
      images: [
        { title: 'The First Seeds', description: 'Yeshitla sowing the seeds of legacy', content: 'A symbolic beginning with a handful of corn that would grow into a multi-generational enterprise.' },
        { title: 'Artisanal Beginning', description: 'Hands-on approach to farming', content: 'Yeshitla personally introducing diverse crops and learning the secrets of the land in Bildima.' },
        { title: 'Community Bonds', description: 'Building relationships with local workers', content: 'Establishing the core values of kindness and community through exceptional generosity and respect.' }
      ]
    },
    {
      year: '1966',
      title: 'The Great Trial',
      summary: 'Facing immense challenges during the Derg regime, our foundation was tested but never broken.',
      content: 'A period of immense challenge arrived with the Derg regime. In 1966, Yeshitla lost a significant, heartbreaking portion of his beloved farm. This event tested the very foundations of his vision, his resilience, and his belief in his chosen path. In the years that followed, as the Derg introduced a new "mixed economy," Yeshitla had to navigate a complex and often difficult landscape. He operated alongside contemporary businessmen like Ras Masfin and Sileshi, but his focus remained unchanged: his work and his people.',
      images: [
        { title: 'Resilience Tested', description: 'Navigating challenging times', content: 'Yeshitla maintaining focus on his people and work despite significant land loss and economic changes.' },
        { title: 'Community Respect', description: 'Earning admiration from neighbors', content: 'Solidifying reputation through unwavering hard work and profound kindness in adversity.' },
        { title: 'Industrial Spirit', description: 'Perseverance in difficult landscape', content: 'Operating with integrity and character that earned respect from all neighboring farm owners.' }
      ]
    },
    {
      year: '1981',
      title: 'The Reward of Resilience',
      summary: 'Perseverance and integrity led to the successful reclamation of our ancestral land.',
      content: 'Yeshitla\'s perseverance, integrity, and the deep respect he had earned from his community paid off exceptionally well. In 1981, he successfully reclaimed 10,000 hectares of his farm. This moment was more than a recovery; it was the ultimate proof that an ethos rooted in kindness and relentless hard work could endure even the greatest trials. It\'s a legacy that is still paying dividends to this day.',
      images: [
        { title: 'Land Reclaimed', description: 'Triumph of perseverance', content: 'The successful reclamation of 10,000 hectares, proving the power of kindness and hard work.' },
        { title: 'Heritage Preserved', description: 'Restoring family legacy', content: 'Reclaiming the farm that would become the exclusive home of Acha Forest Coffee.' },
        { title: 'Community Victory', description: 'Shared success with workers', content: 'A moment celebrated with the community that supported Yeshitla through difficult times.' }
      ]
    },
    {
      year: '2000',
      title: 'Legacy Blooms: Acha Forest Coffee',
      summary: 'Our reclaimed land becomes the exclusive home of world-class, single-origion specialty coffee.',
      content: 'That cherished, reclaimed 10,000-hectare farm is the heart of our heritage. Today, it is the exclusive home of Acha Forest Coffee, where we produce world-class, single-source specialty coffee. This land, located in the fertile Bildima region—widely celebrated as the very birthplace of coffee—is a living testament to Yeshitla\'s original artisanal vision. Our coffee division was built on principles of fair trade and environmental sustainability, connecting us directly to Ethiopia\'s legendary coffee origins.',
      images: [
        { title: 'Coffee Heritage', description: 'Birthplace of legendary coffee', content: 'Establishing operations in Bildima, the legendary birthplace of coffee, honoring rich Ethiopian coffee culture.' },
        { title: 'Sustainable Farming', description: 'Eco-friendly cultivation methods', content: 'Working with local farmers to develop sustainable practices that protect the environment while producing premium coffee.' },
        { title: 'Global Recognition', description: 'World-class specialty coffee', content: 'Producing single-source coffee that brings Ethiopian coffee heritage to discerning international markets.' }
      ]
    },
    {
      year: '2015',
      title: 'Vision Flourishes: Bella International',
      summary: 'The seed planted in 1956 grows into a modern multi-sector enterprise across Ethiopia.',
      content: 'The story does not end there. That same seed of industriousness planted in 1956 has flourished into the modern Bella International. Guided by the foundational values of Yeshitla and the forward-looking stewardship of Abel Yeshitla, the enterprise has grown far beyond the farm. We now apply that same ethos of hard work, community, and kindness to diverse new sectors, including automotive, healthcare, and real estate across Ethiopia.',
      images: [
        { title: 'Multi-Sector Growth', description: 'Expanding beyond agriculture', content: 'Applying Yeshitla\'s ethos to automotive, healthcare, and real estate sectors across Ethiopia.' },
        { title: 'Modern Leadership', description: 'Stewardship of Abel Yeshitla', content: 'Forward-looking leadership that honors traditional values while embracing modern business practices.' },
        { title: 'Ethos in Action', description: 'Values driving expansion', content: 'Hard work, community, and kindness as the foundation for diverse business ventures.' }
      ]
    },
    {
      year: 'Present',
      title: 'Guiding the Legacy',
      summary: 'The founding ethos continues through dedicated leadership and community partnerships.',
      content: 'Today, that same ethos is championed by his descendant, Abel Yeshitla, and the rest of the leadership team, which includes Mulugeta Demissie, Chirotaw Assefa, and Temesgen Wubayehu, guiding our expansion from humble, artisanal agricultural roots into a diverse, multi-sector enterprise touching lives across Ethiopia. We now operate in 5 major cities across the region, reaching 100+ strategic partners and creating employment opportunities for over 400 permanent and contract employees.',
      images: [
        { title: 'Leadership Team', description: 'Continuing the legacy', content: 'Abel Yeshitla, Mulugeta Demissie, Chirotaw Assefa, and Temesgen Wubayehu guiding multi-sector growth.' },
        { title: 'Regional Impact', description: 'Touching lives across Ethiopia', content: 'Expanding our reach to major cities while maintaining our core values and community focus.' },
        { title: 'Future Vision', description: 'Building generational value', content: 'Creating lasting partnerships and opportunities that honor our heritage while embracing innovation.' }
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
               We celebrate a profound, multi-generational legacy that began not with grand titles,
                but with the quiet industriousness of one man, <strong>Yeshitla</strong>. His foundational ethos a deep belief in persistent hard work,
                 unwavering community values, and profound kindness is the seed from which Bella International Business has grown. Today,
                  that same ethos is championed by his descendant, <strong>Abel Yeshitla</strong>, and the rest of the leadership team, which includes <strong>Mulugeta Demissie</strong>,
                  <strong>Chirotaw Assefa</strong>, and <strong>Temesgen Wubayehu</strong>, guiding our expansion from humble, artisanal agricultural roots into a diverse, 
                   multi-sector enterprise touching lives across Ethiopia in automotive, healthcare, and real estate.
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
              Explore the pivotal moments that shaped our character, from a single handful of corn to a lasting multi-generational business.
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
                To be Ethiopia's most trusted multi-sector business, forever honoring our artisanal roots in the Bildima community while demonstrating Yeshitla's values of integrity and industriousness in everything we do—from specialty coffee to healthcare and automotive solutions.
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
                We are committed to building upon Yeshitla's foundational ethos of hard work and kindness. We strive to create lasting, generational value, to partner authentically with our communities, and to deliver excellence and care across all Bella International businesses.
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