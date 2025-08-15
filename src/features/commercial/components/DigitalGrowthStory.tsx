"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Globe, TrendingUp, Zap, Monitor, Wifi, Code, Activity } from 'lucide-react';

interface DigitalGrowthStoryProps {
  onPartnershipClick: () => void;
}

export function DigitalGrowthStory({ onPartnershipClick }: DigitalGrowthStoryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [growthPercentage, setGrowthPercentage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            animateGrowth();
          }
        });
      },
      { threshold: 0.1 } // Reduced threshold for mobile
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  const animateGrowth = () => {
    const isMobile = window.innerWidth < 768;
    let current = 0;
    const target = 100;
    const increment = isMobile ? 5 : 2; // Faster on mobile to reduce computation
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setGrowthPercentage(current);
    }, isMobile ? 40 : 20);
  };

  // Simplified feature rendering for mobile
  const renderFeature = (text: string) => {
    const colonIndex = text.indexOf(":");
    if (colonIndex !== -1) {
      const label = text.substring(0, colonIndex + 1);
      const rest = text.substring(colonIndex + 1).trim();
      return (
        <>
          <strong className="font-semibold text-brand-black">{label}</strong>{" "}
          {rest}
        </>
      );
    }
    const words = text.split(" ");
    const firstWord = words[0];
    const restWords = words.slice(1).join(" ");
    return (
      <>
        <strong className="font-semibold text-brand-black">{firstWord}</strong>{" "}
        {restWords}
      </>
    );
  };

  const digitalOpportunities = [
    {
      icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Website platform development",
      features: [
        "Placements: homepage hero rotation, partner hub, matchweek strip.",
        "Campaigns: two integrated pushes per season (ticketing, academy, community).",
        "Measurement: GA4 + UTM links; monthly dashboard; CTR/visits/dwell benchmarks.",
      ],
      glowColor: "from-brand-gold/30 to-accent-light/20",
    },
    {
      icon: <Smartphone className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Social media growth",
      features: [
        "Inventory: 4x branded posts/month (mix of reels, carousels, stories).",
        "Access: limited BTS windows and player IDs per campaign.",
        "KPIs: reach, saves, link clicks; post-campaign wrap.",
      ],
      glowColor: "from-heritage-red/30 to-brand-gold/20",
    },
    {
      icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Digital fan model",
      features: [
        "Build: email capture + membership waitlist + interactive polls.",
        "Value: consented leads to partner (where permitted) with quarterly counts.",
        "KPIs: new subs, open/click rates, poll participation.",
      ],
      glowColor: "from-heritage-green/30 to-brand-gold/20",
    },
    {
      icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Content innovation",
      features: [
        "Series: short-form video (6× episodes/season) + podcast specials (2×) + academy spotlights (4×).",
        "Rights: brand in open/close slates and lower-thirds; usage terms defined in SOW.",
        "KPIs: views, completion rate, average watch time.",
      ],
      glowColor: "from-brand-gold/30 to-accent-dark/20",
    },
  ];

  const growthMetrics = [
    {
      label: "Platform Rebuild",
      value: `${growthPercentage}%`,
      description: "New site and data layer with partner modules built-in (not bolted on)",
      icon: <Monitor className="w-5 h-5" />,
    },
    {
      label: "Content Strategy",
      value: "New",
      description: "Editorial calendar with guaranteed partner slots",
      icon: <Code className="w-5 h-5" />,
    },
    {
      label: "Partner Integration",
      value: "Built-In",
      description: "Clear placements across web, social, and matchweek",
      icon: <Wifi className="w-5 h-5" />,
    },
    {
      label: "Growth Potential",
      value: "Scalable",
      description: "Roadmap that expands assets as the club climbs",
      icon: <Activity className="w-5 h-5" />,
    },
  ];

  return (
    <section ref={sectionRef} className="section section--white relative overflow-hidden">
      {/* Simplified digital matrix background for mobile */}
      <div className="absolute inset-0 opacity-5 pointer-events-none hidden md:block">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgb(252, 199, 67) 2px, rgb(252, 199, 67) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgb(252, 199, 67) 2px, rgb(252, 199, 67) 4px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`font-heading text-3xl md:text-h2 tracking-[0.02em] text-brand-black mb-6 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Digital <span className="text-brand-gold">Growth</span> Opportunity
          </h2>

          {/* Animated tech divider - simplified for mobile */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>

          <p
            className={`font-body text-base md:text-lg text-text-muted max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            We're rebuilding our digital stack with{" "}
            <span className="font-semibold text-brand-gold">partners embedded from day one</span> — not as add-ons later.
            Deliverables are defined, measured, and reviewed quarterly.
          </p>
        </div>

        {/* Growth Metrics Dashboard - Mobile optimized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {growthMetrics.map((metric, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative group">
                <div className="relative bg-surface-2 rounded-lg p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Simplified hover effect for mobile */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
                  </div>
                  
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3 transform group-hover:rotate-12 transition-transform duration-300">
                    <div className="text-brand-gold scale-75 md:scale-100">{metric.icon}</div>
                  </div>
                  
                  <div className="font-heading text-2xl md:text-3xl text-brand-gold mb-1 md:mb-2 relative">
                    <span className="relative z-10">{metric.value}</span>
                  </div>
                  
                  <div className="font-body font-semibold text-brand-black text-xs md:text-sm mb-1">
                    {metric.label}
                  </div>
                  
                  <p className="font-body text-xs text-text-muted hidden md:block">{metric.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Digital Opportunities Grid - Mobile optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {digitalOpportunities.map((opportunity, index) => (
            <div
              key={index}
              className={`group transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <div
                className={`relative bg-gradient-to-br ${opportunity.glowColor} backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 md:group-hover:-translate-y-2 overflow-hidden h-full`}
              >
                {/* Simplified background pattern for mobile */}
                <div className="absolute inset-0 opacity-5 pointer-events-none hidden md:block">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FCC743' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 bg-white/80 rounded-xl flex items-center justify-center mr-3 md:mr-4">
                    <div className="text-brand-black">{opportunity.icon}</div>
                    <div className="absolute inset-0 rounded-xl bg-brand-gold/20 animate-ping hidden md:block" />
                  </div>
                  <h3 className="font-heading text-lg md:text-xl tracking-[0.02em] text-brand-black">
                    {opportunity.title}
                  </h3>
                </div>

                {/* Bullets with mobile-friendly text */}
                <ul className="list-disc marker:text-brand-black pl-5 md:pl-6 space-y-2 mt-2">
                  {opportunity.features.map((feature: string, idx: number) => (
                    <li
                      key={idx}
                      className="transform transition-all duration-300 md:group-hover:translate-x-2 font-body text-sm md:text-base text-brand-black leading-relaxed"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      {renderFeature(feature)}
                    </li>
                  ))}
                </ul>

                {/* Corner decoration - desktop only */}
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-20 hidden md:block">
                  <div className="absolute bottom-2 right-2 w-3 h-3 bg-brand-gold rounded-full animate-pulse" />
                  <div className="absolute bottom-2 right-8 w-2 h-2 bg-brand-gold rounded-full animate-pulse animation-delay-200" />
                  <div className="absolute bottom-8 right-2 w-2 h-2 bg-brand-gold rounded-full animate-pulse animation-delay-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Digital Vision Statement - Mobile optimized */}
        <div className="relative bg-gradient-to-r from-surface-2 via-brand-gold/5 to-surface-2 rounded-xl p-6 md:p-10 mb-0 overflow-hidden">
          {/* Simplified animated lines for mobile */}
          <div className="absolute inset-0 opacity-10 pointer-events-none hidden md:block">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent animate-data-stream"
                  style={{
                    top: `${20 * i}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '3s',
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-h3 tracking-[0.02em] text-brand-black mb-4">
              Building Tomorrow's <span className="text-brand-gold">Digital Experience</span>
            </h3>
            <p className="font-body text-sm md:text-base text-text-muted leading-relaxed mb-6 md:mb-8">
              If you're a Principal/Main/Official partner, select which digital workstreams you want activated in season one; we'll lock outputs and KPIs in the SOW.
            </p>
            
            {/* Benefits - Stack on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-3 sm:space-y-0 flex-wrap">
              {["Integrated Design", "Co-Created Content", "Shared Growth"].map((benefit, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-4 py-2 bg-brand-black/5 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Zap className="w-4 h-4 text-brand-gold mr-2" />
                  <span className="font-body text-xs md:text-sm text-text-strong">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}