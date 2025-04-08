
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { getPlayerImage } from "@/lib/imageUtils";

interface PlayerImageProps {
  playerId: string;
  name: string;
  type?: "headshot" | "action" | "profile";
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
  size = "md",
  aspectRatio = "3/4",
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
  
  // Get image path using imageUtils
  const imagePath = getPlayerImage(playerId, type);
  console.log("Player image path:", imagePath);
  
  // Handle click if provided
  const handleClick = onClick ? { onClick } : {};
  
  return (
    <div 
      className={cn("relative", onClick && "cursor-pointer")}
      {...handleClick}
    >
      <ResponsiveImage
        src={imagePath}
        alt={`${name} - Banks o' Dee FC Player`}
        className={cn(sizeClasses[size], className)}
        aspectRatio={aspectRatio}
        rounded={rounded}
        objectFit="cover"
        onLoad={() => console.log(`Player image loaded: ${name}`)}
        onError={() => console.error(`Failed to load player image: ${name}`)}
      />
    </div>
  );
};

export default PlayerImage;
