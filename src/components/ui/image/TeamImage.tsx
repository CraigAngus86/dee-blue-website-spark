
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImagePaths } from "@/lib/constants/imagePaths";
import { toast } from "sonner";

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
  const sizeMap = {
    small: "max-w-md",
    medium: "max-w-2xl",
    large: "max-w-4xl",
    full: "w-full",
  };

  const roundedClasses = {
    true: "rounded",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const shadowClasses = {
    true: "shadow",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const imagePath = `${ImagePaths.team.base}/${filename}`;
  
  const [width, height] = aspectRatio.split('/').map(Number);
  const aspectRatioClass = `aspect-[${width}/${height}]`;

  return (
    <figure className={cn("my-4", sizeMap[size], className)}>
      <div className={cn(
        "relative overflow-hidden",
        aspectRatioClass,
        typeof rounded === 'string' ? roundedClasses[rounded as keyof typeof roundedClasses] : rounded && "rounded",
        typeof shadow === 'string' ? shadowClasses[shadow as keyof typeof shadowClasses] : shadow && "shadow"
      )}>
        <Image
          src={imagePath}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => toast.error(`Failed to load team image: ${filename}`)}
          quality={80}
        />
      </div>
      
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
