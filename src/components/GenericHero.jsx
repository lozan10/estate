import React from 'react';
import { ChevronDown } from 'lucide-react';

const GenericHero = ({ title, description, backgroundImage }) => {
  return (
    <section className="relative h-[50vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src={backgroundImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light title-font mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          {description}
        </p>
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

export default GenericHero;