
import React from "react";
import { cn } from "@/lib/utils";
import { usePlayerProfileImage } from "@/hooks/useCloudinaryImage";

interface PlayerImageProps {
  playerId: string;
  name: string;
  type?: "headshot" | "action" | "profile";
  variant?: "square" | "featured";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  aspectRatio?: string;
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  className?: string;
  onClick?: () => void;
}

const PlayerImage: React.FC<PlayerImageProps> = ({
  playerId,
  name,
  type = "headshot",
  variant = "square",
  size = "md",
  aspectRatio,
  rounded = "md",
  className,
  onClick,
}) => {
  // Define size classes
  const sizeClasses = {
    xs: "w-16",
    sm: "w-24",
    md: "w-32",
    lg: "w-48",
    xl: "w-64",
  };
  
  // Map component size to pixel dimensions for Cloudinary
  const sizesInPixels = {
    xs: 64,
    sm: 96,
    md: 128,
    lg: 192,
    xl: 256,
  };
  
  // Determine device size based on component size for responsive images
  const deviceSizes = {
    xs: "sm", // Mobile
    sm: "sm", // Mobile
    md: "md", // Tablet
    lg: "lg", // Desktop
    xl: "xl"  // Large desktop
  };
  
  // Construct the Cloudinary public ID
  const publicId = type === "action" 
    ? `banksofdeefc/people/person-${playerId}/action-1` 
    : `banksofdeefc/people/person-${playerId}/profile`;
  
  // Use our custom hook for player images with fallbacks
  const { 
    imageUrl, 
    isLoaded, 
    hasError, 
    handleLoad, 
    handleError 
  } = usePlayerProfileImage(
    publicId,
    {
      variant: variant as "square" | "featured",
      size: sizesInPixels[size],
      name: name,
      deviceSize: deviceSizes[size] as "sm" | "md" | "lg" | "xl"
    }
  );
  
  // Determine aspect ratio class based on variant
  const aspectRatioClass = aspectRatio ? `aspect-[${aspectRatio}]` : 
    variant === "featured" ? "aspect-[3/4]" : "aspect-square";
  
  // Define rounded classes
  const roundedClasses = {
    true: "rounded",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  
  const roundedClass = typeof rounded === 'string' && rounded in roundedClasses 
    ? roundedClasses[rounded as keyof typeof roundedClasses]
    : rounded === true 
      ? roundedClasses.true 
      : '';
  
  // Handle click if provided
  const handleClick = onClick ? { onClick } : {};
  
  // Debug logging
  console.log("Player image path:", imageUrl, "for player:", name, "ID:", playerId);
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden", 
        sizeClasses[size],
        aspectRatioClass,
        roundedClass,
        hasError ? "bg-gray-200" : "",
        onClick && "cursor-pointer",
        className
      )}
      {...handleClick}
    >
      {/* Image with fade-in effect */}
      <img
        src={imageUrl}
        alt={`${name} - Banks o' Dee FC Player`}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default PlayerImage;
