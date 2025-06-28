
import React from 'react';

const LeadershipSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="w-full h-[500px] bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/10 mx-auto flex items-center justify-center">
                  <span className="text-primary font-marcellus text-3xl">CEO</span>
                </div>
                <p className="text-muted-foreground font-inter text-sm">Leadership Portrait</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="space-y-8">
            <div>
              <blockquote className="font-marcellus text-2xl font-normal text-foreground leading-relaxed mb-8">
                "Our success is measured by the value we bring to our employees, partners, and clients. We foster strategic partnerships based on trust, transparency, and mutual benefit."
              </blockquote>
            </div>
            
            <div className="border-t border-border pt-8">
              <h4 className="font-inter font-semibold text-foreground text-lg">Chief Executive Officer</h4>
              <p className="text-muted-foreground font-inter">Bella International Business</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
