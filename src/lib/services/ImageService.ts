
/**
 * Image Service Interface
 * Defines the contract for image optimization and transformation services
 */
export interface ImageService {
  getOptimizedUrl: (src: string, options?: ImageOptimizationOptions) => string;
  generateSrcSet: (src: string, breakpoints?: number[]) => string;
  handleError: (src: string, fallbackSrc?: string, onError?: () => void) => string;
}

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
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
}

// Singleton instance for the current image service
let currentService: ImageService = new DefaultImageService();

/**
 * Get the current image service instance
 */
export const getImageService = (): ImageService => currentService;

/**
 * Set a new image service implementation
 * This will be used when integrating with Cloudinary or other services
 */
export const setImageService = (service: ImageService) => {
  currentService = service;
};
