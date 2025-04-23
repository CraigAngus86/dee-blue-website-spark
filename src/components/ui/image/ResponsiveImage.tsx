
import React from "react";
import { cn } from "@/lib/utils";

type AspectRatio = "1/1" | "16/9" | "4/3" | "2/1" | "3/2";
type ObjectFit = "cover" | "contain" | "fill" | "none" | "scale-down";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: AspectRatio;
  objectFit?: ObjectFit;
  className?: string;
  priority?: boolean;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = "16/9",
  objectFit = "cover",
  className,
  priority = false,
}) => {
  const aspectRatioClasses = {
    "1/1": "aspect-square",
    "16/9": "aspect-video",
    "4/3": "aspect-4/3",
    "2/1": "aspect-[2/1]",
    "3/2": "aspect-[3/2]",
  };

  const objectFitClasses = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  };

  const onLoad = () => {
    console.info(`Successfully loaded image: ${src}`);
  };

  const onError = () => {
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <div
      className={cn(
        aspectRatioClasses[aspectRatio],
        "relative overflow-hidden",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "w-full h-full",
          objectFitClasses[objectFit],
          "transition-opacity duration-300"
        )}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
};

export default ResponsiveImage;
