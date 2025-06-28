
import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-40 h-4 bg-gray-400 rounded mx-auto mb-4"></div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">SECTION LABEL</span>
          
          <div className="w-1/3 h-10 bg-gray-500 rounded mx-auto mt-6"></div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">TESTIMONIALS TITLE</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-8 h-6 bg-gray-400 rounded mb-4"></div>
              <span className="text-xs bg-gray-200 px-1 py-0.5 rounded">QUOTE MARK</span>
              
              <div className="mt-4 space-y-3">
                <div className="w-full h-3 bg-gray-400 rounded"></div>
                <div className="w-5/6 h-3 bg-gray-400 rounded"></div>
                <div className="w-4/5 h-3 bg-gray-400 rounded"></div>
              </div>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">TESTIMONIAL TEXT</span>
              
              <div className="flex items-center mt-6">
                <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                <div className="ml-4">
                  <div className="w-24 h-4 bg-gray-500 rounded mb-1"></div>
                  <div className="w-20 h-3 bg-gray-400 rounded"></div>
                  <span className="text-xs bg-gray-200 px-1 py-0.5 rounded ml-2">CLIENT {item}</span>
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
