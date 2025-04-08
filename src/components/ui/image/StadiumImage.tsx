
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";

interface StadiumImageProps {
  filename: string;
  alt: string;
  view?: "aerial" | "main" | "pitch" | "facilities" | "other";
  aspectRatio?: string; 
  className?: string;
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  shadow?: boolean | "sm" | "md" | "lg";
  caption?: string;
  credit?: string;
}

const StadiumImage: React.FC<StadiumImageProps> = ({
  filename,
  alt,
  view = "main",
  aspectRatio = "16/9",
  className,
  rounded = "md",
  shadow = "md",
  caption,
  credit,
}) => {
  // Construct the image path using lovable-uploads
  const imagePath = `/lovable-uploads/stadium/${filename}`;
  console.log("Stadium image path:", imagePath);
  
  // Fallback to a placeholder if the image fails to load
  const fallbackImage = "https://placehold.co/1200x800/CCCCCC/333333?text=Stadium+Image";
  const [imageSrc, setImageSrc] = useState(imagePath);

  const handleError = () => {
    console.error(`Failed to load stadium image: ${imagePath}`);
    setImageSrc(fallbackImage);
  };

  return (
    <figure className={cn("my-4", className)}>
      <ResponsiveImage
        src={imageSrc}
        alt={alt}
        aspectRatio={aspectRatio}
        rounded={rounded}
        shadow={shadow}
        className="w-full"
        onError={handleError}
      />
      {(caption || credit) && (
        <figcaption className="mt-2 text-sm text-gray">
          {caption && <span>{caption}</span>}
          {caption && credit && <span> - </span>}
          {credit && <span className="italic">Photo: {credit}</span>}
        </figcaption>
      )}
    </figure>
  );
};

export default StadiumImage;
