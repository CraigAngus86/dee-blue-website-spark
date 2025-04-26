/**
 * Core image utilities that will later be integrated with Cloudinary
 */

import { toast } from "sonner";

export type ImageSize = "xs" | "sm" | "md" | "lg" | "xl" | number;
export type ImageVariant = "rect" | "square" | "circle";
export type ImageBackground = "light" | "dark";
export type CompetitionImageType = "trophy" | "logo" | "winners" | "other";
export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";

interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "jpg" | "png";
}

/**
 * Core function to resolve image paths - will be replaced by Cloudinary URL builder
 */
export const resolveImagePath = (path: string, category?: string): string => {
  // If path is already a full URL, return it
  if (path.startsWith("http")) return path;
  
  // If path starts with /, assume it's from the public directory
  if (path.startsWith("/")) return path;
  
  // Otherwise, construct path with category
  return category ? `/assets/images/${category}/${path}` : `/assets/images/${path}`;
};

/**
 * Generate placeholder for failed images or loading states
 */
export const createPlaceholder = (
  width = 400,
  height = 300,
  text = "Image"
): string => {
  return `https://placehold.co/${width}x${height}/EEEEEE/333333?text=${encodeURIComponent(text)}`;
};

/**
 * Handle image loading errors with consistent fallback
 */
export const handleImageError = (
  imagePath: string,
  elementId?: string,
  fallbackUrl?: string
): void => {
  console.error(`Failed to load image: ${imagePath}`);
  if (elementId) {
    const imgElement = document.getElementById(elementId) as HTMLImageElement;
    if (imgElement) {
      imgElement.src = fallbackUrl || createPlaceholder();
    }
  }
  toast.error("Failed to load image");
};

/**
 * Generate srcSet for responsive images - will be enhanced with Cloudinary
 */
export const generateSrcSet = (
  basePath: string,
  sizes: { [key: string]: string }
): string => {
  return Object.entries(sizes)
    .map(([size, dimensions]) => `${basePath}/${dimensions} ${size}w`)
    .join(", ");
};

/**
 * Map size string to pixel values - used across components
 */
export const mapSizeToPixels = (size: ImageSize): number => {
  const sizeMap: Record<string, number> = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64
  };
  
  return typeof size === "number" ? size : sizeMap[size] || 32;
};

/**
 * Prepare for Cloudinary transformation parameters
 */
export const transformImage = (url: string, options: ImageTransformOptions): string => {
  // Currently returns original URL - will be replaced with Cloudinary transform
  console.log("Image transform options logged for future Cloudinary integration:", options);
  return url;
};

// Category-specific image resolvers that will be enhanced with Cloudinary
export const resolveClubLogo = (variant: ImageVariant, background: ImageBackground): string => {
  const logoName = background === "light" ? "BOD_Logo_White_square.png" : "BOD_Logo_Navy_square.png";
  return resolveImagePath(logoName, "logos");
};

export const resolveCompetitorLogo = (teamName: string): string => {
  // Normalize team name
  const normalizedName = teamName.replace(" FC", "").split(" ")[0].toLowerCase();
  const path = `${normalizedName}.png`;
  return resolveImagePath(path, "competitors");
};

export const resolvePlayerImage = (playerId: string | number, type: string = "headshot"): string => {
  return resolveImagePath(`${playerId}_${type}.jpg`, "players");
};

export const resolveNewsImage = (index: number | string): string => {
  const imageIndex = typeof index === "string" ? parseInt(index, 10) : index;
  return resolveImagePath(`News${imageIndex + 1}.jpg`, "news");
};

// Export types for strict type checking
export type { ImageTransformOptions };
