
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { getNewsImage } from "@/lib/imageUtils";

interface NewsImageProps {
  filename: string;
  alt: string;
  size?: "small" | "medium" | "large" | "full";
  className?: string;
  aspectRatio?: string;
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  shadow?: boolean | "sm" | "md" | "lg";
  caption?: string;
  credit?: string;
}

const NewsImage: React.FC<NewsImageProps> = ({
  filename,
  alt,
  size = "medium",
  className,
  aspectRatio = "16/9",
  rounded = "md",
  shadow = "sm",
  caption,
  credit,
}) => {
  // Map size to actual dimensions
  const sizeMap = {
    small: "max-w-md",
    medium: "max-w-2xl",
    large: "max-w-4xl",
    full: "w-full",
  };

  // Get the image path using imageUtils
  const imagePath = getNewsImage(filename);
  console.log("News image path:", imagePath);

  return (
    <figure className={cn("my-6", sizeMap[size], className)}>
      <ResponsiveImage
        src={imagePath}
        alt={alt}
        aspectRatio={aspectRatio}
        rounded={rounded}
        shadow={shadow}
        className="w-full"
        onLoad={() => console.log(`News image loaded: ${filename}`)}
        onError={() => console.error(`Failed to load news image: ${filename}`)}
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

export default NewsImage;
