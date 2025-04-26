import { cloudinary } from '../cloudinary';
import { ImageService, ImageOptimizationOptions, ImageTransformations } from './ImageService';
import { setImageService } from './imageServiceUtils';

/**
 * Cloudinary-specific configuration options
 */
export interface CloudinaryConfig {
  /** Cloudinary cloud name */
  cloudName: string;
  /** Base delivery URL */
  baseUrl?: string;
  /** Default image quality (1-100) */
  defaultQuality?: number;
  /** Default image format */
  defaultFormat?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
  /** Whether to enable automatic format selection */
  autoFormat?: boolean;
  /** Whether to automatically optimize quality */
  autoQuality?: boolean;
}

/**
 * Cloudinary image service implementation
 * Provides optimized image delivery and transformations through Cloudinary
 */
export class CloudinaryImageService implements ImageService {
  private config: CloudinaryConfig;
  private defaultBreakpoints = [640, 768, 1024, 1280, 1536, 1920];

  /**
   * Creates a new CloudinaryImageService
   * @param config - Cloudinary configuration options
   */
  constructor(config: CloudinaryConfig) {
    this.config = {
      defaultQuality: 80,
      defaultFormat: 'auto',
      autoFormat: true,
      autoQuality: true,
      ...config
    };
  }

  /**
   * Determines if the source URL is already a Cloudinary URL
   * @param src - Source URL to check
   * @returns True if the URL is already a Cloudinary URL
   */
  private isCloudinaryUrl(src: string): boolean {
    // Check if URL contains cloudinary domain or res.cloudinary.com
    return src.includes('res.cloudinary.com') || 
           (this.config.baseUrl ? src.includes(this.config.baseUrl) : false);
  }

  /**
   * Normalizes a source URL for Cloudinary
   * @param src - Source URL or path
   * @returns Cloudinary-compatible source identifier
   */
  private normalizeSource(src: string): string {
    // If already a Cloudinary URL, return as is
    if (this.isCloudinaryUrl(src)) {
      return src;
    }

    // If external URL, return as is (Cloudinary can fetch it)
    if (src.startsWith('http')) {
      return src;
    }

    // Remove leading slash for local assets
    return src.startsWith('/') ? src.slice(1) : src;
  }

  /**
   * Gets an optimized image URL through Cloudinary
   * @param src - Source URL of the image
   * @param options - Optimization options
   * @returns Optimized Cloudinary URL
   */
  getOptimizedUrl(src: string, options: ImageOptimizationOptions = {}): string {
    const normalizedSrc = this.normalizeSource(src);
    
    // Build transformation string
    const transformations = [];
    
    // Add format if specified or use auto format
    const format = options.format || (this.config.autoFormat ? 'auto' : this.config.defaultFormat);
    if (format) {
      transformations.push(`f_${format}`);
    }
    
    // Add quality if specified or use auto quality
    const quality = options.quality || (this.config.autoQuality ? 'auto' : this.config.defaultQuality);
    if (quality) {
      transformations.push(`q_${quality}`);
    }
    
    // Add width if specified
    if (options.width) {
      transformations.push(`w_${options.width}`);
    }
    
    // Add height if specified
    if (options.height) {
      transformations.push(`h_${options.height}`);
    }
    
    // If both width and height are specified, use crop mode
    if (options.width && options.height) {
      transformations.push('c_fill');
    }
    
    // Build the Cloudinary URL
    return this.buildCloudinaryUrl(normalizedSrc, transformations);
  }

  /**
   * Generates a responsive srcSet using Cloudinary
   * @param src - Source URL of the image
   * @param breakpoints - Array of widths to generate srcSet for
   * @returns A srcSet string for responsive images
   */
  generateSrcSet(src: string, breakpoints: number[] = this.defaultBreakpoints): string {
    const normalizedSrc = this.normalizeSource(src);
    
    return breakpoints
      .map(width => {
        const transformations = [
          `w_${width}`,
          this.config.autoFormat ? 'f_auto' : '',
          this.config.autoQuality ? 'q_auto' : '',
        ].filter(Boolean);
        
        const url = this.buildCloudinaryUrl(normalizedSrc, transformations);
        return `${url} ${width}w`;
      })
      .join(', ');
  }

  /**
   * Handles image loading errors
   * @param src - Source URL that failed
   * @param fallbackSrc - Optional fallback URL
   * @param onError - Optional error callback
   * @returns Fallback image URL
   */
  handleError(src: string, fallbackSrc?: string, onError?: () => void): string {
    console.error(`Failed to load Cloudinary image: ${src}`);
    onError?.();
    
    if (fallbackSrc) {
      return this.getOptimizedUrl(fallbackSrc);
    }
    
    // Generate a placeholder through Cloudinary
    return this.buildCloudinaryUrl('placeholder', [
      'w_400',
      'h_300',
      'c_fill',
      'g_center',
      'e_colorize:50',
      'co_rgb:EEEEEE',
      'l_text:Arial_24:Image%20not%20found',
      'fl_layer_apply,g_center'
    ]);
  }

  /**
   * Applies transformations to an image
   * @param src - Source URL of the image
   * @param transformations - Transformation options
   * @returns URL with applied transformations
   */
  transform(src: string, transformations: ImageTransformations): string {
    const normalizedSrc = this.normalizeSource(src);
    const params: string[] = [];
    
    // Add crop mode
    if (transformations.crop) {
      params.push(`c_${transformations.crop}`);
    }
    
    // Add gravity/focus point
    if (transformations.gravity) {
      params.push(`g_${transformations.gravity}`);
    }
    
    // Add background color
    if (transformations.background) {
      params.push(`b_${transformations.background.replace('#', 'rgb:')}`);
    }
    
    // Add effects
    if (transformations.effect) {
      params.push(`e_${transformations.effect}`);
    }
    
    // Add blur
    if (transformations.blur) {
      params.push(`e_blur:${transformations.blur}`);
    }
    
    // Add border
    if (transformations.border) {
      params.push(`bo_${transformations.border.width}px_solid_${transformations.border.color.replace('#', '')}`);
    }
    
    // Add border radius
    if (transformations.radius) {
      params.push(`r_${transformations.radius}`);
    }
    
    // Add rotation
    if (transformations.rotate) {
      params.push(`a_${transformations.rotate}`);
    }
    
    // Add additional parameters
    if (transformations.additionalParams) {
      Object.entries(transformations.additionalParams).forEach(([key, value]) => {
        params.push(`${key}_${value}`);
      });
    }
    
    // Add default transformations
    if (this.config.autoFormat) {
      params.push('f_auto');
    }
    
    if (this.config.autoQuality) {
      params.push('q_auto');
    }
    
    // Build URL with all transformations
    return this.buildCloudinaryUrl(normalizedSrc, params);
  }

  /**
   * Builds a Cloudinary URL with the given transformations
   * @param src - Source path or URL
   * @param transformations - Array of transformation parameters
   * @returns Complete Cloudinary URL
   */
  private buildCloudinaryUrl(src: string, transformations: string[]): string {
    // Filter out empty transformations
    const validTransformations = transformations.filter(Boolean);
    
    // If source is already a complete URL and no transformations, return as is
    if (src.startsWith('http') && validTransformations.length === 0) {
      return src;
    }
    
    // Build the transformation string
    const transformationString = validTransformations.length > 0 
      ? validTransformations.join(',') + '/'
      : '';
    
    // Build the final URL
    return `https://res.cloudinary.com/${this.config.cloudName}/image/upload/${transformationString}${src}`;
  }
}

/**
 * Creates a CloudinaryImageService and sets it as the current image service
 * @param config - Cloudinary configuration
 * @returns The created CloudinaryImageService
 */
export const setupCloudinaryService = (config: CloudinaryConfig): CloudinaryImageService => {
  const service = new CloudinaryImageService(config);
  setImageService(service);
  return service;
};
