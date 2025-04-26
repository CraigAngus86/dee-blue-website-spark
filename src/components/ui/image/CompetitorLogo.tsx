import React from 'react';
import { cn } from '@/lib/utils';
import { getCompetitorLogo } from '@/lib/image/competitorLogos';
import ResponsiveImage from './ResponsiveImage';

interface CompetitorLogoProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  variant?: 'default' | 'alternate';
  className?: string;
  logoSrc?: string;
  containerClassName?: string;
  showName?: boolean;
  href?: string;
}

const CompetitorLogo: React.FC<CompetitorLogoProps> = ({
  name,
  size = 'md',
  variant = 'default',
  className,
  logoSrc,
  containerClassName,
  showName = false,
  href,
}) => {
  // Get logo path - use logoSrc if provided, otherwise get from utility
  const logoPath = logoSrc || getCompetitorLogo(name, variant);
  
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
  
  // Create the logo component
  const LogoComponent = (
    <>
      <div 
        className={cn(
          "flex items-center justify-center overflow-hidden",
          containerClassName
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
      
      {showName && (
        <span className="mt-1 text-xs font-medium text-center block">
          {name}
        </span>
      )}
    </>
  );
  
  // If href is provided, wrap in an anchor tag
  if (href) {
    return (
      <a 
        href={href} 
        className="inline-flex flex-col items-center" 
        title={name}
      >
        {LogoComponent}
      </a>
    );
  }
  
  // Otherwise, return in a div
  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      {LogoComponent}
    </div>
  );
};

export default CompetitorLogo;
