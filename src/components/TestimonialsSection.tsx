
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Bella International's commitment to excellence and strategic approach has been instrumental in our successful partnership across multiple sectors.",
      client: "Strategic Partner",
      company: "Real Estate Division"
    },
    {
      quote: "Their research-focused methodology and ethical foundation make them the ideal partner for long-term business relationships in Eastern Africa.",
      client: "Healthcare Partner", 
      company: "Medical Services"
    },
    {
      quote: "The quality and speed of their operations, combined with their inclusive approach, sets them apart in the competitive business landscape.", 
      client: "Agri-Business Client",
      company: "Agricultural Solutions"
    },
    {
      quote: "Working with Bella International has transformed our automotive operations through their innovative solutions and strategic partnerships.",
      client: "Automotive Partner",
      company: "Fleet Management"
    }
  ];

  return (
    <section className="bg-secondary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">Success Stories</p>
          <h2 className="font-marcellus text-4xl font-normal text-foreground leading-tight">
            Client Testimonials
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border border-border p-8 space-y-6">
              <div className="text-primary text-4xl font-marcellus leading-none">"</div>
              
              <blockquote className="text-muted-foreground font-inter leading-relaxed text-base">
                {testimonial.quote}
              </blockquote>
              
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-marcellus text-sm">
                    {testimonial.client.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-inter font-semibold text-foreground">{testimonial.client}</div>
                  <div className="text-muted-foreground font-inter text-sm">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
