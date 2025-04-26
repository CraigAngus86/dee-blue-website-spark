
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImagePaths } from "@/lib/constants/imagePaths";
import { toast } from "sonner";

/**
 * Props for the StadiumImage component
 */
interface StadiumImageProps {
  /** Filename of the stadium image */
  filename: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Type of stadium view being shown */
  view?: "aerial" | "main" | "pitch" | "facilities" | "other";
  /** Aspect ratio of the image in the format "width/height" */
  aspectRatio?: string;
  /** Additional CSS classes */
  className?: string;
  /** Border radius styling */
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  /** Shadow styling */
  shadow?: boolean | "sm" | "md" | "lg";
  /** Optional caption for the image */
  caption?: string;
  /** Optional photo credit information */
  credit?: string;
}

/**
 * StadiumImage component displays images of Spain Park stadium with consistent styling.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <StadiumImage
 *   filename="Spain Park.jpg"
 *   alt="Spain Park Stadium"
 * />
 * 
 * // With custom styling and caption
 * <StadiumImage
 *   filename="Spain Park.jpg"
 *   alt="Aerial view of Spain Park"
 *   view="aerial"
 *   aspectRatio="21/9"
 *   rounded="lg"
 *   shadow="lg"
 *   caption="Spain Park Stadium - Home of Banks o' Dee FC"
 *   credit="John Smith Photography"
 * />
 * ```
 */
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
  // Construct the full image path
  const imagePath = `${ImagePaths.stadium.base}/${filename}`;
  
  // Parse the aspect ratio values
  const [width, height] = aspectRatio.split('/').map(Number);
  const aspectRatioClass = `aspect-[${width}/${height}]`;

  // Map of rounded corner variants to their corresponding classes
  const roundedClasses = {
    true: "rounded",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  // Map of shadow variants to their corresponding classes
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
          quality={80} // Add quality parameter for better image optimization
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
