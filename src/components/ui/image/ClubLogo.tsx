
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { toast } from "sonner";

interface ClubLogoProps {
  variant?: "rect" | "square" | "circle";
  background?: "light" | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const ClubLogo: React.FC<ClubLogoProps> = ({
  variant = "rect",
  background = "dark",
  size = "md",
  className,
}) => {
  const [fallbackLoaded, setFallbackLoaded] = useState(false);

  // Map sizes to width/height values
  const sizeMap = {
    xs: "h-6",
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-16",
  };

  // Try with different path formats to ensure we find the logo
  // First attempt - direct from public folder
  let logoPath = `/assets/images/logos/banks-o-dee-logo-${background}.png`;
  
  // Log for debugging
  console.log("Attempting to load club logo from:", logoPath);

  const handleError = () => {
    if (!fallbackLoaded) {
      console.log("Trying fallback logo path");
      setFallbackLoaded(true);
      // Use a placeholder as fallback
      return "https://placehold.co/400x200/FFFFFF/00105A?text=Club+Logo";
    }
    return logoPath;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        sizeMap[size],
        className
      )}
    >
      <ResponsiveImage
        src={logoPath}
        alt="Banks o' Dee FC"
        className="h-full w-auto"
        objectFit="contain"
        onError={() => { 
          console.error("Failed to load club logo:", logoPath); 
          handleError();
        }}
      />
    </div>
  );
};

export default ClubLogo;
