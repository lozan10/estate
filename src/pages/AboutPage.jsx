import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Heart, Users, Home, Award } from 'lucide-react';
import BankingPartnersSection from '../components/BankingPartnersSection';
import GenericHero from '../components/GenericHero';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Empowerment",
      description: "We believe everyone deserves to own their home, regardless of their profession or income pattern."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building not just homes, but a community of proud homeowners who support each other."
    },
    {
      icon: Home,
      title: "Quality",
      description: "Every Bongo Estates unit is built with quality materials and attention to detail."
    },
    {
      icon: Award,
      title: "Trust",
      description: "Transparent processes, honest partnerships, and keeping our promises to every client."
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section covers navbar */}
      <div className="absolute inset-0 h-[40vh] w-full -z-10">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="pt-0">
        <GenericHero
          title="About Us"
          description="Empowering Ugandans, one home at a time. Bongo Estates — more than just a brand; it's a promise."
          backgroundImage=""
        />
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  <strong>"From tenant to landlord. Daily, Nze landlord."</strong> At Bongo Estates, we believe every Ugandan deserves to own their home. Your hustle, your home. We've revolutionized homeownership by making it accessible through daily payments - because the path to ownership starts with a step, and a daily payment.
                </p>
                <p>
                  <strong>Buy daily. Own forever.</strong> Our innovative approach transforms the traditional real estate model. Whether you're a DJ, MC, salon operator, market vendor, bouncer, or any hardworking Ugandan, we understand your daily hustle. That's why we offer flexible daily payment options that work with your income flow.
                </p>
                <p>
                  <strong>Building your legacy, day by day.</strong> Led by our expert team including Dave JK Kazoora (Team Lead), Reagan Ocira (Head Architect), and our skilled operations team, we're not just building houses - we're building dreams and creating generational wealth for every Ugandan family.
                </p>
                <p>
                  <strong>Homeownership for every Ugandan. Bongo Estates.</strong> This isn't just our motto - it's our mission. We're here to transform you from tenant to property owner, one daily payment at a time.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Construction Site"
                className="w-full h-96 object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-8">
            Our Mission
          </h2>
          <p className="text-xl text-stone-600 leading-relaxed mb-12">
            <strong>"Bongo Estates. Daily payments. Your home."</strong> We believe homeownership shouldn't be a dream reserved for the few - it should be accessible to every hardworking Ugandan. Through our revolutionary daily payment system, we're turning the impossible into inevitable. Your hustle becomes your home, your daily commitment becomes your legacy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#D5B4E7]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-[#300049]">4 Max</span>
                </div>
                <h3 className="text-xl font-medium title-font text-stone-800 mb-4">
                  Construction Timeline
                </h3>
                <p className="text-stone-600">
                  Guaranteed completion within 4 months maximum. Quality construction, delivered on time, every time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#D5B4E7]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-green-600">Flex</span>
                </div>
                <h3 className="text-xl font-medium title-font text-stone-800 mb-4">
                  Payment Flexibility
                </h3>
                <p className="text-stone-600">
                  Choose monthly or daily contribution plans that align with your income schedule and financial situation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <BankingPartnersSection />

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-6">
              Our Values
            </h2>
            <p className="text-stone-600 text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-[#D5B4E7]/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#D5B4E7]/35 transition-colors duration-300">
                    <IconComponent className="w-10 h-10 text-[#300049]" />
                  </div>
                  <h3 className="text-xl font-medium title-font text-stone-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light title-font text-white mb-6">
            Ready to Join Bongo Estates?
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Join hundreds of proud homeowners who have turned their dreams into reality with Bongo Estates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#300049] hover:bg-[#300049] text-white px-8 py-3 text-lg font-medium">
              Start Your Journey
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-stone-800 px-8 py-3 text-lg font-medium">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;