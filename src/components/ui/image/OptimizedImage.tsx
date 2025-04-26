
'use client';

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
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
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 1200,
  height,
  aspectRatio,
  fill = false,
  priority = false,
  className,
  objectFit = "cover",
  loading = "lazy",
  onLoad,
  onError,
  quality = 75,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Calculate height if not provided using aspect ratio
  const calculateDimensions = () => {
    if (height) return { width, height };
    if (!aspectRatio) return { width, height: width };
    
    const [w, h] = aspectRatio.split('/').map(Number);
    return { width, height: width * (h / w) };
  };

  const dimensions = calculateDimensions();
  
  const handleLoadError = () => {
    setHasError(true);
    onError?.();
  };
  
  const handleLoadSuccess = () => {
    setHasLoaded(true);
    onLoad?.();
  };

  return (
    <div className={cn(
      "relative",
      hasLoaded ? "" : "bg-gray-100",
      fill ? "h-full w-full" : "",
      className
    )}>
      {!hasLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : dimensions.width}
        height={fill ? undefined : dimensions.height}
        quality={quality}
        priority={priority}
        fill={fill}
        loading={priority ? "eager" : loading}
        className={cn(
          "max-w-full",
          fill && "absolute inset-0 h-full w-full",
          hasLoaded ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300",
          objectFit === "contain" && "object-contain",
          objectFit === "cover" && "object-cover",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down"
        )}
        sizes={fill 
          ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          : undefined
        }
        onLoad={handleLoadSuccess}
        onError={handleLoadError}
      />
    </div>
  );
};

export default OptimizedImage;
