"use client";

import React from "react";
import FadeInWhenVisible from "./FadeInWhenVisible";

const ValuesSection = () => {
  return (
    <section className="py-20 bg-stone-100 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <FadeInWhenVisible>
            <div className="order-2 lg:order-1">
              <img
                src="https://ik.imagekit.io/hqhiltiie/Nyinimu/done%20house/031781a0479006f4fa35b045357ea69f.jpg?updatedAt=1760196216421"
                alt="Conference Room"
                className="w-full h-[32rem] lg:h-[38rem] object-cover rounded-lg shadow-2xl" // Increased height
                style={{ maxHeight: "100vh" }} // Ensures it doesn't overflow viewport
              />
            </div>
          </FadeInWhenVisible>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <FadeInWhenVisible>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 dark:text-white leading-tight mb-6">
                THE BONGO <br /> ESTATES ADVANTAGE
              </h2>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <p className="text-stone-700 dark:text-stone-300 text-lg mb-12 max-w-2xl">
                We've partnered with leading banks to offer flexible payment
                plans, with options as low as{" "}
                <span className="font-semibold">TZS 10,000 per day</span> to
                become a proud Bongo Estates landlord!
              </p>
            </FadeInWhenVisible>

            {/* Advantages List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeInWhenVisible delay={0.3}>
                <div className="p-6 bg-white dark:bg-stone-800 rounded-lg shadow-lg hover:shadow-xl transition">
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-3">
                    Affordable Units
                  </h3>
                  <p className="text-stone-600 dark:text-stone-300">
                    Own a quality home starting from just TZS 25 Million.
                  </p>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.4}>
                <div className="p-6 bg-white dark:bg-stone-800 rounded-lg shadow-lg hover:shadow-xl transition">
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-3">
                    Flexible Payments
                  </h3>
                  <p className="text-stone-600 dark:text-stone-300">
                    Pay as little as TZS 10,000 per day or up to TZS 50,000 per
                    day, tailored to your income.
                  </p>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.5}>
                <div className="p-6 bg-white dark:bg-stone-800 rounded-lg shadow-lg hover:shadow-xl transition">
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-3">
                    Custom Builds
                  </h3>
                  <p className="text-stone-600 dark:text-stone-300">
                    Already have a plot? We can build for you with a bank loan
                    and up to an 8–10 year payback period.
                  </p>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.6}>
                <div className="p-6 bg-white dark:bg-stone-800 rounded-lg shadow-lg hover:shadow-xl transition">
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-3">
                    Trusted Partnerships
                  </h3>
                  <p className="text-stone-600 dark:text-stone-300">
                    Land sourced by Bakaima Real Estate Agents. Construction
                    managed with expertise from Bakaima and Jowada.
                  </p>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
