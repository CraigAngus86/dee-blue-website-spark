"use client";
import React, { useEffect, useRef, useState } from "react";
import { Trophy, Rocket, Heart, Smartphone } from "lucide-react";

interface WhyPartnerWithUsProps {
  onPartnershipClick: () => void;
}

export function WhyPartnerWithUs({ onPartnershipClick }: WhyPartnerWithUsProps) {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            [0, 1, 2, 3].forEach((index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            });
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

  const valuePillars = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Sporting Platform",
      description:
        "Partner with Abu Dhabi's capital club, established in 2019 with FIFA certification and home at the prestigious ERTH Stadium.",
      color: "from-brand-gold/20 to-accent-light/10",
      iconBg: "bg-brand-gold/20",
      delay: 0,
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Early Access",
      description:
        "Be a first mover: shape your rights and assets with us ahead of the season and lock in a position that grows as we grow.",
      color: "from-heritage-red/20 to-brand-gold/10",
      iconBg: "bg-heritage-red/20",
      delay: 150,
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Heritage & Community",
      description:
        "Rooted in the Baynounah heritage and supported by 300+ academy families — real reach, not rented audiences.",
      color: "from-heritage-green/20 to-brand-gold/10",
      iconBg: "bg-heritage-green/20",
      delay: 300,
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Digital Growth",
      description:
        "Your brand integrated into our rebuild — site, social and matchweek content with clear placements and reporting.",
      color: "from-brand-gold/20 to-accent-dark/10",
      iconBg: "bg-brand-gold/20",
      delay: 450,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="why-partner"
      className="section section--warm relative overflow-hidden"
    >
      {/* Background geometric pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full border-8 border-brand-gold rotate-45 animate-rotate-slow" />
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 transform translate-x-1/2 translate-y-1/2">
          <div className="w-full h-full bg-brand-gold rotate-45 animate-rotate-slow-reverse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-h2 tracking-[0.02em] text-brand-black mb-6 animate-fade-in-up">
            Why Partner With{" "}
            <span className="text-brand-gold">Baynounah</span> Sports Club
          </h2>

        {/* Animated divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-32 animate-expand" />
            <div className="w-2 h-2 bg-brand-gold rounded-full mx-2 animate-pulse" />
            <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-32 animate-expand" />
          </div>

          <p className="font-body text-lg text-text-muted max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Baynounah SC is Abu Dhabi’s ambitious club with deep local roots and a clear path up the pyramid. 
            Partnering early means meaningful visibility and community access{" "}
            <span className="font-semibold text-brand-gold">
               — built carefully for the long term.
            </span>
          </p>
        </div>

        {/* Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuePillars.map((pillar, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-700 ${
                visibleCards.includes(index)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${pillar.delay}ms` }}
            >
              <div
                className={`relative bg-gradient-to-br ${pillar.color} rounded-xl p-8 h-full shadow-md hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden`}
              >
                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500">
                  <div className="w-full h-full bg-brand-gold/10 rotate-45" />
                </div>

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 ${pillar.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}
                >
                  <div className="text-brand-black group-hover:text-brand-gold transition-colors duration-300">
                    {pillar.icon}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-brand-gold/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                </div>

                {/* Title & Description */}
                <h3 className="font-heading text-xl tracking-[0.02em] text-brand-black mb-4 group-hover:text-brand-gold transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="font-body text-text-muted leading-relaxed text-sm">
                  {pillar.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div className="mt-12 pt-6 border-t border-brand-gold/20 text-center">
          <p className="font-body text-base md:text-lg text-text-muted">
            <strong className="text-brand-black">Next step</strong>{" "}
            Book a short intro call or email us to outline objectives and budget; we'll map a right-sized package in one pass.
          </p>
        </div>
      </div>
    </section>
  );
}
