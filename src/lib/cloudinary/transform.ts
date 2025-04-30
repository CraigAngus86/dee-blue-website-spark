
import { cloudinary } from './config';
import { Transformation } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import { 
  fill, scale, crop, thumbnail,
  Resize 
} from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face, faces, center } from '@cloudinary/url-gen/qualifiers/focusOn';
import { backgroundRemoval, CustomFunction } from '@cloudinary/url-gen/actions/effect';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { image, text } from '@cloudinary/url-gen/qualifiers/source';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { opacity, brightness } from '@cloudinary/url-gen/actions/adjust';
import { Gravity } from '@cloudinary/url-gen/qualifiers';

/**
 * Extended transformation options
 */
export interface TransformOptions {
  width?: number;
  height?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  quality?: 'auto' | number;
  crop?: 'fill' | 'scale' | 'crop' | 'thumb';
  gravity?: 'auto' | 'face' | 'faces' | 'center';
  background?: string; // Background color (hex)
  placeholder?: boolean; // Whether to use placeholder for missing images
  aspectRatio?: number; // Explicit aspect ratio
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'; // Device size for responsive images
}

/**
 * Transform image using Cloudinary SDK
 * @param publicId Full public ID including folder path
 * @param options Transformation options
 */
export function transformImage(publicId: string, options: TransformOptions = {}) {
  if (!publicId) return '';
  
  const image = cloudinary.image(publicId);
  
  // Set default transformations for web optimization
  let transformation = new Transformation()
    .delivery(format(auto()))
    .delivery(quality(autoQuality()));
  
  // Apply resize transformation if dimensions provided
  if (options.width || options.height || options.aspectRatio) {
    let resizeAction: typeof Resize.prototype;
    
    switch(options.crop) {
      case 'fill':
        resizeAction = fill();
        break;
      case 'scale':
        resizeAction = scale();
        break;
      case 'crop':
        resizeAction = crop();
        break;
      case 'thumb':
        resizeAction = thumbnail();
        break;
      default:
        resizeAction = fill(); // Default to fill
    }
    
    if (options.width) {
      resizeAction = resizeAction.width(options.width);
    }
    
    if (options.height) {
      resizeAction = resizeAction.height(options.height);
    }
    
    // Apply gravity/focus if specified
    if (options.gravity) {
      switch(options.gravity) {
        case 'face':
          resizeAction = resizeAction.gravity(focusOn(face()));
          break;
        case 'faces':
          resizeAction = resizeAction.gravity(focusOn(faces()));
          break;
        case 'center':
          resizeAction = resizeAction.gravity(focusOn(center()));
          break;
        case 'auto':
          // Auto gravity is applied differently
          break;
        default:
          // Center gravity is default
      }
    }
    
    transformation = transformation.resize(resizeAction);
  }
  
  // Apply specific format if requested
  if (options.format && options.format !== 'auto') {
    transformation = transformation.delivery(format(options.format));
  }
  
  // Apply specific quality if requested
  if (options.quality && options.quality !== 'auto') {
    transformation = transformation.delivery(quality(options.quality));
  }
  
  // Apply the transformation to the image
  image.setTransformation(transformation);
  
  return image.toURL();
}

/**
 * Generate a responsive srcset with multiple widths
 * @param publicId Full public ID including folder path
 * @param widths Array of widths to generate
 * @param options Additional transformation options
 */
export function generateResponsiveSrcSet(
  publicId: string,
  widths: number[] = [640, 768, 1024, 1280, 1536, 1920],
  options: Omit<TransformOptions, 'width'> = {}
): string {
  if (!publicId) return '';
  
  return widths
    .map(width => {
      const url = transformImage(publicId, { ...options, width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Map device size to width in pixels
 * @param size Device size designation
 */
function mapDeviceSizeToWidth(size?: 'sm' | 'md' | 'lg' | 'xl'): number {
  switch(size) {
    case 'sm': return 640;  // Mobile
    case 'md': return 768;  // Tablet
    case 'lg': return 1280; // Desktop
    case 'xl': return 1920; // Large desktop
    default: return 1024;   // Default (md-lg)
  }
}

/* ===== PLAYER IMAGE TRANSFORMATIONS ===== */

/**
 * Create an optimized player profile image (square format)
 * Perfect for team grid listings
 * @param publicId Full public ID including folder path
 * @param size Size of the square profile image
 * @param deviceSize Responsive device size
 */
export function playerProfileSquare(
  publicId: string,
  size: number = 300,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const width = deviceSize ? mapDeviceSizeToWidth(deviceSize) / 3 : size;
  
  return transformImage(publicId, {
    width: width,
    height: width,
    crop: 'fill',
    gravity: 'face'
  });
}

/**
 * Create an optimized player profile image (featured format)
 * Shows more upper body, approximately 3:4 aspect ratio
 * @param publicId Full public ID including folder path
 * @param width Width of the profile image
 * @param deviceSize Responsive device size
 */
export function playerProfileFeatured(
  publicId: string,
  width: number = 400,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const imageWidth = deviceSize ? mapDeviceSizeToWidth(deviceSize) / 2.5 : width;
  const height = Math.round(imageWidth * (4/3)); // 3:4 aspect ratio
  
  return transformImage(publicId, {
    width: imageWidth,
    height: height,
    crop: 'fill',
    gravity: 'face'
  });
}

/**
 * Create an optimized player action shot
 * @param publicId Full public ID including folder path
 * @param width Desired width
 * @param deviceSize Responsive device size
 */
export function playerAction(
  publicId: string,
  width: number = 800,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const imageWidth = deviceSize ? mapDeviceSizeToWidth(deviceSize) : width;
  const height = Math.round(imageWidth * (9/16)); // 16:9 aspect ratio
  
  return transformImage(publicId, {
    width: imageWidth,
    height: height,
    crop: 'fill'
  });
}

/* ===== MATCH IMAGE TRANSFORMATIONS ===== */

/**
 * Create a match gallery thumbnail transformation
 * @param publicId Full public ID including folder path
 * @param width Thumbnail width
 * @param deviceSize Responsive device size
 */
export function matchGalleryThumb(
  publicId: string,
  width: number = 300,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const imageWidth = deviceSize ? mapDeviceSizeToWidth(deviceSize) / 4 : width;
  const height = Math.round(imageWidth * (3/4)); // 4:3 aspect ratio
  
  return transformImage(publicId, {
    width: imageWidth,
    height: height,
    crop: 'thumb'
  });
}

/**
 * Create a match featured image transformation
 * @param publicId Full public ID including folder path
 * @param width Desired width
 * @param deviceSize Responsive device size
 */
export function matchFeatured(
  publicId: string,
  width: number = 1200,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const imageWidth = deviceSize ? mapDeviceSizeToWidth(deviceSize) : width;
  const height = Math.round(imageWidth * (9/16)); // 16:9 aspect ratio
  
  return transformImage(publicId, {
    width: imageWidth,
    height: height,
    crop: 'fill'
  });
}

/* ===== NEWS IMAGE TRANSFORMATIONS ===== */

/**
 * Create a news featured image transformation
 * Perfect for news articles and featured content
 * @param publicId Full public ID including folder path
 * @param width Desired width
 * @param deviceSize Responsive device size
 */
export function newsFeatured(
  publicId: string,
  width: number = 1200,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const imageWidth = deviceSize ? mapDeviceSizeToWidth(deviceSize) : width;
  const height = Math.round(imageWidth * (9/16)); // 16:9 aspect ratio
  
  return transformImage(publicId, {
    width: imageWidth,
    height: height,
    crop: 'fill'
  });
}

/**
 * Create a news thumbnail transformation
 * Perfect for news listings
 * @param publicId Full public ID including folder path
 * @param width Thumbnail width
 * @param deviceSize Responsive device size
 */
export function newsThumbnail(
  publicId: string,
  width: number = 400,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const imageWidth = deviceSize ? mapDeviceSizeToWidth(deviceSize) / 3 : width;
  const height = Math.round(imageWidth * (3/4)); // 4:3 aspect ratio
  
  return transformImage(publicId, {
    width: imageWidth,
    height: height,
    crop: 'fill'
  });
}

/* ===== SPONSOR IMAGE TRANSFORMATIONS ===== */

/**
 * Create an optimized logo transformation
 * @param publicId Full public ID including folder path
 * @param maxWidth Maximum width of the logo
 * @param format Optional format (png recommended for logos)
 * @param deviceSize Responsive device size
 */
export function sponsorLogo(
  publicId: string,
  maxWidth: number = 300,
  format: 'auto' | 'png' = 'png',
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const width = deviceSize ? mapDeviceSizeToWidth(deviceSize) / 4 : maxWidth;
  
  return transformImage(publicId, {
    width,
    format
  });
}

/* ===== STADIUM IMAGE TRANSFORMATIONS ===== */

/**
 * Create a stadium featured image transformation (panoramic)
 * Perfect for stadium overview and wide shots
 * @param publicId Full public ID including folder path
 * @param width Desired width
 * @param deviceSize Responsive device size
 */
export function stadiumPanoramic(
  publicId: string,
  width: number = 1600,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const imageWidth = deviceSize ? mapDeviceSizeToWidth(deviceSize) : width;
  const height = Math.round(imageWidth * (9/21)); // 21:9 aspect ratio
  
  return transformImage(publicId, {
    width: imageWidth,
    height: height,
    crop: 'fill'
  });
}

/**
 * Create a stadium facility image transformation
 * For interior, facilities and detail shots
 * @param publicId Full public ID including folder path
 * @param width Desired width
 * @param deviceSize Responsive device size
 */
export function stadiumFacility(
  publicId: string,
  width: number = 800,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const imageWidth = deviceSize ? mapDeviceSizeToWidth(deviceSize) : width;
  const height = Math.round(imageWidth * (2/3)); // 3:2 aspect ratio
  
  return transformImage(publicId, {
    width: imageWidth,
    height: height,
    crop: 'fill'
  });
}

/* ===== ART DIRECTION TRANSFORMATIONS ===== */

/**
 * Create a hero banner image transformation
 * Optimized for full-width banner with text overlay
 * @param publicId Full public ID including folder path
 * @param width Desired width
 * @param deviceSize Responsive device size
 */
export function heroBanner(
  publicId: string,
  width: number = 1920,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  let imageWidth = width;
  let height;
  
  switch(deviceSize) {
    case 'sm':
      imageWidth = 640;
      height = Math.round(imageWidth * (1/1)); // 1:1 aspect for mobile
      break;
    case 'md':
      imageWidth = 768;
      height = Math.round(imageWidth * (2/3)); // 3:2 aspect for tablet
      break;
    case 'lg':
      imageWidth = 1280;
      height = Math.round(imageWidth * (9/21)); // 21:9 aspect for desktop
      break;
    case 'xl':
      imageWidth = 1920;
      height = Math.round(imageWidth * (9/21)); // 21:9 aspect for large desktop
      break;
    default:
      imageWidth = width;
      height = Math.round(imageWidth * (9/21)); // Default 21:9
  }
  
  return transformImage(publicId, {
    width: imageWidth,
    height: height,
    crop: 'fill'
  });
}

/**
 * Create an optimized card image transformation
 * Perfect for UI cards with overlay text
 * @param publicId Full public ID including folder path
 * @param width Desired width
 * @param deviceSize Responsive device size
 */
export function cardImage(
  publicId: string,
  width: number = 600,
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl'
): string {
  const imageWidth = deviceSize ? mapDeviceSizeToWidth(deviceSize) / 2 : width;
  const height = Math.round(imageWidth * (3/4)); // 4:3 aspect ratio
  
  return transformImage(publicId, {
    width: imageWidth,
    height: height,
    crop: 'fill'
  });
}

/**
 * Helper function to generate standard placeholder silhouette for missing images
 * @param width Width of the placeholder
 * @param height Height of the placeholder
 * @param text Optional text to display
 * @returns URL of the generated placeholder image
 */
export function createSilhouettePlaceholder(
  width: number = 400,
  height: number = 500,
  text?: string
): string {
  // Generate a dynamic placeholder with blue and white striped background
  const placeholder = cloudinary.image('banksofdeefc/placeholders/player_silhouette');
  
  const transformation = new Transformation()
    .resize(fill().width(width).height(height))
    .backgroundColor('#00105A') // Deep Navy background
    .delivery(format(auto()))
    .delivery(quality(autoQuality()));
  
  // Add text if provided
  if (text) {
    transformation.overlay(
      source(text(text, new TextStyle('Arial', 20)).color('white'))
        .position(new Position().gravity(Gravity.south()).offsetY(20))
    );
  }
  
  placeholder.setTransformation(transformation);
  
  return placeholder.toURL();
}

/**
 * Create an optimized profile image with Banks o' Dee FC
 * standard diagonal blue and white striped background
 * @param publicId Full public ID including folder path
 * @param size Size of the square profile image
 * @param name Optional player name for fallback display
 */
export function standardPlayerProfile(
  publicId: string,
  size: number = 200,
  name?: string
): string {
  if (!publicId) {
    return createSilhouettePlaceholder(size, size * 1.25, name);
  }
  
  return transformImage(publicId, {
    width: size,
    height: size,
    crop: 'fill',
    gravity: 'face'
  });
}
