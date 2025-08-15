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
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  const animateGrowth = () => {
    let current = 0;
    const target = 100;
    const increment = 2;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setGrowthPercentage(current);
    }, 20);
  };

  // Bold the first label (before first colon) or first word
  const renderFeature = (text: string) => {
    const idx = text.indexOf(":");
    if (idx !== -1) {
      const label = text.slice(0, idx + 1);
      const rest = text.slice(idx + 1).trim();
      return (
        <>
          <strong className="font-semibold text-brand-black">{label}</strong>{" "}
          {rest}
        </>
      );
    }
    const [first, ...rest] = text.split(" ");
    return (
      <>
        <strong className="font-semibold text-brand-black">{first}</strong>{" "}
        {rest.join(" ")}
      </>
    );
  };

  const digitalOpportunities = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Website platform development",
      features: [
        "Placements: homepage hero rotation, partner hub, matchweek strip.",
        "Campaigns: two integrated pushes per season (ticketing, academy, community).",
        "Measurement: GA4 + UTM links; monthly dashboard; CTR/visits/dwell benchmarks.",
      ],
      glowColor: "from-brand-gold/30 to-accent-light/20",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Social media growth",
      features: [
        "Inventory: 4x branded posts/month (mix of reels, carousels, stories).",
        "Access: limited BTS windows and player IDs per campaign.",
        "KPIs: reach, saves, link clicks; post-campaign wrap.",
      ],
      glowColor: "from-heritage-red/30 to-brand-gold/20",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Digital fan model",
      features: [
        "Build: email capture + membership waitlist + interactive polls.",
        "Value: consented leads to partner (where permitted) with quarterly counts.",
        "KPIs: new subs, open/click rates, poll participation.",
      ],
      glowColor: "from-heritage-green/30 to-brand-gold/20",
    },
    {
      icon: <Zap className="w-8 h-8" />,
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
      {/* Digital matrix background effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgb(var(--brand-gold)) 2px,
              rgb(var(--brand-gold)) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgb(var(--brand-gold)) 2px,
              rgb(var(--brand-gold)) 4px
            )`,
            backgroundSize: "50px 50px",
            animation: "matrix-move 20s linear infinite",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-h2 tracking-[0.02em] text-brand-black mb-6 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Digital <span className="text-brand-gold">Growth</span> Opportunity
          </h2>

          {/* Animated tech divider */}
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
            className={`font-body text-lg text-text-muted max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            We’re rebuilding our digital stack with{" "}
            <span className="font-semibold text-brand-gold">partners embedded from day one</span> — not as add-ons later.
            Deliverables are defined, measured, and reviewed quarterly.
          </p>
        </div>

        {/* Growth Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {growthMetrics.map((metric, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative group">
                <div className="relative bg-surface-2 rounded-lg p-6 text-center hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent animate-glitch" />
                  </div>
                  <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-3 transform group-hover:rotate-12 transition-transform duration-300">
                    <div className="text-brand-gold">{metric.icon}</div>
                  </div>
                  <div className="font-heading text-3xl text-brand-gold mb-2 relative">
                    <span className="relative z-10">{metric.value}</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="absolute inset-0 text-brand-gold/30 animate-digital-flicker">
                        {metric.value}
                      </span>
                    </div>
                  </div>
                  <div className="font-body font-semibold text-brand-black text-sm mb-1">
                    {metric.label}
                  </div>
                  <p className="font-body text-xs text-text-muted">{metric.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Digital Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {digitalOpportunities.map((opportunity, index) => (
            <div
              key={index}
              className={`group transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <div
                className={`relative bg-gradient-to-br ${opportunity.glowColor} backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden h-full`}
              >
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FCC743' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                <div className="flex items-center mb-4">
                  <div className="relative w-14 h-14 bg-white/80 rounded-xl flex items-center justify-center mr-4">
                    <div className="text-brand-black">{opportunity.icon}</div>
                    <div className="absolute inset-0 rounded-xl bg-brand-gold/20 animate-ping" />
                  </div>
                  <h3 className="font-heading text-xl tracking-[0.02em] text-brand-black">
                    {opportunity.title}
                  </h3>
                </div>

                {/* Bullets: round, black, bigger text */}
                <ul className="list-disc marker:text-brand-black pl-6 space-y-2 mt-2">
                  {opportunity.features.map((feature: string, idx: number) => (
                    <li
                      key={idx}
                      className="transform transition-all duration-300 group-hover:translate-x-2 font-body text-base text-brand-black leading-relaxed"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      {renderFeature(feature)}
                    </li>
                  ))}
                </ul>

                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-20">
                  <div className="absolute bottom-2 right-2 w-3 h-3 bg-brand-gold rounded-full animate-pulse" />
                  <div className="absolute bottom-2 right-8 w-2 h-2 bg-brand-gold rounded-full animate-pulse animation-delay-200" />
                  <div className="absolute bottom-8 right-2 w-2 h-2 bg-brand-gold rounded-full animate-pulse animation-delay-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Digital Vision Statement */}
        <div className="relative bg-gradient-to-r from-surface-2 via-brand-gold/5 to-surface-2 rounded-xl p-10 mb-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent animate-data-stream"
                  style={{
                    top: `${20 * i}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: "3s",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="relative max-w-4xl mx-auto text-center">
            <h3 className="font-heading text-h3 tracking-[0.02em] text-brand-black mb-4">
              Building Tomorrow's <span className="text-brand-gold">Digital Experience</span>
            </h3>
            <p className="font-body text-text-muted leading-relaxed mb-8">
              If you’re a Principal/Main/Official partner, select which digital workstreams you want activated in season one; we’ll lock outputs and KPIs in the SOW.
            </p>
            <div className="flex items-center justify-center space-x-6 flex-wrap">
              {["Integrated Design", "Co-Created Content", "Shared Growth"].map((benefit, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-4 py-2 bg-brand-black/5 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-all duration-300 mb-2"
                >
                  <Zap className="w-4 h-4 text-brand-gold mr-2" />
                  <span className="font-body text-sm text-text-strong">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Removed the final bottom CTA */}
      </div>
    </section>
  );
}
