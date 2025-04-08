
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { Sponsor } from "@/lib/types";

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
  const [fallbackLoaded, setFallbackLoaded] = useState(false);

  // Define size classes
  const sizeClasses = {
    xs: "h-6",
    sm: "h-10",
    md: "h-16",
    lg: "h-20",
    xl: "h-24",
  };

  // Determine logo to use based on variant
  const initialLogoSrc = variant === "light" && sponsor.logoLight 
    ? sponsor.logoLight 
    : sponsor.logo;
  
  // Use placeholder as fallback if needed
  const fallbackSrc = `https://placehold.co/400x200/FFFFFF/00105A?text=${encodeURIComponent(sponsor.name)}`;
  
  // Add console logs to debug the image path
  console.log(`Rendering sponsor: ${sponsor.name}, logo path: ${initialLogoSrc}`);

  const handleError = () => {
    console.error(`Failed to load sponsor logo: ${initialLogoSrc}`);
    if (!fallbackLoaded) {
      setFallbackLoaded(true);
      return fallbackSrc;
    }
    return initialLogoSrc;
  };

  // The logo component
  const Logo = (
    <ResponsiveImage
      src={fallbackLoaded ? fallbackSrc : initialLogoSrc}
      alt={`${sponsor.name} logo`}
      className={cn(sizeClasses[size], "w-auto", className)}
      objectFit="contain"
      loading="lazy"
      onError={() => handleError()}
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
