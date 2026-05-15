import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const BlogDetailPage = () => {
  const { id } = useParams();
  const { blogPosts, loading } = useData();
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    if (blogPosts && blogPosts.length > 0) {
      const post = blogPosts.find(p => p.id.toString() === id);
      setBlogPost(post);
    }
  }, [id, blogPosts]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-stone-800 mb-4">Blog post not found</h2>
          <Link to="/blog">
            <Button className="bg-[#4A0072] hover:bg-[#300049] text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts (other blog posts excluding current one)
  const relatedPosts = blogPosts
    .filter(p => p.id !== blogPost.id)
    .slice(0, 2);

  return (
    <div className="pt-20">
      {/* Back Button */}
      <div className="bg-stone-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-stone-600 hover:text-stone-800 transition-colors duration-300">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative">
        <div className="h-96 overflow-hidden">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article>
            {/* Article Header */}
            <header className="mb-12">
              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blogPost.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-6 leading-tight">
                {blogPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-stone-600 mb-6">
                {blogPost.author && (
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>{blogPost.author}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{new Date(blogPost.date || blogPost.created_at).toLocaleDateString('en-GB', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                {blogPost.readTime && (
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>{blogPost.readTime}</span>
                  </div>
                )}
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-4 pt-6 border-t border-stone-200">
                <span className="text-stone-600 font-medium">Share:</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="p-2 text-stone-600 hover:text-blue-600">
                    <Facebook size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 text-stone-600 hover:text-blue-400">
                    <Twitter size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 text-stone-600 hover:text-blue-700">
                    <Linkedin size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 text-stone-600 hover:text-stone-800">
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>
            </header>

            {/* Excerpt */}
            {blogPost.excerpt && (
              <div className="mb-8 p-6 bg-green-50 border-l-4 border-[#300049]">
                <p className="text-lg text-stone-700 italic">{blogPost.excerpt}</p>
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none prose-stone prose-headings:title-font prose-headings:font-medium prose-p:leading-relaxed prose-p:text-stone-600 prose-li:text-stone-600 prose-strong:text-stone-800">
              <div style={{ whiteSpace: 'pre-wrap' }}>{blogPost.content}</div>
            </div>

            {/* Author Bio */}
            {blogPost.author && (
              <div className="mt-16 pt-12 border-t border-stone-200">
                <div className="flex items-start space-x-6">
                  {blogPost.authorImage && (
                    <img
                      src={blogPost.authorImage}
                      alt={blogPost.author}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-medium title-font text-stone-800 mb-2">
                      {blogPost.author}
                    </h3>
                    {blogPost.authorBio && (
                      <p className="text-stone-600 leading-relaxed">
                        {blogPost.authorBio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light title-font text-stone-800 mb-6">
                Related Articles
              </h2>
              <p className="text-stone-600 text-lg">
                Continue reading our latest insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium title-font text-stone-800 mb-3 group-hover:text-[#300049] transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(post.date || post.created_at).toLocaleDateString()}
                        </div>
                        {post.readTime && (
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {post.readTime}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/blog">
                <Button className="bg-[#4A0072] hover:bg-[#300049] text-white px-8 py-3">
                  View All Articles
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#4A0072]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light title-font text-white mb-6">
            Stay Informed
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Subscribe to our newsletter for the latest real estate insights and market updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-0 bg-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D5B4E7]"
            />
            <Button className="bg-[#300049] hover:bg-[#300049] text-white px-6 py-3 font-medium">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;