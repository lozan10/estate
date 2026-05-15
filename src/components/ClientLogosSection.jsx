import React from 'react';
import { mockData } from '../data/mock';

const ClientLogosSection = () => {
  return (
    <section className="py-16 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-stone-600 text-sm uppercase tracking-wide">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
          </p>
        </div>

        {/* Client Logos Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {mockData.clientLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 w-32 h-16 mx-8 flex items-center justify-center">
                <div className="w-20 h-12 bg-stone-200 rounded opacity-60 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-stone-600 text-xs font-semibold">LOGO</span>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {mockData.clientLogos.map((logo, index) => (
              <div key={`dup-${index}`} className="flex-shrink-0 w-32 h-16 mx-8 flex items-center justify-center">
                <div className="w-20 h-12 bg-stone-200 rounded opacity-60 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-stone-600 text-xs font-semibold">LOGO</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;