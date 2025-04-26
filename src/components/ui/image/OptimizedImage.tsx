
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { getOptimizedImageUrl, handleImageError, transformImage } from "@/lib/ImageUtils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  loading?: "eager" | "lazy";
  onLoad?: () => void;
  onError?: () => void;
  transforms?: {
    blur?: number;
    grayscale?: boolean;
    brightness?: number;
    crop?: 'fill' | 'fit' | 'crop' | 'scale';
    radius?: number | 'max';
  };
}

/**
 * Optimized image component with best practices for performance
 * and advanced transformation capabilities
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  srcSet,
  sizes,
  width,
  height,
  aspectRatio,
  fill = false,
  priority = false,
  className,
  objectFit = "cover",
  loading = "lazy",
  onLoad,
  onError,
  transforms
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Apply transformations if needed
  let processedSrc = src;
  if (transforms && Object.keys(transforms).length > 0) {
    try {
      processedSrc = transformImage(src, {
        blur: transforms.blur,
        effect: transforms.grayscale ? 'grayscale' : undefined,
        additionalParams: transforms.brightness 
          ? { e_brightness: transforms.brightness.toString() } 
          : undefined,
        crop: transforms.crop,
        radius: transforms.radius
      });
    } catch (error) {
      console.warn("Failed to apply image transformations:", error);
    }
  }
  
  const optimizedSrc = getOptimizedImageUrl(processedSrc, { width, height });
  
  const handleLoadError = () => {
    setHasError(true);
    handleImageError(src, undefined, onError);
  };
  
  const handleLoadSuccess = () => {
    setHasLoaded(true);
    onLoad?.();
  };

  const imageStyle = {
    objectFit,
    aspectRatio,
  };

  return (
    <div className={cn(
      "relative",
      hasLoaded ? "" : "bg-gray-100",
      fill ? "h-full w-full" : "",
      className
    )}>
      {/* Loading indicator */}
      {!hasLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      )}
      
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : loading}
        style={aspectRatio ? imageStyle : {}}
        onLoad={handleLoadSuccess}
        onError={handleLoadError}
        className={cn(
          "max-w-full",
          fill && "absolute inset-0 h-full w-full",
          hasLoaded ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300",
          className
        )}
      />
    </div>
  );
};

export default OptimizedImage;
