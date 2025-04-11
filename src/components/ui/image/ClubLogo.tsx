
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

  // Map sizes to fixed height values
  const sizeValues = {
    xs: 20,
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
  };

  // Use the correct logo file paths directly
  const logoPath = background === "light"
    ? "/assets/images/logos/BOD_Logo_White_square.png"
    : "/assets/images/logos/BOD_Logo_Navy_square.png";
  
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center p-0 m-0",
        className
      )}
      style={{ height: "100%", width: "auto", padding: 0, margin: 0 }}
    >
      <ResponsiveImage
        src={logoPath}
        alt="Banks o' Dee FC"
        className="h-full w-auto m-0 p-0"
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
