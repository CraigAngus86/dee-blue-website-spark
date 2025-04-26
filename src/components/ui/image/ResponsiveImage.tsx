
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  getOptimizedImageUrl, 
  generateResponsiveSrcSet, 
  handleImageError, 
  getBlurredThumbnailUrl,
  transformImage
} from "@/lib/ImageUtils";
import { imageConfig } from "@/lib/config/imageConfig";

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

/**
 * ResponsiveImage component with enhanced features:
 * - Responsive srcSet generation
 * - Lazy loading with blur-up technique
 * - Image transformation support
 * - Error handling with fallbacks
 */
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
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [blurSrc, setBlurSrc] = useState<string | undefined>(undefined);

  // Generate blur placeholder if needed
  useEffect(() => {
    if (blurhash && !priority && src) {
      try {
        const thumbnailSrc = getBlurredThumbnailUrl(src);
        setBlurSrc(thumbnailSrc);
      } catch (error) {
        console.warn("Failed to generate blur thumbnail:", error);
      }
    }
  }, [src, blurhash, priority]);

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

  // Apply transformations if specified
  let processedSrc = src;
  if (transforms && Object.keys(transforms).length > 0) {
    try {
      processedSrc = transformImage(src, {
        blur: transforms.blur,
        effect: [
          transforms.grayscale && 'grayscale',
          transforms.sepia && 'sepia',
          transforms.brightness && `brightness:${transforms.brightness}`
        ].filter(Boolean).join(':'),
        crop: transforms.crop,
        gravity: transforms.gravity
      });
    } catch (error) {
      console.warn("Failed to apply image transformations:", error);
    }
  }

  // Get optimized image URL
  const optimizedSrc = getOptimizedImageUrl(processedSrc, { 
    width, 
    height, 
    quality: quality || imageConfig.defaultQuality 
  });
  
  // Generate responsive srcSet
  const srcSet = generateResponsiveSrcSet(processedSrc);

  // Handle image load errors
  const handleLoadError = () => {
    setHasError(true);
    setImgSrc(handleImageError(src, undefined, onError));
  };

  // Handle image load success
  const handleLoad = () => {
    setIsLoading(false);
    console.info(`Successfully loaded image: ${src}`);
    onLoad?.();
  };

  // Set dimension styles
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
      {/* Blur placeholder while loading */}
      {isLoading && !hasError && blurSrc && (
        <img
          src={blurSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
        />
      )}
      
      {/* Loading skeleton */}
      {isLoading && !hasError && !blurSrc && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      )}

      {/* Main image */}
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        loading={loading || (priority ? "eager" : "lazy")}
        className={cn(
          "w-full h-full",
          objectFitClasses[objectFit],
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={handleLoad}
        onError={handleLoadError}
      />
    </div>
  );
};

export default ResponsiveImage;
export type { ResponsiveImageProps, AspectRatio, ObjectFit };
