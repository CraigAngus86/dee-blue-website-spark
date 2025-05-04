
import React from 'react';
import { cn } from '@/lib/utils';

export interface HeroSectionProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  overlay?: 'light' | 'dark' | 'none';
  children?: React.ReactNode;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  imageSrc,
  imageAlt,
  overlay = 'none',
  children,
  className,
}) => {
  return (
    <div 
      className={cn(
        "relative w-full h-[40vh] min-h-[300px] max-h-[600px] bg-slate-800 overflow-hidden",
        className
      )}
    >
      {/* Background Image */}
      <img 
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
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
