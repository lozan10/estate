// localStorage-based data persistence for real-time sync
const STORAGE_KEYS = {
  PROPERTIES: 'nyinimu_properties',
  BLOG_POSTS: 'nyinimu_blog_posts',
  TESTIMONIALS: 'nyinimu_testimonials',
  CATEGORIES: 'nyinimu_categories',
  TAGS: 'nyinimu_tags',
  HERO_SLIDES: 'nyinimu_hero_slides',
  APARTMENTS: 'nyinimu_apartments',
  SECTION_SETTINGS: 'nyinimu_section_settings'
};

// Initialize with default data if localStorage is empty
const initializeDefaultData = () => {
  const defaultProperties = [
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

  const defaultApartments = [
    {
      id: 1,
      name: "Studio",
      description: "Compact and efficient studio design perfect for young professionals",
      area: "45-65 m²",
      price: "From UGX 85,000,000",
      bedrooms: 0,
      bathrooms: 1,
      category: "Studio",
      location: "Kampala City Center",
      amenities: ["High-Speed Internet", "Security", "Parking"],
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      floor_plan: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500",
      is_featured: true,
      status: "available",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      name: "One Bedroom",
      description: "Ideal starter home with bedroom, living area, and modern kitchen",
      area: "75-95 m²",
      price: "From UGX 120,000,000",
      bedrooms: 1,
      bathrooms: 1,
      category: "1 Bedroom",
      location: "Kololo",
      amenities: ["High-Speed Internet", "Fitness Center", "Swimming Pool", "Security"],
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [],
      floor_plan: "",
      is_featured: true,
      status: "available",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      name: "Two Bedroom",
      description: "Perfect family home with 2 bedrooms, 2 bathrooms, and spacious living areas",
      area: "110-140 m²",
      price: "From UGX 185,000,000",
      bedrooms: 2,
      bathrooms: 2,
      category: "2 Bedroom",
      location: "Bukoto",
      amenities: ["High-Speed Internet", "Fitness Center", "Swimming Pool", "Security", "Parking"],
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [],
      floor_plan: "",
      is_featured: false,
      status: "available",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      name: "Three Bedroom",
      description: "Spacious family home with 3 bedrooms, 2 bathrooms, and premium finishes",
      area: "150-180 m²",
      price: "From UGX 250,000,000",
      bedrooms: 3,
      bathrooms: 2,
      category: "3 Bedroom",
      location: "Nakasero",
      amenities: ["High-Speed Internet", "Fitness Center", "Swimming Pool", "Security", "Parking", "Community Lounge"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [],
      floor_plan: "",
      is_featured: false,
      status: "available",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 5,
      name: "Penthouse",
      description: "Luxury penthouse with premium finishes and spectacular city views",
      area: "200-300 m²",
      price: "From UGX 450,000,000",
      bedrooms: 4,
      bathrooms: 3,
      category: "Penthouse",
      location: "Muyenga",
      amenities: ["High-Speed Internet", "Fitness Center", "Swimming Pool", "Security", "Parking", "Community Lounge", "Terrace"],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [],
      floor_plan: "",
      is_featured: true,
      status: "available",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const defaultBlogPosts = [
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

  const defaultTestimonials = [
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

  // Initialize localStorage with default data if empty
  if (!localStorage.getItem(STORAGE_KEYS.PROPERTIES)) {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(defaultProperties));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOG_POSTS)) {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(defaultBlogPosts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(defaultTestimonials));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TAGS)) {
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.HERO_SLIDES)) {
    const defaultHeroSlides = [
      {
        id: 1,
        backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        interiorImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
        title: "NYINIMU PROPERTIES",
        subtitle: "DAILY PAYMENTS. YOUR HOME. BUY DAILY. OWN FOREVER.",
        order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        backgroundImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        interiorImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
        title: "FROM TENANT TO LANDLORD",
        subtitle: "DAILY, NZE LANDLORD. YOUR HUSTLE, YOUR HOME.",
        order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        backgroundImage: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1200&q=80",
        interiorImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        title: "BUILDING YOUR LEGACY",
        subtitle: "DAY BY DAY. HOMEOWNERSHIP FOR EVERY UGANDAN.",
        order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 4,
        backgroundImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        interiorImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80",
        title: "THE PATH TO OWNERSHIP",
        subtitle: "STARTS WITH A STEP. AND A DAILY PAYMENT.",
        order: 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(defaultHeroSlides));
  }
  if (!localStorage.getItem(STORAGE_KEYS.APARTMENTS)) {
    localStorage.setItem(STORAGE_KEYS.APARTMENTS, JSON.stringify(defaultApartments));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SECTION_SETTINGS)) {
    const defaultSectionSettings = {
      apartmentPlans: {
        title: "Property Plans & Layouts",
        subtitle: "Choose from our range of carefully designed property plans. Each layout is crafted to maximize space, comfort, and functionality for modern living.",
        updated_at: new Date().toISOString()
      }
    };
    localStorage.setItem(STORAGE_KEYS.SECTION_SETTINGS, JSON.stringify(defaultSectionSettings));
  }
};

// Storage operations
export const storageAPI = {
  // Properties
  getProperties: () => {
    initializeDefaultData();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROPERTIES) || '[]');
  },
  
  setProperties: (properties) => {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('propertiesUpdated', { detail: properties }));
  },
  
  addProperty: (property) => {
    const properties = storageAPI.getProperties();
    const newProperty = { ...property, id: Date.now(), created_at: new Date().toISOString() };
    properties.unshift(newProperty);
    storageAPI.setProperties(properties);
    return newProperty;
  },
  
  updateProperty: (id, updates) => {
    const properties = storageAPI.getProperties();
    const index = properties.findIndex(p => p.id === id);
    if (index !== -1) {
      properties[index] = { ...properties[index], ...updates, updated_at: new Date().toISOString() };
      storageAPI.setProperties(properties);
      return properties[index];
    }
    return null;
  },
  
  deleteProperty: (id) => {
    const properties = storageAPI.getProperties();
    const filtered = properties.filter(p => p.id !== id);
    storageAPI.setProperties(filtered);
    return true;
  },

  // Blog Posts
  getBlogPosts: () => {
    initializeDefaultData();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOG_POSTS) || '[]');
  },
  
  setBlogPosts: (posts) => {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent('blogPostsUpdated', { detail: posts }));
  },
  
  addBlogPost: (post) => {
    const posts = storageAPI.getBlogPosts();
    const newPost = { ...post, id: Date.now(), created_at: new Date().toISOString() };
    posts.unshift(newPost);
    storageAPI.setBlogPosts(posts);
    return newPost;
  },
  
  updateBlogPost: (id, updates) => {
    const posts = storageAPI.getBlogPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updates, updated_at: new Date().toISOString() };
      storageAPI.setBlogPosts(posts);
      return posts[index];
    }
    return null;
  },
  
  deleteBlogPost: (id) => {
    const posts = storageAPI.getBlogPosts();
    const filtered = posts.filter(p => p.id !== id);
    storageAPI.setBlogPosts(filtered);
    return true;
  },

  // Testimonials
  getTestimonials: () => {
    initializeDefaultData();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TESTIMONIALS) || '[]');
  },
  
  setTestimonials: (testimonials) => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    window.dispatchEvent(new CustomEvent('testimonialsUpdated', { detail: testimonials }));
  },
  
  addTestimonial: (testimonial) => {
    const testimonials = storageAPI.getTestimonials();
    const newTestimonial = { ...testimonial, id: Date.now(), created_at: new Date().toISOString() };
    testimonials.unshift(newTestimonial);
    storageAPI.setTestimonials(testimonials);
    return newTestimonial;
  },
  
  updateTestimonial: (id, updates) => {
    const testimonials = storageAPI.getTestimonials();
    const index = testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      testimonials[index] = { ...testimonials[index], ...updates, updated_at: new Date().toISOString() };
      storageAPI.setTestimonials(testimonials);
      return testimonials[index];
    }
    return null;
  },
  
  deleteTestimonial: (id) => {
    const testimonials = storageAPI.getTestimonials();
    const filtered = testimonials.filter(t => t.id !== id);
    storageAPI.setTestimonials(filtered);
    return true;
  },

  // Apartments
  getApartments: () => {
    initializeDefaultData();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.APARTMENTS) || '[]');
  },
  
  setApartments: (apartments) => {
    localStorage.setItem(STORAGE_KEYS.APARTMENTS, JSON.stringify(apartments));
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('apartmentsUpdated', { detail: apartments }));
  },
  
  addApartment: (apartment) => {
    const apartments = storageAPI.getApartments();
    const newApartment = { ...apartment, id: Date.now(), created_at: new Date().toISOString() };
    apartments.unshift(newApartment);
    storageAPI.setApartments(apartments);
    return newApartment;
  },
  
  updateApartment: (id, updates) => {
    const apartments = storageAPI.getApartments();
    const index = apartments.findIndex(a => a.id === id);
    if (index !== -1) {
      apartments[index] = { ...apartments[index], ...updates, updated_at: new Date().toISOString() };
      storageAPI.setApartments(apartments);
      return apartments[index];
    }
    return null;
  },
  
  deleteApartment: (id) => {
    const apartments = storageAPI.getApartments();
    const filtered = apartments.filter(a => a.id !== id);
    storageAPI.setApartments(filtered);
    return true;
  },

  // Hero Slides CRUD
  getHeroSlides: () => {
    const data = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
    return data ? JSON.parse(data) : [];
  },

  setHeroSlides: (slides) => {
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(slides));
    window.dispatchEvent(new CustomEvent('heroSlidesUpdated'));
  },

  addHeroSlide: (slideData) => {
    const slides = storageAPI.getHeroSlides();
    const newSlide = {
      id: Date.now(),
      ...slideData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    slides.push(newSlide);
    storageAPI.setHeroSlides(slides);
    return newSlide;
  },

  updateHeroSlide: (id, slideData) => {
    const slides = storageAPI.getHeroSlides();
    const index = slides.findIndex(s => s.id === id);
    if (index !== -1) {
      slides[index] = {
        ...slides[index],
        ...slideData,
        id: id,
        updated_at: new Date().toISOString()
      };
      storageAPI.setHeroSlides(slides);
      return slides[index];
    }
    return null;
  },

  deleteHeroSlide: (id) => {
    const slides = storageAPI.getHeroSlides();
    const filtered = slides.filter(s => s.id !== id);
    storageAPI.setHeroSlides(filtered);
    return true;
  },

  // Section Settings CRUD
  getSectionSettings: () => {
    const data = localStorage.getItem(STORAGE_KEYS.SECTION_SETTINGS);
    return data ? JSON.parse(data) : {};
  },

  setSectionSettings: (settings) => {
    localStorage.setItem(STORAGE_KEYS.SECTION_SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('sectionSettingsUpdated'));
  },

  updateSectionSetting: (sectionKey, data) => {
    const settings = storageAPI.getSectionSettings();
    settings[sectionKey] = {
      ...settings[sectionKey],
      ...data,
      updated_at: new Date().toISOString()
    };
    storageAPI.setSectionSettings(settings);
    return settings[sectionKey];
  }
};