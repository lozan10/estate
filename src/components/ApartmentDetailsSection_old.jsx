import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ApartmentDetailsSection = () => {
  const plans = {
    Apartment: {
      img: "https://ik.imagekit.io/67mog36hf/Nyinimu/Truoba-320-house-floor-plan.png.webp?updatedAt=1758806524485",
      floor: 4,
      rooms: 4,
      area: 310,
      parking: 1,
      desc: "Spacious apartment with modern layout and open living concept.",
    },
    Simplex: {
      img: "https://ik.imagekit.io/67mog36hf/Nyinimu/simplex-plan.png?updatedAt=1758806524485",
      floor: 2,
      rooms: 3,
      area: 220,
      parking: 1,
      desc: "A cozy simplex design offering compact elegance and efficiency.",
    },
    Duplex: {
      img: "https://ik.imagekit.io/67mog36hf/Nyinimu/duplex-plan.png?updatedAt=1758806524485",
      floor: 3,
      rooms: 5,
      area: 350,
      parking: 2,
      desc: "Luxury duplex with private garden and multiple balconies.",
    },
    "Double Height": {
      img: "https://ik.imagekit.io/67mog36hf/Nyinimu/doubleheight-plan.png?updatedAt=1758806524485",
      floor: 2,
      rooms: 3,
      area: 280,
      parking: 1,
      desc: "Modern double-height living room for a grand and airy feel.",
    },
    Studio: {
      img: "https://ik.imagekit.io/67mog36hf/Nyinimu/studio-plan.png?updatedAt=1758806524485",
      floor: 1,
      rooms: 1,
      area: 90,
      parking: 0,
      desc: "Compact studio layout ideal for single living or rentals.",
    },
    Penthouse: {
      img: "https://ik.imagekit.io/67mog36hf/Nyinimu/penthouse-plan.png?updatedAt=1758806524485",
      floor: 5,
      rooms: 6,
      area: 500,
      parking: 3,
      desc: "Exclusive penthouse with rooftop terrace and premium finishes.",
    },
  };

  const [active, setActive] = useState("Apartment");
  const current = plans[active];

  return (
    <section className="bg-white text-black py-20 px-6">
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif tracking-wide">
          Apartment Plans
        </h2>
        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#b97b4f]">
          At vero eos et accusamus et iusto odio
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Menu */}
        <div className="relative space-y-2 text-left p-6 rounded-xl bg-white/30 backdrop-blur-md shadow-md">
          {Object.keys(plans).map((item) => {
            const isActive = active === item;
            return (
              <div key={item} className="relative">
                <button
                  onClick={() => setActive(item)}
                  className={`group relative block w-full text-left font-light tracking-widest uppercase px-3 py-2 transition-all duration-300 ${
                    isActive
                      ? "text-black font-medium"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {item}

                  {/* Active underline only */}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 overflow-hidden"
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
              key={current.img}
              src={current.img}
              alt={`${active} Floor Plan`}
              className="object-contain w-full max-w-md" // ✅ no shadow, no rounded, no border
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
                  <span>Floor</span>
                  <span className="font-medium tracking-normal">
                    {current.floor}
                  </span>
                </div>
                <div className="flex justify-between py-2 uppercase text-sm tracking-[0.2em]">
                  <span>Rooms</span>
                  <span className="font-medium tracking-normal">
                    {current.rooms}
                  </span>
                </div>
                <div className="flex justify-between py-2 uppercase text-sm tracking-[0.2em]">
                  <span>Area m²</span>
                  <span className="font-medium tracking-normal">
                    {current.area}
                  </span>
                </div>
                <div className="flex justify-between py-2 uppercase text-sm tracking-[0.2em]">
                  <span>Parking</span>
                  <span className="font-medium tracking-normal">
                    {current.parking}
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
                <p className="text-gray-600 leading-relaxed">{current.desc}</p>
                <button className="border border-[#b97b4f] text-[#b97b4f] px-8 py-3 uppercase tracking-[0.25em] hover:bg-[#b97b4f] hover:text-white transition">
                  Schedule
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
