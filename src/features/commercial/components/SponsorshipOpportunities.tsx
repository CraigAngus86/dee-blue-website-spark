"use client";
import React from 'react';

interface SponsorshipOpportunitiesProps {
  onSponsorshipClick: (sponsorshipType: string) => void;
  onDiscussOptions: () => void;
}

export function SponsorshipOpportunities({ onSponsorshipClick, onDiscussOptions }: SponsorshipOpportunitiesProps) {
  const sponsorshipPackages = [
    {
      title: "Perimeter Sponsorship Boards",
      pricing: "£1,750-£3,000 (3 seasons)",
      description: "Premium pitch-side advertising offering season-long visibility to all match attendees and in match photography.",
      features: [
        "10ft or 20ft board options available",
        "Professional design consultation included", 
        "Pre-agreed number of free match tickets",
        "Exposure during all home matches",
        "Visible in match photography and social content"
      ]
    },
    {
      title: "Player Sponsorship",
      pricing: "£250-£500 per season",
      description: "Connect your brand with one of our first-team players throughout the season with digital and social integration.",
      features: [
        "Company logo on player's web profile",
        "Logo inclusion on all player social media",
        "Meet and greet arranged during season",
        "Pre-agreed number of free match tickets",
        "Player appearance opportunities"
      ]
    },
    {
      title: "Kit & Equipment Branding",
      pricing: "Contact for pricing",
      description: "Brand visibility on training gear, equipment, and match day materials with photography and content rights.",
      features: [
        "Logo placement on training equipment",
        "Match day materials branding options",
        "Photography rights for promotional use",
        "Social media content opportunities",
        "Flexible branding placement options"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00105A] mb-6 font-montserrat">
            Sponsorship Opportunities
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-lg text-[#4b5563] max-w-3xl mx-auto leading-relaxed">
            Connect your brand with Banks o' Dee FC through our range of non-matchday sponsorship packages 
            designed to provide year-round exposure and brand association.
          </p>
        </div>

        {/* Sponsorship Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sponsorshipPackages.map((pkg, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 h-full flex flex-col"
            >
              {/* Package Image Placeholder */}
              <div className="relative h-48 overflow-hidden bg-[#f3f4f6] flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5E7FF] to-[#00105A] opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[#00105A] font-bold text-lg text-center p-4">
                    {pkg.title}
                  </div>
                </div>
                <div className="absolute inset-0 bg-[#00105A]/10 group-hover:bg-[#00105A]/5 transition-colors duration-300" />
              </div>

              {/* Package Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-[#00105A] mb-2 font-montserrat">
                  {pkg.title}
                </h3>
                <p className="text-lg font-semibold text-[#C5E7FF] mb-4">
                  {pkg.pricing}
                </p>
                <p className="text-[#6b7280] mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#FFD700] font-bold mr-2 flex-shrink-0">✓</span>
                      <span className="text-[#4b5563] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Single Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-[#4b5563] mb-6">
            Looking to explore our sponsorship opportunities further? Our commercial team is here to help.
          </p>
          <button 
            onClick={onDiscussOptions}
            className="bg-[#FFD700] text-[#00105A] hover:bg-[#f1c40f] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Discuss Sponsorship Options
          </button>
        </div>
      </div>
    </section>
  );
}
