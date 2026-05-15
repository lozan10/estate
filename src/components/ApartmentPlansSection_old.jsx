import React, { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockData } from '../data/mock';

const ApartmentPlansSection = () => {
  const [activeTab, setActiveTab] = useState('apartment');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6 title-font">
            Apartment Plans
          </h2>
          <p className="text-stone-600 text-lg">
            At vero eos et accusamus et iusto odio
          </p>
        </div>

        <Tabs defaultValue="apartment" className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-12 bg-stone-100 p-1 rounded-lg">
            {mockData.apartmentPlans.map((plan) => (
              <TabsTrigger
                key={plan.id}
                value={plan.id}
                className="text-sm font-medium capitalize data-[state=active]:bg-white data-[state=active]:text-stone-800 transition-all duration-300"
              >
                {plan.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          {mockData.apartmentPlans.map((plan) => (
            <TabsContent key={plan.id} value={plan.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Floor Plan Image */}
                <div className="order-2 lg:order-1">
                  <div className="relative">
                    <img
                      src={plan.image}
                      alt={`${plan.name} Floor Plan`}
                      className="w-full h-96 object-cover shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Plan Details */}
                <div className="order-1 lg:order-2">
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-light text-stone-800 mb-2">
                        {plan.floor}
                      </div>
                      <div className="text-sm uppercase tracking-wide text-stone-600">
                        Floor
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-light text-stone-800 mb-2">
                        {plan.rooms}
                      </div>
                      <div className="text-sm uppercase tracking-wide text-stone-600">
                        Rooms
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-light text-stone-800 mb-2">
                        {plan.area}
                      </div>
                      <div className="text-sm uppercase tracking-wide text-stone-600">
                        Area m2
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-light text-stone-800 mb-2">
                        {plan.parking}
                      </div>
                      <div className="text-sm uppercase tracking-wide text-stone-600">
                        Parking
                      </div>
                    </div>
                  </div>

                  <p className="text-stone-600 leading-relaxed mb-8">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blan ditiis prae sentium voluptatum deleniti.
                  </p>

                  <Button 
                    className="bg-[#7b513a] hover:bg-[#6a4532] text-white px-8 py-3 uppercase tracking-wide transition-all duration-300"
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ApartmentPlansSection;