
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
  
  // Get image path using imageUtils with corrected paths
  let imagePath = "";
  
  // For the demo, directly map player IDs to the available headshots
  const availableHeadshots = [
    "Ewen_Headshot.jpg",
    "Gilly_Headshot.jpg",
    "Hamish_Headshot.jpg",
    "Jevan_Headshot.jpg",
    "Lachie Test.jpg",
    "Laws_Headshot.jpg",
    "Luke_Headshot.jpg",
    "Mags_Headshot.jpg"
  ];
  
  // Convert playerId to number and get the corresponding headshot
  const playerIndex = parseInt(playerId) - 1;
  if (!isNaN(playerIndex) && playerIndex >= 0 && playerIndex < availableHeadshots.length) {
    imagePath = `/assets/images/players/${availableHeadshots[playerIndex]}`;
  } else {
    // Fallback to dummy headshot
    imagePath = "/assets/images/players/headshot_dummy.jpg";
  }
  
  console.log("Player image path:", imagePath, "for player:", name, "ID:", playerId);
  
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
