import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [propertiesRes, blogsRes, slidesRes] = await Promise.allSettled([
        api.get('/properties'),
        api.get('/blogs?published=true'),
        api.get('/hero-slides?active_only=true')
      ]);

      setProperties(propertiesRes.status === 'fulfilled' ? propertiesRes.value.data : []);
      setBlogPosts(blogsRes.status === 'fulfilled' ? blogsRes.value.data : []);
      setHeroSlides(slidesRes.status === 'fulfilled' ? slidesRes.value.data : []);
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Methods for dashboard to update data
  const refreshData = () => {
    fetchAllData();
  };

  const addProperty = (property) => {
    setProperties(prev => [property, ...prev]);
  };

  const updateProperty = (updatedProperty) => {
    setProperties(prev => 
      prev.map(p => p.id === updatedProperty.id ? updatedProperty : p)
    );
  };

  const removeProperty = (propertyId) => {
    setProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  const addBlogPost = (blogPost) => {
    setBlogPosts(prev => [blogPost, ...prev]);
  };

  const updateBlogPost = (updatedBlogPost) => {
    setBlogPosts(prev => 
      prev.map(b => b.id === updatedBlogPost.id ? updatedBlogPost : b)
    );
  };

  const removeBlogPost = (blogPostId) => {
    setBlogPosts(prev => prev.filter(b => b.id !== blogPostId));
  };

  const addHeroSlide = (slide) => {
    setHeroSlides(prev => [...prev, slide]);
  };

  const updateHeroSlide = (slideId, updatedSlide) => {
    setHeroSlides(prev => prev.map(s => s.id === slideId ? { ...s, ...updatedSlide } : s));
  };

  const removeHeroSlide = (slideId) => {
    setHeroSlides(prev => prev.filter(s => s.id !== slideId));
  };

  const value = {
    // Data
    properties,
    blogPosts,
    testimonials,
    heroSlides,
    loading,
    error,
    
    // Computed
    apartments: properties, // Alias for compatibility
    featuredProperties: properties.filter(p => p.status === 'available').slice(0, 6),
    featuredBlogPosts: blogPosts.filter(b => b.published).slice(0, 3),
    
    // Methods
    addProperty,
    updateProperty,
    removeProperty,
    addBlogPost,
    updateBlogPost,
    removeBlogPost,
    addHeroSlide,
    updateHeroSlide,
    removeHeroSlide,
    refreshData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
