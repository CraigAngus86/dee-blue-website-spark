"use client";
import React, { useLayoutEffect, useState } from "react";

interface TeamHeroProps {
  title?: string;
  subtitle?: string;
}

const TeamHero: React.FC<TeamHeroProps> = ({
  title = "Team & Management",
  subtitle = "Meet the players and staff behind Baynounah SC",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useLayoutEffect(() => setIsVisible(true), []);

  // Optimised Cloudinary transform (kept)
  const baseUrl = "https://res.cloudinary.com/dlkpaw2a0/image/upload";
  const transformation = "c_fill,g_auto:subject,ar_16:9,w_1280,dpr_auto,q_auto:good,f_auto";
  const versionAndId = "v1755340127/TeamPhotoHero_kq9jmv.jpg";
  const imageUrl = `${baseUrl}/${transformation}/${versionAndId}`;

  return (
    <div className="relative h-[50vh] min-h-[400px] w-full bg-brand-black overflow-hidden">
      {/* Background image — no zoom, opacity fade only; biased up so heads fit */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          isVisible ? "opacity-60" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "50% 34%", // push focal area upward
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/60 to-brand-black/10 z-10" />

      {/* Floating particles (kept) */}
      <div className="absolute inset-0 z-15 pointer-events-none">
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
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
        <h1
          className={`font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-4 transition-all duration-1000 transform-gpu will-change-transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-flex flex-wrap items-baseline justify-center">
            {title.split(" ").map((word, i, arr) => (
              <React.Fragment key={i}>
                <span
                  className="inline-block animate-word-reveal px-1 md:px-1.5"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationFillMode: "both",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
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
            <div className="font-heading text-4xl text-brand-gold">Players</div>
            <div className="font-body text-sm text-white/80">and Staff</div>
          </div>
          <div className="h-12 w-px bg-brand-gold/30" />
          <div className="text-center">
            <div className="font-heading text-4xl text-brand-gold animate-pulse">First</div>
            <div className="font-body text-sm text-white/80">Team</div>
          </div>
        </div>

        {/* Heritage accent — mobile: 3 lines; desktop: 1 line */}
        <div
          className={`mt-8 flex items-center lg:space-x-4 transition-all duration-1000 delay-1000 ${
            isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <div
            className="h-px w-16 md:w-20 shrink-0 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
            aria-hidden
          />
          <div className="text-brand-gold font-body text-sm tracking-wider flex flex-col items-center text-center space-y-1 lg:flex-row lg:space-y-0 lg:space-x-2 lg:whitespace-nowrap">
            <span>HERITAGE</span>
            <span className="hidden lg:inline" aria-hidden>
              •
            </span>
            <span>EXCELLENCE</span>
            <span className="hidden lg:inline" aria-hidden>
              •
            </span>
            <span>COMMUNITY</span>
          </div>
          <div
            className="h-px w-16 md:w-20 shrink-0 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
};

export default TeamHero;
