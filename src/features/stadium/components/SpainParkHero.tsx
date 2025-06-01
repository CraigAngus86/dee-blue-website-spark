import React from 'react';

interface SpainParkHeroProps {
  title?: string;
  subtitle?: string;
}

export function SpainParkHero({
  title = "Spain Park",
  subtitle = "Home of Banks o' Dee FC"
}: SpainParkHeroProps) {
  // Base URL from Cloudinary
  const baseUrl = "https://res.cloudinary.com/dlkpaw2a0/image/upload";
  
  // Stadium image transformation
  const transformation = "c_fill,g_auto:subject,ar_21:9,q_auto,f_auto";
  
  // Spain Park image ID
  const versionAndId = "v1746460880/Spain_Park_vodcre.jpg";
  
  // Complete image URL with transformation
  const imageUrl = `${baseUrl}/${transformation}/${versionAndId}`;
  
  return (
    <div className="relative h-[40vh] min-h-[300px] w-full bg-[#00105A]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center"
        }}
      />
      <div className="absolute inset-0 bg-[#00105A] opacity-30 z-10"></div>
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
