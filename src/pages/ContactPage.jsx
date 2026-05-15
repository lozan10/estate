import React from 'react';
import ScheduleVisitSection from '../components/ScheduleVisitSection';
import GenericHero from '../components/GenericHero';
import { Card, CardContent } from '../components/ui/card';
import { Phone, Mail, MapPin, Clock, MessageCircle, Users } from 'lucide-react';
import ContactUsForm from '../components/ContactUsForm';

const ContactPage = () => {
  return (
    <div className="relative">
      {/* Hero Section covers navbar */}
      <div className="absolute inset-0 h-[40vh] w-full -z-10">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="pt-0">
        <GenericHero
          title="Contact Bongo Estates"
          description="Ready to start your journey from tenant to landlord? Daily payments. Your home. Contact us today!"
          backgroundImage=""
        />
      </div>

      {/* Contact Information Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6 title-font">
              Get In Touch
            </h2>
            <p className="text-stone-600 text-lg max-w-3xl mx-auto">
              <strong>"Your hustle, your home."</strong> We're here to help you transform from tenant to landlord through our revolutionary daily payment system. Contact us to start building your legacy, day by day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Phone Contact */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#D5B4E7]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-[#300049]" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Call Us</h3>
                <p className="text-stone-600 mb-4">Ready to start your daily payments? Call us now!</p>
                <a href="tel:+256759700099" className="text-2xl font-bold text-[#300049] hover:text-[#4A0072] transition-colors">
                  +256 759 700099
                </a>
              </CardContent>
            </Card>

            {/* Email Contact */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#D5B4E7]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Email Us</h3>
                <p className="text-stone-600 mb-4">Send us your questions about daily payments</p>
                <a href="mailto:info@nyinimu.com" className="text-lg font-semibold text-green-600 hover:text-green-700 transition-colors">
                  info@nyinimu.com
                </a>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#D5B4E7]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Visit Us</h3>
                <p className="text-stone-600 mb-4">Building homes across Uganda</p>
                <p className="text-lg font-semibold text-blue-600">
                  Kampala, Uganda
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* New Contact Us Form (writes to Inquiries) */}
      <ContactUsForm />

      {/* Schedule a Visit Form (also writes to Inquiries) */}
      <ScheduleVisitSection />
    </div>
  );
};

export default ContactPage;
