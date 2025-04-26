
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImagePaths } from "@/lib/constants/imagePaths";
import { toast } from "sonner";

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
  const imagePath = `${ImagePaths.stadium.base}/${filename}`;
  const [width, height] = aspectRatio.split('/').map(Number);
  const aspectRatioClass = `aspect-[${width}/${height}]`;

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

  return (
    <figure className={cn("my-4", className)}>
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
          onError={() => toast.error(`Failed to load stadium image: ${filename}`)}
          priority={view === "main"}
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

export default StadiumImage;
