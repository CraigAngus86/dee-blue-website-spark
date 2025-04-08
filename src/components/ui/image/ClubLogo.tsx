
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";

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
  // Map sizes to width/height values
  const sizeMap = {
    xs: "h-6",
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-16",
  };

  // Get the correct logo path
  const logoPath = `/assets/images/logos/banks-o-dee-logo-${background}.png`;
  
  console.log("Club logo path:", logoPath);

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
      />
    </div>
  );
};

export default ClubLogo;
