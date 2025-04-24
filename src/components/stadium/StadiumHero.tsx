
import React from 'react';
import { getStadiumImage } from '@/lib/image';

interface StadiumHeroProps {
  title: string;
  subtitle: string;
  imagePath?: string;
}

const StadiumHero: React.FC<StadiumHeroProps> = ({
  title,
  subtitle,
  imagePath
}) => {
  // Use the provided image path or get a default stadium image
  const heroImage = imagePath || getStadiumImage('Spain Park.jpg');

  return (
    <div className="relative h-[70vh] md:h-[60vh] sm:h-[50vh] min-h-[300px] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/80 via-[#00105A]/50 to-[#00105A]/30 z-10"></div>
      </div>
      
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-h1 md:text-display font-montserrat font-bold text-white mb-4">
          {title}
        </h1>
        
        {/* Gold accent line below headline */}
        <div className="w-32 h-1 bg-accent mb-6"></div>
        
        <p className="text-lg md:text-xl text-white/90 max-w-2xl font-inter">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default StadiumHero;
