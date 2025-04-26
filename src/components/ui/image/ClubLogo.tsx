
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
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

  const height = typeof size === "number" ? size : sizeValues[size];
  const width = height; // Square aspect ratio for logos

  const logoPath = background === "light"
    ? "/assets/images/logos/BOD_Logo_White_square.png"
    : "/assets/images/logos/BOD_Logo_Navy_square.png";
  
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ 
        height: `${height}px`,
        width: `${width}px`
      }}
    >
      <Image
        src={logoPath}
        alt="Banks o' Dee FC"
        width={width}
        height={height}
        className="h-full w-auto object-contain"
        onError={() => {
          if (!fallbackLoaded) {
            setFallbackLoaded(true);
            toast.error("Could not load club logo");
          }
        }}
        priority={true}
      />
    </div>
  );
};

export default ClubLogo;
