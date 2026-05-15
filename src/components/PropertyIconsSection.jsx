import React from 'react';
import { mockData } from '../data/mock';
import { 
  Building, 
  Leaf, 
  Star, 
  Info, 
  Phone, 
  HelpCircle 
} from 'lucide-react';

const iconMap = {
  building: Building,
  leaf: Leaf,
  star: Star,
  info: Info,
  phone: Phone,
  'help-circle': HelpCircle
};

const PropertyIconsSection = () => {
  return (
    <section className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {mockData.propertyIcons.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            
            return (
              <div key={index} className="text-center group cursor-pointer">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <IconComponent className="w-8 h-8 text-stone-600 group-hover:text-[#300049] transition-colors duration-300" />
                  </div>
                </div>
                
                <h4 className="text-sm font-medium text-stone-800 uppercase tracking-wide title-font">
                  {item.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropertyIconsSection;