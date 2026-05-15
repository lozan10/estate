import React from 'react';
import GenericHero from '../components/GenericHero';
import ScheduleVisitSection from '../components/ScheduleVisitSection';

const RequestViewingPage = () => {
  return (
    <div className="relative">
      <GenericHero
        title="Request a Viewing"
        description="Schedule a visit to explore our properties and take the first step towards homeownership."
        backgroundImage=""
      />

      <ScheduleVisitSection />
    </div>
  );
};

export default RequestViewingPage;