
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const TestimonialsSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);

  const testimonials = [
    {
      quote: "Bella International's commitment to excellence and strategic approach has been instrumental in our successful partnership across multiple sectors.",
      client: "Strategic Partner",
      company: "Real Estate Division",
      fullTestimonial: "Working with Bella International has transformed our approach to real estate development in Ethiopia. Their deep market knowledge, strategic partnerships, and commitment to excellence have been instrumental in our successful ventures across multiple sectors. From initial market research to project completion, their team demonstrated unparalleled professionalism and delivered results that exceeded our expectations. The quality of their work and their ethical approach to business makes them our preferred partner for all Ethiopian market opportunities.",
      industry: "Real Estate Development",
      projectValue: "$2.5M+",
      duration: "18 months",
      image: "photo-1560518883-ce09059eeffa",
      avatar: "photo-1472099645785-5658abf4ff4e"
    },
    {
      quote: "Their research-focused methodology and ethical foundation make them the ideal partner for long-term business relationships in Horn of Africa.",
      client: "Healthcare Partner", 
      company: "Medical Services",
      fullTestimonial: "Bella International's healthcare division has been pivotal in establishing our medical facilities across Ethiopia. Their research-focused methodology, combined with their deep understanding of local healthcare needs, enabled us to create sustainable medical services that truly serve the community. The ethical foundation they bring to every partnership ensures mutual benefit and long-term success. Their expertise in healthcare management and strategic planning has made them our trusted partner in the Horn of Africa region.",
      industry: "Healthcare Services",
      projectValue: "$1.8M+", 
      duration: "24 months",
      image: "photo-1576091160399-112ba8d25d1f",
      avatar: "photo-1559757148-5c350d0d3c56"
    },
    {
      quote: "The quality and speed of their operations, combined with their inclusive approach, sets them apart in the competitive business landscape.",
      client: "Agri-Business Client",
      company: "Agricultural Solutions",
      fullTestimonial: "Our partnership with Bella International's Acha Forest Coffee division has revolutionized our agricultural operations. The quality and speed of their operations, combined with their inclusive approach to working with local farmers, sets them apart in the competitive agricultural landscape. They've helped us establish sustainable coffee cultivation practices while ensuring fair compensation for all stakeholders. Their expertise in supply chain optimization and international market access has opened new opportunities we never thought possible.",
      industry: "Coffee & Agriculture",
      projectValue: "$950K+",
      duration: "12 months",
      image: "photo-1618160702438-9b02ab6515c9",
      avatar: "photo-1507003211169-0a1dd7228f2d"
    },
    {
      quote: "Working with Bella International has transformed our automotive operations through their innovative solutions and strategic partnerships.",
      client: "Automotive Partner",
      company: "Fleet Management",
      fullTestimonial: "Bella International's automotive division has completely transformed our fleet management operations in Ethiopia. Their innovative solutions and strategic partnerships have enabled us to optimize our transportation infrastructure while reducing operational costs by 30%. Their comprehensive approach to automotive solutions, from procurement to maintenance, has streamlined our operations and improved service delivery. The strategic partnerships they've facilitated have opened new market opportunities and enhanced our competitive position in the region.",
      industry: "Transportation & Logistics",
      projectValue: "$3.2M+",
      duration: "30 months",
      image: "photo-1449824913935-59a10b8d2000",
      avatar: "photo-1519085360753-af0119f7cbe7"
    }
  ];

  return (
    <section className="bg-secondary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4 animate-fade-in">Success Stories</p>
          <h2 className="font-marcellus text-4xl font-normal text-foreground leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Client Testimonials
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white border border-border p-8 space-y-6 cursor-pointer hover:border-primary/30 hover:shadow-xl transition-all duration-500 group transform hover:scale-105 animate-fade-in overflow-hidden relative"
              onClick={() => setSelectedTestimonial(index)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(https://images.unsplash.com/${testimonial.image}?auto=format&fit=crop&w=800&q=80)` 
                  }}
                />
              </div>
              
              <div className="relative z-10">
                <div className="text-primary text-4xl font-marcellus leading-none group-hover:scale-110 transition-transform duration-300">"</div>
                
                <blockquote className="text-muted-foreground font-inter leading-relaxed text-base group-hover:text-foreground/90 transition-colors duration-300">
                  {testimonial.quote}
                </blockquote>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 relative overflow-hidden rounded-full group-hover:scale-110 transition-transform duration-300">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(https://images.unsplash.com/${testimonial.avatar}?auto=format&fit=crop&w=200&q=80)` 
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-inter font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{testimonial.client}</div>
                      <div className="text-muted-foreground font-inter text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                  <div className="text-muted-foreground font-inter text-xs group-hover:text-primary transition-colors duration-300 transform group-hover:translate-x-1">
                    Click to read more →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Dialog */}
        <Dialog open={selectedTestimonial !== null} onOpenChange={() => setSelectedTestimonial(null)}>
          <DialogContent className="max-w-2xl">
            {selectedTestimonial !== null && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-marcellus text-2xl text-foreground">
                    Client Success Story
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="text-primary text-4xl font-marcellus leading-none">"</div>
                  
                  <blockquote className="text-muted-foreground font-inter leading-relaxed text-lg">
                    {testimonials[selectedTestimonial].fullTestimonial}
                  </blockquote>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
                    <div>
                      <div className="font-inter font-semibold text-foreground text-sm">Project Value</div>
                      <div className="text-primary font-inter">{testimonials[selectedTestimonial].projectValue}</div>
                    </div>
                    <div>
                      <div className="font-inter font-semibold text-foreground text-sm">Duration</div>
                      <div className="text-primary font-inter">{testimonials[selectedTestimonial].duration}</div>
                    </div>
                    <div>
                      <div className="font-inter font-semibold text-foreground text-sm">Industry</div>
                      <div className="text-primary font-inter">{testimonials[selectedTestimonial].industry}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="w-12 h-12 relative overflow-hidden rounded-full">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(https://images.unsplash.com/${testimonials[selectedTestimonial].avatar}?auto=format&fit=crop&w=200&q=80)` 
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-inter font-semibold text-foreground">{testimonials[selectedTestimonial].client}</div>
                      <div className="text-muted-foreground font-inter text-sm">{testimonials[selectedTestimonial].company}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TestimonialsSection;
