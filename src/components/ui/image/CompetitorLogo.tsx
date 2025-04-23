
import React from 'react';
import { cn } from '@/lib/utils';
import { getCompetitorLogo } from '@/lib/image/competitorLogos';
import ResponsiveImage from './ResponsiveImage';

interface CompetitorLogoProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  variant?: 'default' | 'alternate';
  className?: string;
}

const CompetitorLogo: React.FC<CompetitorLogoProps> = ({
  name,
  size = 'md',
  variant = 'default',
  className,
}) => {
  // Get logo path
  const logoPath = getCompetitorLogo(name, variant);
  
  // Map sizes to pixel values
  const sizeMap = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };
  
  // Determine actual size in pixels
  const actualSize = typeof size === 'number' ? size : sizeMap[size];
  
  console.log(`Rendering competitor logo: ${name}, path: ${logoPath}`);
  
  return (
    <div 
      className={cn(
        "flex items-center justify-center overflow-hidden",
        className
      )}
      style={{
        width: `${actualSize}px`, 
        height: `${actualSize}px`,
      }}
    >
      <ResponsiveImage
        src={logoPath}
        alt={`${name} logo`}
        className="w-full h-full"
        objectFit="contain"
        onLoad={() => console.log(`Competitor logo loaded: ${name}`)}
        onError={() => console.error(`Failed to load competitor logo: ${name}`)}
      />
    </div>
  );
};

export default CompetitorLogo;
