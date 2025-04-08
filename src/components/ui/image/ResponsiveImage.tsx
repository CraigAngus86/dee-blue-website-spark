
import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  width?: number | string;
  height?: number | string;
  sizes?: string;
  srcSet?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  shadow?: boolean | "sm" | "md" | "lg";
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  aspectRatio,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  srcSet,
  objectFit = "cover",
  priority = false,
  placeholder = "empty",
  blurDataURL,
  rounded = false,
  shadow = false,
  loading = "lazy",
  onLoad,
  onError,
}) => {
  // Calculate classes for rounded corners
  const roundedClasses = rounded
    ? typeof rounded === "string"
      ? `rounded-${rounded}`
      : "rounded"
    : "";

  // Calculate classes for shadow
  const shadowClasses = shadow
    ? typeof shadow === "string"
      ? `shadow-${shadow}`
      : "shadow"
    : "";

  // Style object for the image
  const style: React.CSSProperties = {
    objectFit,
  };

  // Add aspect ratio if provided
  if (aspectRatio) {
    style.aspectRatio = aspectRatio;
  }

  return (
    <div
      className={cn(
        "overflow-hidden",
        roundedClasses,
        shadowClasses,
        className
      )}
      style={{
        width: width || "auto",
        height: height || "auto",
      }}
    >
      <img
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        loading={priority ? "eager" : loading}
        className="w-full h-full"
        style={style}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
};

export default ResponsiveImage;
