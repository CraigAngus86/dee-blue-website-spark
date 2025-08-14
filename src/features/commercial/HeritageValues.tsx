"use client";
import React from 'react';
import { Crown, Heart, Users, Star } from 'lucide-react';

interface HeritageValuesProps {
  onPartnershipClick: () => void;
}

export function HeritageValues({ onPartnershipClick }: HeritageValuesProps) {
  const heritageElements = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Royal Championship Heritage",
      description: "2020 Hamdan bin Zayed Champions - a proud achievement that connects us to the highest levels of UAE sporting excellence.",
      accent: "heritage-red"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Sheikh Zayed's Beloved Region",
      description: "Named after the region close to the heart of the UAE's founding father, representing the authentic spirit of our nation.",
      accent: "heritage-green"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community & Values",
      description: "Islamic values and Emirati identity form the foundation of our club, creating authentic connections within our community.",
      accent: "brand-gold"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Excellence & Tradition",
      description: "Building excellence while honoring tradition, creating a platform where heritage meets modern sporting ambition.",
      accent: "brand-gold"
    }
  ];

  const coreValues = [
    {
      arabic: "التراث",
      english: "Heritage",
      description: "Honoring our roots and the legacy of Sheikh Zayed"
    },
    {
      arabic: "التميز", 
      english: "Excellence",
      description: "Striving for the highest standards in all we do"
    },
    {
      arabic: "المجتمع",
      english: "Community", 
      description: "Building connections that strengthen our society"
    },
    {
      arabic: "المستقبل",
      english: "Future",
      description: "Developing tomorrow's leaders and champions"
    }
  ];

  return (
    <section className="section section--warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-h2 tracking-[0.02em] text-brand-black mb-6">
            Heritage & Values
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="font-body text-lg text-text-muted max-w-4xl mx-auto leading-relaxed">
            When you partner with Baynounah Sports Club, you connect with something deeper than football. 
            You join a story that begins with Sheikh Zayed's vision and continues through our commitment 
            to excellence, community, and authentic Emirati values.
          </p>
        </div>

        {/* Heritage Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {heritageElements.map((element, index) => (
            <div key={index} className="bg-surface-1 rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300">
              {/* Icon with heritage accent */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                element.accent === 'heritage-red' ? 'bg-heritage-red/10' :
                element.accent === 'heritage-green' ? 'bg-heritage-green/10' : 
                'bg-brand-gold/10'
              }`}>
                <div className={`${
                  element.accent === 'heritage-red' ? 'text-heritage-red' :
                  element.accent === 'heritage-green' ? 'text-heritage-green' :
                  'text-brand-gold'
                }`}>
                  {element.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="font-heading text-xl tracking-[0.02em] text-brand-black mb-4">
                {element.title}
              </h3>
              <p className="font-body text-text-muted leading-relaxed">
                {element.description}
              </p>
            </div>
          ))}
        </div>

        {/* Core Values Section */}
        <div className="bg-gradient-to-r from-brand-gold/5 to-surface-2 rounded-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="font-heading text-h3 tracking-[0.02em] text-brand-black mb-4">
              Our Core Values
            </h3>
            <p className="font-body text-text-muted max-w-2xl mx-auto">
              These values guide everything we do and represent what partners can expect 
              when they join our journey.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-2xl text-brand-gold mb-2">
                  {value.arabic}
                </div>
                <div className="font-body font-semibold text-brand-black mb-2">
                  {value.english}
                </div>
                <p className="font-body text-xs text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Championship Heritage Highlight */}
        <div className="bg-gradient-to-r from-heritage-red/10 to-heritage-green/10 rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="font-heading text-h3 tracking-[0.02em] text-brand-black mb-2">
                2020 Hamdan bin Zayed Champions
              </h3>
              <p className="font-body text-text-muted max-w-lg">
                Our championship heritage demonstrates our commitment to excellence and our 
                connection to the highest levels of UAE sporting achievement.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-heritage-red/20 rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-heritage-red" />
              </div>
              <div className="text-center">
                <div className="font-heading text-2xl text-heritage-red mb-1">2020</div>
                <div className="font-body text-sm text-text-muted">Champions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Partnership Value */}
        <div className="text-center mb-12">
          <h3 className="font-heading text-h3 tracking-[0.02em] text-brand-black mb-6">
            Partner With Our Heritage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="font-body font-semibold text-brand-black mb-3">Authentic Connection</div>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Associate your brand with genuine UAE heritage and the values that built our nation
              </p>
            </div>
            <div className="p-6">
              <div className="font-body font-semibold text-brand-black mb-3">Royal Association</div>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Connect with our championship heritage and royal sporting connections
              </p>
            </div>
            <div className="p-6">
              <div className="font-body font-semibold text-brand-black mb-3">Community Respect</div>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Build trust through association with Islamic values and Emirati community pride
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-body text-text-muted mb-6">
            Ready to become part of a story that honors the past while building the future?
          </p>
          <button
            onClick={onPartnershipClick}
            className="bg-brand-gold text-brand-black hover:bg-accent-dark px-8 py-4 rounded-lg font-body font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Honor Our Heritage Together
          </button>
        </div>
      </div>
    </section>
  );
}