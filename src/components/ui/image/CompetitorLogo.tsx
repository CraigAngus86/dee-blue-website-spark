import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { getCompetitorLogo } from "@/lib/image";

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
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-24 h-24",
  };

  const isBOD = name.toLowerCase().includes("banks") || 
                name.toLowerCase().includes("bod") || 
                name.toLowerCase().includes("dee");
  
  let formattedLogoSrc = logoSrc;
  
  if (!formattedLogoSrc) {
    if (isBOD) {
      formattedLogoSrc = "/assets/images/logos/BOD_Logo_Navy_square.png";
    } else {
      const simpleName = name.replace(/\s+FC$|\s+Football\s+Club$/i, "").trim();
      formattedLogoSrc = getCompetitorLogo(simpleName);
    }
  }
  
  console.log(`Rendering competitor logo: ${name}, path: ${formattedLogoSrc}`);

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

  return (
    <div className="inline-flex flex-col items-center">
      {Logo}
    </div>
  );
};

export default CompetitorLogo;
