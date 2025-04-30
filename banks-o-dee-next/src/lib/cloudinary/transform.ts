
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, crop, scale, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { blur, grayscale, sepia } from '@cloudinary/url-gen/actions/effect';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { cloudinary } from '@/lib/cloudinary';

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0'
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
          image.resize(fill().width(options.width || 0).height(options.height || 0));
          break;
        case 'crop':
          image.resize(crop().width(options.width || 0).height(options.height || 0));
          break;
        case 'scale':
          image.resize(scale().width(options.width || 0).height(options.height || 0));
          break;
        case 'thumb':
          image.resize(thumbnail().width(options.width || 0).height(options.height || 0));
          break;
        default:
          image.resize(fill().width(options.width || 0).height(options.height || 0));
      }
    }

    // Fix: Focus point - use FocusOn enum correctly
    if (options.focus) {
      if (options.width || options.height) {
        switch (options.focus) {
          case 'face':
            image.resize(fill().width(options.width || 0).height(options.height || 0).gravity(focusOn(FocusOn.face)));
            break;
          case 'center':
            image.resize(fill().width(options.width || 0).height(options.height || 0).gravity(compass('center')));
            break;
          case 'auto':
            image.resize(fill().width(options.width || 0).height(options.height || 0).gravity(focusOn(FocusOn.auto)));
            break;
        }
      }
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

    // Fix: Text overlay with correct implementation
    if (options.text) {
      const textStyle = new TextStyle(options.textFont || 'Arial')
        .fontWeight(options.textWeight || 'bold')
        .fontSize(options.textSize || 24);
      
      // Fix: Use fontColor method instead of color for TextStyle
      if (options.textColor) {
        textStyle.fontColor(options.textColor);
      }
      
      // Create text overlay with position (required second parameter)
      const position = new Position();
      // Fix: Pass both required parameters to text()
      const textSource = text(options.text, textStyle);
      
      // Apply the text overlay to the image with position
      image.overlay(source(textSource).position(position));
    }

    return image.toURL();
  } catch (error) {
    console.error('Error transforming Cloudinary image:', error);
    return '';
  }
}

/**
 * Generate a player image URL with appropriate transformations
 */
export function getPlayerImageUrl(publicId: string, options: {
  width?: number;
  height?: number;
  crop?: 'fill' | 'thumb';
  face?: boolean;
} = {}): string {
  return transformImage(publicId, {
    width: options.width || 300,
    height: options.height || 300,
    crop: options.crop || 'fill',
    focus: options.face ? 'face' : 'center',
    quality: 80,
    format: 'auto'
  });
}

/**
 * Generate a news image URL with appropriate transformations
 */
export function getNewsImageUrl(publicId: string, size: 'thumbnail' | 'medium' | 'large' | 'full' = 'medium'): string {
  const sizes = {
    thumbnail: { width: 400, height: 225 },
    medium: { width: 800, height: 450 },
    large: { width: 1200, height: 675 },
    full: { width: 1920, height: 1080 }
  };
  
  const { width, height } = sizes[size];
  
  return transformImage(publicId, {
    width,
    height,
    crop: 'fill',
    quality: size === 'thumbnail' ? 70 : 80,
    format: 'auto'
  });
}
