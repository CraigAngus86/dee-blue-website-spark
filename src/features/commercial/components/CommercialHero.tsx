import React from 'react';

export function CommercialHero() {
  // Base URL from Cloudinary
  const baseUrl = "https://res.cloudinary.com/dlkpaw2a0/image/upload";
  // Transformation for hero image
  const transformation = "c_fill,g_auto:subject,ar_21:9,q_auto,f_auto";
  // Image ID
  const imageId = "v1748878131/Screenshot_2025-06-02_at_19.28.29_tplce0.png";
  // Complete image URL with transformation
  const imageUrl = `${baseUrl}/${transformation}/${imageId}`;

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
          Commercial Opportunities
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl font-inter">
          Partner with Banks o' Dee FC
        </p>
      </div>
    </div>
  );
}
