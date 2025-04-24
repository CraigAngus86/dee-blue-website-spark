
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import ResponsiveImage from '@/components/ui/image/ResponsiveImage';

interface TimelineImageProps {
  src: string;
  alt: string;
}

const TimelineImage: React.FC<TimelineImageProps> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback for missing images
  const [imageSrc, setImageSrc] = useState(src);
  const handleError = () => {
    console.error(`Failed to load timeline image: ${src}`);
    // Use an available placeholder if the image fails to load
    setImageSrc("https://images.unsplash.com/photo-1506744038136-46273834b3fb");
  };

  return (
    <div className="w-full relative overflow-hidden rounded-lg shadow-md transition-opacity duration-300">
      {/* Gradient overlay for visual consistency */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/30 z-10 pointer-events-none"></div>
      
      <ResponsiveImage 
        src={imageSrc}
        alt={alt}
        aspectRatio="21/9"
        className={cn(
          "w-full",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        rounded="lg"
      />
    </div>
  );
};

export default TimelineImage;
