
import React from "react";
import { getStadiumImage } from "@/lib/imageUtils";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";

interface HeroSectionProps {
  title: string;
  category: string;
  timestamp: string;
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  category,
  timestamp,
  backgroundImage = getStadiumImage()
}) => {
  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src={backgroundImage}
          alt="Hero background"
          className="w-full h-full"
          objectFit="cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-[70vh] flex flex-col justify-end">
        <div className="container mx-auto px-4 md:px-6 pb-24">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">
            <span className="inline-block border-b-4 border-accent pb-2">{title}</span>
          </h1>
          
          <div className="flex items-center text-white text-sm md:text-base">
            <span className="bg-primary px-2 py-1 mr-4 font-semibold">{category}</span>
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
