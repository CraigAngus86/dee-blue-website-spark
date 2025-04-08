
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";

interface CompetitionImageProps {
  filename: string;
  alt: string;
  type?: "trophy" | "logo" | "winners" | "other";
  size?: "small" | "medium" | "large" | "full";
  className?: string;
  aspectRatio?: string;
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  shadow?: boolean | "sm" | "md" | "lg";
  caption?: string;
  credit?: string;
}

const CompetitionImage: React.FC<CompetitionImageProps> = ({
  filename,
  alt,
  type = "logo",
  size = "medium",
  className,
  aspectRatio,
  rounded = "md",
  shadow = type === "logo" ? false : "sm",
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

  // Construct the image path using lovable-uploads
  const imagePath = `/lovable-uploads/competitions/${filename}`;
  console.log("Competition image path:", imagePath);

  // For logos, we want to use contain to preserve proper proportions
  const objectFit = type === "logo" ? "contain" : "cover";

  return (
    <figure className={cn("my-4", sizeMap[size], className)}>
      <ResponsiveImage
        src={imagePath}
        alt={alt}
        aspectRatio={aspectRatio}
        rounded={rounded}
        shadow={shadow}
        objectFit={objectFit}
        className="w-full"
        onLoad={() => console.log(`Competition image loaded: ${filename}`)}
        onError={() => console.error(`Failed to load competition image: ${filename}`)}
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

export default CompetitionImage;
