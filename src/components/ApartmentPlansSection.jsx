import React, { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useData } from '../contexts/DataContext';

const ApartmentPlansSection = () => {
  const { apartments, sectionSettings, loading } = useData();
  const [activeTab, setActiveTab] = useState(apartments[0]?.id?.toString() || 'studio');

  // Get section settings for this component
  const settings = sectionSettings?.apartmentPlans || {
    title: "Property Plans & Layouts",
    subtitle: "Choose from our range of carefully designed property plans."
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A0072] mx-auto mb-4"></div>
          <p className="text-stone-600">Loading plans...</p>
        </div>
      </section>
    );
  }

  if (!apartments || apartments.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-stone-600">No property plans available.</p>
        </div>
      </section>
    );
  }

  // Helper function to get display label based on bedrooms
  const getDisplayLabel = (plan) => {
    const bedrooms = plan.bedrooms !== undefined ? plan.bedrooms : 0;
    if (bedrooms === 0) return 'Studio';
    if (bedrooms === 1) return '1 Room';
    if (bedrooms === 2) return '2 Bedrooms';
    if (bedrooms === 3) return '3 Bedrooms';
    return `${bedrooms} Bedrooms`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6 title-font">
            {settings.title}
          </h2>
          <p className="text-stone-600 text-lg max-w-3xl mx-auto">
            {settings.subtitle}
          </p>
        </div>

        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 bg-stone-100 p-1 rounded-lg">
            {apartments.slice(0, 4).map((plan) => (
              <TabsTrigger
                key={plan.id}
                value={plan.id.toString()}
                className="text-sm font-medium data-[state=active]:bg-[#300049] data-[state=active]:text-white transition-all duration-300"
              >
                {getDisplayLabel(plan)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          {apartments.slice(0, 4).map((plan) => (
            <TabsContent key={plan.id} value={plan.id.toString()} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Floor Plan Image */}
                <div className="order-2 lg:order-1">
                  <div className="relative">
                    <img
                      src={plan.floor_plan || plan.image}
                      alt={`${plan.name} Floor Plan`}
                      className="w-full h-96 object-cover shadow-lg rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>
                  </div>
                  {plan.gallery && plan.gallery.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {plan.gallery.slice(0, 3).map((img, idx) => (
                        <img 
                          key={idx}
                          src={img}
                          alt={`${plan.name} view ${idx + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Plan Details */}
                <div className="order-1 lg:order-2">
                  <div className="mb-4">
                    <h3 className="text-3xl font-light text-stone-800 mb-2 title-font">
                      {plan.name}
                    </h3>
                    {plan.price && (
                      <p className="text-xl text-[#300049] font-medium mb-2">
                        {plan.price}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="text-center p-4 bg-stone-50 rounded-lg">
                      <div className="text-3xl font-light text-stone-800 mb-2">
                        {plan.area || 'N/A'}
                      </div>
                      <div className="text-sm uppercase tracking-wide text-stone-600">
                        Area
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-stone-50 rounded-lg">
                      <div className="text-3xl font-light text-stone-800 mb-2">
                        {plan.bedrooms !== undefined ? plan.bedrooms : 'N/A'}
                      </div>
                      <div className="text-sm uppercase tracking-wide text-stone-600">
                        Bedrooms
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-stone-50 rounded-lg">
                      <div className="text-3xl font-light text-stone-800 mb-2">
                        {plan.bathrooms || 'N/A'}
                      </div>
                      <div className="text-sm uppercase tracking-wide text-stone-600">
                        Bathrooms
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-stone-50 rounded-lg">
                      <div className="text-3xl font-light text-stone-800 mb-2">
                        {plan.parking || plan.category || 'Yes'}
                      </div>
                      <div className="text-sm uppercase tracking-wide text-stone-600">
                        Parking
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-stone-600 leading-relaxed mb-4">
                      {plan.description}
                    </p>
                    {plan.amenities && plan.amenities.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-stone-800 mb-3">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {plan.amenities.slice(0, 6).map((amenity, idx) => (
                            <div key={idx} className="flex items-center text-sm text-stone-600">
                              <div className="w-2 h-2 bg-[#300049] rounded-full mr-2"></div>
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      className="bg-[#4A0072] hover:bg-[#300049] text-white px-8 py-3 uppercase tracking-wide transition-all duration-300"
                    >
                      Schedule Viewing
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-[#4A0072] text-[#4A0072] hover:bg-[#4A0072] hover:text-white px-8 py-3 uppercase tracking-wide transition-all duration-300"
                    >
                      Get Details
                    </Button>
                  </div>
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
