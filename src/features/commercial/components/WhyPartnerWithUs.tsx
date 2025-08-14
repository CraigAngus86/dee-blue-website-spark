"use client";
import React from 'react';
import { Trophy, Rocket, Heart, Smartphone } from 'lucide-react';

interface WhyPartnerWithUsProps {
  onPartnershipClick: () => void;
}

export function WhyPartnerWithUs({ onPartnershipClick }: WhyPartnerWithUsProps) {
  const valuePillars = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Sporting Platform",
      description: "Partner with Abu Dhabi's capital club, established in 2019 with FIFA certification and home at the prestigious ERTH Stadium, representing the heart of UAE football."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Early Access",
      description: "Be a first mover and support our growth potential. Join us now as we build something special and raise our profile across the region and beyond."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Heritage & Community",
      description: "Connect with Sheikh Zayed's beloved Baynounah region heritage while engaging with our 300+ academy families who form the authentic heart of our community."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Digital Growth",
      description: "Partner with our developing digital platform for increased brand exposure through our integrated digital fan model and co-branding opportunities."
    }
  ];

  return (
    <section id="why-partner" className="section section--warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-h2 tracking-[0.02em] text-brand-black mb-6">
            Why Partner With Baynounah Sports Club
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="font-body text-lg text-text-muted max-w-4xl mx-auto leading-relaxed">
            Join us at the perfect time to be part of our journey. As Abu Dhabi's emerging football force, 
            we offer authentic community connections, heritage storytelling, and growth potential that 
            established clubs simply cannot provide. The time to invest with us is now.
          </p>
        </div>

        {/* Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {valuePillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-surface-1 rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-gold transition-colors duration-300">
                <div className="text-brand-black">
                  {pillar.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="font-heading text-xl tracking-[0.02em] text-brand-black mb-4">
                {pillar.title}
              </h3>
              <p className="font-body text-text-muted leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Single CTA */}
        <div className="text-center">
          <p className="font-body text-text-muted mb-6">
            Ready to be part of our journey? Our commercial team is here to help you find the perfect partnership opportunity.
          </p>
          <button
            onClick={onPartnershipClick}
            className="bg-brand-gold text-brand-black hover:bg-accent-dark px-8 py-4 rounded-lg font-body font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Discuss Partnership Options
          </button>
        </div>
      </div>
    </section>
  );
}