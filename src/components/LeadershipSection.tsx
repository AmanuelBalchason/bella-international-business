
import React from 'react';

const LeadershipSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="w-full h-96 bg-gray-400 rounded-lg"></div>
            <span className="absolute top-4 left-4 text-xs bg-white px-2 py-1 rounded shadow">LEADERSHIP PHOTO</span>
          </div>
          
          {/* Right side - Content */}
          <div>
            <div className="w-3/4 h-4 bg-gray-400 rounded mb-6"></div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">LEADERSHIP QUOTE</span>
            
            <div className="mt-6 space-y-3">
              <div className="w-full h-4 bg-gray-400 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
              <div className="w-4/5 h-4 bg-gray-400 rounded"></div>
            </div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded ml-2">QUOTE CONTENT</span>
            
            <div className="mt-8">
              <div className="w-32 h-5 bg-gray-500 rounded mb-2"></div>
              <div className="w-24 h-3 bg-gray-400 rounded"></div>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">NAME & TITLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
