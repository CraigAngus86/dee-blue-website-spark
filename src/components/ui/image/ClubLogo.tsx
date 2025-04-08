
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";

interface ClubLogoProps {
  variant?: "rect" | "square" | "circle";
  background?: "light" | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
  onClick?: () => void;
}

const ClubLogo: React.FC<ClubLogoProps> = ({
  variant = "circle",
  background = "dark",
  size = "md",
  className,
  href,
  onClick,
}) => {
  // Define size classes
  const sizeClasses = {
    xs: "h-6",
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-16",
  };

  // Get logo path based on background (dark or light)
  const logoPath = background === "dark" 
    ? "/lovable-uploads/c1270e92-10b7-4250-b57a-915bb40a0e12.png"  // Dark logo (navy on transparent)
    : "/lovable-uploads/a5037c12-6941-420d-a1b7-a593e53a5e59.png";  // Light logo (white on transparent)
  
  // The logo component
  const Logo = (
    <ResponsiveImage
      src={logoPath}
      alt="Banks o' Dee FC"
      className={cn(
        sizeClasses[size],
        "w-auto",
        variant === "square" ? "aspect-square" : (variant === "circle" ? "aspect-square rounded-full" : "max-h-full"),
        className
      )}
      objectFit="contain"
      priority={true}
    />
  );

  // Wrap in link if href is provided
  if (href) {
    return (
      <a href={href} className="inline-flex" onClick={onClick}>
        {Logo}
      </a>
    );
  }

  // Return with click handler if provided
  if (onClick) {
    return (
      <div className="inline-flex cursor-pointer" onClick={onClick}>
        {Logo}
      </div>
    );
  }

  // Default return
  return <div className="inline-flex">{Logo}</div>;
};

export default ClubLogo;
