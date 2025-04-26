import React from 'react';
import { cn } from '@/lib/utils';
import Image from "next/image";
import { ImagePaths } from '@/lib/constants/imagePaths';
import { toast } from "sonner";

/**
 * CompetitorLogo component displays the logo of a competing club.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <CompetitorLogo name="Fraserburgh" size="md" />
 * 
 * // With link and custom size
 * <CompetitorLogo 
 *   name="Brora" 
 *   size={42} 
 *   href="https://brorarangers.football"
 *   showName={true}
 * />
 * ```
 */
interface CompetitorLogoProps {
  /** The name of the competitor team (used for alt text and to generate the image path) */
  name: string;
  /** Size of the logo - predefined sizes or custom pixel value */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Visual variant of the logo */
  variant?: 'default' | 'alternate';
  /** Additional CSS classes for the component wrapper */
  className?: string;
  /** Optional custom logo source URL */
  logoSrc?: string;
  /** Additional CSS classes for the logo container */
  containerClassName?: string;
  /** Whether to display the competitor name below the logo */
  showName?: boolean;
  /** Optional URL to link the logo to */
  href?: string;
}

/**
 * Displays a competitor's logo with consistent styling
 */
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
  // Use provided logo source or construct the path from the competitor's name
  const logoPath = logoSrc || `${ImagePaths.competitors.base}/${name}.png`;
  
  // Map size string values to pixel values for consistency
  const sizeMap = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };
  
  // Calculate actual size in pixels
  const actualSize = typeof size === 'number' ? size : sizeMap[size];
  
  // Construct the logo component with proper accessibility attributes
  const LogoComponent = (
    <>
      <div 
        className={cn(
          "relative overflow-hidden",
          containerClassName
        )}
        style={{
          width: `${actualSize}px`, 
          height: `${actualSize}px`,
        }}
      >
        <Image
          src={logoPath}
          alt={`${name} logo`}
          width={actualSize}
          height={actualSize}
          className="object-contain"
          onError={() => toast.error(`Failed to load competitor logo: ${name}`)}
          unoptimized // Add this for external images or logos that might not need optimization
        />
      </div>
      
      {showName && (
        <span className="mt-1 text-xs font-medium text-center block">
          {name}
        </span>
      )}
    </>
  );
  
  // If href is provided, wrap the logo in an anchor tag
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
  
  // Otherwise, return a simple div container
  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      {LogoComponent}
    </div>
  );
};

export default CompetitorLogo;
