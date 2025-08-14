"use client";
import React from 'react';

interface SponsorshipOpportunitiesProps {
  onDiscussOptions: () => void;
}

export function SponsorshipOpportunities({ onDiscussOptions }: SponsorshipOpportunitiesProps) {
  const partnershipTiers = [
    {
      title: "Principal Partnership",
      pricing: "250,000 AED per season",
      duration: "1 - 3 seasons",
      featured: true,
      features: [
        "First Team Main Shirt branding",
        "Team & Staff Uniform integration", 
        "Academy Kits branding across 300+ families",
        "Digital Co-Branding opportunities",
        "Hospitality Access for key matches",
        "Media Coverage and PR support",
        "Perimeter boards option available",
        "Social media integration across all platforms"
      ]
    },
    {
      title: "Main Partner", 
      pricing: "100,000 AED per season",
      duration: "1 - 3 seasons", 
      featured: false,
      features: [
        "First Team Back of Shirt placement",
        "First Team Shorts branding",
        "Training Kits integration",
        "Social Media Integration",
        "Match Day Activation opportunities",
        "Networking Opportunities",
        "Perimeter boards option available",
        "Digital platform integration"
      ]
    },
    {
      title: "Official Partner",
      pricing: "50,000 AED per season", 
      duration: "1 - 3 seasons",
      featured: false,
      features: [
        "Training Kits branding",
        "Player Sponsorship opportunities",
        "Match Day Activation",
        "Networking Opportunities", 
        "Social Media Integration",
        "Community engagement programs",
        "Perimeter boards option available",
        "Academy event participation"
      ]
    }
  ];

  return (
    <section className="section section--white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-h2 tracking-[0.02em] text-brand-black mb-6">
            Partnership Opportunities
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="font-body text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
            Choose the partnership level that aligns with your business goals. From principal shirt 
            sponsorship to targeted community engagement, we offer flexible opportunities to grow with us.
          </p>
        </div>

        {/* Partnership Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {partnershipTiers.map((tier, index) => (
            <div 
              key={index}
              className={`rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 ${
                tier.featured 
                  ? 'bg-gradient-to-br from-brand-gold to-accent-light border-2 border-brand-gold' 
                  : 'bg-surface-1 border border-separator'
              }`}
            >
              {/* Tier Header */}
              <div className={`p-6 text-center ${tier.featured ? 'text-brand-black' : 'bg-surface-2'}`}>
                <h3 className="font-heading text-h3 tracking-[0.02em] text-brand-black mb-2">
                  {tier.title}
                </h3>
                <div className="font-body text-2xl font-semibold text-brand-black mb-1">
                  {tier.pricing}
                </div>
                <div className="font-body text-sm text-text-muted">
                  {tier.duration}
                </div>
              </div>

              {/* Features List */}
              <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-3 flex-grow mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`font-bold mr-3 flex-shrink-0 mt-0.5 ${
                        tier.featured ? 'text-brand-black' : 'text-brand-gold'
                      }`}>✓</span>
                      <span className="font-body text-sm text-text-strong leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>


              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-lg text-text-muted mb-6">
            Looking for a custom partnership solution? Let's discuss how we can create 
            the perfect opportunity for your business.
          </p>
          <button 
            onClick={onDiscussOptions}
            className="bg-brand-gold text-brand-black hover:bg-accent-dark px-8 py-4 rounded-lg font-body font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Discuss Custom Partnership
          </button>
        </div>
      </div>
    </section>
  );
}