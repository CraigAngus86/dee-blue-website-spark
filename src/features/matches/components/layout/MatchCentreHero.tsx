import React from 'react';

interface MatchCentreHeroProps {
  title?: string;
  subtitle?: string;
}

export function MatchCentreHero({
  title = "Match Centre",
  subtitle = "View fixtures, results and league standings"
}: MatchCentreHeroProps) {
  return (
    <div className="relative h-[40vh] min-h-[300px] w-full bg-[#00105A]">
      {/* For now, use a solid color background without an image */}
      <div className="absolute inset-0 opacity-30 z-0 bg-[#00105A]"></div>
      <div className="absolute inset-0 bg-[#00105A] opacity-60 z-10"></div>
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl font-inter">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
