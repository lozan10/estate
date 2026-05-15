import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const { blogPosts, loading } = useData();
  
  // Filter only featured blog posts for homepage display
  const featuredPosts = blogPosts.filter(post => post.is_featured);
  const displayPosts = featuredPosts.length > 0 ? featuredPosts.slice(0, 4) : blogPosts.slice(0, 4);

  if (loading) {
    return (
      <section className="bg-[#0e0014] text-white py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#300049]"></div>
          <p className="text-white mt-4">Loading blog posts...</p>
        </div>
      </section>
    );
  }

  if (displayPosts.length === 0) {
    return (
      <section className="bg-[#0e0014] text-white py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white">No blog posts available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0e0014] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        
        {/* Left Side - Intro Text */}
        <div className="space-y-6">
          <p className="text-[#D5B4E7] text-xs uppercase tracking-[0.3em]">Latest Articles</p>
          <h2 className="text-4xl md:text-5xl font-serif leading-snug tracking-wide">
            Insights From <br />
            Our Blog <br />
            Read, Enjoy <br /> & Learn
          </h2>
          <div className="w-8 h-px bg-[#D5B4E7]"></div>
          <p className="text-sm text-[#9a7ab0] tracking-wide leading-relaxed">
            Stay informed with the latest real estate news, tips and success stories from Bongo Estates.
          </p>
          <Link to="/blog">
            <button className="mt-2 border border-[#D5B4E7] text-[#D5B4E7] px-6 py-2.5 text-sm uppercase tracking-widest hover:bg-[#D5B4E7] hover:text-[#0e0014] transition-all duration-300">
              View All Posts
            </button>
          </Link>
        </div>

        {/* Blog Cards */}
        <div 
          className="lg:col-span-2 flex md:grid md:grid-cols-2 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {displayPosts.map((post) => (
            <div 
              key={post.id} 
              className="flex-shrink-0 w-[280px] md:w-auto snap-start space-y-4 bg-[#1b0027] border border-[#4A0072]/30 p-4 hover:border-[#D5B4E7]/40 transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[220px] md:h-[280px] object-cover transform hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#0e0014]/80 px-4 py-1 text-xs tracking-widest uppercase rounded">
                  {post.date || new Date(post.created_at).toLocaleDateString()}
                </span>
                {post.is_featured && (
                  <span className="absolute top-4 right-4 bg-[#300049] text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="text-lg font-serif uppercase line-clamp-2">{post.title}</h3>
              <p className="text-sm text-gray-300 line-clamp-2">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`}>
                <button className="flex items-center space-x-2 text-[#D5B4E7] group">
                  <span className="group-hover:underline">Read More</span>
                  <ArrowRight 
                    size={18} 
                    className="transform group-hover:translate-x-1 transition" 
                  />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
