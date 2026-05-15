import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Public Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PropertyPage from './pages/PropertyPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ApartmentPage from './pages/ApartmentPage';
import ApartmentDetailPage from './pages/ApartmentDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import TeamPage from './pages/TeamPage';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import RequestViewingPage from './pages/RequestViewingPage';
import GalleryPage from './pages/GalleryPage';

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <DataProvider>
              <AppContent />
            </DataProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const showNav = location.pathname !== '/login' && location.pathname !== '/register';
  const showFooter = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <>
      {showNav && <Navigation />}
      <ErrorBoundary>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/request-viewing" element={<RequestViewingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        
        {/* Properties/Apartments Routes */}
        <Route path="/property" element={<ApartmentPage />} />
        <Route path="/properties" element={<ApartmentPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/apartment" element={<ApartmentPage />} />
        <Route path="/apartment/:id" element={<PropertyDetailPage />} />
        
        {/* Blog Routes */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        
      </Routes>
      </ErrorBoundary>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
