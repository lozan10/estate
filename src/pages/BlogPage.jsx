import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { blogPosts, loading, error } = useData();

  // Derive categories if available; otherwise keep empty
  const derivedCategories = Array.from(
    new Set(
      blogPosts
        .map((p) => p.category)
        .filter((c) => typeof c === 'string' && c.trim().length > 0)
    )
  ).map((name) => ({ id: name, name, count: blogPosts.filter((p) => p.category === name).length }));

  // Filter posts by category
  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter((post) => post.category === selectedCategory);

  if (loading) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 mx-auto mb-4"></div>
        <p className="text-stone-600">Loading blog posts...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 mb-4">Error loading blog posts</p>
        <p className="text-stone-600">{error}</p>
      </div>
    </div>
  );

  const placeholderImg = 'https://via.placeholder.com/600x400?text=Blog+Image';

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Blog Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light title-font mb-6">
            BLOG
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Stay informed with the latest insights, trends, and expert advice from the world of real estate and luxury living.
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xl font-medium title-font text-stone-800 mb-6">
                  Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-3 transition-all duration-300 border-l-4 ${
                      selectedCategory === 'all'
                        ? 'border-[#300049] bg-green-50 text-stone-800'
                        : 'border-transparent hover:border-stone-300 text-stone-600 hover:text-stone-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>All Posts</span>
                      <span className="text-sm text-stone-400">({blogPosts.length})</span>
                    </div>
                  </button>
                  {derivedCategories.length > 0 && derivedCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 transition-all duration-300 border-l-4 ${
                        selectedCategory === category.id
                          ? 'border-[#300049] bg-green-50 text-stone-800'
                          : 'border-transparent hover:border-stone-300 text-stone-600 hover:text-stone-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm text-stone-400">({category.count})</span>
                      </div>
                    </button>
                  ))}
                  {derivedCategories.length === 0 && (
                    <div className="text-sm text-stone-500">No categories</div>
                  )}
                </div>
              </div>

              {/* Latest News */}
              <div>
                <h3 className="text-xl font-medium title-font text-stone-800 mb-6">
                  Latest News
                </h3>
                <div className="space-y-6">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="group">
                      <div className="flex space-x-4">
                        <img
                          src={post.featured_image || placeholderImg}
                          alt={post.title}
                          className="w-16 h-16 object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <Link to={`/blog/${post.id}`}>
                            <h4 className="text-sm font-medium text-stone-800 group-hover:text-[#300049] transition-colors duration-300 line-clamp-2 mb-2">
                              {post.title}
                            </h4>
                          </Link>
                          <div className="flex items-center text-xs text-stone-500">
                            <Calendar size={12} className="mr-1" />
                            {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {blogPosts.length === 0 && (
                    <div className="text-sm text-stone-500">No blog posts yet</div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {filteredPosts.length === 0 ? (
                <div className="text-center text-stone-500">No blog posts found</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <img
                          src={post.featured_image || placeholderImg}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <CardContent className="p-6">
                        <Link to={`/blog/${post.id}`}>
                          <h3 className="text-lg font-medium title-font text-stone-800 mb-3 group-hover:text-[#300049] transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
                            </div>
                          </div>
                        </div>

                        <Link to={`/blog/${post.id}`}>
                          <Button variant="ghost" className="p-0 h-auto text-[#300049] hover:text-[#4A0072] text-sm group-hover:gap-2 transition-all duration-300">
                            Read More
                            <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination (static example) */}
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="px-3 py-2">
                    Previous
                  </Button>
                  <Button size="sm" className="px-3 py-2 bg-[#4A0072] text-white">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="px-3 py-2">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="px-3 py-2">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="px-3 py-2">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-[#4A0072]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light title-font text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Subscribe to our newsletter and get the latest real estate insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-stone-600 bg-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D5B4E7]"
            />
            <Button className="bg-[#300049] hover:bg-[#300049] text-white px-6 py-3 font-medium transition-colors duration-300">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;