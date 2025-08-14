"use client";
import React from 'react';
import { Smartphone, Globe, TrendingUp, Zap } from 'lucide-react';

interface DigitalGrowthStoryProps {
  onPartnershipClick: () => void;
}

export function DigitalGrowthStory({ onPartnershipClick }: DigitalGrowthStoryProps) {
  const digitalOpportunities = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Website Platform Development",
      description: "Be part of building a cutting-edge digital experience from the ground up with integrated partner visibility.",
      features: ["Co-branded content areas", "Partner spotlight sections", "Integrated digital campaigns", "Performance analytics"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Social Media Growth",
      description: "Leverage our growing social media presence and content strategy transformation for maximum brand exposure.",
      features: ["Partner content integration", "Social media campaigns", "Behind-the-scenes access", "Community engagement"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Digital Fan Model",
      description: "Help us build an integrated digital fan experience where your brand becomes part of the supporter journey.",
      features: ["Fan engagement platforms", "Digital membership benefits", "Interactive content", "Community building tools"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Content Innovation",
      description: "Partner with us to create compelling digital content that tells authentic stories and builds genuine connections.",
      features: ["Video content series", "Podcast opportunities", "Player documentaries", "Academy spotlights"]
    }
  ];

  const growthMetrics = [
    {
      label: "Platform Rebuild",
      value: "100%",
      description: "Complete digital transformation in progress"
    },
    {
      label: "Content Strategy", 
      value: "New",
      description: "Fresh approach to digital storytelling"
    },
    {
      label: "Partner Integration",
      value: "Built-In",
      description: "Co-branding opportunities from day one"
    },
    {
      label: "Growth Potential",
      value: "Unlimited",
      description: "First mover advantage in growing market"
    }
  ];

  return (
    <section className="section section--white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-h2 tracking-[0.02em] text-brand-black mb-6">
            Digital Growth Opportunity
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="font-body text-lg text-text-muted max-w-4xl mx-auto leading-relaxed">
            We're not just improving our digital presence—we're completely transforming it. This presents 
            a unique opportunity for partners to be integrated from the foundation up, rather than added 
            to an existing system. Be part of building something exceptional.
          </p>
        </div>

        {/* Growth Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {growthMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="bg-surface-2 rounded-lg p-6 mb-4 hover:shadow-md transition-all duration-300">
                <div className="font-heading text-h3 tracking-[0.02em] text-brand-gold mb-2">
                  {metric.value}
                </div>
                <div className="font-body font-semibold text-brand-black text-sm mb-2">
                  {metric.label}
                </div>
              </div>
              <p className="font-body text-xs text-text-muted">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Digital Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {digitalOpportunities.map((opportunity, index) => (
            <div key={index} className="bg-surface-1 rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              {/* Icon Header */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-brand-gold rounded-lg flex items-center justify-center mr-4">
                  <div className="text-brand-black">
                    {opportunity.icon}
                  </div>
                </div>
                <h3 className="font-heading text-xl tracking-[0.02em] text-brand-black">
                  {opportunity.title}
                </h3>
              </div>

              {/* Description */}
              <p className="font-body text-text-muted mb-6 leading-relaxed">
                {opportunity.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {opportunity.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-brand-gold font-bold mr-3">→</span>
                    <span className="font-body text-sm text-text-strong">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Digital Vision Statement */}
        <div className="bg-gradient-to-r from-surface-2 to-brand-gold/5 rounded-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-heading text-h3 tracking-[0.02em] text-brand-black mb-4">
              Building Tomorrow's Digital Experience
            </h3>
            <p className="font-body text-text-muted leading-relaxed mb-6">
              Most clubs ask partners to fit into existing digital frameworks. We're inviting you to 
              help build the framework itself. From website architecture to content strategy, social 
              media integration to fan engagement platforms—your brand can be woven into the DNA of 
              our digital transformation.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm font-body text-text-muted">
              <span>Integrated Design</span>
              <span>•</span>
              <span>Co-Created Content</span>
              <span>•</span>
              <span>Shared Growth</span>
            </div>
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="text-center mb-12">
          <h3 className="font-heading text-h3 tracking-[0.02em] text-brand-black mb-6">
            Digital Partnership Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6">
              <div className="font-body font-semibold text-brand-black mb-2">First Mover Advantage</div>
              <p className="font-body text-sm text-text-muted">Shape the platform from inception rather than adapting to existing systems</p>
            </div>
            <div className="p-6">
              <div className="font-body font-semibold text-brand-black mb-2">Integrated Presence</div>
              <p className="font-body text-sm text-text-muted">Your brand becomes part of the user experience, not just an add-on</p>
            </div>
            <div className="p-6">
              <div className="font-body font-semibold text-brand-black mb-2">Growth Partnership</div>
              <p className="font-body text-sm text-text-muted">Benefit from our digital growth trajectory as it accelerates</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-body text-text-muted mb-6">
            Ready to be part of building the future of football club digital experience?
          </p>
          <button
            onClick={onPartnershipClick}
            className="bg-brand-gold text-brand-black hover:bg-accent-dark px-8 py-4 rounded-lg font-body font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Partner With Our Digital Growth
          </button>
        </div>
      </div>
    </section>
  );
}