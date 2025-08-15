"use client";
import React, { useState, useEffect, useRef } from "react";
import { Shield, Heart, Sparkles, Crown } from "lucide-react";

export default function HeritageValues() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && !isVisible && setIsVisible(true)),
      { threshold: 0.2 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  const heritageStories = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Heritage",
      description:
        "Named after Baynounah — a region beloved by Sheikh Zayed — we honour his vision of unity and progress. Founded in 2019, we stand as together as one.",
      accent: "heritage-green",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community",
      description:
        "Over 300 academy families share our colours, values, and ambitions, building bonds that go far beyond matchday.",
      accent: "brand-gold",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Excellence",
      description:
        "From the pitch to the classroom, we demand the highest standards in performance, discipline, and respect.",
      accent: "heritage-red",
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Future",
      description:
        "We develop young players to lead in football and in life — carrying the pride of Abu Dhabi forward.",
      accent: "brand-gold",
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="section section--warm relative">
        {/* Islamic geometric pattern background (kept) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <pattern id="islamic-pattern-heritage" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,0 20,10 10,20 0,10" fill="none" stroke="rgb(var(--brand-gold))" strokeWidth="0.2">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
              </polygon>
              <polygon
                points="5,5 15,5 15,15 5,15"
                fill="none"
                stroke="rgb(var(--heritage-red))"
                strokeWidth="0.2"
                transform="rotate(45 10 10)"
              />
              <circle cx="10" cy="10" r="3" fill="none" stroke="rgb(var(--heritage-green))" strokeWidth="0.2" />
            </pattern>
            <rect width="100" height="100" fill="url(#islamic-pattern-heritage)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Title + Subtitle */}
          <div className="text-center mb-12">
            <h2
              className={`font-heading text-5xl md:text-6xl lg:text-7xl tracking-[0.02em] text-brand-black mb-6 transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <span className="block">
                <span className="text-brand-black">OUR </span>
                <span className="text-brand-gold">HERITAGE</span>
                <span className="text-brand-black"> AND </span>
                <span className="text-brand-gold">VALUES</span>
              </span>
            </h2>

            {/* Subtitle (now black, one size smaller) */}
            <span
              className={`text-brand-black text-xl md:text-2xl font-body italic block mb-8 transition-all duration-1000 delay-100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Celebrating our roots in Sheikh Zayed’s beloved Baynounah region, and building a future for Emirati football in Abu Dhabi’s capital.
            </span>

            {/* UAE flag colors divider */}
            <div className="flex items-center justify-center mb-4">
              <div
                className={`h-1 w-16 bg-heritage-red animate-expand transition-all duration-1000 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
              />
              <div
                className={`h-1 w-16 bg-heritage-green mx-1 animate-expand transition-all duration-1000 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
              />
              <div
                className={`h-1 w-16 bg-brand-black animate-expand transition-all duration-1000 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
              />
              <div
                className={`h-1 w-16 bg-white border border-gray-200 animate-expand transition-all duration-1000 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
              />
            </div>
          </div>

          {/* Four cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {heritageStories.map((story, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="relative bg-gradient-to-br from-white to-surface-2 rounded-xl p-6 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1.5 overflow-hidden">
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-28 h-28 opacity-10 transform translate-x-14 -translate-y-14 group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform duration-500">
                    <div
                      className={`w-full h-full bg-gradient-radial ${
                        story.accent === "heritage-red"
                          ? "from-heritage-red to-transparent"
                          : story.accent === "heritage-green"
                          ? "from-heritage-green to-transparent"
                          : "from-brand-gold to-transparent"
                      }`}
                    />
                  </div>

                  <div className="relative">
                    {/* Header row */}
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center ${
                          story.accent === "heritage-red"
                            ? "bg-heritage-red/10"
                            : story.accent === "heritage-green"
                            ? "bg-heritage-green/10"
                            : "bg-brand-gold/10"
                        } group-hover:scale-105 transition-transform duration-500`}
                      >
                        <div
                          className={`${
                            story.accent === "heritage-red"
                              ? "text-heritage-red"
                              : story.accent === "heritage-green"
                              ? "text-heritage-green"
                              : "text-brand-gold"
                          }`}
                        >
                          {story.icon}
                        </div>
                      </div>
                      <h3 className="font-heading text-3xl md:text-4xl tracking-[0.01em] leading-none text-brand-black self-center">
                        {story.title}
                      </h3>
                    </div>

                    {/* Body copy */}
                    <p className="font-body text-base md:text-[15px] text-text-muted leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bringing it together */}
          <p
            className={`font-body text-xl text-text-muted max-w-4xl mx-auto leading-relaxed text-center transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            These principles guide every decision we make — from grassroots training sessions to professional matchdays — ensuring Baynounah remains true to its heritage while striving for excellence.
          </p>
        </div>
      </div>
    </section>
  );
}
