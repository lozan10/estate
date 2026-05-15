import React from 'react';
import { mockData } from '../data/mock';
import { 
  Home, 
  Leaf, 
  Heart, 
  MapPin, 
  Smartphone, 
  Award 
} from 'lucide-react';

const iconMap = {
  home: Home,
  leaf: Leaf,
  heart: Heart,
  'map-pin': MapPin,
  smartphone: Smartphone,
  award: Award
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#300049] text-xs uppercase tracking-[0.3em] mb-3">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-4">
            What Makes Us Different
          </h2>
          <div className="w-12 h-px bg-[#300049] mx-auto"></div>
        </div>
        <div className="grid grid-cols-3 gap-12">
          {mockData.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            
            return (
              <div key={index} className="text-center group">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300" style={{ backgroundColor: 'rgba(213,180,231,0.18)', boxShadow: '0 0 0 0 rgba(213,180,231,0)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor='rgba(213,180,231,0.32)'} onMouseLeave={e => e.currentTarget.style.backgroundColor='rgba(213,180,231,0.18)'}>
                    <IconComponent className="w-8 h-8 text-[#300049]" />
                  </div>
                </div>
                
                <h3 className="text-xl font-medium text-stone-800 mb-4 title-font">
                  {feature.title}
                </h3>
                
                <p className="text-stone-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;