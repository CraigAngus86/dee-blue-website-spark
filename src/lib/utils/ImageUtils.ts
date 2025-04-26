
/**
 * Core image utilities that will later be integrated with Cloudinary
 */

import { toast } from "sonner";
import { cloudinary } from "@/lib/cloudinary";

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
export const createPlaceholder = (width = 400, height = 300, text = "Image"): string => {
  return `https://placehold.co/${width}x${height}/EEEEEE/333333?text=${encodeURIComponent(text)}`;
};

/**
 * Handle image loading errors with consistent fallback
 */
export const handleImageError = (imagePath: string, elementId?: string, fallbackUrl?: string): void => {
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
 * Transform image URL with Cloudinary parameters
 */
export const transformImage = (url: string, options: ImageTransformOptions): string => {
  try {
    // Extract the file name without extension
    const publicId = url.replace(/^.*[\\\/]/, '').split('.')[0];
    
    const cldImage = cloudinary.image(publicId)
      .setDeliveryType('upload');
    
    // Apply transformations if provided using the correct transformation API
    if (options.width) {
      cldImage.resize().width(options.width);
    }
    if (options.height) {
      cldImage.resize().height(options.height);
    }
    if (options.quality) {
      cldImage.quality(options.quality);
    }
    if (options.format) {
      cldImage.format(options.format);
    }
    
    return cldImage.toURL();
  } catch (error) {
    console.warn('Cloudinary transform failed, using original URL:', error);
    return url;
  }
};

// Category-specific image resolvers
export const getClubLogo = (variant: ImageVariant, background: ImageBackground): string => {
  const logoName = background === "light" ? "BOD_Logo_White_square.png" : "BOD_Logo_Navy_square.png";
  return resolveImagePath(logoName, "logos");
};

export const getCompetitorLogo = (teamName: string): string => {
  const normalizedName = teamName.replace(" FC", "").split(" ")[0].toLowerCase();
  return resolveImagePath(`${normalizedName}.png`, "competitors");
};

export const getPlayerImage = (playerId: string | number, type: string = "headshot"): string => {
  return resolveImagePath(`${playerId}_${type}.jpg`, "players");
};

export const getNewsImage = (index: number | string): string => {
  const imageIndex = typeof index === "string" ? parseInt(index, 10) : index;
  return resolveImagePath(`News${imageIndex + 1}.jpg`, "news");
};

export const getStadiumImage = (
  filename: string = "Spain Park.jpg",
  view: 'aerial' | 'main' | 'pitch' | 'facilities' | 'other' = 'main'
): string => {
  return resolveImagePath(filename, "stadium");
};

// Export types for strict type checking
export type { ImageTransformOptions };
