
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const AnimatedAboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with gradient overlay */}
          <div className="relative h-[500px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80)`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-marcellus text-2xl">Building Excellence</h3>
              <p className="font-inter text-sm text-white/80">Across Horn of Africa</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">About Us</p>
              <h2 className="font-marcellus text-4xl font-normal text-foreground leading-tight mb-6">
                Building Excellence Across Horn of Africa
              </h2>
              <p className="text-muted-foreground font-inter text-lg leading-relaxed">
                At Bella International Business, we are committed to realizing our vision by building a highly motivated, research-focused workforce dedicated to cultivating long-term relationships with our strategic partners and the communities we serve.
              </p>
            </div>

            <div>
              <Link to="/our-story">
                <Button
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background font-inter font-medium px-8 py-3 rounded-none"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedAboutSection;
