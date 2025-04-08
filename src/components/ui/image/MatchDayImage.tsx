
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { MatchPhoto } from "@/lib/types";

interface MatchDayImageProps {
  photo: MatchPhoto;
  onClick?: () => void;
  size?: "thumbnail" | "full";
  className?: string;
}

const MatchDayImage: React.FC<MatchDayImageProps> = ({
  photo,
  onClick,
  size = "full",
  className,
}) => {
  const imageSrc = size === "thumbnail" ? photo.thumbnail : photo.src;
  
  // Use the src directly since it should now already have the correct path
  // from the matchPhotos util function
  console.log(`Rendering matchday image: ${imageSrc}`);
  
  return (
    <div 
      className={cn(
        "overflow-hidden",
        size === "thumbnail" ? "cursor-pointer hover:scale-105 transition-transform" : "",
        className
      )}
      onClick={onClick}
    >
      <ResponsiveImage
        src={imageSrc}
        alt={photo.alt || "Match day photo"}
        rounded="md"
        shadow="sm"
        className="w-full h-full object-cover"
        aspectRatio={size === "thumbnail" ? "1" : undefined}
        onLoad={() => console.log(`Matchday image loaded: ${size}`)}
        onError={() => console.error(`Failed to load matchday image: ${imageSrc}`)}
      />
      {size === "full" && photo.caption && (
        <div className="mt-2 text-sm text-gray">
          <p>{photo.caption}</p>
          {photo.credit && <p className="italic text-xs mt-1">Photo: {photo.credit}</p>}
        </div>
      )}
    </div>
  );
};

export default MatchDayImage;
