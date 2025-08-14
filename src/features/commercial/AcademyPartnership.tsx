"use client";
import React from 'react';
import { Users, MapPin, Heart, Trophy } from 'lucide-react';

interface AcademyPartnershipProps {
  onPartnershipClick: () => void;
}

export function AcademyPartnership({ onPartnershipClick }: AcademyPartnershipProps) {
  const academyStats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "300+",
      label: "Academy Families",
      description: "Engaged families across our training locations"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      number: "2",
      label: "Training Locations", 
      description: "Sultan bin Zayed & Al Maryah Island facilities"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      number: "100%",
      label: "Community Focus",
      description: "Youth development and family engagement"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      number: "Future",
      label: "First Team Stars",
      description: "Academy to first team development pathway"
    }
  ];

  const academyOpportunities = [
    {
      title: "Academy Kit Partnership", 
      description: "Brand visibility across 300+ young players with family engagement at training sessions and tournaments.",
      benefits: ["Training kit branding", "Tournament visibility", "Family touchpoints", "Community events"]
    },
    {
      title: "Youth Development Sponsorship",
      description: "Support our development pathway from academy to first team while building authentic community connections.",
      benefits: ["Player development support", "Coaching program backing", "Facility improvements", "Educational initiatives"]
    },
    {
      title: "Family Engagement Programs",
      description: "Connect with academy families through special events, family days, and community initiatives.",
      benefits: ["Family day sponsorship", "Community events", "Parent engagement", "Local business connections"]
    }
  ];

  return (
    <section className="section section--warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-h2 tracking-[0.02em] text-brand-black mb-6">
            Academy Partnership Focus
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="font-body text-lg text-text-muted max-w-4xl mx-auto leading-relaxed">
            Our academy represents the future of Baynounah Sports Club. With over 300 families 
            actively engaged across our training locations, this is where authentic community 
            connections are built and tomorrow's stars are developed.
          </p>
        </div>

        {/* Academy Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {academyStats.map((stat, index) => (
            <div key={index} className="bg-surface-1 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-brand-black">
                  {stat.icon}
                </div>
              </div>
              <div className="font-heading text-h3 tracking-[0.02em] text-brand-black mb-2">
                {stat.number}
              </div>
              <div className="font-body font-semibold text-brand-black mb-2">
                {stat.label}
              </div>
              <div className="font-body text-sm text-text-muted leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {academyOpportunities.map((opportunity, index) => (
            <div key={index} className="bg-surface-1 rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="font-heading text-xl tracking-[0.02em] text-brand-black mb-4">
                {opportunity.title}
              </h3>
              <p className="font-body text-text-muted mb-6 leading-relaxed">
                {opportunity.description}
              </p>
              
              {/* Benefits List */}
              <ul className="space-y-2 mb-6">
                {opportunity.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-brand-gold font-bold mr-3">•</span>
                    <span className="font-body text-sm text-text-strong">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Academy Values Highlight */}
        <div className="bg-gradient-to-r from-brand-gold/10 to-accent-light/10 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h3 className="font-heading text-h3 tracking-[0.02em] text-brand-black mb-4">
              Building Tomorrow's Champions
            </h3>
            <p className="font-body text-text-muted max-w-3xl mx-auto leading-relaxed mb-6">
              Our academy isn't just about football development—it's about building character, 
              community values, and creating pathways for young people to achieve their dreams. 
              When you partner with our academy, you're investing in the future of UAE football.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm font-body text-text-muted">
              <span>Character Development</span>
              <span>•</span>
              <span>Community Values</span>
              <span>•</span>
              <span>Excellence in Sport</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-body text-text-muted mb-6">
            Ready to make a meaningful impact in youth development and community building?
          </p>
          <button
            onClick={onPartnershipClick}
            className="bg-brand-gold text-brand-black hover:bg-accent-dark px-8 py-4 rounded-lg font-body font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Partner With Our Academy
          </button>
        </div>
      </div>
    </section>
  );
}