
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { Sponsor } from "@/lib/types";
import { getSponsorLogo } from "@/lib/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SponsorLogoProps {
  sponsor: Sponsor;
  variant?: "dark" | "light";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  useContainer?: boolean;
  containerClassName?: string;
  showTooltip?: boolean;
}

const SponsorLogo: React.FC<SponsorLogoProps> = ({
  sponsor,
  variant = "dark",
  size = "md",
  className,
  useContainer = false,
  containerClassName,
  showTooltip = false,
}) => {
  // Define size classes
  const sizeClasses = {
    xs: "h-6",
    sm: "h-10",
    md: "h-16",
    lg: "h-20",
    xl: "h-24",
  };

  // Determine logo to use based on variant
  let logoSrc = variant === "light" && sponsor.logoLight 
    ? sponsor.logoLight 
    : sponsor.logo;
  
  // If no logo is provided, use the imageUtils function to get a logo by name
  if (!logoSrc) {
    logoSrc = getSponsorLogo(sponsor.name);
  }
  
  // Create fallback URL for placeholder in case the image fails to load
  const [useFallback, setUseFallback] = useState(false);
  const fallbackSrc = `https://placehold.co/400x200/${variant === 'light' ? 'FFFFFF' : '00105A'}/FFFFFF?text=${encodeURIComponent(sponsor.name)}`;
  
  // The logo component
  const Logo = (
    <ResponsiveImage
      src={useFallback ? fallbackSrc : logoSrc}
      alt={`${sponsor.name} logo`}
      className={cn(sizeClasses[size], "w-auto object-contain", className)}
      objectFit="contain"
      loading="lazy"
      onError={() => {
        console.error(`Failed to load sponsor logo: ${sponsor.name} from ${logoSrc}`);
        setUseFallback(true);
      }}
    />
  );

  // Wrap in Tooltip if requested
  const LogoWithMaybeTooltip = showTooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {Logo}
        </TooltipTrigger>
        <TooltipContent>
          <p>{sponsor.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : Logo;

  // Wrap logo in a container if requested
  if (useContainer) {
    return (
      <div className={cn(
        "flex items-center justify-center p-4 bg-white rounded-md",
        containerClassName
      )}>
        {LogoWithMaybeTooltip}
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
        title={sponsor.name}
      >
        {LogoWithMaybeTooltip}
      </a>
    );
  }

  // Default return
  return <div className="inline-block">{LogoWithMaybeTooltip}</div>;
};

export default SponsorLogo;
