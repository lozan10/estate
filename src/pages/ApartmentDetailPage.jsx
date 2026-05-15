import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { MapPin, Bed, Bath, Square, Car, Calendar, Phone, Mail, Users, Wifi, Dumbbell, Waves, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const ApartmentDetailPage = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock apartment data
  const apartment = {
    id: 1,
    name: "Two Bedroom Deluxe",
    building: "Bongo Towers",
    floor: 4,
    unit: "4B",
    area: "140 m²",
    price: "UGX 185,000,000",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    status: "Available",
    type: "Two Bedroom",
    description: "This beautifully designed two-bedroom apartment offers modern living in the heart of Kampala. With floor-to-ceiling windows providing abundant natural light and stunning city views, this unit represents the perfect blend of luxury and functionality.",
    features: [
      "Floor-to-ceiling windows",
      "Hardwood flooring",
      "Modern kitchen with granite countertops",
      "Built-in wardrobes",
      "Balcony with city views",
      "Air conditioning",
      "High-speed internet ready",
      "24/7 security"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "Michael Okello",
      phone: "+256 414 123 456",
      email: "michael@nyinimuproperties.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  };

  const buildingAmenities = [
    { icon: Wifi, name: 'High-Speed Internet' },
    { icon: Dumbbell, name: 'Fitness Center' },
    { icon: Waves, name: 'Swimming Pool' },
    { icon: Shield, name: '24/7 Security' },
    { icon: Car, name: 'Covered Parking' },
    { icon: Users, name: 'Community Lounge' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + apartment.images.length) % apartment.images.length);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-green-100 text-green-800">{apartment.status}</Badge>
                <Badge variant="outline">{apartment.type}</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-4">
                {apartment.name}
              </h1>
              
              <div className="flex items-center text-stone-600 mb-6">
                <MapPin size={20} className="mr-2" />
                <span className="text-lg">{apartment.building} - Floor {apartment.floor}, Unit {apartment.unit}</span>
              </div>

              <div className="text-3xl font-semibold text-stone-800 mb-8">
                {apartment.price}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Bed className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                  <div className="text-xl font-semibold text-stone-800">{apartment.bedrooms}</div>
                  <div className="text-sm text-stone-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                  <div className="text-xl font-semibold text-stone-800">{apartment.bathrooms}</div>
                  <div className="text-sm text-stone-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Square className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                  <div className="text-xl font-semibold text-stone-800">{apartment.area}</div>
                  <div className="text-sm text-stone-600">Floor Area</div>
                </div>
                <div className="text-center">
                  <Car className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                  <div className="text-xl font-semibold text-stone-800">{apartment.parking}</div>
                  <div className="text-sm text-stone-600">Parking</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={apartment.images[0]}
                alt={apartment.name}
                className="w-full h-96 object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content Area */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-medium title-font text-stone-800 mb-4">Description</h2>
                    <p className="text-stone-600 leading-relaxed text-lg">
                      {apartment.description}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-medium title-font text-stone-800 mb-4">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {apartment.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-stone-600">
                          <div className="w-2 h-2 bg-[#300049] mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gallery">
                  <div className="space-y-6">
                    <div className="relative">
                      <img
                        src={apartment.images[currentImageIndex]}
                        alt={`${apartment.name} - View ${currentImageIndex + 1}`}
                        className="w-full h-96 object-cover"
                      />
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-stone-800"
                      >
                        <ChevronLeft size={16} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-stone-800"
                      >
                        <ChevronRight size={16} />
                      </Button>

                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 text-sm">
                        {currentImageIndex + 1} / {apartment.images.length}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {apartment.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`View ${index + 1}`}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-full h-24 object-cover cursor-pointer transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'border-2 border-[#300049]' 
                              : 'border-2 border-transparent hover:border-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="floorplan">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-medium title-font text-stone-800">Floor Plan</h2>
                    <img
                      src={apartment.floorPlan}
                      alt="Floor Plan"
                      className="w-full max-w-2xl mx-auto"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-stone-50">
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-stone-800">{apartment.bedrooms}</div>
                        <div className="text-sm text-stone-600">Bedrooms</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-stone-800">{apartment.bathrooms}</div>
                        <div className="text-sm text-stone-600">Bathrooms</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-stone-800">{apartment.area}</div>
                        <div className="text-sm text-stone-600">Total Area</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-stone-800">{apartment.parking}</div>
                        <div className="text-sm text-stone-600">Parking</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="amenities">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-medium title-font text-stone-800">Building Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                      {buildingAmenities.map((amenity, index) => {
                        const IconComponent = amenity.icon;
                        return (
                          <div key={index} className="text-center group">
                            <div className="w-16 h-16 mx-auto bg-stone-100 flex items-center justify-center mb-4 group-hover:bg-[#D5B4E7]/20 transition-colors duration-300">
                              <IconComponent className="w-8 h-8 text-stone-600 group-hover:text-[#300049]" />
                            </div>
                            <h4 className="text-sm font-medium text-stone-800 title-font">
                              {amenity.name}
                            </h4>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Agent Card */}
              <Card className="mb-8 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <img
                      src={apartment.agent.image}
                      alt={apartment.agent.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-medium title-font text-stone-800 mb-2">
                      {apartment.agent.name}
                    </h3>
                    <p className="text-stone-600">Apartment Specialist</p>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full bg-[#4A0072] hover:bg-[#300049] text-white">
                      <Phone size={16} className="mr-2" />
                      Call Agent
                    </Button>
                    <Button variant="outline" className="w-full border-stone-300 text-stone-700 hover:bg-stone-50">
                      <Mail size={16} className="mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full border-stone-300 text-stone-700 hover:bg-stone-50">
                      <Calendar size={16} className="mr-2" />
                      Schedule Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Apartment Details */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium title-font text-stone-800 mb-4">
                    Apartment Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Building</span>
                      <span className="font-medium">{apartment.building}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Floor</span>
                      <span className="font-medium">{apartment.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Unit</span>
                      <span className="font-medium">{apartment.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Status</span>
                      <span className="font-medium text-green-600">{apartment.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Unit ID</span>
                      <span className="font-medium">NY-APT-{apartment.id.toString().padStart(3, '0')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light title-font text-white mb-6">
            Interested in This Apartment?
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Contact our team today to schedule a viewing or get more information about this property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#300049] hover:bg-[#300049] text-white px-8 py-3 text-lg font-medium">
              Schedule Viewing
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-stone-800 px-8 py-3 text-lg font-medium">
              Request Info
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApartmentDetailPage;