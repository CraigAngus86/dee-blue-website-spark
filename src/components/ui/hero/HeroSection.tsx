
import React from 'react';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  image: string; // Image path or URL
  imageAlt?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  overlayColor?: string;
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children?: React.ReactNode;
}

const HeroSection = ({
  title,
  subtitle,
  image,
  imageAlt = 'Hero image',
  overlay = true,
  overlayOpacity = 0.6,
  overlayColor = 'dark',
  height = 'md',
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

  // Choose overlay color
  const overlayColorClass = overlayColor === 'dark' ? 'bg-black' : 'bg-primary';

  return (
    <div className={`relative w-full ${heightClasses[height]}`}>
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      
      {/* Overlay */}
      {overlay && (
        <div 
          className={`absolute inset-0 ${overlayColorClass}`}
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-lg md:text-xl text-white/90 mb-6">
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
