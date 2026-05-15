import React from 'react';
import { ChevronDown } from 'lucide-react';

const HowItWorksHero = () => {
  return (
    <section className="relative h-[50vh] overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/how-it-works-bg.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            How It Works
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Discover our simple and transparent process to make your homeownership dreams a reality.
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-white">
          <div className="w-10 h-10 border border-white flex items-center justify-center mb-2 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksHero;