
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const testimonials = [
  {
    quote: "Bella International's commitment to excellence and strategic approach has been instrumental in our successful partnership across multiple sectors.",
    client: "Strategic Partner",
    company: "Real Estate Division",
    fullTestimonial: "Working with Bella International has transformed our approach to real estate development in Ethiopia. Their deep market knowledge, strategic partnerships, and commitment to excellence have been instrumental in our successful ventures.",
    avatar: "photo-1472099645785-5658abf4ff4e"
  },
  {
    quote: "Their research-focused methodology and ethical foundation make them the ideal partner for long-term business relationships in Horn of Africa.",
    client: "Healthcare Partner",
    company: "Medical Services",
    fullTestimonial: "Bella International's healthcare division has been pivotal in establishing our medical facilities across Ethiopia. Their research-focused methodology ensures mutual benefit and long-term success.",
    avatar: "photo-1559757148-5c350d0d3c56"
  },
  {
    quote: "The quality and speed of their operations, combined with their inclusive approach, sets them apart in the competitive business landscape.",
    client: "Agri-Business Client",
    company: "Agricultural Solutions",
    fullTestimonial: "Our partnership with Bella International's Acha Forest Coffee division has revolutionized our agricultural operations with sustainable practices and fair compensation.",
    avatar: "photo-1507003211169-0a1dd7228f2d"
  },
  {
    quote: "Working with Bella International has transformed our automotive operations through their innovative solutions and strategic partnerships.",
    client: "Automotive Partner",
    company: "Fleet Management",
    fullTestimonial: "Bella International's automotive division has completely transformed our fleet management operations in Ethiopia, reducing operational costs by 30%.",
    avatar: "photo-1519085360753-af0119f7cbe7"
  }
];

const TestimonialsGrid = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white border border-border p-6 space-y-4 cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={() => setSelectedTestimonial(i)}
          >
            <div className="text-primary text-3xl font-marcellus leading-none">"</div>
            <blockquote className="text-muted-foreground font-inter text-sm leading-relaxed line-clamp-3">
              {t.quote}
            </blockquote>
            <div className="flex items-center space-x-3 pt-3 border-t border-border">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(https://images.unsplash.com/${t.avatar}?auto=format&fit=crop&w=100&q=80)` }}
                />
              </div>
              <div>
                <div className="font-inter font-semibold text-foreground text-sm">{t.client}</div>
                <div className="text-muted-foreground font-inter text-xs">{t.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selectedTestimonial !== null} onOpenChange={() => setSelectedTestimonial(null)}>
        <DialogContent className="max-w-2xl">
          {selectedTestimonial !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="font-marcellus text-2xl text-foreground">
                  Client Success Story
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-primary text-4xl font-marcellus">"</div>
                <blockquote className="text-muted-foreground font-inter leading-relaxed text-base">
                  {testimonials[selectedTestimonial].fullTestimonial}
                </blockquote>
                <div className="flex items-center space-x-4 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(https://images.unsplash.com/${testimonials[selectedTestimonial].avatar}?auto=format&fit=crop&w=200&q=80)` }}
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
    </>
  );
};

export default TestimonialsGrid;
export { TestimonialsGrid };
