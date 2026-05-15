"use client";

import { useAnimation, useInView, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function AnimatedTestimonials({
  title = "Loved by the community",
  subtitle = "Don't just take our word for it. See what homeowners and future homeowners have to say.",
  badgeText = "Trusted by homebuyers",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "Trusted by people building their future",
  className,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);

    return () => window.clearInterval(interval);
  }, [autoRotateInterval, testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`overflow-hidden py-14 sm:py-16 md:py-24 ${className || ""}`}
    >
      <div className="px-3 sm:px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-4 sm:space-y-6">
              {badgeText && (
                <div className="inline-flex items-center rounded-md border border-[#D5B4E7]/30 bg-[#D5B4E7]/10 px-3 py-1 text-xs font-medium text-white sm:text-sm">
                  <Star className="mr-1 h-3.5 w-3.5 fill-white text-white" />
                  <span>{badgeText}</span>
                </div>
              )}

              <h2 className="text-2xl font-light tracking-tight text-white sm:text-4xl md:text-5xl title-font">
                {title}
              </h2>

              <p className="max-w-[600px] text-sm leading-6 text-white/70 sm:text-base md:text-xl/relaxed">
                {subtitle}
              </p>

              <div className="flex items-center gap-3 pt-2 sm:pt-4">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id || index}
                    onClick={() => setActiveIndex(index)}
                    className={`min-h-0 min-w-0 p-0 h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "w-10 bg-white" : "w-2.5 bg-white/25"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative h-full min-h-[320px] sm:min-h-[340px] md:min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  scale: activeIndex === index ? 1 : 0.95,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ zIndex: activeIndex === index ? 10 : 0 }}
              >
                <div className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/95 p-5 sm:p-6 md:p-8 shadow-2xl shadow-black/15">
                  <div className="mb-4 flex gap-2 sm:mb-6">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#d4a017] text-[#d4a017] sm:h-5 sm:w-5" />
                      ))}
                  </div>

                  <div className="relative mb-5 flex-1 sm:mb-6">
                    <Quote className="absolute -left-1 -top-1 h-6 w-6 rotate-180 text-[#300049]/15 sm:-left-2 sm:-top-2 sm:h-8 sm:w-8" />
                    <p className="relative z-10 text-base font-medium leading-7 text-stone-800 sm:text-lg sm:leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <Separator className="my-4 bg-[#300049]/10" />

                  <div className="flex items-center gap-3 sm:gap-4">
                    <Avatar className="h-12 w-12 border border-[#300049]/10 sm:h-14 sm:w-14">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-[#300049] text-white">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-semibold text-stone-900 sm:text-base">{testimonial.name}</h3>
                      <p className="text-xs text-stone-500 sm:text-sm">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute -bottom-3 -left-3 h-16 w-16 rounded-[1rem] bg-white/10 sm:-bottom-6 sm:-left-6 sm:h-24 sm:w-24 sm:rounded-[1.5rem]" />
            <div className="absolute -right-3 -top-3 h-16 w-16 rounded-[1rem] bg-[#D5B4E7]/15 sm:-right-6 sm:-top-6 sm:h-24 sm:w-24 sm:rounded-[1.5rem]" />
          </motion.div>
        </motion.div>

        {trustedCompanies.length > 0 && (
          <motion.div variants={itemVariants} initial="hidden" animate={controls} className="mt-24 text-center">
            <h3 className="mb-8 text-sm font-medium text-white/55">{trustedCompaniesTitle}</h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {trustedCompanies.map((company) => (
                <div key={company} className="text-2xl font-semibold text-white/35">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
