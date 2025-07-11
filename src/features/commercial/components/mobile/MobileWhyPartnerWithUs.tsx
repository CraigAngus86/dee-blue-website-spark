"use client";
import React from 'react';
import { Eye, Building2, Users, Globe } from 'lucide-react';

interface MobileWhyPartnerWithUsProps {
  onPartnershipClick: () => void;
}

export function MobileWhyPartnerWithUs({ onPartnershipClick }: MobileWhyPartnerWithUsProps) {
  const valuePillars = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Local Visibility",
      description: "Connect with our passionate fanbase at Spain Park, with a capacity of just under 1,000 attendees and ongoing activities daily thanks to our Banks o' Dee Sports Club."
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Premium Facilities", 
      description: "Showcase your brand at our state-of-the-art Spain Park stadium with modern facilities and professional presentation standards."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Engagement",
      description: "Associate with a club deeply rooted in the community, supporting local initiatives while building authentic connections with supporters."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Digital Presence",
      description: "Reach over 5,000 weekly visitors through our website and active social media presence, extending your brand reach beyond matchday."
    }
  ];

  return (
    <section id="why-partner" className="py-16 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#00105A] mb-6 font-montserrat">
            Why Partner With Banks o' Dee FC
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-lg text-[#4b5563] max-w-4xl mx-auto leading-relaxed">
            Elevate your brand through a strategic partnership with Banks o' Dee FC in Aberdeen—Scotland's energy capital. 
            We deliver professional standards with authentic community connection, providing outstanding exposure and cost-effective 
            access to a thriving local market. Partner with us for genuine connections that drive sustainable business growth.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="mb-12">
          <div 
            className="flex space-x-4 px-4 pb-4 overflow-x-auto scrollbar-hide"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {valuePillars.map((pillar, index) => (
              <div 
                key={index}
                className="flex-none w-[280px] bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Icon - Exact same styling as desktop */}
                <div className="w-16 h-16 bg-[#C5E7FF] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FFD700] transition-colors duration-300">
                  <div className="text-[#00105A]">
                    {pillar.icon}
                  </div>
                </div>
                
                {/* Content - Exact same styling as desktop */}
                <h3 className="text-xl font-semibold text-[#00105A] mb-4 font-montserrat">
                  {pillar.title}
                </h3>
                <p className="text-[#6b7280] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {valuePillars.map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 rounded-full bg-[#e5e7eb]"
              />
            ))}
            <div className="w-2 h-2 rounded-full bg-[#FFD700] absolute ml-0 transition-transform duration-300" />
          </div>
        </div>

        {/* CTA - Same as desktop */}
        <div className="text-center">
          <p className="text-[#6b7280] mb-6">
            Looking to explore our partnership opportunities further? Our commercial team is here to help.
          </p>
          <button 
            onClick={onPartnershipClick}
            className="bg-[#FFD700] text-[#00105A] hover:bg-[#f1c40f] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Discuss Partnership Options
          </button>
        </div>
      </div>
    </section>
  );
}
