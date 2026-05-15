import React, { useMemo, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Image as ImageIcon, MapPin, Layers } from 'lucide-react';
import ImageGalleryModal from '../components/ImageGalleryModal';

const GalleryPage = () => {
  const { properties, blogPosts, heroSlides, loading, error } = useData();

  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Derive unique categories and locations from properties
  const { categories, locations } = useMemo(() => {
    const catSet = new Set();
    const locSet = new Set();
    (properties || []).forEach((p) => {
      if (p.category) catSet.add(p.category);
      if (p.location) locSet.add(p.location);
    });
    return {
      categories: Array.from(catSet),
      locations: Array.from(locSet),
    };
  }, [properties]);

  // Build the gallery items list according to filters
  const galleryItems = useMemo(() => {
    const items = [];

    // Helper to avoid duplicates
    const pushImage = (url, meta) => {
      if (!url) return;
      items.push({ url, ...meta });
    };

    // Property images (respect filters)
    (properties || []).forEach((p) => {
      const matchCategory = category === 'all' || p.category === category;
      const matchLocation = location === 'all' || p.location === location;
      if (!matchCategory || !matchLocation) return;

      const seen = new Set();
      if (p.featured_image) {
        seen.add(p.featured_image);
        pushImage(p.featured_image, {
          type: 'property',
          title: p.title,
          subtitle: p.location,
          id: p.id,
          category: p.category,
          location: p.location,
          link: `/property/${p.id}`,
        });
      }
      (p.images || []).forEach((img) => {
        if (img && !seen.has(img)) {
          seen.add(img);
          pushImage(img, {
            type: 'property',
            title: p.title,
            subtitle: p.location,
            id: p.id,
            category: p.category,
            location: p.location,
            link: `/property/${p.id}`,
          });
        }
      });
    });

    // Only include non-property images when no filters are applied
    const includeAll = category === 'all' && location === 'all';

    if (includeAll) {
      // Hero slides
      (heroSlides || []).forEach((s) => {
        if (s.background_image) {
          pushImage(s.background_image, {
            type: 'hero',
            title: s.title,
            subtitle: s.subtitle,
          });
        }
        if (s.interior_image) {
          pushImage(s.interior_image, {
            type: 'hero',
            title: s.title,
            subtitle: s.subtitle,
          });
        }
      });

      // Blog featured images
      (blogPosts || []).forEach((b) => {
        if (b.featured_image) {
          pushImage(b.featured_image, {
            type: 'blog',
            title: b.title,
            subtitle: b.excerpt,
            link: `/blog/${b.id}`,
          });
        }
      });
    }

    return items;
  }, [properties, blogPosts, heroSlides, category, location]);

  const imageUrls = galleryItems.map((i) => i.url);

  const handleClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading gallery</p>
          <p className="text-stone-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-light title-font text-stone-800 flex items-center gap-2">
              <ImageIcon className="w-7 h-7 text-[#300049]" /> Gallery
            </h1>
            <p className="text-stone-500">Explore our properties, hero slides and blog visuals</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Category Filter */}
            <div className="min-w-[200px]">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="min-w-[200px]">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset */}
            <Button variant="outline" onClick={() => { setCategory('all'); setLocation('all'); }}>
              Reset
            </Button>
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {imageUrls.length === 0 ? (
          <div className="text-center text-stone-500 py-20">No images found</div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryItems.map((item, idx) => (
              <div key={idx} className="relative break-inside-avoid overflow-hidden rounded-xl group">
                <img
                  src={item.url}
                  alt={item.title || `Image ${idx + 1}`}
                  className="w-full object-cover hover:opacity-90 transition-all duration-300 cursor-zoom-in"
                  style={{ minHeight: '320px' }}
                  onClick={() => handleClick(idx)}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                {/* Meta */}
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge className="bg-white/90 text-stone-800 capitalize">{item.type}</Badge>
                  {item.category && (
                    <Badge variant="outline" className="bg-white/90 text-stone-800">{item.category}</Badge>
                  )}
                </div>
                {item.subtitle && (
                  <div className="absolute bottom-2 left-2 right-2 text-white text-xs drop-shadow">
                    {item.subtitle}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <ImageGalleryModal
        images={imageUrls}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentMetaList={galleryItems}
      />
    </div>
  );
};

export default GalleryPage;
