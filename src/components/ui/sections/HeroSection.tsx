
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface HeroSectionProps {
  title: string;
  backgroundImage?: string; // For backward compatibility
  imageSrc?: string;        // New property name
  imageAlt?: string;
  overlay?: 'light' | 'dark' | 'none';
  children?: React.ReactNode;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  backgroundImage, // For backward compatibility
  imageSrc,
  imageAlt = 'Hero image',
  overlay = 'none',
  children,
  className,
}) => {
  // Use either the new imageSrc prop or fall back to the old backgroundImage prop
  const imageSource = imageSrc || backgroundImage || '';
  
  return (
    <div 
      className={cn(
        "relative w-full h-[40vh] min-h-[300px] max-h-[600px] bg-slate-800 overflow-hidden",
        className
      )}
    >
      {/* Background Image */}
      {imageSource && (
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={imageSource}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Overlay */}
      {overlay !== 'none' && (
        <div 
          className={cn(
            "absolute inset-0",
            overlay === 'light' ? "bg-white/50" : "bg-black/50"
          )}
        />
      )}
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <h1 className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
          overlay === 'dark' ? "text-white" : "text-primary"
        )}>
          {title}
        </h1>
        
        {children}
      </div>
    </div>
  );
};

export default HeroSection;
