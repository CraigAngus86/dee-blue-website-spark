import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { Sponsor } from "@/lib/types";
import { getSponsorLogo } from "@/lib/image";

interface SponsorLogoProps {
  sponsor: Sponsor;
  variant?: "dark" | "light";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  useContainer?: boolean;
  containerClassName?: string;
}

const SponsorLogo: React.FC<SponsorLogoProps> = ({
  sponsor,
  variant = "dark",
  size = "md",
  className,
  useContainer = false,
  containerClassName,
}) => {
  // Define size classes with larger dimensions
  const sizeClasses = {
    xs: "h-8",
    sm: "h-12",
    md: "h-20",
    lg: "h-24",
    xl: "h-32 md:h-40", // Increased size for main sponsor
  };

  // Determine logo to use based on variant
  let logoSrc = variant === "light" && sponsor.logoLight 
    ? sponsor.logoLight 
    : sponsor.logo;
  
  // If no logo is provided, use the imageUtils function to get a logo by name
  if (!logoSrc) {
    logoSrc = getSponsorLogo(sponsor.name);
  }
  
  // Log the original logo source for debugging
  console.log(`Original sponsor logo path for ${sponsor.name}:`, logoSrc);
  
  // Create fallback URL for placeholder in case the image fails to load
  const [useFallback, setUseFallback] = useState(false);
  const fallbackSrc = `https://placehold.co/400x200/FFFFFF/00105A?text=${encodeURIComponent(sponsor.name)}`;
  
  // The logo component
  const Logo = (
    <ResponsiveImage
      src={useFallback ? fallbackSrc : logoSrc}
      alt={`${sponsor.name} logo`}
      className={cn(
        sizeClasses[size], 
        "w-auto filter brightness-0 invert", // Makes logos white
        className
      )}
      objectFit="contain"
      loading="lazy"
      onLoad={() => console.log(`Sponsor logo loaded: ${sponsor.name}`)}
      onError={() => {
        console.error(`Failed to load sponsor logo: ${sponsor.name} from ${logoSrc}`);
        setUseFallback(true);
      }}
    />
  );

  // Wrap logo in a container if requested
  if (useContainer) {
    return (
      <div className={cn(
        "flex items-center justify-center p-4 bg-white rounded-md",
        containerClassName
      )}>
        {Logo}
      </div>
    );
  }

  // Wrap in link if website is provided
  if (sponsor.website) {
    return (
      <a 
        href={sponsor.website} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block"
      >
        {Logo}
      </a>
    );
  }

  // Default return
  return <div className="inline-block">{Logo}</div>;
};

export default SponsorLogo;
