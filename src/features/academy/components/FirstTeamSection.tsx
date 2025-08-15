"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Users, MapPin, Calendar, Shield, Star, Goal } from 'lucide-react';

export default function FirstTeamSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [squadCount, setSquadCount] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    const squadInterval = setInterval(() => {
      setSquadCount((prev) => {
        if (prev >= 30) {
          clearInterval(squadInterval);
          return 30;
        }
        return prev + 1;
      });
    }, 40);
  };

  const clubFacts = [
    { label: "Founded", value: "2019", icon: <Calendar className="w-4 h-4" /> },
    { label: "Home", value: "ERTH Stadium (Abu Dhabi)", icon: <MapPin className="w-4 h-4" /> },
    { label: "Colours", value: "Black & Gold", icon: <Star className="w-4 h-4" /> },
    { label: "League", value: "UAE Second Division", icon: <Shield className="w-4 h-4" /> },
    { label: "Squad Size", value: `${squadCount} Players`, icon: <Users className="w-4 h-4" /> },
  ];

  const seasonObjectives = [
    "Secure Top 2 Finish",
    "Advance in UAE FA Cup",
    "Grow Commercial Partnerships",
  ];

  return (
    <section ref={sectionRef} className="section section--warm relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 transform translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full border-8 border-brand-gold rounded-full animate-pulse-slow" />
        </div>
        <div className="absolute bottom-0 left-0 w-96 h-96 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-full h-full border-8 border-brand-black rounded-full animate-pulse-slow animation-delay-1000" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`font-heading text-5xl md:text-6xl tracking-[0.02em] text-brand-black mb-6 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            First <span className="text-brand-gold">Team</span>
          </h2>

          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-brand-black to-transparent w-32 animate-expand" />
            <Trophy className="w-6 h-6 text-brand-gold mx-3 animate-bounce" />
            <div className="h-px bg-gradient-to-r from-transparent via-brand-black to-transparent w-32 animate-expand" />
          </div>

          <p className={`font-body text-lg text-text-muted max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Professional football excellence since 2019 - building champions for UAE football
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div
            className={`transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-bl from-brand-gold/20 to-transparent rounded-br-full transform -translate-x-8 -translate-y-8 transition-transform duration-500" />

              <h3 className="font-heading text-2xl tracking-[0.02em] text-brand-black mb-6 text-center">
                Club Facts
              </h3>

              <div className="space-y-4 text-left">
                {clubFacts.map((fact, index) => (
                  <div key={index} className="transform transition-all duration-300 hover:translate-x-2" style={{ transitionDelay: `${index * 60}ms` }}>
                    <div className="flex items-center gap-2">
                      <div className="text-brand-gold">{fact.icon}</div>
                      <span className="font-body text-sm text-text-muted">{fact.label}:</span>
                    </div>
                    <div className="font-body font-semibold text-brand-black pl-6">{fact.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className={`transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="relative bg-gradient-to-br from-brand-gold via-accent-light to-brand-gold rounded-xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full ring-2 ring-brand-gold flex flex-col">
              <div className="relative text-center flex flex-col gap-6 flex-1">
                <h3 className="font-heading text-2xl tracking-[0.02em] text-brand-black">
                  This Season&apos;s Objectives
                </h3>

                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/90 rounded-full shadow-lg animate-float mx-auto">
                  <Goal className="w-10 h-10 text-brand-gold" />
                </div>

                <div className="space-y-4 max-w-sm mx-auto w-full mt-2 mb-2">
                  {seasonObjectives.map((obj, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center text-center bg-white/85 backdrop-blur-sm rounded-lg px-5 py-4 shadow-sm transform transition-all duration-300 hover:bg-white hover:translate-y-[-2px]"
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <span className="font-body text-sm font-semibold text-brand-black">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className={`transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="relative bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-bl from-brand-gold/20 to-transparent rounded-br-full transform -translate-x-8 -translate-y-8 transition-transform duration-500" />

              <h3 className="font-heading text-2xl tracking-[0.02em] text-brand-black mb-6 text-center">
                ERTH Stadium
              </h3>

              <div className="space-y-3 text-left">
                <div className="font-body text-sm text-text-muted">Capacity:</div>
                <div className="font-body font-semibold text-brand-black">3,000 seats</div>

                <div className="font-body text-sm text-text-muted mt-3">Surface:</div>
                <div className="font-body font-semibold text-brand-black">Professional playing surface</div>

                <div className="font-body text-sm text-text-muted mt-3">Facilities:</div>
                <div className="font-body font-semibold text-brand-black">FIFA certified Pitch and Facilities</div>

                <div className="font-body text-sm text-text-muted mt-3">Accessibility:</div>
                <div className="font-body font-semibold text-brand-black">Fully accessible for all supporters</div>

                <div className="font-body text-sm text-text-muted mt-3">Address:</div>
                <a
                  href="https://maps.google.com/?q=ERTH%20Stadium%20Abu%20Dhabi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body font-semibold text-brand-gold hover:underline"
                >
                  ERTH Stadium, Abu Dhabi (View on map)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team card with extra spacing */}
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="relative bg-gradient-to-br from-white via-surface-2 to-white rounded-2xl p-10 shadow-2xl overflow-hidden mt-20 mb-16">
            <h3 className="font-heading text-4xl tracking-[0.02em] text-brand-black mb-2 text-center">
              Our <span className="text-brand-gold">Team</span>
            </h3>
            <p className="text-center text-lg text-text-muted mb-6">
              Baynounah SC First Team — representing our community with pride and ambition
            </p>

            <div className="rounded-xl overflow-hidden shadow-md">
              <div className="relative w-full aspect-[16/9]">
                <img
                  src="https://res.cloudinary.com/dlkpaw2a0/image/upload/c_fill,g_center,ar_16:9,q_auto,f_auto/v1755261559/IMG_2293_qinkyr.jpg"
                  alt="Baynounah SC First Team"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Closing text at very end */}
        <p
          className={`font-body text-xl text-text-muted max-w-4xl mx-auto leading-relaxed text-center transition-all duration-1000 delay-200 mb-0 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          From the first team to our youngest academy players, every squad member is united by the same values and drive to succeed.
        </p>
      </div>
    </section>
  );
}
