
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

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
  const heroImage = imagePath || '/assets/images/stadium/Spain Park.jpg';
  const fallbackImage = "https://images.unsplash.com/photo-1472396961693-142e6e269027";
  
  const [currentImage, setCurrentImage] = useState(heroImage);
  
  const handleImageError = () => {
    console.error(`Failed to load stadium hero image: ${heroImage}`);
    setCurrentImage(fallbackImage);
  };

  return (
    <div className="relative h-[70vh] md:h-[60vh] sm:h-[50vh] min-h-[300px] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <img 
          src={currentImage} 
          alt={title} 
          className="hidden" 
          onError={handleImageError} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/80 via-[#00105A]/50 to-[#00105A]/30 z-10"></div>
      </div>
      
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-h1 md:text-display font-montserrat font-bold text-white mb-4">
          {title}
        </h1>
        
        <div className="w-32 h-1 bg-accent mb-6"></div>
        
        <p className="text-lg md:text-xl text-white/90 max-w-2xl font-inter">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default StadiumHero;
