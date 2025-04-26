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

export interface ImageTransformations {
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Crop mode */
  crop?: 'fill' | 'fit' | 'crop' | 'scale';
  /** Gravity/focus point for cropping */
  gravity?: 'center' | 'north' | 'south' | 'east' | 'west' | 'auto';
  /** Background color when padding is required */
  background?: string;
  /** Image effects: grayscale, sepia, etc */
  effect?: string;
  /** Blur amount (1-2000) */
  blur?: number;
  /** Contrast adjustment (-100 to 100) */
  contrast?: number;
  /** Saturation adjustment (-100 to 100) */
  saturation?: number;
  /** Brightness adjustment (-100 to 100) */
  brightness?: number;
  /** Quality (1-100) */
  quality?: number;
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

  transform(src: string, transformations: ImageTransformations): string {
    const params: string[] = [];
    
    if (transformations.width) params.push(`w_${transformations.width}`);
    if (transformations.height) params.push(`h_${transformations.height}`);
    if (transformations.crop) params.push(`c_${transformations.crop}`);
    if (transformations.gravity) params.push(`g_${transformations.gravity}`);
    if (transformations.effect) params.push(`e_${transformations.effect}`);
    if (transformations.blur) params.push(`e_blur:${transformations.blur}`);
    if (transformations.contrast) params.push(`e_contrast:${transformations.contrast}`);
    if (transformations.saturation) params.push(`e_saturation:${transformations.saturation}`);
    if (transformations.brightness) params.push(`e_brightness:${transformations.brightness}`);
    if (transformations.radius) params.push(`r_${transformations.radius}`);
    if (transformations.rotate) params.push(`a_${transformations.rotate}`);
    
    if (transformations.border) {
      params.push(`bo_${transformations.border.width}px_solid_${transformations.border.color.replace('#', '')}`);
    }
    
    if (transformations.additionalParams) {
      Object.entries(transformations.additionalParams).forEach(([key, value]) => {
        params.push(`${key}_${value}`);
      });
    }
    
    const transformString = params.length > 0 ? `${params.join(',')}` : '';
    return transformString ? `${src}?tr=${transformString}` : src;
  }

  handleError(src: string, fallbackSrc?: string, onError?: () => void): string {
    console.error(`Failed to load image: ${src}`);
    onError?.();
    return fallbackSrc || `https://placehold.co/400x300?text=${encodeURIComponent('Image not found')}`;
  }
}

// Re-export image service functions
export { getImageService, setImageService } from './imageServiceUtils';
