import React from 'react';
import { mockData } from '../data/mock';
import ZoomParallaxSection from './ZoomParallaxSection';

const StatsSection = () => {
  return (
    <section className="bg-stone-50">
      <ZoomParallaxSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {mockData.stats.map((stat, index) => (
                <div key={index} className="text-center relative">
                  {/* Large faded background number */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-thin text-stone-200 opacity-30 leading-none">
                      {stat.number}
                    </span>
                  </div>
                  
                  {/* Foreground content */}
                  <div className="relative z-10 pt-8 pb-4">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-light text-[#300049] block mb-8">
                      {stat.number}
                    </span>
                    <h3 className="text-xs md:text-sm font-medium text-stone-700 uppercase tracking-[0.2em]">
                      {stat.label}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
