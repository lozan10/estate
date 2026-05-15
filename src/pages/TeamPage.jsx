import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import GenericHero from '../components/GenericHero';
import api from '../utils/api';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await api.get('/teams?active_only=true');
        setTeamMembers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch team members:', err);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 h-[40vh] w-full -z-10">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Our Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="pt-0">
        <GenericHero
          title="Our Team"
          description="Meet the dedicated professionals working to make your homeownership dreams a reality."
          backgroundImage=""
        />
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-6">
              Meet Our Experts
            </h2>
            <p className="text-stone-600 text-lg max-w-3xl mx-auto">
              Our diverse team brings together expertise in real estate, finance, construction, and customer service to provide you with comprehensive support throughout your homeownership journey.
            </p>
          </div>

          {teamMembers.length === 0 ? (
            <div className="text-center py-16 text-stone-500">
              No team members available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={member.id || index} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-medium title-font text-stone-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[#300049] font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-stone-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
