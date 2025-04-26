import React from "react";
import { cn } from "@/lib/utils";
import { ImagePaths } from "@/lib/constants/imagePaths";
import { toast } from "sonner";

/**
 * Props for the TeamImage component
 */
interface TeamImageProps {
  /** Filename of the team image */
  filename: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Category of the team image */
  category?: "squad" | "training" | "celebration" | "other";
  /** Size preset for the container */
  size?: "small" | "medium" | "large" | "full";
  /** Additional CSS classes */
  className?: string;
  /** Aspect ratio of the image in the format "width/height" */
  aspectRatio?: string;
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
 * TeamImage component displays team photos with consistent styling.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <TeamImage
 *   filename="Squad1.jpg"
 *   alt="Banks o' Dee Squad 2024/25"
 * />
 * 
 * // With custom styling and caption
 * <TeamImage
 *   filename="Training1_Square.jpg"
 *   alt="Training session at Spain Park"
 *   category="training"
 *   size="large"
 *   aspectRatio="1/1"
 *   rounded="lg"
 *   shadow="md"
 *   caption="Pre-season training session"
 *   credit="Club Photographer"
 * />
 * ```
 */
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
  // Map of size presets to tailwind classes
  const sizeMap = {
    small: "max-w-md",
    medium: "max-w-2xl",
    large: "max-w-4xl",
    full: "w-full",
  };

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

  // Construct the full image path
  const imagePath = `${ImagePaths.team.base}/${filename}`;
  
  // Parse the aspect ratio values
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
        <img
          src={imagePath}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => toast.error(`Failed to load team image: ${filename}`)}
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
