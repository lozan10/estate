'use client';

import React from 'react';
import Lenis from '@studio-freight/lenis';
import { ArrowDown, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1280&q=80',
    alt: 'Contemporary luxury home exterior',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1280&q=80',
    alt: 'Modern residential neighborhood',
  },
  {
    src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80',
    alt: 'Stylish interior living space',
  },
  {
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1280&q=80',
    alt: 'Elegant house with landscaped frontage',
  },
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    alt: 'Minimal bedroom interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1280&q=80',
    alt: 'Warm residential architecture at dusk',
  },
  {
    src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
    alt: 'Bright kitchen and dining area',
  },
];

const ZoomParallaxSection = () => {
  React.useEffect(() => {
    const lenis = new Lenis();
    let animationFrameId = null;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = window.requestAnimationFrame(raf);
    };

    animationFrameId = window.requestAnimationFrame(raf);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      lenis.destroy();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f1fb_0%,#ffffff_22%,#f2e7f8_55%,#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-40 bg-[radial-gradient(circle_at_top,rgba(74,0,114,0.16),transparent_60%)]" />
      <div className="relative mx-auto mt-8 flex min-h-[38vh] max-w-6xl flex-col items-center justify-center px-4 pb-6 pt-16 text-center sm:mt-12 sm:min-h-[42vh] sm:px-6 sm:pb-8 sm:pt-24 md:mt-16 md:min-h-[45vh] md:pt-28">
        <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-[#4A0072]/15 bg-white/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#4A0072] shadow-sm backdrop-blur sm:mb-5 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.28em]">
          <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Own Your Space
        </div>
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-1/2 top-4 h-[78vmin] w-[78vmin] -translate-x-1/2 rounded-full sm:top-6 sm:h-[65vmin] sm:w-[65vmin]',
            'bg-[radial-gradient(circle,rgba(74,0,114,0.12),transparent_60%)] blur-3xl'
          )}
        />
        <h2 className="relative max-w-4xl text-[1.75rem] font-light leading-[1.15] tracking-tight text-stone-900 sm:text-4xl md:text-6xl">
          Scroll through the kind of homes Bongo Estates is building access to.
        </h2>
        <p className="relative mt-4 max-w-2xl text-sm leading-6 text-stone-600 sm:mt-5 sm:leading-7 md:text-base">
          Flexible payment plans deserve a housing experience that feels aspirational, tangible, and close.
          This gallery section brings that promise forward immediately after the hero.
        </p>
        <div className="relative mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#300049] sm:mt-8 sm:text-xs sm:tracking-[0.26em]">
          <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Scroll Down
        </div>
      </div>
      <ZoomParallax images={images} />
    </section>
  );
};

export default ZoomParallaxSection;
