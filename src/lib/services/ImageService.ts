
/**
 * Image Service Interface
 * Defines the contract for image optimization and transformation services
 */
export interface ImageService {
  /**
   * Returns an optimized URL for the given source image
   * @param src - Source URL of the image
   * @param options - Optimization options including width, height, quality, and format
   * @returns Optimized image URL
   */
  getOptimizedUrl: (src: string, options?: ImageOptimizationOptions) => string;
  
  /**
   * Generates a responsive srcSet string for different viewport sizes
   * @param src - Source URL of the image
   * @param breakpoints - Array of viewport widths to generate srcSet for
   * @returns A string containing the srcSet attribute value
   */
  generateSrcSet: (src: string, breakpoints?: number[]) => string;
  
  /**
   * Handles image loading errors with fallback options
   * @param src - Original source URL that failed
   * @param fallbackSrc - Optional fallback URL to use
   * @param onError - Optional callback for error handling
   * @returns A fallback image URL
   */
  handleError: (src: string, fallbackSrc?: string, onError?: () => void) => string;
  
  /**
   * Transforms an image with various transformations
   * @param src - Source URL of the image
   * @param transformations - Transformation options to apply
   * @returns Transformed image URL
   */
  transform: (src: string, transformations: ImageTransformations) => string;
}

/**
 * Options for image optimization
 */
export interface ImageOptimizationOptions {
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Image quality (1-100) */
  quality?: number;
  /** Output format */
  format?: 'webp' | 'jpg' | 'png' | 'avif';
}

/**
 * Options for image transformations
 */
export interface ImageTransformations {
  /** Crop mode */
  crop?: 'fill' | 'fit' | 'crop' | 'scale';
  /** Gravity/focus point for cropping */
  gravity?: 'center' | 'north' | 'south' | 'east' | 'west' | 'auto';
  /** Background color when padding is required */
  background?: string;
  /** Apply image effects */
  effect?: string;
  /** Blur amount (1-2000) */
  blur?: number;
  /** Border options */
  border?: {
    width: number;
    color: string;
  };
  /** Radius for rounded corners (pixels or 'max' for circle/ellipse) */
  radius?: number | 'max';
  /** Rotation angle in degrees */
  rotate?: number;
  /** Additional transformation parameters as key-value pairs */
  additionalParams?: Record<string, string>;
}

/**
 * Default implementation using built-in optimization
 */
export class DefaultImageService implements ImageService {
  getOptimizedUrl(src: string, options: ImageOptimizationOptions = {}): string {
    if (src.startsWith('http')) {
      return src;
    }
    return `/${src.startsWith('/') ? src.slice(1) : src}`;
  }

  generateSrcSet(src: string, breakpoints: number[] = [640, 1024, 1920, 2560]): string {
    return breakpoints
      .map(width => `${this.getOptimizedUrl(src, { width })} ${width}w`)
      .join(', ');
  }

  handleError(src: string, fallbackSrc?: string, onError?: () => void): string {
    console.error(`Failed to load image: ${src}`);
    onError?.();
    return fallbackSrc || `https://placehold.co/400x300?text=${encodeURIComponent('Image not found')}`;
  }
  
  transform(src: string, transformations: ImageTransformations): string {
    // Basic implementation for default service (no transformations applied)
    console.warn('Image transformations not supported in DefaultImageService');
    return this.getOptimizedUrl(src);
  }
}

// Singleton instance for the current image service
let currentService: ImageService = new DefaultImageService();

/**
 * Get the current image service instance
 * @returns The current image service
 */
export const getImageService = (): ImageService => currentService;

/**
 * Set a new image service implementation
 * This will be used when integrating with Cloudinary or other services
 * @param service - The image service implementation to use
 */
export const setImageService = (service: ImageService) => {
  currentService = service;
};
