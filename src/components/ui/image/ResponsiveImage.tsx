import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { resolveImagePath, handleImageError, createPlaceholder, transformImage } from "@/lib/utils/ImageUtils";

type AspectRatio = "1/1" | "16/9" | "4/3" | "2/1" | "3/2" | "3/4" | "1" | string;
type ObjectFit = "cover" | "contain" | "fill" | "none" | "scale-down";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: AspectRatio;
  objectFit?: ObjectFit;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  height?: number;
  width?: number;
  onLoad?: () => void;
  onError?: () => void;
  rounded?: boolean | "sm" | "md" | "lg" | "full" | string;
  shadow?: boolean | "sm" | "md" | "lg" | string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = "16/9",
  objectFit = "cover",
  className,
  priority = false,
  loading,
  height,
  width,
  onLoad,
  onError,
  rounded,
  shadow,
}) => {
  const [imageSrc, setImageSrc] = useState(() => {
    const resolvedPath = resolveImagePath(src);
    return transformImage(resolvedPath, { width, height });
  });

  const aspectRatioClasses = {
    "1/1": "aspect-square",
    "16/9": "aspect-video",
    "4/3": "aspect-4/3",
    "2/1": "aspect-[2/1]",
    "3/2": "aspect-[3/2]",
    "3/4": "aspect-[3/4]",
    "1": "aspect-square",
  };

  const objectFitClasses = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
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

  const aspectRatioClass = aspectRatioClasses[aspectRatio as keyof typeof aspectRatioClasses] || 
    (aspectRatio ? `aspect-[${aspectRatio}]` : undefined);

  const roundedClass = typeof rounded === 'string' && rounded in roundedClasses 
    ? roundedClasses[rounded as keyof typeof roundedClasses]
    : rounded === true 
      ? roundedClasses.true 
      : '';

  const shadowClass = typeof shadow === 'string' && shadow in shadowClasses 
    ? shadowClasses[shadow as keyof typeof shadowClasses]
    : shadow === true 
      ? shadowClasses.true 
      : '';

  const handleLoad = () => {
    console.info(`Successfully loaded image: ${src}`);
    onLoad?.();
  };

  const handleImageLoadError = () => {
    console.error(`Failed to load image: ${src}`);
    const fallback = createPlaceholder(width || 400, height || 300, alt);
    setImageSrc(fallback);
    onError?.();
  };

  const sizeStyle: React.CSSProperties = {};
  if (height) sizeStyle.height = `${height}px`;
  if (width) sizeStyle.width = `${width}px`;

  return (
    <div
      className={cn(
        aspectRatioClass,
        "relative overflow-hidden",
        roundedClass,
        shadowClass,
        className
      )}
      style={Object.keys(sizeStyle).length > 0 ? sizeStyle : undefined}
    >
      <img
        src={imageSrc}
        alt={alt}
        loading={loading || (priority ? "eager" : "lazy")}
        className={cn(
          "w-full h-full",
          objectFitClasses[objectFit],
          "transition-opacity duration-300"
        )}
        onLoad={handleLoad}
        onError={handleImageLoadError}
      />
    </div>
  );
};

export default ResponsiveImage;
export type { ResponsiveImageProps, AspectRatio, ObjectFit };
