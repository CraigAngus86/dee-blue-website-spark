/**
 * Core image utilities module that provides centralized image handling functionality.
 * This module will be integrated with Cloudinary in the future for enhanced image
 * processing and delivery capabilities.
 * 
 * @module ImageUtils
 */

import { toast } from "sonner";

/** Represents standardized image sizes across the application */
export type ImageSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

/** Defines possible image shape variants */
export type ImageVariant = "rect" | "square" | "circle";

/** Specifies background context for images */
export type ImageBackground = "light" | "dark";

/** Defines types of competition-related images */
export type CompetitionImageType = "trophy" | "logo" | "winners" | "other";

/** Standard object-fit values for image display */
export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";

/** Configuration options for image transformations */
export interface ImageTransformOptions {
  /** Desired width of the transformed image */
  width?: number;
  /** Desired height of the transformed image */
  height?: number;
  /** Image quality (1-100) */
  quality?: number;
  /** Output format for the transformed image */
  format?: "webp" | "jpg" | "png";
}

/**
 * Resolves the correct path for an image based on its category and filename.
 * This function will be replaced by Cloudinary URL builder in the future.
 * 
 * @param path - The image path or filename
 * @param category - Optional category subdirectory for the image
 * @returns The fully resolved image path
 * 
 * @example
 * ```ts
 * const imagePath = resolveImagePath('player.jpg', 'players');
 * // Returns: '/assets/images/players/player.jpg'
 * ```
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
 * Generates a placeholder image for loading states or error fallbacks.
 * 
 * @param width - Width of the placeholder in pixels
 * @param height - Height of the placeholder in pixels
 * @param text - Optional text to display on the placeholder
 * @returns URL for a placeholder image
 * 
 * @example
 * ```ts
 * const placeholder = createPlaceholder(400, 300, "Loading...");
 * ```
 */
export const createPlaceholder = (width = 400, height = 300, text = "Image"): string => {
  return `https://placehold.co/${width}x${height}/EEEEEE/333333?text=${encodeURIComponent(text)}`;
};

/**
 * Handles image loading errors with consistent fallback behavior.
 * 
 * @param imagePath - Path of the failed image
 * @param elementId - Optional ID of the image element
 * @param fallbackUrl - Optional custom fallback image URL
 * 
 * @example
 * ```ts
 * handleImageError('/path/to/image.jpg', 'player-image');
 * ```
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
 * Maps size string identifiers to pixel values for consistent sizing.
 * 
 * @param size - Size identifier or direct pixel value
 * @returns Pixel value for the given size
 * 
 * @example
 * ```ts
 * const pixels = mapSizeToPixels('md'); // Returns 32
 * ```
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
 * Transforms image URLs with specified parameters.
 * This is a placeholder for future Cloudinary integration.
 * 
 * @param url - Original image URL
 * @param options - Transformation options
 * @returns Transformed image URL
 * 
 * Future Cloudinary implementation:
 * ```ts
 * export const transformImage = (url: string, options: ImageTransformOptions): string => {
 *   const cld = new Cloudinary({ cloud: { cloudName: 'your-cloud-name' } });
 *   return cld.image(url)
 *     .resize(fill().width(options.width).height(options.height))
 *     .quality(options.quality)
 *     .format(options.format)
 *     .toURL();
 * };
 * ```
 */
export const transformImage = (url: string, options: ImageTransformOptions): string => {
  // For now, just return the original URL
  // This will be replaced with Cloudinary implementation later
  return url;
};

// Category-specific image resolvers with documentation

/**
 * Retrieves club logo path with specified variant and background.
 * 
 * @param filename - Logo filename
 * @param variant - Optional shape variant for the logo
 * @returns Path to the club logo
 */
export const getClubLogo = (filename: string, variant: ImageVariant = "rect"): string => {
  return resolveImagePath(filename, "logos");
};

/**
 * Resolves competitor team logo path.
 * 
 * @param teamName - Name of the competitor team
 * @returns Path to the competitor's logo
 */
export const getCompetitorLogo = (teamName: string): string => {
  const normalizedName = teamName.toLowerCase();
  return resolveImagePath(`${normalizedName}.png`, "competitors");
};

/**
 * Retrieves player image path.
 * 
 * @param playerId - Player's unique identifier
 * @param type - Type of player image (e.g., "headshot")
 * @returns Path to the player's image
 */
export const getPlayerImage = (playerId: string | number, type: string = "headshot"): string => {
  return resolveImagePath(`${playerId}_${type}.jpg`, "players");
};

/**
 * Gets news image path by index.
 * 
 * @param index - Index of the news image
 * @returns Path to the news image
 */
export const getNewsImage = (index: number | string): string => {
  const imageIndex = typeof index === "string" ? parseInt(index, 10) : index;
  return resolveImagePath(`News${imageIndex + 1}.jpg`, "news");
};

/**
 * Retrieves stadium image path.
 * 
 * @param filename - Stadium image filename
 * @param view - Type of stadium view
 * @returns Path to the stadium image
 */
export const getStadiumImage = (
  filename: string = "Spain Park.jpg",
  view: 'aerial' | 'main' | 'pitch' | 'facilities' | 'other' = 'main'
): string => {
  return resolveImagePath(filename, "stadium");
};

/**
 * Gets team image path by index.
 * 
 * @param index - Index of the team image
 * @returns Path to the team image
 */
export const getTeamImage = (index: number): string => {
  return resolveImagePath(`Squad${index + 1}.jpg`, "team");
};

/**
 * Retrieves match day image path.
 * 
 * @param index - Index of the match day image
 * @returns Path to the match day image
 */
export const getMatchDayImage = (index: number = 1): string => {
  return resolveImagePath(`MatchDay${index}.jpg`, "matchday");
};

// Export types for strict type checking
export type { ImageTransformOptions };
