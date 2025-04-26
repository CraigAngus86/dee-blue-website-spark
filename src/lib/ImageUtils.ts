
/**
 * Core image utility functions and re-exports
 * @module ImageUtils
 * 
 * This module provides unified access to image utilities throughout the application.
 * It abstracts the underlying image service implementation, allowing for easy switching
 * between different providers (e.g., local, Cloudinary).
 */

import { getImageService, type ImageOptimizationOptions, type ImageTransformations } from './services/ImageService';

/**
 * Creates a placeholder image URL for when actual images are not available
 * @param width - Width of the placeholder image in pixels
 * @param height - Height of the placeholder image in pixels
 * @param text - Text to display on the placeholder
 * @returns URL for the placeholder image
 * @example
 * ```typescript
 * const placeholderUrl = getPlaceholderImageUrl(400, 300, "Loading...");
 * ```
 */
export const getPlaceholderImageUrl = (
  width = 400, 
  height = 300, 
  text = "Image"
): string => {
  return `https://placehold.co/${width}x${height}/CCCCCC/333333?text=${encodeURIComponent(text)}`;
};

// For backward compatibility
export const getPlaceholderImage = getPlaceholderImageUrl;

/**
 * Optimizes an image URL based on provided options
 * @param src - Source URL of the image
 * @param options - Optimization options including width, height, quality, and format
 * @returns Optimized image URL
 * @example
 * ```typescript
 * const optimizedUrl = getOptimizedImageUrl("/images/photo.jpg", {
 *   width: 800,
 *   height: 600,
 *   quality: 80
 * });
 * ```
 */
export const getOptimizedImageUrl = (
  src: string,
  options: ImageOptimizationOptions = {}
): string => {
  return getImageService().getOptimizedUrl(src, options);
};

/**
 * Generates a responsive srcSet string for different viewport sizes
 * @param src - Source URL of the image
 * @param breakpoints - Array of viewport widths to generate srcSet for
 * @returns A string containing the srcSet attribute value
 */
export const generateResponsiveSrcSet = (
  src: string,
  breakpoints?: number[]
): string => {
  return getImageService().generateSrcSet(src, breakpoints);
};

/**
 * Handles image loading errors with fallback options
 * @param originalSrc - Original source URL that failed
 * @param fallbackSrc - Optional fallback URL to use
 * @param onError - Optional callback for error handling
 * @returns A fallback image URL
 */
export const handleImageError = (
  originalSrc: string,
  fallbackSrc?: string,
  onError?: () => void
): string => {
  return getImageService().handleError(originalSrc, fallbackSrc, onError);
};

/**
 * Applies transformations to an image
 * @param src - Source URL of the image
 * @param transformations - Transformation options to apply
 * @returns URL with transformations applied
 * @example
 * ```typescript
 * const transformedUrl = transformImage("/images/photo.jpg", {
 *   effect: "grayscale",
 *   blur: 5,
 *   crop: "fill",
 *   gravity: "center"
 * });
 * ```
 */
export const transformImage = (
  src: string,
  transformations: ImageTransformations
): string => {
  return getImageService().transform(src, transformations);
};

/**
 * Constructs an asset path for the given category and filename
 * @param category - Asset category (e.g., 'players', 'teams')
 * @param filename - Name of the file
 * @returns Complete asset path
 */
export const getAssetPath = (category: string, filename: string): string => {
  return `/assets/images/${category}/${filename}`;
};

/**
 * Normalizes an image path to ensure proper format
 * @param path - Raw image path
 * @returns Normalized image path
 */
export const getImagePath = (path: string): string => {
  if (path.startsWith('http')) return path;
  return path.startsWith('/') ? path : `/assets/images/${path}`;
};

/**
 * Generates an image URL optimized for a specific device pixel ratio
 * @param src - Source URL of the image
 * @param width - Base width in pixels
 * @param pixelRatio - Device pixel ratio (1, 2, 3)
 * @returns Optimized image URL for the given device pixel ratio
 */
export const getPixelRatioImageUrl = (
  src: string,
  width: number,
  pixelRatio = 1
): string => {
  const scaledWidth = Math.round(width * pixelRatio);
  return getOptimizedImageUrl(src, { width: scaledWidth });
};

/**
 * Creates a blurred thumbnail URL for lazy loading
 * @param src - Source URL of the image
 * @param width - Width of the thumbnail
 * @returns URL for a small, blurred thumbnail image
 */
export const getBlurredThumbnailUrl = (
  src: string,
  width = 20
): string => {
  return transformImage(src, {
    width,
    blur: 200,
    quality: 30
  });
};

// Re-export specialized image utilities
export * from './image/clubLogo';
export * from './image/matchPhotos';
export * from './image/newsImages';
export * from './image/stadiumImages';
export * from './image/teamImages';
export * from './image/playerImages';
export * from './image/competitionImages';
export * from './image/competitorLogos';
export * from './image/sponsorLogos';
