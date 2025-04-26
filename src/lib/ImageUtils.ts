
/**
 * Core image utility functions and re-exports
 */

import { cloudinary } from './cloudinary';

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}

interface ResponsiveImageOptions {
  src: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  width?: number;
  height?: number;
  quality?: number;
}

/**
 * Creates a placeholder image URL for when actual images are not available
 */
export const getPlaceholderImageUrl = (
  width = 400, 
  height = 300, 
  text = "Image"
): string => {
  return `https://placehold.co/${width}x${height}/CCCCCC/333333?text=${encodeURIComponent(text)}`;
};

// For backward compatibility only - will be deprecated
export const getPlaceholderImage = getPlaceholderImageUrl;

export const getOptimizedImageUrl = (
  src: string,
  options: ImageOptimizationOptions = {}
): string => {
  if (src.startsWith('http')) {
    return src;
  }
  
  const baseUrl = src.startsWith('/') ? src.slice(1) : src;
  return `/${baseUrl}`;
};

export const generateResponsiveSrcSet = (
  src: string,
  breakpoints: number[] = [640, 1024, 1920, 2560]
): string => {
  return breakpoints
    .map(width => `${getOptimizedImageUrl(src, { width })} ${width}w`)
    .join(', ');
};

export const handleImageError = (
  originalSrc: string,
  fallbackSrc?: string,
  onError?: () => void
): string => {
  console.error(`Failed to load image: ${originalSrc}`);
  onError?.();
  return fallbackSrc || getPlaceholderImageUrl();
};

export const getAssetPath = (category: string, filename: string): string => {
  return `/assets/images/${category}/${filename}`;
};

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
