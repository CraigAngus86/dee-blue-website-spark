"use client";
import React, { useEffect, useState } from "react";

interface ClubAcademyHeroProps {
  title?: string;
  subtitle?: string;
}

export default function ClubAcademyHero({
  title = "Club & Academy",
  subtitle = "More Than a Club",
}: ClubAcademyHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  // Cloudinary hero image
  const baseUrl = "https://res.cloudinary.com/dlkpaw2a0/image/upload";
  const transformation = "c_fill,g_auto:face,ar_21:9,q_auto,f_auto";
  const versionAndId = "v1755184294/academy_hero_idqrxt.png";
  const imageUrl = `${baseUrl}/${transformation}/${versionAndId}`;

  return (
    <div className="relative h-[50vh] min-h-[400px] w-full bg-brand-black overflow-hidden">
      {/* Background image with gentle parallax */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          isVisible ? "scale-105 opacity-60" : "scale-110 opacity-0"
        }`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: isVisible ? "scale(1.05)" : "scale(1.1)",
        }}
      />

      {/* Adjusted left-to-right gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/60 to-brand-black/10 z-10" />

      {/* Subtle geometric gold pattern */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="gold-pattern-club" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <polygon
              points="10,2 18,10 10,18 2,10"
              fill="none"
              stroke="rgb(var(--brand-gold))"
              strokeWidth="0.5"
              opacity="0.5"
            >
              <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </polygon>
          </pattern>
          <rect width="100" height="100" fill="url(#gold-pattern-club)" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-gold rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
        <h1
          className={`font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-4 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-flex flex-wrap items-baseline justify-center">
            {title.split(" ").map((word, i, arr) => (
              <React.Fragment key={i}>
                <span
                  className="inline-block animate-word-reveal px-1 md:px-1.5"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {word}
                </span>
                {i < arr.length - 1 && <span aria-hidden className="inline-block w-1 md:w-2" />}
              </React.Fragment>
            ))}
          </span>
        </h1>

        {subtitle && (
          <p
            className={`font-body text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {subtitle}
          </p>
        )}

        {/* Info row */}
        <div
          className={`mt-8 flex items-center space-x-8 transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center">
            <div className="font-heading text-4xl text-brand-gold">2019</div>
            <div className="font-body text-sm text-white/80">Founded</div>
          </div>
          <div className="h-12 w-px bg-brand-gold/30" />
          <div className="text-center">
            <div className="font-heading text-4xl text-brand-gold animate-pulse">300+</div>
            <div className="font-body text-sm text-white/80">Academy Families</div>
          </div>
        </div>

        {/* Heritage accent */}
        <div
          className={`mt-8 flex items-center space-x-4 transition-all duration-1000 delay-1000 ${
            isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-16 animate-expand" />
          <div className="text-brand-gold font-body text-sm tracking-wider">
            HERITAGE • EXCELLENCE • COMMUNITY
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-16 animate-expand" />
        </div>
      </div>
    </div>
  );
}
