
import { cloudinary } from './cloudinary';
import { type AspectRatio, type ObjectFit } from '@/components/ui/image/ResponsiveImage';

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}

interface ResponsiveImageOptions {
  src: string;
  aspectRatio?: AspectRatio;
  objectFit?: ObjectFit;
  width?: number;
  height?: number;
  quality?: number;
}

export const getOptimizedImageUrl = (
  src: string,
  options: ImageOptimizationOptions = {}
): string => {
  // If it's an external URL, return as is
  if (src.startsWith('http')) {
    return src;
  }

  // If it's a local asset, prepare for Cloudinary later
  const baseUrl = src.startsWith('/') ? src.slice(1) : src;
  
  // Currently return the original URL, but structured for Cloudinary
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

export const getPlaceholderImage = (
  width = 400,
  height = 300,
  text = "Image"
): string => {
  return `https://placehold.co/${width}x${height}/EEEEEE/333333?text=${encodeURIComponent(text)}`;
};

// Utility for handling image errors
export const handleImageError = (
  originalSrc: string,
  fallbackSrc?: string,
  onError?: () => void
): string => {
  console.error(`Failed to load image: ${originalSrc}`);
  onError?.();
  return fallbackSrc || getPlaceholderImage();
};

// Asset path helpers
export const getAssetPath = (category: string, filename: string): string => {
  return `/assets/images/${category}/${filename}`;
};

export const getImagePath = (path: string): string => {
  if (path.startsWith('http')) return path;
  return path.startsWith('/') ? path : `/assets/images/${path}`;
};

// Re-export existing specialized image utilities
export * from './image/clubLogo';
export * from './image/matchPhotos';
export * from './image/newsImages';
export * from './image/stadiumImages';
export * from './image/teamImages';
export * from './image/playerImages';
export * from './image/competitionImages';
export * from './image/competitorLogos';
export * from './image/sponsorLogos';
