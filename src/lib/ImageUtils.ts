
import { getImageService, type ImageOptimizationOptions } from './services/ImageService';

/**
 * Core image utility functions and re-exports
 */

/**
 * Creates a placeholder image URL for when actual images are not available
 * @param width - Width of the placeholder image
 * @param height - Height of the placeholder image
 * @param text - Text to display on the placeholder
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
 */
export const handleImageError = (
  originalSrc: string,
  fallbackSrc?: string,
  onError?: () => void
): string => {
  return getImageService().handleError(originalSrc, fallbackSrc, onError);
};

/**
 * Constructs an asset path for the given category and filename
 * @param category - Asset category (e.g., 'players', 'teams')
 * @param filename - Name of the file
 */
export const getAssetPath = (category: string, filename: string): string => {
  return `/assets/images/${category}/${filename}`;
};

/**
 * Normalizes an image path to ensure proper format
 * @param path - Raw image path
 */
export const getImagePath = (path: string): string => {
  if (path.startsWith('http')) return path;
  return path.startsWith('/') ? path : `/assets/images/${path}`;
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
