import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Bed, Bath, Square, Car } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const PropertyPage = () => {
  const { properties, loading, error } = useData();
  
  // Debug: Log properties data
  console.log('PropertyPage - Properties:', properties, 'Loading:', loading, 'Error:', error);

  if (loading) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 mx-auto mb-4"></div>
        <p className="text-stone-600">Loading properties...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 mb-4">Error loading properties</p>
        <p className="text-stone-600">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light title-font text-stone-800 mb-6">
              Properties
            </h1>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              Discover exceptional properties crafted for modern living. Each residence represents the pinnacle of luxury and design excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-6">
              Featured Properties
            </h2>
            <p className="text-stone-600 text-lg">
              Handpicked selection of our most exclusive properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.filter(property => property.is_featured).slice(0, 3).map((property) => (
              <Card key={property.id} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                    alt={property.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#300049] text-white px-3 py-1 text-sm font-medium uppercase tracking-wide">
                      Featured
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-90 text-stone-800 px-3 py-1 text-sm font-semibold">
                      {property.price ? `UGX ${property.price.toLocaleString()}` : 'Contact for Price'}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-medium title-font text-stone-800 mb-2">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-stone-600 mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{property.location || 'Location Available on Request'}</span>
                  </div>

                  <div className="mb-6">
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {property.description || 'Property description available upon inquiry.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-lg font-semibold text-stone-800">
                      {property.price ? `UGX ${property.price.toLocaleString()}` : 'Price on Request'}
                    </div>
                    {property.is_featured && (
                      <div className="flex items-center text-yellow-600 text-sm font-medium">
                        <span className="mr-1">⭐</span>
                        Featured
                      </div>
                    )}
                  </div>

                  {property.gallery && property.gallery.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center text-blue-600 text-sm font-medium mb-2">
                        📷 {property.gallery.length} Photos Available
                      </div>
                    </div>
                  )}

                  {property.floor_plan && (
                    <div className="mb-4">
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        📋 Floor Plan Available
                      </div>
                    </div>
                  )}

                  <Link to={`/property/${property.id}`}>
                    <Button className="w-full bg-[#4A0072] hover:bg-[#300049] text-white transition-colors duration-300">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Properties */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-6">
              All Properties
            </h2>
            <p className="text-stone-600 text-lg">
              Browse our complete collection of premium properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <Card key={property.id} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                    alt={property.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-90 text-stone-800 px-3 py-1 text-sm font-semibold">
                      {property.price ? `UGX ${property.price.toLocaleString()}` : 'Contact for Price'}
                    </span>
                  </div>
                  {property.is_featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#300049] text-white px-2 py-1 text-xs font-medium uppercase tracking-wide">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-medium title-font text-stone-800 mb-2">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-stone-600 mb-3">
                    <MapPin size={14} className="mr-1" />
                    <span className="text-xs">{property.city}, {property.country}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-stone-600">
                      <Bed size={14} className="mr-1" />
                      <span className="text-xs">{property.bedrooms || 0}</span>
                    </div>
                    <div className="flex items-center text-stone-600">
                      <Bath size={14} className="mr-1" />
                      <span className="text-xs">{property.bathrooms || 0}</span>
                    </div>
                    <div className="flex items-center text-stone-600">
                      <Square size={14} className="mr-1" />
                      <span className="text-xs">{property.square_feet || 0} sq ft</span>
                    </div>
                    <div className="flex items-center text-stone-600">
                      <Car size={14} className="mr-1" />
                      <span className="text-xs">{property.parking_spaces || 0}</span>
                    </div>
                  </div>

                  <Link to={`/property/${property.id}`}>
                    <Button size="sm" className="w-full bg-[#4A0072] hover:bg-[#300049] text-white transition-colors duration-300">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light title-font text-white mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Our team of experts is ready to help you find the perfect property that matches your needs and lifestyle.
          </p>
          <Button className="bg-[#300049] hover:bg-[#4A0072] text-white px-8 py-3 text-lg font-medium transition-colors duration-300">
            Contact Our Team
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PropertyPage;