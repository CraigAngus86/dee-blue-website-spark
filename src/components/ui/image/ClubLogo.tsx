
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

  // Map sizes to width/height values - adjusted for better proportions
  const sizeClasses = {
    xs: "h-5",
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
    xl: "h-12",
  };

  // Use the correct logo file paths directly
  const logoPath = background === "light"
    ? "/assets/images/logos/BOD_Logo_White_square.png"
    : "/assets/images/logos/BOD_Logo_Navy_square.png";
  
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <ResponsiveImage
        src={logoPath}
        alt="Banks o' Dee FC"
        className="h-full w-auto"
        objectFit="contain"
        onLoad={() => console.log("Club logo loaded successfully")}
        onError={() => {
          console.error("Failed to load club logo:", logoPath);
          // Fall back to placeholder if the logo fails to load
          if (!fallbackLoaded) {
            setFallbackLoaded(true);
            
            // Use a text-based fallback instead
            toast.error("Could not load club logo");
          }
        }}
      />
    </div>
  );
};

export default ClubLogo;
