import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MapPin, Users, Square, Car, Wifi, Dumbbell, Waves, Shield, Filter, X } from 'lucide-react';
import GenericHero from '../components/GenericHero';
import { useData } from '../contexts/DataContext';

const ApartmentPage = () => {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const { apartments, loading, error } = useData();
  
  // Filter states
  const [filters, setFilters] = useState({
    priceRange: '',
    sizeRange: '',
    bedrooms: '',
    category: '',
    location: '',
    searchTerm: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Helper function to extract numeric value from price string
  const extractPrice = (priceString) => {
    if (!priceString) return 0;
    const match = priceString.match(/UGX\s*([\d,]+)/);
    if (match) {
      return parseInt(match[1].replace(/,/g, ''));
    }
    return 0;
  };

  // Helper function to extract area range
  const extractArea = (areaString) => {
    if (!areaString) return 0;
    const match = areaString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Filter apartments based on selected filters
  const filteredApartments = useMemo(() => {
    if (!apartments) return [];

    return apartments.filter(apartment => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          apartment.title?.toLowerCase().includes(searchLower) ||
          apartment.description?.toLowerCase().includes(searchLower) ||
          apartment.location?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Price range filter - Backend uses numeric price in dollars
      if (filters.priceRange && filters.priceRange !== 'any') {
        const apartmentPrice = apartment.price || 0;
        switch (filters.priceRange) {
          case 'under-100m':
            if (apartmentPrice >= 100000) return false;
            break;
          case '100m-200m':
            if (apartmentPrice < 100000 || apartmentPrice >= 200000) return false;
            break;
          case '200m-300m':
            if (apartmentPrice < 200000 || apartmentPrice >= 300000) return false;
            break;
          case '300m-400m':
            if (apartmentPrice < 300000 || apartmentPrice >= 400000) return false;
            break;
          case 'above-400m':
            if (apartmentPrice < 400000) return false;
            break;
        }
      }

      // Size range filter - Backend uses square_feet
      if (filters.sizeRange && filters.sizeRange !== 'any') {
        const apartmentArea = apartment.square_feet || 0;
        switch (filters.sizeRange) {
          case 'small':
            if (apartmentArea >= 1000) return false;
            break;
          case 'medium':
            if (apartmentArea < 1000 || apartmentArea >= 2000) return false;
            break;
          case 'large':
            if (apartmentArea < 2000 || apartmentArea >= 3000) return false;
            break;
          case 'extra-large':
            if (apartmentArea < 3000) return false;
            break;
        }
      }

      // Bedrooms filter
      if (filters.bedrooms && filters.bedrooms !== 'any') {
        const bedroomCount = apartment.bedrooms || 0;
        switch (filters.bedrooms) {
          case 'studio':
            if (bedroomCount !== 0) return false;
            break;
          case '1':
            if (bedroomCount !== 1) return false;
            break;
          case '2':
            if (bedroomCount !== 2) return false;
            break;
          case '3':
            if (bedroomCount !== 3) return false;
            break;
          case '4+':
            if (bedroomCount < 4) return false;
            break;
        }
      }

      // Category filter
      if (filters.category && filters.category !== 'any') {
        const apartmentCategory = apartment.category?.toLowerCase() || '';
        if (!apartmentCategory.includes(filters.category.toLowerCase())) return false;
      }

      // Location filter
      if (filters.location && filters.location !== 'any') {
        const apartmentLocation = apartment.location?.toLowerCase() || '';
        if (!apartmentLocation.includes(filters.location.toLowerCase())) return false;
      }

      return true;
    });
  }, [apartments, filters]);

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      priceRange: '',
      sizeRange: '',
      bedrooms: '',
      category: '',
      location: '',
      searchTerm: ''
    });
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(filter => filter !== '' && filter !== 'any');

  const floorPlans = [
    { floor: 1, available: 8, total: 12, type: 'Commercial & Retail' },
    { floor: 2, available: 3, total: 6, type: 'Studio & 1BR' },
    { floor: 3, available: 2, total: 6, type: 'Studio & 1BR' },
    { floor: 4, available: 4, total: 8, type: '2BR & 3BR' },
    { floor: 5, available: 1, total: 8, type: '2BR & 3BR' },
    { floor: 6, available: 6, total: 8, type: '2BR & 3BR' },
    { floor: 7, available: 2, total: 4, type: 'Penthouse' }
  ];

  const amenities = [
    { icon: Wifi, name: 'High-Speed Internet' },
    { icon: Dumbbell, name: 'Fitness Center' },
    { icon: Waves, name: 'Swimming Pool' },
    { icon: Shield, name: '24/7 Security' },
    { icon: Car, name: 'Covered Parking' },
    { icon: Users, name: 'Community Lounge' }
  ];

  return (
    <div className="relative">
      {/* Hero Section covers navbar */}
      <div className="absolute inset-0 h-[40vh] w-full -z-10">
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Apartments Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="pt-0">
        <GenericHero
          title="Properties"
          description="Modern living spaces designed for contemporary lifestyles. Experience luxury, comfort, and convenience in the heart of Kampala."
          backgroundImage=""
        />
      </div>

      {/* Apartment Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-6">
              Our Properties
            </h2>
            <p className="text-stone-600 text-lg">
              Choose from our range of thoughtfully designed property layouts
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-stone-800">
                Find Your Perfect Property
                {filteredApartments.length !== apartments.length && (
                  <span className="ml-2 text-sm text-stone-500">
                    ({filteredApartments.length} of {apartments.length} properties)
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter size={16} />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <X size={16} />
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {/* Search Bar - Always Visible */}
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search by name, description, or amenities..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="w-full"
              />
            </div>

            {/* Filter Options - Collapsible */}
            {showFilters && (
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Price Range Filter */}
                  <div>
                    <Label htmlFor="priceRange" className="text-sm font-medium text-stone-700">
                      Price Range
                    </Label>
                    <Select
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Any Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Price</SelectItem>
                        <SelectItem value="under-100m">Under UGX 100M</SelectItem>
                        <SelectItem value="100m-200m">UGX 100M - 200M</SelectItem>
                        <SelectItem value="200m-300m">UGX 200M - 300M</SelectItem>
                        <SelectItem value="300m-400m">UGX 300M - 400M</SelectItem>
                        <SelectItem value="above-400m">Above UGX 400M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Size Range Filter */}
                  <div>
                    <Label htmlFor="sizeRange" className="text-sm font-medium text-stone-700">
                      Size Range
                    </Label>
                    <Select
                      value={filters.sizeRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, sizeRange: value }))}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Any Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Size</SelectItem>
                        <SelectItem value="small">Small (Under 80 m²)</SelectItem>
                        <SelectItem value="medium">Medium (80-150 m²)</SelectItem>
                        <SelectItem value="large">Large (150-200 m²)</SelectItem>
                        <SelectItem value="extra-large">Extra Large (200+ m²)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bedrooms Filter */}
                  <div>
                    <Label htmlFor="bedrooms" className="text-sm font-medium text-stone-700">
                      Bedrooms
                    </Label>
                    <Select
                      value={filters.bedrooms}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, bedrooms: value }))}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Any Bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Bedrooms</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4+">4+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium text-stone-700">
                      Category
                    </Label>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Any Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Category</SelectItem>
                        <SelectItem value="Studio">Studio</SelectItem>
                        <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
                        <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
                        <SelectItem value="3 Bedroom">3 Bedroom</SelectItem>
                        <SelectItem value="Penthouse">Penthouse</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium text-stone-700">
                      Location
                    </Label>
                    <Select
                      value={filters.location}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Any Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Location</SelectItem>
                        <SelectItem value="Kampala City Center">Kampala City Center</SelectItem>
                        <SelectItem value="Kololo">Kololo</SelectItem>
                        <SelectItem value="Bukoto">Bukoto</SelectItem>
                        <SelectItem value="Nakasero">Nakasero</SelectItem>
                        <SelectItem value="Muyenga">Muyenga</SelectItem>
                        <SelectItem value="Ntinda">Ntinda</SelectItem>
                        <SelectItem value="Bugolobi">Bugolobi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-stone-800"></div>
              <p className="text-stone-600 mt-4">Loading properties...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Error loading properties: {error}</p>
              <Button onClick={() => window.location.reload()} className="bg-[#4A0072] hover:bg-[#300049]">
                Retry
              </Button>
            </div>
          )}

          {!loading && !error && apartments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-600">No properties available at the moment.</p>
            </div>
          )}

          {!loading && !error && apartments.length > 0 && filteredApartments.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <Square size={48} className="mx-auto text-stone-400" />
              </div>
              <p className="text-stone-600 mb-4">No properties match your current filters.</p>
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="flex items-center gap-2 mx-auto"
              >
                <X size={16} />
                Clear Filters
              </Button>
            </div>
          )}

          {!loading && !error && filteredApartments.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredApartments.map((apartment) => (
                <Card key={apartment.id} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link to={`/property/${apartment.id}`}>
                    <div className="relative">
                      <img
                        src={apartment.featured_image || apartment.images?.[0] || '/placeholder-property.jpg'}
                        alt={apartment.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = '/placeholder-property.jpg';
                          e.target.onerror = null;
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white bg-opacity-90 text-stone-800 px-3 py-1 text-sm font-semibold">
                          ${apartment.price?.toLocaleString()}
                        </span>
                      </div>
                      {apartment.status === 'available' && apartment.featured_image && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#300049] text-stone-800 px-3 py-1 text-sm font-semibold">
                            Available
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium title-font text-stone-800 mb-2">
                        {apartment.title}
                      </h3>
                      
                      {apartment.location && (
                        <div className="flex items-center gap-1 text-stone-500 text-sm mb-2">
                          <MapPin size={14} />
                          <span>{apartment.location}</span>
                        </div>
                      )}
                      
                      {apartment.description && (
                        <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                          {apartment.description}
                        </p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-stone-600">
                          <div className="text-sm font-medium">Bedrooms</div>
                          <div className="text-lg">{apartment.bedrooms || 'Studio'}</div>
                        </div>
                        <div className="text-stone-600">
                          <div className="text-sm font-medium">Bathrooms</div>
                          <div className="text-lg">{apartment.bathrooms}</div>
                        </div>
                        <div className="text-stone-600 col-span-2">
                          <div className="text-sm font-medium">Area</div>
                          <div className="text-lg">{apartment.square_feet} sq ft</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-stone-500">
                          {apartment.category}
                        </div>
                        <Button size="sm" className="bg-[#300049] hover:bg-[#4A0072]">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floor Plans Interactive */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-6">
              Building Floor Plans
            </h2>
            <p className="text-stone-600 text-lg">
              Interactive floor plan showing availability across all levels
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Building Visualization */}
            <div className="bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-medium title-font text-stone-800 mb-6">
                Bongo Towers
              </h3>
              <div className="space-y-2">
                {[...floorPlans].reverse().map((floor) => (
                  <div
                    key={floor.floor}
                    onClick={() => setSelectedFloor(floor)}
                    className={`p-4 cursor-pointer transition-all duration-300 border-2 ${
                      selectedFloor?.floor === floor.floor
                        ? 'border-[#300049] bg-green-50'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-stone-800">
                          Floor {floor.floor}
                        </div>
                        <div className="text-sm text-stone-600">
                          {floor.type}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-stone-800">
                          {floor.available}/{floor.total}
                        </div>
                        <div className="text-xs text-stone-600">Available</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floor Details */}
            <div className="bg-white p-8 shadow-lg">
              {selectedFloor ? (
                <div>
                  <h3 className="text-2xl font-medium title-font text-stone-800 mb-4">
                    Floor {selectedFloor.floor} Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-stone-600">Type: </span>
                      <span className="font-medium">{selectedFloor.type}</span>
                    </div>
                    <div>
                      <span className="text-stone-600">Total Units: </span>
                      <span className="font-medium">{selectedFloor.total}</span>
                    </div>
                    <div>
                      <span className="text-stone-600">Available: </span>
                      <span className="font-medium text-green-600">{selectedFloor.available}</span>
                    </div>
                    <div>
                      <span className="text-stone-600">Occupied: </span>
                      <span className="font-medium text-red-600">{selectedFloor.total - selectedFloor.available}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-[#4A0072] hover:bg-[#300049] text-white">
                    Schedule Viewing
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-stone-400 mb-4">
                    <Square size={48} className="mx-auto" />
                  </div>
                  <p className="text-stone-600">
                    Click on a floor to view details and availability
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-6">
              World-Class Amenities
            </h2>
            <p className="text-stone-600 text-lg">
              Enjoy premium amenities designed to enhance your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {amenities.map((amenity, index) => {
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
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light title-font text-white mb-6">
            Ready to Make This Home?
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Experience luxury apartment living at its finest. Schedule a private tour and discover your new home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#300049] hover:bg-[#300049] text-white px-8 py-3 text-lg font-medium transition-colors duration-300">
              Schedule Tour
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-stone-800 px-8 py-3 text-lg font-medium transition-colors duration-300">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApartmentPage;