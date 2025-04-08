
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

  // Use Lovable uploads for reliable image loading
  // For demo purposes, we'll use a placeholder as the club logo
  let logoPath = "https://placehold.co/400x200/FFFFFF/00105A?text=Club+Logo";
  
  console.log("Using club logo path:", logoPath);

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
        onLoad={() => console.log("Club logo loaded successfully")}
        onError={() => console.error("Failed to load club logo:", logoPath)}
      />
    </div>
  );
};

export default ClubLogo;
