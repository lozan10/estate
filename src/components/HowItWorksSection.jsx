import React from 'react';
import { Card, CardContent } from './ui/card';
import { Search, CreditCard, Hammer, Calendar, Home } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Choose Your House Plan",
      description: "Select from our Studio, 1-bedroom, 2-bedroom, or 3-bedroom house plans. The path to ownership starts with a step - choose the home that matches your dreams and daily payment capacity."
    },
    {
      number: "02", 
      icon: CreditCard,
      title: "Start Your Daily Payments",
      description: "Begin your journey from tenant to landlord with our revolutionary daily payment system. Your hustle, your home - pay daily amounts that work with your income flow."
    },
    {
      number: "03",
      icon: Hammer,
      title: "Secure Your Plot & Begin Construction",
      description: "Use your existing plot or we'll help you secure one. Our expert construction team begins building your legacy, day by day, with quality you can trust."
    },
    {
      number: "04",
      icon: Calendar,
      title: "Construction in 4 Months - Move In",
      description: "Watch your dream home come to life! Daily, Nze landlord becomes reality as we complete construction within 4 months maximum. Quality construction, delivered on time."
    },
    {
      number: "05",
      icon: Home,
      title: "Own Forever - Continue Daily Payments",
      description: "Move into YOUR home and continue your daily contributions. Buy daily, own forever - building your legacy through consistent daily payments until full ownership is achieved."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-6">
            Your Clear Path to Homeownership
          </h2>
          <p className="text-stone-600 text-lg max-w-3xl mx-auto">
            Our process is simple, transparent, and designed to make your dream home a reality, even if you have an existing plot of land.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 1;
            
            return (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(213,180,231,0.18)' }}>
                            <IconComponent className="w-8 h-8 text-[#300049]" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl font-light text-[#300049] title-font">
                              {step.number}
                            </span>
                            <h3 className="text-2xl font-medium title-font text-stone-800">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-stone-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="w-2 h-20 bg-[#300049] lg:w-20 lg:h-2 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;