
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { getCompetitorLogo } from "@/lib/imageUtils";

interface CompetitorLogoProps {
  name: string;
  logoSrc?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  containerClassName?: string;
  showName?: boolean;
  href?: string;
}

const CompetitorLogo: React.FC<CompetitorLogoProps> = ({
  name,
  logoSrc,
  size = "md",
  className,
  containerClassName,
  showName = false,
  href,
}) => {
  // Define size classes for the logo
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-24 h-24",
  };

  // Check if this is Banks o' Dee
  const isBOD = name.toLowerCase().includes("banks") || 
                name.toLowerCase().includes("bod") || 
                name.toLowerCase().includes("dee");
  
  // Use the provided logoSrc or get it from the utility function
  // For Banks o' Dee, use the club logo directly
  let formattedLogoSrc = logoSrc;
  
  if (!formattedLogoSrc) {
    if (isBOD) {
      // Use the club logo for Banks o' Dee
      formattedLogoSrc = "/assets/images/logos/BOD_Logo_Navy_square.png";
    } else {
      // Extract just the team name without the "FC" suffix for better matching
      const simpleName = name.replace(/\s+FC$|\s+Football\s+Club$/i, "").trim();
      formattedLogoSrc = getCompetitorLogo(simpleName);
    }
  }
  
  console.log(`Rendering competitor logo: ${name}, path: ${formattedLogoSrc}`);

  // Logo component with consistent styling
  const Logo = (
    <>
      <div 
        className={cn(
          "inline-flex items-center justify-center bg-white p-2 rounded-full shadow-sm",
          sizeClasses[size],
          containerClassName
        )}
      >
        <ResponsiveImage
          src={formattedLogoSrc}
          alt={`${name} logo`}
          className={cn("max-w-full max-h-full", className)}
          objectFit="contain"
          loading="lazy"
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

  // Wrap in link if href is provided
  if (href) {
    return (
      <a 
        href={href} 
        className="inline-flex flex-col items-center" 
        title={name}
      >
        {Logo}
      </a>
    );
  }

  // Default return
  return (
    <div className="inline-flex flex-col items-center">
      {Logo}
    </div>
  );
};

export default CompetitorLogo;
