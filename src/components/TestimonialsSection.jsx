import React from 'react';
import { AnimatedTestimonials } from './ui/testimonial';
import { mockData } from '../data/mock';

const TestimonialsSection = () => {
  const testimonials = mockData.testimonials.map((testimonial, index) => ({
    id: index + 1,
    quote: testimonial.quote,
    name: testimonial.name,
    designation: testimonial.role,
    src: testimonial.image,
  }));

  return (
    <section
      className="relative overflow-hidden py-14 sm:py-16 md:py-24"
      style={{ background: 'linear-gradient(135deg, #0e0014 0%, #1b0027 60%, #300049 100%)' }}
    >
      <style>
        {`
          @keyframes animate-grid {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .home-testimonial-grid {
            width: 200%;
            height: 200%;
            background-image:
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px);
            background-size: 3rem 3rem;
            animation: animate-grid 40s linear infinite alternate;
          }
        `}
      </style>
      <div className="home-testimonial-grid pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">What Our Clients Say</p>
        </div>
        <AnimatedTestimonials testimonials={testimonials} autoplay />
      </div>
    </section>
  );
};

export default TestimonialsSection;
