
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="w-3/4 h-12 bg-gray-500 rounded mb-6"></div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">MAIN HEADLINE</span>
            
            <div className="mt-6 space-y-3">
              <div className="w-full h-4 bg-gray-400 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
              <div className="w-4/5 h-4 bg-gray-400 rounded"></div>
            </div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded ml-2">DESCRIPTION TEXT</span>
            
            <div className="mt-8">
              <div className="w-32 h-10 bg-gray-600 rounded"></div>
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">PRIMARY CTA</span>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-8 bg-gray-500 rounded mx-auto mb-2"></div>
                <div className="w-20 h-3 bg-gray-400 rounded mx-auto"></div>
                <span className="text-xs bg-gray-200 px-1 py-0.5 rounded">STAT 1</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-8 bg-gray-500 rounded mx-auto mb-2"></div>
                <div className="w-20 h-3 bg-gray-400 rounded mx-auto"></div>
                <span className="text-xs bg-gray-200 px-1 py-0.5 rounded">STAT 2</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-8 bg-gray-500 rounded mx-auto mb-2"></div>
                <div className="w-20 h-3 bg-gray-400 rounded mx-auto"></div>
                <span className="text-xs bg-gray-200 px-1 py-0.5 rounded">STAT 3</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="relative">
            <div className="w-full h-96 bg-gray-400 rounded-lg"></div>
            <span className="absolute top-4 left-4 text-xs bg-white px-2 py-1 rounded shadow">HERO IMAGE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
