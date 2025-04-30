
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, crop, scale, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { blur, grayscale, sepia } from '@cloudinary/url-gen/actions/effect';
import { text, source } from '@cloudinary/url-gen/actions/overlay';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { Color } from '@cloudinary/url-gen/qualifiers/color';
import { cloudinaryConfig } from './config';

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: cloudinaryConfig.cloudName
  }
});

/**
 * Transform options for Cloudinary images
 */
export interface TransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'crop' | 'scale' | 'thumb';
  focus?: 'face' | 'center' | 'auto';
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  effect?: string;
  blur?: number;
  grayscale?: boolean;
  sepia?: boolean;
  radius?: string;
  background?: string;
  overlay?: string;
  text?: string;
  textColor?: string;
  textSize?: number;
  textFont?: string;
  textWeight?: string;
  textPosition?: string;
}

/**
 * Transform an image using Cloudinary
 * @param publicId Cloudinary public ID
 * @param options Transform options
 * @returns Transformed image URL
 */
export function transformImage(publicId: string, options: TransformOptions = {}): string {
  if (!publicId) {
    return '';
  }

  try {
    const image = cld.image(publicId);

    // Apply transformations based on options
    if (options.width || options.height) {
      switch (options.crop) {
        case 'fill':
          image.resize(fill().width(options.width).height(options.height));
          break;
        case 'crop':
          image.resize(crop().width(options.width).height(options.height));
          break;
        case 'scale':
          image.resize(scale().width(options.width).height(options.height));
          break;
        case 'thumb':
          image.resize(thumbnail().width(options.width).height(options.height));
          break;
        default:
          image.resize(fill().width(options.width).height(options.height));
      }
    }

    // Focus point
    if (options.focus === 'face') {
      image.resize(focusOn('face'));
    }

    // Effects
    if (options.blur) {
      image.effect(blur().strength(options.blur));
    }

    if (options.grayscale) {
      image.effect(grayscale());
    }

    if (options.sepia) {
      image.effect(sepia());
    }

    // Text overlay
    if (options.text) {
      const textStyle = new TextStyle(options.textFont || 'Arial')
        .fontWeight(options.textWeight || 'bold')
        .fontSize(options.textSize || 24);
      
      if (options.textColor) {
        textStyle.textColor(new Color(options.textColor));
      }
      
      const textOverlay = source(
        text(options.text, textStyle)
      );
      
      image.overlay(textOverlay);
    }

    return image.toURL();
  } catch (error) {
    console.error('Error transforming Cloudinary image:', error);
    return '';
  }
}

/**
 * Generate a player profile square thumbnail
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function playerProfileSquare(publicId: string): string {
  return transformImage(publicId, {
    width: 300,
    height: 300,
    crop: 'fill',
    focus: 'face',
    quality: 90,
  });
}

/**
 * Generate a player profile featured image
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function playerProfileFeatured(publicId: string): string {
  return transformImage(publicId, {
    width: 800,
    height: 600,
    crop: 'fill',
    focus: 'face',
    quality: 90,
  });
}

/**
 * Generate a player action shot
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function playerAction(publicId: string): string {
  return transformImage(publicId, {
    width: 1200,
    height: 800,
    crop: 'fill',
    quality: 90,
  });
}

/**
 * Generate a match gallery thumbnail
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function matchGalleryThumb(publicId: string): string {
  return transformImage(publicId, {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 85,
  });
}

/**
 * Generate a featured match image
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function matchFeatured(publicId: string): string {
  return transformImage(publicId, {
    width: 1200,
    height: 675,
    crop: 'fill',
    quality: 90,
  });
}

/**
 * Generate a featured news image
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function newsFeatured(publicId: string): string {
  return transformImage(publicId, {
    width: 1200,
    height: 630,
    crop: 'fill',
    quality: 90,
  });
}

/**
 * Generate a news thumbnail
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function newsThumbnail(publicId: string): string {
  return transformImage(publicId, {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 85,
  });
}

/**
 * Generate a sponsor logo
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function sponsorLogo(publicId: string): string {
  return transformImage(publicId, {
    width: 300,
    crop: 'scale',
    quality: 90,
  });
}

/**
 * Generate a stadium panoramic image
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function stadiumPanoramic(publicId: string): string {
  return transformImage(publicId, {
    width: 1600,
    height: 600,
    crop: 'fill',
    quality: 90,
  });
}

/**
 * Generate a stadium facility image
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function stadiumFacility(publicId: string): string {
  return transformImage(publicId, {
    width: 800,
    height: 600,
    crop: 'fill',
    quality: 90,
  });
}

/**
 * Generate a hero banner image
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function heroBanner(publicId: string): string {
  return transformImage(publicId, {
    width: 1920,
    height: 1080,
    crop: 'fill',
    quality: 90,
  });
}

/**
 * Generate a card image
 * @param publicId Cloudinary public ID
 * @returns Transformed image URL
 */
export function cardImage(publicId: string): string {
  return transformImage(publicId, {
    width: 600,
    height: 400,
    crop: 'fill',
    quality: 85,
  });
}

/**
 * Generate a silhouette placeholder image
 * @param text Text to overlay on the placeholder
 * @param width Width of the image
 * @param height Height of the image
 * @returns Transformed image URL
 */
export function createSilhouettePlaceholder(text: string, width: number = 300, height: number = 300): string {
  return transformImage('banks-o-dee/placeholders/silhouette', {
    width,
    height,
    crop: 'fill',
    text,
    textColor: '#ffffff',
    textSize: Math.max(16, Math.floor(width / 15)),
    textFont: 'Arial',
    textWeight: 'bold',
  });
}
