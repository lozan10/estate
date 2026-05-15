import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building, Home as HomeIcon, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              RealEstate Pro
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/properties" className="text-gray-700 hover:text-gray-900">
                Properties
              </Link>
              <Link to="/blogs" className="text-gray-700 hover:text-gray-900">
                Blogs
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">
                Contact
              </Link>
              {isAuthenticated ? (
                <Button asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6" data-testid="hero-title">
              Find Your Dream Property
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Browse through thousands of properties and find the perfect home for you
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/properties" data-testid="browse-properties-btn">
                  <Building className="mr-2 h-5 w-5" />
                  Browse Properties
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <HomeIcon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Choose from a variety of properties including houses, apartments, and condos
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Building className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
              <p className="text-gray-600">
                Manage your properties with our intuitive dashboard and tools
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Insights</h3>
              <p className="text-gray-600">
                Read our blog for tips and trends in the real estate market
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 RealEstate Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
