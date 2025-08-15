"use client";
import React, { useState, useEffect, useRef } from "react";
import { Target, Shield, ArrowRight, Zap } from "lucide-react";

export default function ValuesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const operationalValues = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Player Development",
      description:
        "Holistic growth focusing on technical skills, physical fitness, and mental strength",
      features: [
        "Technical Excellence",
        "Physical Conditioning",
        "Mental Resilience",
        "Tactical Understanding",
      ],
      gradient: "from-brand-gold/10 to-accent-light/5",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Fair Play",
      description: "Promoting sportsmanship, integrity, and respect for all",
      features: [
        "Respect for Officials",
        "Honor Opponents",
        "Team Unity",
        "Ethical Conduct",
      ],
      gradient: "from-heritage-green/10 to-brand-gold/5",
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Values Section */}
      <div className="section section--white relative">
        {/* Floating geometric shapes (kept) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 border border-brand-gold/10 rounded-full"
              style={{
                left: `${20 * i}%`,
                top: `${30 + i * 10}%`,
                animation: `float ${8 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className={`font-heading text-5xl md:text-6xl tracking-[0.02em] mb-6 transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } text-brand-black`}
            >
              OUR VALUES IN <span className="text-brand-gold">ACTION</span>
            </h2>

            {/* Separator now fades in */}
            <div
              className={`flex items-center justify-center mb-6 transition-all duration-1000 delay-100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-32 animate-expand" />
              <Zap className="w-6 h-6 text-brand-gold mx-3 animate-pulse" />
              <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-32 animate-expand" />
            </div>

            <p
              className={`font-body text-lg text-text-muted max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              The foundation of everything we do at Baynounah — four core
              principles that shape our identity and guide our journey towards
              excellence
            </p>
          </div>

          {/* (Removed the four small interactive cards) */}

          {/* Operational Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {operationalValues.map((value, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div
                  className={`relative bg-gradient-to-br ${value.gradient} backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden h-full`}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/80 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:rotate-12 transition-transform duration-300">
                      <div className="text-brand-gold">{value.icon}</div>
                    </div>
                    <h4 className="font-heading text-2xl tracking-[0.02em] text-brand-black">
                      {value.title}
                    </h4>
                  </div>

                  <p className="font-body text-text-muted mb-6 leading-relaxed">
                    {value.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {value.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-white/50 rounded-lg px-3 py-2 transform transition-all duration-300 hover:bg-white/80 hover:translate-x-1"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                        <ArrowRight className="w-4 h-4 text-brand-gold mr-2" />
                        <span className="font-body text-sm text-text-strong">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Philosophy Statement */}
          <div className="relative bg-brand-black rounded-2xl p-12 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold via-accent-light to-brand-gold animate-gradient-shift" />
            </div>

            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-brand-gold/20 rounded-full animate-float"
                  style={{
                    left: `${20 + i * 15}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${6 + i * 2}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="font-heading text-h3 text-brand-gold mb-6 tracking-[0.02em]">
                Our Philosophy
              </h3>

              <p className="font-body text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
                "We develop complete individuals — players who embody Islamic values, Emirati culture, and professional excellence on and off the pitch.
              </p>

              <div className="inline-block">
                <div className="bg-brand-gold text-brand-black px-8 py-3 rounded-full font-body font-semibold transform hover:scale-105 transition-transform duration-300">
                  Be Part of the Journey
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
}
