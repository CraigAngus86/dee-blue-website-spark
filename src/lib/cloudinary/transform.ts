
import { CloudinaryImage } from '@cloudinary/url-gen';
import { thumbnail, scale, fill, crop, fit } from '@cloudinary/url-gen/actions/resize';
import { autoGravity, focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { Transformation } from '@cloudinary/url-gen/transformation/Transformation';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
// Import correct text module
import { source } from '@cloudinary/url-gen/actions/overlay';
// Import correct compass module
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { Position } from '@cloudinary/url-gen/qualifiers/position';

/**
 * Transforms a Cloudinary image based on the specified options
 */
export const transformCloudinaryImage = (
  image: CloudinaryImage,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'thumb' | 'scale' | 'fit';
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    quality?: number;
    aspectRatio?: number;
    focus?: 'auto' | 'faces' | 'center';
  } = {}
): CloudinaryImage => {
  // Make a copy of the original image to avoid mutating the original
  const transformedImage = image.clone();
  
  // Apply crop/resize if width or height is specified
  if (options.width || options.height) {
    switch (options.crop) {
      case 'fill':
        transformedImage.resize(fill(options.width, options.height));
        // Apply focus settings for fill crop
        if (options.focus === 'faces') {
          transformedImage.resize(fill().gravity(autoGravity().focusOn(FocusOn.face())));
        } else if (options.focus === 'center') {
          transformedImage.resize(fill().gravity(compass('center')));
        } else {
          transformedImage.resize(fill().gravity(autoGravity()));
        }
        break;
      case 'thumb':
        transformedImage.resize(thumbnail(options.width, options.height));
        break;
      case 'scale':
        transformedImage.resize(scale(options.width, options.height));
        break;
      case 'fit':
        transformedImage.resize(fit(options.width, options.height));
        break;
      default:
        // Default to fill with auto gravity if no crop specified but dimensions are
        transformedImage.resize(fill(options.width, options.height).gravity(autoGravity()));
    }
  }

  // Apply format if specified
  if (options.format === 'auto') {
    transformedImage.delivery(format('auto'));
  } else if (options.format) {
    transformedImage.delivery(format(options.format));
  }

  // Apply quality settings
  if (options.quality) {
    transformedImage.delivery(quality(options.quality));
  } else {
    transformedImage.delivery(quality(auto()));
  }

  // Apply aspect ratio if specified
  if (options.aspectRatio) {
    transformedImage.resize(
      crop().aspectRatio(options.aspectRatio)
    );
  }

  return transformedImage;
};

/**
 * Applies branding overlay to an image
 */
export const applyBranding = (
  image: CloudinaryImage,
  options: {
    text?: string;
    opacity?: number;
    position?: 'bottom' | 'top' | 'center';
  } = {}
): CloudinaryImage => {
  const brandedImage = image.clone();
  
  if (options.text) {
    // Using source.text() properly
    const textOverlay = source.text(options.text, new Transformation());
    
    // Add text overlay with position
    let position: Position;
    switch (options.position) {
      case 'top':
        position = new Position().gravity(compass('north'));
        break;
      case 'center':
        position = new Position().gravity(compass('center'));
        break;
      default:
        position = new Position().gravity(compass('south'));
        break;
    }
    
    // Apply the overlay
    // Note: We're not using .chain() as it doesn't exist on CloudinaryImage
    // Instead, each operation adds to the transformation chain automatically
    brandedImage.overlay(textOverlay);
  }
  
  return brandedImage;
};

// Create a simple export for transformImage
export const transformImage = transformCloudinaryImage;
