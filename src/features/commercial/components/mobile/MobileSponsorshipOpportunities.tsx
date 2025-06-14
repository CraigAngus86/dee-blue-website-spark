"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MobileSponsorshipOpportunitiesProps {
  onSponsorshipClick: (sponsorshipType: string) => void;
  onDiscussOptions: () => void;
}

export function MobileSponsorshipOpportunities({ onSponsorshipClick, onDiscussOptions }: MobileSponsorshipOpportunitiesProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sponsorshipPackages = [
    {
      title: "Perimeter Sponsorship Boards",
      pricing: "£1,750-£3,000 (3 seasons)",
      imageId: "boards_mw4zjd",
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
      pricing: "£500 per season",
      imageId: "player_sponsor_gei2s0",
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
      imageId: "kit_sponsor_u5hwqg",
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

  const getImageUrl = (publicId: string) => {
    const baseUrl = "https://res.cloudinary.com/dlkpaw2a0/image/upload";
    const transformation = "c_fill,g_auto:subject,ar_16:9,q_auto:good,f_auto,w_400,h_200";
    return `${baseUrl}/${transformation}/${publicId}`;
  };

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#00105A] mb-6 font-montserrat">
            Sponsorship Opportunities
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-lg text-[#4b5563] max-w-3xl mx-auto leading-relaxed">
            Connect your brand with Banks o' Dee FC through our range of non-matchday sponsorship packages 
            designed to provide year-round exposure and brand association.
          </p>
        </div>

        {/* Mobile Accordion */}
        <div className="space-y-4">
          {sponsorshipPackages.map((pkg, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              {/* Accordion Header - Clickable */}
              <button
                onClick={() => toggleSection(index)}
                className="w-full text-left focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:ring-inset"
              >
                <div className="relative h-32 overflow-hidden">
                  {/* Background Image */}
                  <img 
                    src={getImageUrl(pkg.imageId)}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Navy Overlay */}
                  <div className="absolute inset-0 bg-[#00105A]/60"></div>
                  
                  {/* Header Content - Fixed Layout */}
                  <div className="absolute inset-0 flex items-center justify-between px-6 py-4">
                    {/* Text Container - Constrained width for wrapping */}
                    <div className="flex-1 pr-4 flex items-center min-h-0">
                      <h3 className="text-white font-bold text-lg font-montserrat leading-tight m-0 p-0">
                        {pkg.title}
                      </h3>
                    </div>
                    
                    {/* Chevron Indicator - Fixed position */}
                    <div className="flex-shrink-0 flex items-center">
                      <ChevronDown 
                        className={`w-6 h-6 text-white transition-transform duration-300 ${
                          expandedSection === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </button>

              {/* Accordion Content - Expandable */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSection === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 space-y-4">
                  {/* Price - Prominent at top */}
                  <div className="text-center">
                    <span className="text-2xl font-bold text-[#00105A]">{pkg.pricing}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-[#6b7280] leading-relaxed text-center">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-4">
                    <h4 className="font-semibold text-[#00105A] text-center mb-4">What's Included:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-[#FFD700] font-bold mr-3 flex-shrink-0 mt-1">✓</span>
                          <span className="text-[#4b5563] text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Individual Package CTA */}
                  <div className="pt-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSponsorshipClick(pkg.title.toLowerCase().replace(/\s+/g, '_'));
                      }}
                      className="bg-[#C5E7FF] text-[#00105A] hover:bg-[#00105A] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-sm"
                    >
                      Enquire About This Package
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
