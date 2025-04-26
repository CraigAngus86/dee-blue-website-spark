
import React from "react";
import { cn } from "@/lib/utils";

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
}

/**
 * Optimized image component with best practices for performance
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
}) => {
  const imageStyle = {
    objectFit,
    aspectRatio,
  };

  const imageProps = {
    src,
    alt,
    srcSet,
    sizes,
    width,
    height,
    loading: priority ? "eager" : loading,
    style: aspectRatio ? imageStyle : {},
    onLoad,
    onError,
    className: cn(
      "max-w-full",
      fill && "absolute inset-0 h-full w-full",
      className
    ),
  };

  return <img {...imageProps} />;
};

export default OptimizedImage;
