
import { cloudinary } from './config';
import { Transformation } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import { 
  fill, scale, crop, thumbnail, 
  Resize // Import Resize class instead of 'resize'
} from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face, faces } from '@cloudinary/url-gen/qualifiers/focusOn';

/**
 * Basic transformation options
 */
export interface TransformOptions {
  width?: number;
  height?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  quality?: 'auto' | number;
  crop?: 'fill' | 'scale' | 'crop' | 'thumb';
  gravity?: 'auto' | 'face' | 'faces' | 'center';
}

/**
 * Apply responsive image transformations with default optimization
 * @param publicId Full public ID including folder path
 * @param options Transformation options
 */
export function transformImage(publicId: string, options: TransformOptions = {}) {
  const image = cloudinary.image(publicId);
  
  // Set default transformations for web optimization
  let transformation = new Transformation()
    .delivery(format(auto()))
    .delivery(quality(autoQuality()));
  
  // Apply resize transformation if dimensions provided
  if (options.width || options.height) {
    let resizeAction: Resize;
    
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
      resizeAction.width(options.width);
    }
    
    if (options.height) {
      resizeAction.height(options.height);
    }
    
    // Apply gravity/focus if specified
    if (options.gravity) {
      switch(options.gravity) {
        case 'face':
          resizeAction.gravity(focusOn(face()));
          break;
        case 'faces':
          resizeAction.gravity(focusOn(faces()));
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
  image.transformation(transformation);
  
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
  return widths
    .map(width => {
      const url = transformImage(publicId, { ...options, width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Create an optimized profile image transformation
 * Perfect for player headshots and profile pictures
 * @param publicId Full public ID including folder path
 * @param size Size of the square profile image
 */
export function profileImage(publicId: string, size: number = 200): string {
  return transformImage(publicId, {
    width: size,
    height: size,
    crop: 'fill',
    gravity: 'face'
  });
}

/**
 * Create an optimized logo transformation
 * @param publicId Full public ID including folder path
 * @param maxWidth Maximum width of the logo
 * @param format Optional format (png recommended for logos)
 */
export function logoImage(publicId: string, maxWidth: number = 300, format: 'auto' | 'png' = 'png'): string {
  return transformImage(publicId, {
    width: maxWidth,
    format
  });
}

/**
 * Create a featured image transformation (16:9 aspect ratio)
 * Perfect for news articles and featured content
 * @param publicId Full public ID including folder path
 * @param width Desired width
 */
export function featuredImage(publicId: string, width: number = 1200): string {
  const height = Math.round(width * (9/16)); // 16:9 aspect ratio
  
  return transformImage(publicId, {
    width,
    height,
    crop: 'fill'
  });
}

/**
 * Create a gallery thumbnail transformation
 * @param publicId Full public ID including folder path
 * @param size Size of the thumbnail (width)
 */
export function galleryThumbnail(publicId: string, size: number = 300): string {
  return transformImage(publicId, {
    width: size,
    height: Math.round(size * (3/4)), // 4:3 aspect ratio
    crop: 'thumb'
  });
}
