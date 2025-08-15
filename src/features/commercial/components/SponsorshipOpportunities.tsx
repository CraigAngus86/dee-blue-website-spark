"use client";
import React, { useState, useEffect, useRef } from "react";
import { Check, Crown, Star, Zap } from "lucide-react";

interface SponsorshipOpportunitiesProps {
  onDiscussOptions: () => void;
}

export function SponsorshipOpportunities({ onDiscussOptions }: SponsorshipOpportunitiesProps) {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [animatedPrice, setAnimatedPrice] = useState<{ [key: number]: number }>({});
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            animatePrices();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const animatePrices = () => {
    const targets = [250000, 100000, 50000];
    targets.forEach((target, index) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedPrice((prev) => ({ ...prev, [index]: Math.floor(current) }));
      }, 20);
    });
  };

  const partnershipTiers = [
    {
      title: "Principal Partnership",
      pricing: 250000,
      pricingDisplay: "250,000 AED",
      duration: "per season",
      featured: true,
      icon: <Crown className="w-6 h-6" />,
      badge: "1-only",
      features: [
        { text: "First Team Main Shirt branding", highlight: true },
        { text: "Team & Staff Uniform integration", highlight: true },
        { text: "Academy Kits branding across 300+ families", highlight: false },
        { text: "Digital Co-Branding opportunities", highlight: false },
        { text: "Hospitality Access for key matches", highlight: false },
        { text: "Media Coverage and PR support", highlight: false },
        { text: "Perimeter boards option available", highlight: false },
        { text: "Social media integration across all platforms", highlight: false },
      ],
    },
    {
      title: "Main Partner",
      pricing: 100000,
      pricingDisplay: "100,000 AED",
      duration: "per season",
      featured: false,
      icon: <Star className="w-6 h-6" />,
      badge: "2-only",
      features: [
        { text: "First Team Back of Shirt placement", highlight: true },
        { text: "First Team Shorts branding", highlight: true },
        { text: "Training Kits integration", highlight: false },
        { text: "Social Media Integration", highlight: false },
        { text: "Match Day Activation opportunities", highlight: false },
        { text: "Networking Opportunities", highlight: false },
        { text: "Perimeter boards option available", highlight: false },
        { text: "Digital platform integration", highlight: false },
      ],
    },
    {
      title: "Official Partner",
      pricing: 50000,
      pricingDisplay: "50,000 AED",
      duration: "per season",
      featured: false,
      icon: <Zap className="w-6 h-6" />,
      badge: null,
      features: [
        { text: "Training Kits branding", highlight: true },
        { text: "Player Sponsorship opportunities", highlight: false },
        { text: "Match Day Activation", highlight: false },
        { text: "Networking Opportunities", highlight: false },
        { text: "Social Media Integration", highlight: false },
        { text: "Community engagement programs", highlight: false },
        { text: "Perimeter boards option available", highlight: false },
        { text: "Academy event participation", highlight: false },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="section section--white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-brand-gold/10 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-brand-gold/10 rounded-full animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-h2 tracking-[0.02em] text-brand-black mb-6 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Partnership <span className="text-brand-gold">Opportunities</span>
          </h2>

          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-32 animate-expand" />
            <div className="w-3 h-3 bg-brand-gold rounded-full mx-2 animate-pulse" />
            <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-32 animate-expand" />
          </div>

          <p
            className={`font-body text-lg text-text-muted max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Select the tier that best fits your objectives. Prices are per season with defined rights and caps; we tailor details to suit.
          </p>
        </div>

        {/* Partnership Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-1000">
          {partnershipTiers.map((tier, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`relative transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transform: hoveredTier === index ? "translateY(-10px) rotateX(2deg)" : "",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className={`relative rounded-xl overflow-hidden h-full transition-all duration-500 ${
                  tier.featured ? "shadow-2xl ring-2 ring-brand-gold" : "shadow-lg hover:shadow-2xl"
                }`}
              >
                {tier.badge && (
                  <div className="absolute top-0 right-0 z-20">
                    <div className="bg-gradient-to-br from-brand-gold to-accent-dark text-brand-black px-4 py-1 rounded-bl-lg font-body font-semibold text-xs tracking-wider">
                      {tier.badge}
                    </div>
                  </div>
                )}

                <div
                  className={`relative p-8 text-center overflow-hidden ${
                    tier.featured
                      ? "bg-gradient-to-br from-brand-gold via-accent-light to-brand-gold"
                      : "bg-gradient-to-br from-surface-2 to-white"
                  }`}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className={`absolute inset-0 ${tier.featured ? "bg-black" : "bg-brand-gold"}`}
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`,
                        animation: hoveredTier === index ? "slide 20s linear infinite" : "",
                      }}
                    />
                  </div>

                  <div
                    className={`relative inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      tier.featured ? "bg-brand-black/20" : "bg-brand-gold/20"
                    } transform transition-transform duration-500 ${
                      hoveredTier === index ? "rotate-12 scale-110" : ""
                    }`}
                  >
                    <div className={tier.featured ? "text-brand-black" : "text-brand-gold"}>{tier.icon}</div>
                  </div>

                  <h3 className="font-heading text-2xl tracking-[0.02em] mb-4 text-brand-black">
                    {tier.title}
                  </h3>

                  <div
                    className={`font-heading text-4xl mb-2 ${
                      tier.featured ? "text-brand-black" : "text-brand-gold"
                    }`}
                  >
                    {animatedPrice[index] ? animatedPrice[index].toLocaleString() : "0"} AED
                  </div>

                  <div
                    className={`font-body text-sm ${
                      tier.featured ? "text-brand-black/80" : "text-text-muted"
                    }`}
                  >
                    {tier.duration}
                  </div>
                </div>

                {/* Features List */}
                <div className="p-8 bg-white">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start transform transition-all duration-300"
                        style={{
                          transitionDelay: hoveredTier === index ? `${idx * 50}ms` : "0ms",
                          transform: hoveredTier === index ? "translateX(5px)" : "",
                        }}
                      >
                        <span
                          className={`flex-shrink-0 mt-0.5 mr-3 transform transition-all duration-300 ${
                            hoveredTier === index ? "scale-125 rotate-12" : ""
                          }`}
                        >
                          <Check
                            className={`w-5 h-5 ${
                              feature.highlight ? "text-brand-gold" : "text-heritage-green"
                            }`}
                          />
                        </span>
                        <span
                          className={`font-body text-sm leading-relaxed ${
                            feature.highlight ? "font-semibold text-brand-black" : "text-text-strong"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
                    tier.featured
                      ? "from-brand-gold via-accent-light to-brand-gold"
                      : "from-transparent via-brand-gold to-transparent"
                  } transform scale-x-0 transition-transform duration-500 ${
                    hoveredTier === index ? "scale-x-100" : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Keep Bottom CTA */}
        <div className="text-center mt-16">
          <p className="font-body text-lg text-text-muted mb-6 animate-fade-in-up animation-delay-800">
            Book a 20-minute intro or email us your objectives/budget and we’ll map a right-sized package in one pass.
          </p>
          <button
            onClick={onDiscussOptions}
            className="relative group bg-brand-gold text-brand-black hover:bg-accent-dark px-10 py-5 rounded-lg font-body font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Get in Touch Now!</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </div>
      </div>
    </section>
  );
}
