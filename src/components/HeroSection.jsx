import React from 'react';
import { Link } from 'react-router-dom';
import ScrollExpandMedia from './ui/scroll-expansion-hero';

const HeroSection = () => {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="https://ik.imagekit.io/hqhiltiie/Nyinimu/done%20house/e868422d41c58b6b0bd8ee693e691380.jpg?updatedAt=1760196217960"
      bgImageSrc="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80"
      title="BONGO ESTATES"
      date="Dar es Salaam, Tanzania"
      scrollToExpand="Scroll to discover your home"
    >
      {/* CTA content shown after full expansion */}
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[#300049] text-xs uppercase tracking-[0.3em] mb-4">
          Daily Payments · Your Home · Own Forever
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-5 title-font leading-tight">
          The Dream of Owning a Home<br className="hidden md:block" /> in Tanzania is Now Within Reach
        </h2>
        <p className="text-stone-500 text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Whether you're a DJ, salon operator, or market vendor — we understand your
          unique income patterns and make homeownership accessible for every Tanzanian.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/properties">
            <button className="px-8 py-3 bg-[#300049] text-white text-xs uppercase tracking-widest hover:bg-[#4A0072] transition-colors duration-300">
              View Properties
            </button>
          </Link>
          <Link to="/how-it-works">
            <button className="px-8 py-3 border border-[#300049] text-[#300049] text-xs uppercase tracking-widest hover:bg-[#300049] hover:text-white transition-all duration-300">
              How It Works
            </button>
          </Link>
        </div>
      </div>
    </ScrollExpandMedia>
  );
};

export default HeroSection;
