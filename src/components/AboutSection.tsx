
import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <div className="w-16 h-4 bg-gray-400 rounded mb-4"></div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">SECTION LABEL</span>
            
            <div className="w-3/4 h-10 bg-gray-500 rounded mt-6 mb-6"></div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">SECTION HEADLINE</span>
            
            <div className="mt-6 space-y-3">
              <div className="w-full h-4 bg-gray-400 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
              <div className="w-4/5 h-4 bg-gray-400 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-400 rounded"></div>
            </div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded ml-2">ABOUT CONTENT</span>
            
            <div className="mt-8">
              <div className="w-24 h-10 bg-gray-600 rounded"></div>
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">LEARN MORE BTN</span>
            </div>
          </div>
          
          {/* Right side - Features/Values */}
          <div className="space-y-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-400 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="w-3/4 h-5 bg-gray-500 rounded mb-2"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gray-400 rounded"></div>
                    <div className="w-4/5 h-3 bg-gray-400 rounded"></div>
                  </div>
                  <span className="text-xs bg-gray-200 px-1 py-0.5 rounded mt-1 inline-block">VALUE {item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
