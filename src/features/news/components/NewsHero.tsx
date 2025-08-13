import React from "react";

interface NewsHeroProps {
  title?: string;
  subtitle?: string;
}

export function NewsHero({
  title = "Club News",
  subtitle = "Stay up to date with all the latest from Baynounah SC",
}: NewsHeroProps) {
  const baseUrl = "https://res.cloudinary.com/dlkpaw2a0/image/upload";
  const transformation = "c_fill,g_auto:face,ar_21:9,q_auto,f_auto";
  const versionAndId = "v1747399776/Untitled-02_arhzsc.jpg";
  const imageUrl = `${baseUrl}/${transformation}/${versionAndId}`;

  return (
    <div className="relative h-[40vh] min-h-[300px] w-full bg-black">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      {/* Overlay tint using brand gold/black blend */}
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

      {/* Hero content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-h1 font-heading tracking-[0.02em] text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default NewsHero;
