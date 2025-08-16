"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Users, MapPin, Trophy, Star, ArrowRight, Zap, Shield, Rocket, MessageCircle } from 'lucide-react';

export default function AcademyPathwaySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [playersCount, setPlayersCount] = useState(0);
  const [locationsCount, setLocationsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [activeAgeGroup, setActiveAgeGroup] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const interval = setInterval(() => {
      setActiveAgeGroup((prev) => (prev + 1) % 5);
    }, isMobile ? 5000 : 3000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [isVisible]);

  const animateCounters = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const speed = isMobile ? 50 : 30;

    const playersInterval = setInterval(() => {
      setPlayersCount((prev) => {
        if (prev >= 300) {
          clearInterval(playersInterval);
          return 300;
        }
        return prev + 10;
      });
    }, speed);

    setTimeout(() => {
      setLocationsCount(1);
      setTimeout(() => setLocationsCount(2), 500);
    }, 500);

    const categoriesInterval = setInterval(() => {
      setCategoriesCount((prev) => {
        if (prev >= 5) {
          clearInterval(categoriesInterval);
          return 5;
        }
        return prev + 1;
      });
    }, 200);
  };

  const academyStats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: playersCount,
      suffix: "+",
      label: "Young Players",
      description: "Across all age groups",
      color: "from-brand-gold/30 to-accent-light/20",
      delay: 0,
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      number: locationsCount,
      suffix: "",
      label: "Training Locations",
      description: "Sultan bin Zayed & Al Maryah Island",
      color: "from-heritage-green/30 to-brand-gold/20",
      delay: 150,
    },
    {
      icon: <Star className="w-8 h-8" />,
      number: categoriesCount,
      suffix: "",
      label: "Age Categories",
      description: "From 4 years to professional",
      color: "from-heritage-red/30 to-brand-gold/20",
      delay: 300,
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      number: "Pathway",
      suffix: "",
      label: "To First Team",
      description: "Academy to professional journey",
      color: "from-brand-gold/30 to-accent-dark/20",
      delay: 450,
    },
  ];

  const ageGroups = [
    {
      age: "4-6",
      title: "Foundation",
      description: "Basic skills, fun, and football introduction",
      icon: "⚽",
      features: ["Ball mastery", "Coordination", "Social skills", "Fun games"],
      color: "from-green-400/20 to-brand-gold/10",
    },
    {
      age: "7-9",
      title: "Development",
      description: "Technical skills and game understanding",
      icon: "🎯",
      features: ["Passing & receiving", "Small-sided games", "Basic tactics", "Team play"],
      color: "from-blue-400/20 to-brand-gold/10",
    },
    {
      age: "10-12",
      title: "Skills",
      description: "Advanced techniques and tactical awareness",
      icon: "⭐",
      features: ["Position play", "Advanced skills", "Match analysis", "Leadership"],
      color: "from-purple-400/20 to-brand-gold/10",
    },
    {
      age: "13-15",
      title: "Youth",
      description: "Competitive football and physical development",
      icon: "🚀",
      features: ["Strength training", "Elite tactics", "Mental coaching", "Competition"],
      color: "from-red-400/20 to-brand-gold/10",
    },
    {
      age: "16-18",
      title: "Elite",
      description: "Professional pathway preparation",
      icon: "🏆",
      features: ["Pro training", "First team trials", "Career guidance", "Scholarships"],
      color: "from-brand-gold/30 to-accent-dark/20",
    },
  ];

  const professionalPathway = [
    {
      stage: "Academy Excellence",
      icon: <Shield className="w-8 h-8" />,
      description: "Master fundamental skills and game understanding",
      gradient: "from-heritage-green/20 to-brand-gold/10",
    },
    {
      stage: "Youth Development",
      icon: <Rocket className="w-8 h-8" />,
      description: "Competitive experience and tactical development",
      gradient: "from-brand-gold/20 to-accent-light/10",
    },
    {
      stage: "First Team",
      icon: <Trophy className="w-8 h-8" />,
      description: "Professional football career launch",
      gradient: "from-heritage-red/20 to-brand-gold/10",
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Section 1: Academy Overview */}
      <div className="section section--white relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none hidden md:block">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[600px] h-[600px] border-4 border-brand-gold rounded-full animate-pulse-slow" />
            <div className="absolute inset-12 border-4 border-brand-gold rounded-full animate-pulse-slow animation-delay-200" />
            <div className="absolute inset-24 border-4 border-brand-gold rounded-full animate-pulse-slow animation-delay-400" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className={`font-heading text-4xl md:text-5xl lg:text-6xl tracking-[0.02em] text-brand-black mb-6 transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Academy <span className="text-brand-gold">Pathway</span>
            </h2>

            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-32 animate-expand" />
              <Zap className="w-6 h-6 text-brand-gold mx-3 animate-pulse" />
              <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-32 animate-expand" />
            </div>

            <p
              className={`font-body text-base md:text-lg text-text-muted max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Developing the next generation of UAE football talent through professional coaching,
              structured pathways, and values-based education
            </p>
          </div>

          {/* Academy Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {academyStats.map((stat, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${stat.delay}ms` }}
              >
                <div
                  className={`relative bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-xl p-4 md:p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 md:group-hover:-translate-y-2 overflow-hidden`}
                >
                  <div className="absolute inset-0 pointer-events-none hidden md:block">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-brand-gold/30 rounded-full animate-float"
                        style={{
                          left: `${30 + i * 40}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${4 + i}s`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative w-12 h-12 md:w-14 md:h-14 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 transform md:group-hover:rotate-12 md:group-hover:scale-110 transition-all duration-500">
                    <div className="text-brand-black scale-75 md:scale-100">{stat.icon}</div>
                  </div>

                  <div className="font-heading text-2xl md:text-4xl text-brand-black mb-2">
                    {typeof stat.number === "number" ? (
                      <span className="inline-block md:group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                        {stat.suffix}
                      </span>
                    ) : (
                      <span className="text-xl md:text-3xl">{stat.number}</span>
                    )}
                  </div>

                  <div className="font-body font-semibold text-sm md:text-base text-brand-black mb-1 md:mb-2">
                    {stat.label}
                  </div>
                  <div className="font-body text-xs text-text-muted leading-relaxed hidden md:block">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Development Pathway */}
      <div className="section section--warm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-heading text-3xl md:text-h3 tracking-[0.02em] text-brand-black mb-4">
              Development <span className="text-brand-gold">Journey</span>
            </h3>
            <p className="font-body text-sm md:text-base text-text-muted max-w-2xl mx-auto">
              Five stages of excellence, from foundation skills to professional preparation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16 overflow-x-auto md:overflow-visible">
            {ageGroups.map((group, index) => (
              <div
                key={index}
                onClick={() => setActiveAgeGroup(index)}
                className={`group cursor-pointer transform transition-all duration-500 min-w-[280px] sm:min-w-0 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                } ${activeAgeGroup === index ? "md:scale-105" : ""}`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div
                  className={`relative bg-gradient-to-br ${group.color} rounded-xl p-4 md:p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full ${
                    activeAgeGroup === index ? "ring-2 ring-brand-gold" : ""
                  }`}
                >
                  {activeAgeGroup === index && (
                    <div className="absolute inset-0 bg-brand-gold/5 animate-pulse hidden md:block" />
                  )}

                  <div className="text-3xl md:text-4xl mb-3 transform md:group-hover:scale-110 transition-transform duration-300">
                    {group.icon}
                  </div>

                  <div className="font-heading text-xl md:text-2xl text-brand-gold mb-2">
                    {group.age}
                  </div>

                  <h4 className="font-heading text-base md:text-lg text-brand-black mb-2">
                    {group.title}
                  </h4>

                  <p className="font-body text-xs text-text-muted mb-4">{group.description}</p>

                  <div className="space-y-1 mt-4 pt-4 border-t border-brand-gold/20 md:hidden">
                    {group.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center text-xs">
                        <ArrowRight className="w-3 h-3 text-brand-gold mr-1" />
                        <span className="text-text-strong">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {activeAgeGroup === index && (
                    <div className="space-y-1 mt-4 pt-4 border-t border-brand-gold/20 hidden md:block">
                      {group.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-center text-xs transform transition-all duration-300"
                          style={{
                            transitionDelay: `${idx * 50}ms`,
                            opacity: activeAgeGroup === index ? 1 : 0,
                          }}
                        >
                          <ArrowRight className="w-3 h-3 text-brand-gold mr-1" />
                          <span className="text-text-strong">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Professional Pathway */}
          <div className="relative bg-gradient-to-r from-brand-black via-brand-black/95 to-brand-black rounded-2xl p-6 md:p-12 overflow-hidden">
            <div className="absolute inset-0 opacity-20 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold via-accent-light to-brand-gold animate-gradient-shift" />
            </div>

            <div className="relative z-10">
              <h3 className="font-heading text-2xl md:text-h3 text-brand-gold text-center mb-8 md:mb-10 tracking-[0.02em]">
                Professional Pathway
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {professionalPathway.map((stage, index) => (
                  <div
                    key={index}
                    className={`group transform transition-all duration-700 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${800 + index * 150}ms` }}
                  >
                    <div className="text-center">
                      <div
                        className={`relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${stage.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg md:group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className="text-brand-black scale-75 md:scale-100">{stage.icon}</div>
                        <div className="absolute inset-0 rounded-full bg-brand-gold/20 scale-0 md:group-hover:scale-150 opacity-0 md:group-hover:opacity-100 transition-all duration-700" />
                      </div>

                      <h4 className="font-heading text-lg md:text-xl text-white mb-3">{stage.stage}</h4>

                      <p className="font-body text-xs md:text-sm text-white/80 leading-relaxed">
                        {stage.description}
                      </p>

                      {index < professionalPathway.length - 1 && (
                        <div className="hidden md:block absolute top-10 left-[60%] w-full h-px bg-gradient-to-r from-brand-gold/50 to-transparent" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Join Our Academy CTA */}
      <div className="section section--white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-heritage-green/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h3 className="font-heading text-3xl md:text-4xl tracking-[0.02em] text-brand-black mb-6">
              Join Our <span className="text-brand-gold">Journey</span>
            </h3>

            <p className="font-body text-base md:text-lg text-text-muted mb-10 max-w-2xl mx-auto">
              Be part of the Baynounah family and help shape the future of UAE football.
              Whether you're 4 or 18, your football journey starts here.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
              {[
                { icon: "⚽", text: "Professional Coaching" },
                { icon: "🎯", text: "Clear Pathway" },
                { icon: "👨‍👩‍👧‍👦", text: "Family Environment" },
                { icon: "🏆", text: "Championship Heritage" },
              ].map((benefit, index) => (
                <div key={index} className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl md:text-3xl mb-2">{benefit.icon}</div>
                  <span className="font-body text-xs md:text-sm text-text-strong">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons ONLY */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:craig.angus@baynounahsc.ae"
                className="group inline-flex items-center justify-center bg-brand-gold text-brand-black hover:bg-accent-dark px-6 md:px-8 py-3 md:py-4 rounded-lg font-body font-semibold text-base md:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span>Get in touch</span>
              </a>

              <a
                href="https://wa.me/971566975370"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-white text-brand-black border-2 border-brand-gold hover:bg-brand-gold px-6 md:px-8 py-3 md:py-4 rounded-lg font-body font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Removed quick contact email block */}
          </div>
        </div>
      </div>
    </section>
  );
}
