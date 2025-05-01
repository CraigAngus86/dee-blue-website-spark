import React from "react";
import { cn } from "@/lib/utils";
import { MatchPhoto } from "@/lib/types";
import ResponsiveImage from "./ResponsiveImage";

/**
 * MatchDayImage component displays match day photos with optional modal view
 * @component
 * 
 * @param {Object} props - Component props
 * @param {MatchPhoto} props.photo - Match photo object containing src and metadata
 * @param {() => void} [props.onClick] - Optional click handler for modal view
 * @param {'thumbnail' | 'full'} [props.size='full'] - Size variant of the image
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @requires ResponsiveImage component
 * @requires MatchPhoto type definition
 * 
 * @example
 * ```tsx
 * <MatchDayImage
 *   photo={matchPhoto}
 *   size="thumbnail"
 *   onClick={() => setModalOpen(true)}
 * />
 * ```
 * 
 * @limitation
 * Thumbnail generation is done client-side and may impact performance with many images
 */
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
  // Use the src directly from the photo object
  const imageSrc = size === "thumbnail" ? (photo.thumbnail || photo.src) : photo.src;
  
  // For URLs that don't start with http or /, make sure to add the correct path prefix
  const formattedSrc = imageSrc.startsWith('http') || imageSrc.startsWith('/') 
    ? imageSrc 
    : `/assets/images/matchday/${imageSrc}`;
  
  console.log(`Rendering matchday image: ${formattedSrc}`);
  
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
        src={formattedSrc}
        alt={photo.alt || "Match day photo"}
        rounded="md"
        shadow="sm"
        className="w-full h-full object-cover"
        aspectRatio={size === "thumbnail" ? "1" : undefined}
        onLoad={() => console.log(`Matchday image loaded: ${formattedSrc}`)}
        onError={() => console.error(`Failed to load matchday image: ${formattedSrc}`)}
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
