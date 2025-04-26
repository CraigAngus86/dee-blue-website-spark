
import React from "react";
import { cn } from "@/lib/utils";
import { useImageLazyLoad } from "@/hooks/useImageLazyLoad";

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
  quality?: number;
  blurhash?: boolean;
  transforms?: {
    blur?: number;
    grayscale?: boolean;
    sepia?: boolean;
    brightness?: number;
    crop?: 'fill' | 'fit' | 'crop';
    gravity?: 'center' | 'north' | 'south' | 'east' | 'west' | 'auto';
  };
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
  quality,
  blurhash = false,
  transforms,
}) => {
  const {
    imageRef,
    isInView,
    isLoaded,
    handleLoad
  } = useImageLazyLoad({
    threshold: 0.1,
    rootMargin: '50px'
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

  const handleImageLoad = () => {
    handleLoad();
    onLoad?.();
  };

  // Determine if we should start loading the image
  const shouldLoad = priority || isInView;

  return (
    <div
      className={cn(
        aspectRatioClass,
        "relative overflow-hidden",
        roundedClass,
        shadowClass,
        className
      )}
      style={{ 
        height: typeof height === 'number' ? `${height}px` : 'auto',
        width: typeof width === 'number' ? `${width}px` : 'auto'
      }}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}

      <img
        ref={imageRef}
        src={shouldLoad ? src : ''}
        alt={alt}
        className={cn(
          "w-full h-full",
          objectFitClasses[objectFit],
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        loading={loading || (priority ? "eager" : "lazy")}
        onLoad={handleImageLoad}
        onError={onError}
      />
    </div>
  );
};

export default ResponsiveImage;
export type { ResponsiveImageProps, AspectRatio, ObjectFit };
