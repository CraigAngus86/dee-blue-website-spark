
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";

interface CompetitorLogoProps {
  name: string;
  logoSrc: string;
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
          src={logoSrc}
          alt={`${name} logo`}
          className={cn("max-w-full max-h-full", className)}
          objectFit="contain"
          loading="lazy"
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
