
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
  const imageSrc = size === "thumbnail" ? (photo.thumbnail || photo.src) : photo.src;
  
  const formattedSrc = imageSrc.startsWith('http') || imageSrc.startsWith('/') 
    ? imageSrc 
    : `/assets/images/matchday/${imageSrc}`;
  
  console.log(`Rendering matchday image: ${formattedSrc}`);
  
  const dimensions = size === "thumbnail" 
    ? { width: 300, height: 300 }
    : { width: 1200, height: 800 };
  
  return (
    <div 
      className={cn(
        "overflow-hidden",
        size === "thumbnail" ? "cursor-pointer hover:scale-105 transition-transform" : "",
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        "relative",
        size === "thumbnail" ? "aspect-square" : "aspect-[3/2]"
      )}>
        <Image
          src={formattedSrc}
          alt={photo.alt || "Match day photo"}
          className="object-cover rounded-md"
          fill
          sizes={size === "thumbnail" 
            ? "300px"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          }
          quality={80}
          onLoad={() => console.log(`Matchday image loaded: ${formattedSrc}`)}
          onError={() => console.error(`Failed to load matchday image: ${formattedSrc}`)}
        />
      </div>
      
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
