import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Calendar,
  Phone,
  Mail,
  Share2,
  Heart,
  ArrowLeft,
  Video,
  Layout,
  Image as ImageIcon,
} from "lucide-react";
import { useData } from "../contexts/DataContext";
import ImageGalleryModal from "../components/ImageGalleryModal";
import api from "../utils/api";

function splitIntoColumns(images, columnsCount) {
  const columns = Array.from({ length: columnsCount }, () => []);
  images.forEach((img, idx) => {
    columns[idx % columnsCount].push(img);
  });
  return columns;
}

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { properties, apartments, loading } = useData();
  const [isLiked, setIsLiked] = useState(false);
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("gallery");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setGalleryOpen(true);
  };

  useEffect(() => {
    const allProperties = [...(properties || []), ...(apartments || [])];
    if (allProperties.length > 0) {
      const foundProperty = allProperties.find((p) => p.id.toString() === id);
      setProperty(foundProperty);
    }
  }, [id, properties, apartments]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-stone-800 mb-4">
            Property not found
          </h2>
          <Link to="/properties">
            <Button className="bg-[#300049] hover:bg-[#4A0072] text-white">
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayImages =
    property.images && property.images.length > 0
      ? property.images
      : property.featured_image ? [property.featured_image] : [];
  
  // Hero Section Background - use featured_image first, then first image
  const heroBg =
    property.featured_image ||
    property.images?.[0] ||
    "https://ik.imagekit.io/hqhiltiie/Nyinimu/done%20house/e868422d41c58b6b0bd8ee693e691380.jpg?updatedAt=1760196217960";

  const amenitiesList = Array.isArray(property.amenities)
    ? property.amenities
    : [];

  const allProperties = [...(properties || []), ...(apartments || [])];
  const relatedProperties = allProperties
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  const columns = splitIntoColumns(displayImages, 5); // Change to 5 columns

  return (
    <div>
      {/* Back Button - fixed and visible above content */}
      {/* <div className="fixed top-20 left-4 z-30">
        <Link
          to="/properties"
          className="inline-flex items-center px-3 py-2 bg-white/90 rounded-lg shadow text-stone-600 hover:text-stone-800 transition-colors duration-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Properties
        </Link>
      </div> */}

      <div>
        {/* 🏙️ Hero Section */}
        <div
          className="relative h-[60vh] bg-cover bg-center flex items-end"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${heroBg})`,
          }}
        >
          <div className="absolute top-24 left-6">
            <Link to="/properties">
              <Button className="bg-white/70 hover:bg-white text-gray-800">
                <ArrowLeft size={16} className="mr-2" /> Back
              </Button>
            </Link>
          </div>

          <div className="p-8 text-white space-y-2">
            <h1 className="text-4xl font-bold">{property.title}</h1>
            <p className="text-lg flex items-center">
              <MapPin size={18} className="mr-2" /> {property.location}
            </p>
            <p className="text-3xl font-semibold text-yellow-400">
              {property.price || "Contact for Price"}
            </p>
          </div>
        </div>

        {/* 🖼️ Tabs for Gallery / Floor Plan / Video */}
        <div className="bg-stone-100 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex space-x-4 overflow-x-auto">
            <Button
              variant={activeTab === "gallery" ? "default" : "outline"}
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center ${
                activeTab === "gallery"
                  ? "bg-[#4A0072] text-white"
                  : "text-stone-700 border-stone-300"
              }`}
            >
              <ImageIcon size={16} className="mr-2" />
              Gallery
            </Button>
            
            {/* Only show Floor Plan tab if property is not land */}
            {property.category !== 'land' && (
              <Button
                variant={activeTab === "floor" ? "default" : "outline"}
                onClick={() => setActiveTab("floor")}
                className={`flex items-center ${
                  activeTab === "floor"
                    ? "bg-[#4A0072] text-white"
                    : "text-stone-700 border-stone-300"
                }`}
              >
                <Layout size={16} className="mr-2" />
                Floor Plan
              </Button>
            )}
            
            <Button
              variant={activeTab === "video" ? "default" : "outline"}
              onClick={() => setActiveTab("video")}
              className={`flex items-center ${
                activeTab === "video"
                  ? "bg-[#4A0072] text-white"
                  : "text-stone-700 border-stone-300"
              }`}
            >
              <Video size={16} className="mr-2" />
              Video Tour
            </Button>
          </div>
        </div>

        {/* 🧱 Gallery / Floor / Video Section */}
        <section className="relative py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === "gallery" && (
              <div className="columns-2 md:columns-3 lg:columns-5 gap-6 space-y-6">
                {columns.map((col, colIdx) => (
                  <div className="flex flex-col gap-2" key={colIdx}>
                    {col.map((img, idx) => {
                      // Calculate the actual index in the full images array
                      const actualIndex = columns.slice(0, colIdx).reduce((sum, c) => sum + c.length, 0) + idx;
                      return (
                        <img
                          key={idx}
                          src={img}
                          alt={`Property image ${colIdx}-${idx}`}
                          className="w-full rounded-xl object-cover hover:opacity-90 transition-all duration-300 cursor-pointer"
                          style={{ minHeight: "260px", maxHeight: "420px" }}
                          onClick={() => handleImageClick(actualIndex)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "floor" && property.category !== 'land' && (
              <div className="text-center py-20">
                {property.floor_plan ? (
                  <img
                    src={property.floor_plan}
                    alt="Floor Plan"
                    className="mx-auto rounded-lg shadow-lg max-w-4xl cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(property.floor_plan, '_blank')}
                  />
                ) : (
                  <p className="text-stone-500">
                    Floor plan not available for this property.
                  </p>
                )}
              </div>
            )}

            {activeTab === "video" && (
              <div className="text-center py-20">
                {property.video_tour ? (
                  <div className="max-w-4xl mx-auto">
                    {property.video_tour.includes('youtube.com') || property.video_tour.includes('youtu.be') ? (
                      <iframe
                        className="w-full h-[480px] rounded-lg shadow-lg"
                        src={property.video_tour.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                        title="Video Tour"
                        allowFullScreen
                      ></iframe>
                    ) : property.video_tour.includes('vimeo.com') ? (
                      <iframe
                        className="w-full h-[480px] rounded-lg shadow-lg"
                        src={property.video_tour.replace('vimeo.com/', 'player.vimeo.com/video/')}
                        title="Video Tour"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video
                        className="w-full rounded-lg shadow-lg"
                        controls
                        src={property.video_tour}
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ) : (
                  <p className="text-stone-500">
                    No video tour available for this property.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 🏠 Property Details */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-green-100 text-green-800">
                      {property.status || "Available"}
                    </Badge>
                    {property.category && (
                      <Badge variant="outline">{property.category}</Badge>
                    )}
                  </div>
                  <h2 className="text-3xl font-semibold text-stone-800 mb-4">
                    {property.title}
                  </h2>
                  <div className="text-2xl font-semibold text-stone-800 mb-6">
                    {property.price}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-stone-50 rounded-lg">
                  <div className="text-center">
                    <Bed className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                    <div className="text-2xl font-semibold">
                      {property.bedrooms || "N/A"}
                    </div>
                    <p className="text-sm text-stone-500">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                    <div className="text-2xl font-semibold">
                      {property.bathrooms || "N/A"}
                    </div>
                    <p className="text-sm text-stone-500">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <Square className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                    <div className="text-2xl font-semibold">
                      {property.area || "N/A"}
                    </div>
                    <p className="text-sm text-stone-500">Area (sqft)</p>
                  </div>
                  <div className="text-center">
                    <Car className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                    <div className="text-2xl font-semibold">
                      {property.parking || "Yes"}
                    </div>
                    <p className="text-sm text-stone-500">Parking</p>
                  </div>
                </div>

                {/* Description */}
                {property.description && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-medium mb-3">Description</h3>
                    <p className="text-stone-600 text-lg leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                )}

                {/* Amenities */}
                {amenitiesList.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-medium mb-3">
                      Amenities & Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {amenitiesList.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center text-stone-600"
                        >
                          <div className="w-2 h-2 bg-[#300049] mr-3"></div>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div>
                <Card className="border-0 shadow-lg mb-6">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto bg-stone-200 rounded-full flex items-center justify-center mb-4">
                      <Phone size={30} className="text-stone-700" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Contact Agent</h3>
                    <p className="text-stone-500 mb-4">
                      Get in touch for more details
                    </p>
                    <div className="space-y-3">
                      <Button className="w-full bg-[#300049] hover:bg-[#4A0072] text-white">
                        <Phone size={16} className="mr-2" /> Call Now
                      </Button>
                      <a href={`/contact?property_id=${property.id}`}>
                        <Button variant="outline" className="w-full">
                          <Mail size={16} className="mr-2" /> Contact about this property
                        </Button>
                      </a>
                      <Button variant="outline" className="w-full">
                        <Calendar size={16} className="mr-2" /> Schedule Viewing
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Inline Contact Form */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Send a message</h3>
                    <PropertyContactForm propertyId={property.id} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        images={displayImages}
        initialIndex={selectedImageIndex}
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
};

// Inline contact form component
function PropertyContactForm({ propertyId }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    try {
      await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        property_id: propertyId,
      });
      setSuccess('Message sent! We will get back to you.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Full name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          placeholder="Your message"
          className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
          required
        />
      </div>
      <Button type="submit" disabled={submitting} className="w-full bg-[#300049] hover:bg-[#4A0072] text-white">
        {submitting ? 'Sending...' : 'Send Message'}
      </Button>
      {success && <p className="text-sm text-green-600">{success}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}

export default PropertyDetailPage;
