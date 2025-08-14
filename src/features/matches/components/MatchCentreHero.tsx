import React from 'react';

interface MatchCentreHeroProps {
  title?: string;
  subtitle?: string;
}

export function MatchCentreHero({
  title = "Match Centre",
  subtitle = "View fixtures, results and league standings",
}: MatchCentreHeroProps) {
  // Base URL from Cloudinary
  const baseUrl = "https://res.cloudinary.com/dlkpaw2a0/image/upload";

  // Face-focused transformation for hero image
  const transformation = "c_fill,g_auto:face,ar_21:9,q_auto,f_auto";

  // Version and image ID (keep your chosen hero image)
  const versionAndId = "v1747398181/Hermes-06_dpaeev.jpg";

  // Complete image URL with transformation
  const imageUrl = `${baseUrl}/${transformation}/${versionAndId}`;

  return (
    <div className="relative h-[40vh] min-h-[300px] w-full bg-black">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {/* Overlay tint */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Hero content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-h1 font-heading tracking-[0.02em] text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Heritage accent */}
        <div className="mt-6 flex items-center space-x-4">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-16"></div>
          <div className="text-brand-gold font-body text-sm tracking-wider">
            HERITAGE • EXCELLENCE • COMMUNITY
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent w-16"></div>
        </div>
      </div>
    </div>
  );
}
