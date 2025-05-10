import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  overlay?: 'light' | 'dark' | 'none';
  overlayOpacity?: number;
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  children?: React.ReactNode;
}

const HeroSection = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = 'Hero image',
  overlay = 'dark',
  overlayOpacity = 0.5,
  height = 'md',
  className,
  children
}: HeroSectionProps) => {
  // Map height values to tailwind classes
  const heightClasses = {
    sm: 'h-[200px] md:h-[300px]',
    md: 'h-[300px] md:h-[400px]',
    lg: 'h-[400px] md:h-[500px]',
    xl: 'h-[500px] md:h-[600px]',
    full: 'h-screen'
  };

  // Choose overlay styles
  const overlayStyles: React.CSSProperties = 
    overlay !== 'none' 
      ? { 
          opacity: overlayOpacity,
          backgroundColor: overlay === 'dark' ? 'black' : 'white' 
        } 
      : {};

  return (
    <div className={cn(
      `relative w-full overflow-hidden bg-slate-800`,
      heightClasses[height],
      className
    )}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Overlay */}
      {overlay !== 'none' && (
        <div 
          className="absolute inset-0"
          style={overlayStyles}
          aria-hidden="true"
        />
      )}
      
      {/* Content */}
      <div className="relative h-full flex items-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              overlay === 'dark' ? "text-white" : "text-primary"
            )}>
              {title}
            </h1>
            
            {subtitle && (
              <p className={cn(
                "text-lg md:text-xl mb-6",
                overlay === 'dark' ? "text-white/90" : "text-slate-800"
              )}>
                {subtitle}
              </p>
            )}
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;