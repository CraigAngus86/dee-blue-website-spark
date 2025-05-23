import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { getClubLogo } from "@/lib/imageUtils";
import { toast } from "sonner";

interface ClubLogoProps {
  variant?: "rect" | "square" | "circle";
  background?: "light" | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  className?: string;
}

const ClubLogo: React.FC<ClubLogoProps> = ({
  variant = "rect",
  background = "dark",
  size = "md",
  className,
}) => {
  const [fallbackLoaded, setFallbackLoaded] = useState(false);

  const sizeValues = {
    xs: 20,
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
  };

  const height = typeof size === "number" 
    ? size 
    : sizeValues[size];

  const logoPath = background === "light"
    ? getClubLogo("BOD_Logo_White_square.png", variant)
    : getClubLogo("BOD_Logo_Navy_square.png", variant);
  
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ 
        height: typeof height === 'number' ? `${height}px` : 'auto',
        width: "auto" 
      }}
    >
      <ResponsiveImage
        src={logoPath}
        alt="Banks o' Dee FC"
        className="h-full w-auto"
        objectFit="contain"
        height={height}
        onLoad={() => console.log("Club logo loaded successfully")}
        onError={() => {
          console.error("Failed to load club logo:", logoPath);
          if (!fallbackLoaded) {
            setFallbackLoaded(true);
            toast.error("Could not load club logo");
          }
        }}
      />
    </div>
  );
};

export default ClubLogo;
