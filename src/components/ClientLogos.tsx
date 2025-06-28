
import React from 'react';

const ClientLogos = () => {
  return (
    <section className="bg-slate-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-48 h-4 bg-gray-300 rounded mx-auto"></div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">PARTNERS SECTION TITLE</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex flex-col items-center">
              <div className="w-20 h-12 bg-gray-400 rounded"></div>
              <span className="text-xs bg-gray-200 px-1 py-0.5 rounded mt-1">LOGO {item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
