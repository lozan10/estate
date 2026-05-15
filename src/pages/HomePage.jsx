import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import ValuesSection from '../components/ValuesSection';
import ApartmentsSection from '../components/ApartmentsSection';
import ScheduleVisitSection from '../components/ScheduleVisitSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ApartmentDetailsSection from '../components/ApartmentDetailsSection';
import BlogSection from '../components/BlogSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ValuesSection />
      <ApartmentsSection />
      <ScheduleVisitSection />
      <TestimonialsSection />
     

      {/* Interactive Image Section */}
      <section className="py-20">
        <div className="w-full">
          <img
            src="https://ik.imagekit.io/67mog36hf/Flowback/Forward%20111/Screenshot%202025-09-24%20at%2022.02.32.png?updatedAt=1758740829093"
            alt="Interactive Image"
            className="w-full h-auto cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => alert('Image clicked!')}
          />
        </div>
      </section>
       <ApartmentDetailsSection />
        <BlogSection />
    </div>
  );
};

export default HomePage;
