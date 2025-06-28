
import React from 'react';

const BusinessSectors = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-32 h-4 bg-gray-400 rounded mx-auto mb-4"></div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">SECTION LABEL</span>
          
          <div className="w-1/2 h-10 bg-gray-500 rounded mx-auto mt-6"></div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">SECTORS HEADLINE</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'REAL ESTATE', number: '01' },
            { label: 'HEALTHCARE', number: '02' },
            { label: 'AGRI-BUSINESS', number: '03' },
            { label: 'AUTOMOTIVES', number: '04' }
          ].map((sector, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-right">
                <div className="w-8 h-6 bg-gray-400 rounded mb-4 ml-auto"></div>
                <span className="text-xs bg-gray-200 px-1 py-0.5 rounded">{sector.number}</span>
              </div>
              
              <div className="w-3/4 h-6 bg-gray-500 rounded mb-4"></div>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">{sector.label}</span>
              
              <div className="mt-4 space-y-2">
                <div className="w-full h-3 bg-gray-400 rounded"></div>
                <div className="w-5/6 h-3 bg-gray-400 rounded"></div>
                <div className="w-4/5 h-3 bg-gray-400 rounded"></div>
              </div>
              <span className="text-xs bg-gray-200 px-1 py-0.5 rounded mt-2 inline-block">DESCRIPTION</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSectors;
