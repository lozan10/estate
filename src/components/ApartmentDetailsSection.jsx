import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../contexts/DataContext";

const ApartmentDetailsSection = () => {
  const { apartments, sectionSettings, loading } = useData();
  
  // Get section settings
  const settings = sectionSettings?.apartmentPlans || {
    title: "Property Plans & Layouts",
    subtitle: "Choose from our range of carefully designed property plans."
  };

  // Helper function to get display label
  const getDisplayLabel = (bedrooms) => {
    if (bedrooms === 0) return 'Studio';
    if (bedrooms === 1) return '1 Room';
    if (bedrooms === 2) return '2 Bedrooms';
    if (bedrooms === 3) return '3 Bedrooms';
    return `${bedrooms} Bedrooms`;
  };

  // Filter and limit to first 4 apartments
  const displayApartments = apartments.slice(0, 4);
  
  // Set initial active based on first apartment
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (displayApartments.length > 0 && !active) {
      setActive(displayApartments[0].id.toString());
    }
  }, [displayApartments, active]);

  if (loading) {
    return (
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A0072] mx-auto mb-4"></div>
          <p className="text-stone-600">Loading property plans...</p>
        </div>
      </section>
    );
  }

  if (!displayApartments || displayApartments.length === 0) {
    return (
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-stone-600">No property plans available.</p>
        </div>
      </section>
    );
  }

  const currentApartment = displayApartments.find(apt => apt.id.toString() === active) || displayApartments[0];

  return (
    <section className="bg-white text-black py-20 px-6">
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif tracking-wide">
          {settings.title}
        </h2>
        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#300049]">
          {settings.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Menu */}
        <div className="relative space-y-2 text-left p-6 rounded-xl bg-white/30 backdrop-blur-md shadow-md">
          {displayApartments.map((apt) => {
            const isActive = active === apt.id.toString();
            const label = getDisplayLabel(apt.bedrooms !== undefined ? apt.bedrooms : 0);
            
            return (
              <div key={apt.id} className="relative">
                <button
                  onClick={() => setActive(apt.id.toString())}
                  className={`group relative block w-full text-left font-light tracking-widest uppercase px-3 py-2 transition-all duration-300 ${
                    isActive
                      ? "text-black font-medium"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {label}

                  {/* Active underline only */}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#300049] via-[#300049] to-[#4A0072] overflow-hidden"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
                    </motion.div>
                  )}

                  {/* Hover underline for inactive */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Center Floor Plan */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentApartment.id}
              src={currentApartment.floor_plan || currentApartment.image}
              alt={`${currentApartment.name} Floor Plan`}
              className="object-contain w-full max-w-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
        </div>

        {/* Right Details */}
        <div className="text-left space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="divide-y divide-gray-200">
                <div className="flex justify-between py-2 uppercase text-sm tracking-[0.2em]">
                  <span>Bedrooms</span>
                  <span className="font-medium tracking-normal">
                    {currentApartment.bedrooms !== undefined ? currentApartment.bedrooms : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between py-2 uppercase text-sm tracking-[0.2em]">
                  <span>Bathrooms</span>
                  <span className="font-medium tracking-normal">
                    {currentApartment.bathrooms || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between py-2 uppercase text-sm tracking-[0.2em]">
                  <span>Area</span>
                  <span className="font-medium tracking-normal">
                    {currentApartment.area || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between py-2 uppercase text-sm tracking-[0.2em]">
                  <span>Parking</span>
                  <span className="font-medium tracking-normal">
                    {currentApartment.parking || currentApartment.category || 'Yes'}
                  </span>
                </div>
              </div>

              {/* Description + Button animate in sync */}
              <motion.div
                key={`${active}-desc`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-4"
              >
                <p className="text-gray-600 leading-relaxed">
                  {currentApartment.description}
                </p>
                
                {currentApartment.price && (
                  <div className="text-xl font-medium text-[#300049] mb-2">
                    {currentApartment.price}
                  </div>
                )}

                {currentApartment.amenities && currentApartment.amenities.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-stone-800 text-sm uppercase tracking-wide">Key Features:</h4>
                    <div className="space-y-1">
                      {currentApartment.amenities.slice(0, 4).map((amenity, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-[#300049] rounded-full mr-2"></div>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button className="border border-[#4A0072] text-[#4A0072] px-8 py-3 uppercase tracking-[0.25em] hover:bg-[#4A0072] hover:text-white transition">
                  Schedule Viewing
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ApartmentDetailsSection;
