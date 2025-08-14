
import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';

const EventBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute top-1/2 right-0 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white rounded-full translate-y-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Event Content */}
          <div className="space-y-6">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">EXCLUSIVE EVENT</span>
            </div>
            
            <div>
              <h2 className="font-marcellus text-4xl lg:text-5xl font-normal mb-4 leading-tight">
                Business Excellence Summit 2025
              </h2>
              <p className="text-primary-foreground/90 font-inter text-lg leading-relaxed">
                Join industry leaders and visionaries for an exclusive gathering at Bella International Business headquarters. 
                Discover emerging opportunities, network with key stakeholders, and shape the future of business in the Horn of Africa.
              </p>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <Calendar className="w-5 h-5 text-primary-foreground" />
                <div>
                  <p className="font-semibold">August 24, 2025</p>
                  <p className="text-sm text-primary-foreground/80">Sunday</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <Clock className="w-5 h-5 text-primary-foreground" />
                <div>
                  <p className="font-semibold">9:00 AM - 5:00 PM</p>
                  <p className="text-sm text-primary-foreground/80">Full Day Event</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg sm:col-span-2">
                <MapPin className="w-5 h-5 text-primary-foreground flex-shrink-0" />
                <div>
                  <p className="font-semibold">Bella International Business Headquarters</p>
                  <p className="text-sm text-primary-foreground/80">Addis Ababa, Ethiopia</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg sm:col-span-2">
                <Users className="w-5 h-5 text-primary-foreground" />
                <div>
                  <p className="font-semibold">Limited Seating - 150 Attendees</p>
                  <p className="text-sm text-primary-foreground/80">By invitation only</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-inter font-semibold px-8 py-4 rounded-none hover:scale-105 transition-all duration-200"
              >
                Reserve Your Spot
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-primary-foreground hover:bg-white/10 font-inter font-medium px-8 py-4 rounded-none backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Event Visual */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              {/* Event Highlights */}
              <div className="space-y-6">
                <h3 className="font-marcellus text-2xl font-normal mb-6">Event Highlights</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Keynote Presentations</h4>
                      <p className="text-sm text-primary-foreground/80">Industry insights from regional leaders</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Networking Sessions</h4>
                      <p className="text-sm text-primary-foreground/80">Connect with peers and potential partners</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Investment Opportunities</h4>
                      <p className="text-sm text-primary-foreground/80">Exclusive access to emerging ventures</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Panel Discussions</h4>
                      <p className="text-sm text-primary-foreground/80">Deep dives into market trends and future outlook</p>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer Placeholder */}
                <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-center text-sm text-primary-foreground/80 mb-2">Event starts in</p>
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">45</div>
                      <div className="text-xs">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">30</div>
                      <div className="text-xs">Minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
