
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";

interface TeamImageProps {
  filename: string;
  alt: string;
  category?: "squad" | "training" | "celebration" | "other";
  size?: "small" | "medium" | "large" | "full";
  className?: string;
  aspectRatio?: string;
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  shadow?: boolean | "sm" | "md" | "lg";
  caption?: string;
  credit?: string;
}

const TeamImage: React.FC<TeamImageProps> = ({
  filename,
  alt,
  category = "squad",
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

  // Construct the image path
  const imagePath = `/src/assets/images/team/${filename}`;

  return (
    <figure className={cn("my-4", sizeMap[size], className)}>
      <ResponsiveImage
        src={imagePath}
        alt={alt}
        aspectRatio={aspectRatio}
        rounded={rounded}
        shadow={shadow}
        className="w-full"
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

export default TeamImage;
