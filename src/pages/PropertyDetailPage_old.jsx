import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Bed, Bath, Square, Car, Calendar, Phone, Mail, Share2, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Mock property data - in real app this would be fetched based on id
  const property = {
    id: 1,
    title: "Luxury Penthouse Suite",
    location: "Kampala CBD, Uganda",
    price: "UGX 450,000,000",
    bedrooms: 4,
    bathrooms: 3,
    area: "350 m²",
    parking: 2,
    type: "Penthouse",
    status: "For Sale",
    yearBuilt: "2023",
    description: "This stunning penthouse suite represents the pinnacle of luxury living in Kampala. Located in the heart of the CBD, this exceptional property offers unparalleled views of the city skyline and Lake Victoria. Every detail has been meticulously crafted to provide the ultimate in comfort and sophistication.",
    features: [
      "Panoramic city views",
      "Private rooftop terrace",
      "High-end finishes throughout",
      "Smart home automation",
      "Designer kitchen with premium appliances",
      "Master suite with walk-in closet",
      "Private elevator access",
      "24/7 concierge service"
    ],
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Spa facilities",
      "Business center",
      "Valet parking",
      "Security system"
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    agent: {
      name: "Sarah Namugga",
      phone: "+256 414 123 456",
      email: "sarah@nyinimuproperties.com",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="pt-20">
      {/* Image Gallery */}
      <section className="relative">
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-stone-800"
          >
            <ChevronLeft size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-stone-800"
          >
            <ChevronRight size={20} />
          </Button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`w-10 h-10 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 ${
                isLiked ? 'text-red-500' : 'text-stone-800'
              }`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-stone-800"
            >
              <Share2 size={16} />
            </Button>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="bg-white p-4 shadow-lg">
          <div className="flex space-x-2 overflow-x-auto">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`View ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-16 object-cover cursor-pointer transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'border-2 border-[#81be00]' 
                    : 'border-2 border-transparent hover:border-stone-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-green-100 text-green-800">{property.status}</Badge>
                  <Badge variant="outline">{property.type}</Badge>
                </div>
                
                <h1 className="text-4xl font-light title-font text-stone-800 mb-4">
                  {property.title}
                </h1>
                
                <div className="flex items-center text-stone-600 mb-6">
                  <MapPin size={20} className="mr-2" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="text-3xl font-semibold text-stone-800 mb-8">
                  {property.price}
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-stone-50">
                <div className="text-center">
                  <Bed className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold text-stone-800">{property.bedrooms}</div>
                  <div className="text-sm text-stone-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold text-stone-800">{property.bathrooms}</div>
                  <div className="text-sm text-stone-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Square className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold text-stone-800">{property.area}</div>
                  <div className="text-sm text-stone-600">Floor Area</div>
                </div>
                <div className="text-center">
                  <Car className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold text-stone-800">{property.parking}</div>
                  <div className="text-sm text-stone-600">Parking</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-medium title-font text-stone-800 mb-4">Description</h2>
                <p className="text-stone-600 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-medium title-font text-stone-800 mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-stone-600">
                      <div className="w-2 h-2 bg-[#81be00] mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-medium title-font text-stone-800 mb-4">Building Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-stone-600">
                      <div className="w-2 h-2 bg-[#81be00] mr-3"></div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Agent Card */}
              <Card className="mb-8 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-medium title-font text-stone-800 mb-2">
                      {property.agent.name}
                    </h3>
                    <p className="text-stone-600">Property Specialist</p>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full bg-[#7b513a] hover:bg-[#6a4532] text-white">
                      <Phone size={16} className="mr-2" />
                      Call Agent
                    </Button>
                    <Button variant="outline" className="w-full border-stone-300 text-stone-700 hover:bg-stone-50">
                      <Mail size={16} className="mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full border-stone-300 text-stone-700 hover:bg-stone-50">
                      <Calendar size={16} className="mr-2" />
                      Schedule Viewing
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium title-font text-stone-800 mb-4">
                    Property Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Property Type</span>
                      <span className="font-medium">{property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Year Built</span>
                      <span className="font-medium">{property.yearBuilt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Status</span>
                      <span className="font-medium text-green-600">{property.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Property ID</span>
                      <span className="font-medium">NY-{property.id.toString().padStart(4, '0')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light title-font text-stone-800 mb-6">
              Similar Properties
            </h2>
            <p className="text-stone-600 text-lg">
              You might also be interested in these properties
            </p>
          </div>
          
          <div className="text-center">
            <Button className="bg-[#7b513a] hover:bg-[#6a4532] text-white px-8 py-3">
              View Similar Properties
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailPage;