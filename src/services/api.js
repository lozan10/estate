import { supabase } from '../lib/supabase';

// Mock data for when database is not available
const mockProperties = [
  {
    id: 1,
    title: "Studio Plan",
    description: "Compact and efficient studio design perfect for young professionals",
    price: null,
    location: "Your Plot",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
    gallery: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500"
    ],
    floor_plan: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500",
    status: "available",
    is_featured: true,
    views_count: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "1 Bedroom Plan",
    description: "Ideal starter home with bedroom, living area, and modern kitchen",
    price: null,
    location: "Your Plot",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500"
    ],
    floor_plan: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500",
    status: "available",
    is_featured: true,
    views_count: 85,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "2 Bedroom Plan",
    description: "Perfect family home with 2 bedrooms, 2 bathrooms, and spacious living areas",
    price: null,
    location: "Your Plot", 
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500",
    gallery: [],
    floor_plan: "",
    status: "available",
    is_featured: false,
    views_count: 95,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "3 Bedroom Plan",
    description: "Spacious family home with 3 bedrooms, 2 bathrooms, and premium finishes",
    price: null,
    location: "Your Plot",
    image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=500",
    gallery: [],
    floor_plan: "",
    status: "available",
    is_featured: false,
    views_count: 110,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockBlog = [
  {
    id: 1,
    title: "Real Estate Investment Guide",
    content: "Complete guide to real estate investment in Uganda...",
    excerpt: "Learn the basics of real estate investment",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500",
    date: new Date().toISOString().split('T')[0],
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Property Owner",
    quote: "Excellent service and professional team. Highly recommended!",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Utility function to handle API errors gracefully
const handleApiCall = async (apiCall, fallbackData = []) => {
  try {
    const result = await apiCall();
    console.log('API call successful:', result);
    return result;
  } catch (error) {
    console.warn('Database not available, using mock data:', error.message);
    console.log('Fallback data:', fallbackData);
    return { data: fallbackData };
  }
};

// PROPERTIES CRUD
export const fetchProperties = async () => {
  const { storageAPI } = await import('./localStorage');
  const properties = storageAPI.getProperties();
  console.log('fetchProperties - loaded from localStorage:', properties);
  return { data: properties };
};

export const createProperty = async (propertyData) => {
  const { storageAPI } = await import('./localStorage');
  const newProperty = storageAPI.addProperty(propertyData);
  console.log('createProperty - added to localStorage:', newProperty);
  return { data: [newProperty] };
};

export const updateProperty = async (id, propertyData) => {
  const { storageAPI } = await import('./localStorage');
  const updatedProperty = storageAPI.updateProperty(id, propertyData);
  console.log('updateProperty - updated in localStorage:', updatedProperty);
  return { data: [updatedProperty] };
};

export const deleteProperty = async (id) => {
  const { storageAPI } = await import('./localStorage');
  storageAPI.deleteProperty(id);
  console.log('deleteProperty - removed from localStorage:', id);
  return { success: true };
};

// BLOG POSTS CRUD - Now using localStorage
export const fetchBlogPosts = async () => {
  const { storageAPI } = await import('./localStorage');
  const blogPosts = storageAPI.getBlogPosts();
  console.log('fetchBlogPosts - loaded from localStorage:', blogPosts);
  return { data: blogPosts };
};

export const createBlogPost = async (blogData) => {
  const { storageAPI } = await import('./localStorage');
  const newBlogPost = storageAPI.addBlogPost(blogData);
  console.log('createBlogPost - added to localStorage:', newBlogPost);
  return { data: [newBlogPost] };
};

export const updateBlogPost = async (id, blogData) => {
  const { storageAPI } = await import('./localStorage');
  const updatedBlogPost = storageAPI.updateBlogPost(id, blogData);
  console.log('updateBlogPost - updated in localStorage:', updatedBlogPost);
  return { data: [updatedBlogPost] };
};

export const deleteBlogPost = async (id) => {
  const { storageAPI } = await import('./localStorage');
  storageAPI.deleteBlogPost(id);
  console.log('deleteBlogPost - removed from localStorage:', id);
  return { success: true };
};

// TESTIMONIALS CRUD - Now using localStorage
export const fetchTestimonials = async () => {
  const { storageAPI } = await import('./localStorage');
  const testimonials = storageAPI.getTestimonials();
  console.log('fetchTestimonials - loaded from localStorage:', testimonials);
  return { data: testimonials };
};

export const createTestimonial = async (testimonialData) => {
  const { storageAPI } = await import('./localStorage');
  const newTestimonial = storageAPI.addTestimonial(testimonialData);
  console.log('createTestimonial - added to localStorage:', newTestimonial);
  return { data: [newTestimonial] };
};

export const updateTestimonial = async (id, testimonialData) => {
  const { storageAPI } = await import('./localStorage');
  const updatedTestimonial = storageAPI.updateTestimonial(id, testimonialData);
  console.log('updateTestimonial - updated in localStorage:', updatedTestimonial);
  return { data: [updatedTestimonial] };
};

export const deleteTestimonial = async (id) => {
  const { storageAPI } = await import('./localStorage');
  storageAPI.deleteTestimonial(id);
  console.log('deleteTestimonial - removed from localStorage:', id);
  return { success: true };
};

// CATEGORIES CRUD
export const fetchCategories = async () => {
  console.log('fetchCategories called - returning mock data');
  return { data: [
    { id: 1, name: "Residential", description: "Houses and apartments", count: 15 },
    { id: 2, name: "Commercial", description: "Office and retail spaces", count: 8 },
    { id: 3, name: "Land", description: "Plots and acres", count: 12 }
  ]};
};

export const createCategory = async (categoryData) => {
  return await handleApiCall(async () => {
    const { data, error } = await supabase.from('categories').insert([categoryData]).select();
    if (error) throw error;
    return { data };
  }, [{ ...categoryData, id: Date.now() }]);
};

export const updateCategory = async (id, categoryData) => {
  return await handleApiCall(async () => {
    const { data, error } = await supabase.from('categories').update(categoryData).eq('id', id).select();
    if (error) throw error;
    return { data };
  }, [{ ...categoryData, id }]);
};

export const deleteCategory = async (id) => {
  return await handleApiCall(async () => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  }, { success: true });
};

// TAGS CRUD
export const fetchTags = async () => {
  console.log('fetchTags called - returning mock data');
  return { data: [
    { id: 1, name: "luxury", color: "#FF6B6B", usage_count: 25 },
    { id: 2, name: "modern", color: "#4ECDC4", usage_count: 18 },
    { id: 3, name: "investment", color: "#45B7D1", usage_count: 32 }
  ]};
};

export const createTag = async (tagData) => {
  return await handleApiCall(async () => {
    const { data, error } = await supabase.from('tags').insert([tagData]).select();
    if (error) throw error;
    return { data };
  }, [{ ...tagData, id: Date.now() }]);
};

export const updateTag = async (id, tagData) => {
  return await handleApiCall(async () => {
    const { data, error } = await supabase.from('tags').update(tagData).eq('id', id).select();
    if (error) throw error;
    return { data };
  }, [{ ...tagData, id }]);
};

export const deleteTag = async (id) => {
  return await handleApiCall(async () => {
    const { error } = await supabase.from('tags').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  }, { success: true });
};

// ANALYTICS
export const fetchAnalytics = async () => {
  console.log('fetchAnalytics called - returning mock data');
  return {
    views: { total: 15420, thisMonth: 3240, growth: 12.5 },
    properties: { total: 4, active: 4, featured: 2 },
    inquiries: { total: 156, thisMonth: 42, pending: 8 },
    revenue: { total: 2400000, thisMonth: 580000, growth: 18.2 }
  };
};

// HERO SLIDES CRUD
export const fetchHeroSlides = async () => {
  const { storageAPI } = await import('./localStorage');
  const heroSlides = storageAPI.getHeroSlides();
  console.log('fetchHeroSlides - loaded from localStorage:', heroSlides);
  return { data: heroSlides };
};

export const createHeroSlide = async (slideData) => {
  const { storageAPI } = await import('./localStorage');
  const newSlide = storageAPI.addHeroSlide(slideData);
  console.log('createHeroSlide - added to localStorage:', newSlide);
  return { data: [newSlide] };
};

export const updateHeroSlide = async (id, slideData) => {
  const { storageAPI } = await import('./localStorage');
  const updatedSlide = storageAPI.updateHeroSlide(id, slideData);
  console.log('updateHeroSlide - updated in localStorage:', updatedSlide);
  return { data: [updatedSlide] };
};

export const deleteHeroSlide = async (id) => {
  const { storageAPI } = await import('./localStorage');
  storageAPI.deleteHeroSlide(id);
  console.log('deleteHeroSlide - removed from localStorage:', id);
  return { success: true };
};

// SECTION SETTINGS
export const fetchSectionSettings = async () => {
  const { storageAPI } = await import('./localStorage');
  const settings = storageAPI.getSectionSettings();
  console.log('fetchSectionSettings - loaded from localStorage:', settings);
  return { data: settings };
};

export const updateSectionSettings = async (sectionKey, data) => {
  const { storageAPI } = await import('./localStorage');
  const updated = storageAPI.updateSectionSetting(sectionKey, data);
  console.log('updateSectionSettings - updated in localStorage:', updated);
  return { data: updated };
};

// APARTMENTS CRUD
export const fetchApartments = async () => {
  const { storageAPI } = await import('./localStorage');
  const apartments = storageAPI.getApartments();
  console.log('fetchApartments - loaded from localStorage:', apartments);
  return { data: apartments };
};

export const createApartment = async (apartmentData) => {
  const { storageAPI } = await import('./localStorage');
  const newApartment = storageAPI.addApartment(apartmentData);
  console.log('createApartment - added to localStorage:', newApartment);
  return { data: [newApartment] };
};

export const updateApartment = async (id, apartmentData) => {
  const { storageAPI } = await import('./localStorage');
  const updatedApartment = storageAPI.updateApartment(id, apartmentData);
  console.log('updateApartment - updated in localStorage:', updatedApartment);
  return { data: [updatedApartment] };
};

export const deleteApartment = async (id) => {
  const { storageAPI } = await import('./localStorage');
  storageAPI.deleteApartment(id);
  console.log('deleteApartment - removed from localStorage:', id);
  return { success: true };
};