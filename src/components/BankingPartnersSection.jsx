import React from 'react';
import { Card, CardContent } from './ui/card';

const BankingPartnersSection = () => {
  const partners = [
    {
      name: "Centenary Bank",
      description: "Offering accessible loans for diverse income brackets",
      features: ["Flexible payment terms", "Low interest rates", "Quick approval process"],
      logo: "https://ik.imagekit.io/hqhiltiie/Nyinimu/centenary-bank-logo.png?updatedAt=1760194512125"
    },
    {
      name: "Equity Bank",
      description: "Championing financial inclusion with flexible micro-mortgages",
      features: ["Micro-mortgage solutions", "Financial inclusion", "Community banking"],
      logo: "https://ik.imagekit.io/hqhiltiie/Nyinimu/equity-bank-logo.png?updatedAt=1760194511829"
    },
    {
      name: "Housing Finance Bank",
      description: "Uganda's premier housing finance provider, offering tailored mortgage solutions",
      features: ["Specialized housing loans", "Expert advisory", "Long-term partnerships"],
      logo: "https://ik.imagekit.io/hqhiltiie/Nyinimu/06-08-2018-11-58-13_HousingFinance.jpg?updatedAt=1760194497659"
    },
    {
      name: "BAKAIMA REAL ESTATE AGENTS",
      description: "A Promise for Integrity - Your trusted partner in real estate with unwavering commitment to honest and transparent property dealings",
      features: ["Property sales & marketing", "Client consultation", "Market analysis"],
      logo: "https://ik.imagekit.io/hqhiltiie/Nyinimu/UUMYHTLccWxVntBRy95i5LmMwb2QCYMzbVNfQg9k.jpg?updatedAt=1760198795509"
    }
  ];

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light title-font text-stone-800 mb-6">
            Our Banking Partners
          </h2>
          <p className="text-stone-600 text-lg">
            We work with Uganda's leading financial institutions to bring you flexible, affordable financing solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                {/* Bank Logo */}
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="w-32 h-32 mx-auto mb-6 object-contain" />
                ) : (
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(213,180,231,0.2) 0%, rgba(74,0,114,0.2) 100%)' }}>
                    <span className="font-bold text-lg text-[#300049]">
                      {partner.name.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-medium title-font text-stone-800 mb-4">
                  {partner.name}
                </h3>
                
                <p className="text-stone-600 mb-6 italic">
                  "{partner.description}"
                </p>

                <div className="space-y-2">
                  {partner.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center text-stone-600">
                      <div className="w-2 h-2 bg-[#300049] rounded-full mr-3"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-stone-600 mb-6">
            Even if you have irregular income, we have solutions!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 border border-[#4A0072]/40 text-[#4A0072] text-sm font-medium">
              Up to 8-10 year terms
            </span>
            <span className="px-4 py-2 border border-[#300049]/40 text-[#300049] text-sm font-medium">
              Flexible income verification
            </span>
            <span className="px-4 py-2 border border-[#D5B4E7]/60 text-stone-600 text-sm font-medium">
              Pre-qualification available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankingPartnersSection;