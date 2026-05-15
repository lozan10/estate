import React from 'react';
import GenericHero from '../components/GenericHero';
import HowItWorksSection from '../components/HowItWorksSection';

const HowItWorksPage = () => {
  return (
    <div>
      <GenericHero
        title="How It Works"
        description="Discover our simple and transparent process to make your homeownership dreams a reality."
      />
      <HowItWorksSection />
    </div>
  );
};

export default HowItWorksPage;