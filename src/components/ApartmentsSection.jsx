"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square } from "lucide-react";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const ApartmentsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { properties, loading } = useData();
  
  // Use dashboard properties; filter those marked available and/or featured
  const featuredProperties = (properties || []).filter(p => p.status === 'available' && (p.is_featured || p.featured_image));
  const displayProperties = featuredProperties.length > 0 ? featuredProperties.slice(0, 6) : (properties || []).slice(0, 6);
  
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(displayProperties.length / cardsPerSlide);

  // Auto-advance slides
  useEffect(() => {
    if (totalSlides > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const startIndex = currentSlide * cardsPerSlide;
  const visibleProperties = displayProperties.slice(
    startIndex,
    startIndex + cardsPerSlide
  );

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  if (loading) {
    return (
      <section id="apartments" className="py-20 bg-stone-100 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
            <p className="text-stone-600 mt-4">Loading apartments...</p>
          </div>
        </div>
      </section>
    );
  }

  if (displayProperties.length === 0) {
    return (
      <section id="apartments" className="py-20 bg-stone-100 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-stone-600">No apartments available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apartments" className="py-20 bg-stone-100 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-white mb-6 title-font">
            Find the Perfect Home for Your Life
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-lg">
            Starting from UGX 25 Million – We offer a range of well-designed,
            modern units to fit every stage of life and budget
          </p>
        </div>

        {/* Apartments Carousel */}
        <div className="relative mb-12" {...handlers}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleProperties.map((p) => (
              <Card
                key={p.id}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={p.featured_image || p.images?.[0]}
                    alt={p.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#300049] text-white px-3 py-1 text-sm font-semibold">
                      UGX {p.price?.toLocaleString?.() || p.price}
                    </span>
                  </div>
                  {p.status === 'available' && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#300049] text-white px-3 py-1 text-sm font-semibold">
                        Available
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-medium title-font text-stone-800 dark:text-white mb-3">
                    {p.title}
                  </h3>

                  <p className="text-stone-600 dark:text-stone-300 mb-4 leading-relaxed line-clamp-3">
                    {p.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 text-stone-600 dark:text-stone-300 text-sm mb-6">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {p.location}</div>
                    <div className="flex items-center gap-2"><Bed className="w-4 h-4" /> {p.bedrooms}</div>
                    <div className="flex items-center gap-2"><Bath className="w-4 h-4" /> {p.bathrooms}</div>
                  </div>

                  <Link to={`/property/${p.id}`}>
                    <Button className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white bg-opacity-80 hover:bg-white text-stone-800 border border-stone-300 transition-all duration-300 shadow-lg"
              >
                <ChevronLeft size={20} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white bg-opacity-80 hover:bg-white text-stone-800 border border-stone-300 transition-all duration-300 shadow-lg"
              >
                <ChevronRight size={20} />
              </Button>
            </>
          )}
        </div>

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-md transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-[#300049]"
                    : "w-3 bg-stone-300 dark:bg-stone-600"
                }`}
              />
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a href="/properties">
            <Button className="bg-[#4A0072] hover:bg-[#300049] text-white px-12 py-3 text-lg font-medium uppercase tracking-wide transition-all duration-300">
              View All Properties
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ApartmentsSection;
