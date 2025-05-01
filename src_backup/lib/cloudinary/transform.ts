
import { Transformation } from '@cloudinary/url-gen';
import { pad } from '@cloudinary/url-gen/actions/resize';
import { Gravity } from '@cloudinary/url-gen/qualifiers';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { text } from '@cloudinary/url-gen/actions/overlay';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity/compass';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { opacity } from '@cloudinary/url-gen/actions/adjust';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { fill, crop } from '@cloudinary/url-gen/actions/resize';

// Initialize Cloudinary with your cloud name
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dlkpaw2a0' // The cloud name from environment variables or use a default for development
  },
  url: {
    secure: true // Use HTTPS
  }
});

// Helper function to create a transformation for stadium images
export const createStadiumImageTransformation = () => {
  return (transformation: Transformation) => {
    transformation
      .resize(pad().width(600).height(400).gravity(autoGravity().autoFocus(FocusOn.subject())))
  };
};

// Helper function to create a transformation for player profile images
export const createPlayerProfileImageTransformation = () => {
  return (transformation: Transformation) => {
    transformation
      .resize(pad().width(300).height(400).gravity(autoGravity().autoFocus(FocusOn.subject())))
  };
};

// Helper function to create a transformation for sponsor logos
export const createSponsorLogoTransformation = () => {
  return (transformation: Transformation) => {
    transformation
      .resize(scale().width(200))
      .adjust(opacity(80));
  };
};

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

export const createTextOverlay = (textContent: string, options: any = {}) => {
  // Default configuration for text overlay
  const fontFamily = options.fontFamily || 'montserrat';
  const fontSize = options.fontSize || 24;
  const fontWeight = options.fontWeight || 'bold';
  const textColor = options.textColor || 'white';
  const backgroundColor = options.backgroundColor || 'rgb:000000';
  const padding = options.padding || 20;
  const position = options.position || 'south';
  const offsetX = options.offsetX || 0;
  const offsetY = options.offsetY || 0;
  const opacity = options.opacity || 100;

  return (transformation: Transformation) => {
    const textStyle = new TextStyle()
      .fontFamily(fontFamily)
      .fontSize(fontSize)
      .fontWeight(fontWeight);

    // Fix the text overlay - pass both the string and the style
    return transformation.overlay(
      source(text(textContent, textStyle)).color(textColor).backgroundColor(backgroundColor)
    );
  };
};

/**
 * Transform an image using Cloudinary
 * @param publicId Cloudinary public ID
 * @param options Transform options
 * @returns Transformed image URL
 */
export function transformImage(publicId: string, options: TransformOptions = {}): string {
  if (!publicId) {
    return '/placeholder.svg';
  }

  try {
    // Check if the publicId is already a URL or a path
    const id = publicId.startsWith('http') 
      ? publicId.split('/').pop() || '' 
      : publicId;
      
    const image = cld.image(id);
    
    // Apply transformations based on options
    if (options.width || options.height) {
      const resizeAction = options.crop === 'fill' 
        ? fill() 
        : options.crop === 'scale' 
          ? scale() 
          : crop();
      
      if (options.width) resizeAction.width(options.width);
      if (options.height) resizeAction.height(options.height);
      
      image.resize(resizeAction);
    }
    
    return image.toURL();
  } catch (error) {
    console.error('Error transforming Cloudinary image:', error);
    return '/placeholder.svg';
  }
}

/**
 * Generate a player profile square thumbnail
 */
export function playerProfileSquare(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(300).height(300).gravity(autoGravity().autoFocus(FocusOn.face())));
    return image.toURL();
  } catch (error) {
    return '/assets/images/players/headshot_dummy.jpg';
  }
}

/**
 * Generate a player profile featured image
 */
export function playerProfileFeatured(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(800).height(600).gravity(autoGravity().autoFocus(FocusOn.face())));
    return image.toURL();
  } catch (error) {
    return '/assets/images/players/headshot_dummy.jpg';
  }
}

/**
 * Generate a player action shot
 */
export function playerAction(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(1200).height(800).gravity(autoGravity()));
    return image.toURL();
  } catch (error) {
    return '/assets/images/players/headshot_dummy.jpg';
  }
}

/**
 * Generate a match gallery thumbnail
 */
export function matchGalleryThumb(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(400).height(300).gravity(autoGravity()));
    return image.toURL();
  } catch (error) {
    return '/assets/images/matchday/MatchDay1.jpg';
  }
}

/**
 * Generate a featured match image
 */
export function matchFeatured(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(1200).height(675).gravity(autoGravity()));
    return image.toURL();
  } catch (error) {
    return '/assets/images/matchday/MatchDay1.jpg';
  }
}

/**
 * Generate a featured news image
 */
export function newsFeatured(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(1600).height(900).gravity(autoGravity()));
    return image.toURL();
  } catch (error) {
    return '/assets/images/news/News1.jpg';
  }
}

/**
 * Generate a news thumbnail
 */
export function newsThumbnail(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(600).height(400).gravity(autoGravity()));
    return image.toURL();
  } catch (error) {
    return '/assets/images/news/News1.jpg';
  }
}

/**
 * Generate a sponsor logo
 */
export function sponsorLogo(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(scale().width(300));
    return image.toURL();
  } catch (error) {
    return '/assets/images/sponsors/Global.png';
  }
}

/**
 * Generate a stadium panoramic image
 */
export function stadiumPanoramic(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(1600).height(600).gravity(autoGravity()));
    return image.toURL();
  } catch (error) {
    return '/assets/images/stadium/Spain Park.jpg';
  }
}

/**
 * Generate a stadium facility image
 */
export function stadiumFacility(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(800).height(600).gravity(autoGravity()));
    return image.toURL();
  } catch (error) {
    return '/assets/images/stadium/Spain Park.jpg';
  }
}

/**
 * Generate a hero banner image
 */
export function heroBanner(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(1920).height(1080).gravity(autoGravity()));
    return image.toURL();
  } catch (error) {
    return '/assets/images/team/Squad1.jpg';
  }
}

/**
 * Generate a card image
 */
export function cardImage(publicId: string): string {
  try {
    const image = cld.image(publicId);
    image.resize(fill().width(600).height(400).gravity(autoGravity()));
    return image.toURL();
  } catch (error) {
    return '/assets/images/news/News1.jpg';
  }
}

/**
 * Generate a silhouette placeholder image
 */
export function createSilhouettePlaceholder(width: number = 300, height: number = 300, text?: string): string {
  try {
    const image = cld.image('placeholder_silhouette');
    
    const transformation = new Transformation();
    transformation.resize(fill().width(width).height(height));
    
    if (text) {
      const textStyle = new TextStyle()
        .fontFamily('Arial')
        .fontSize(Math.floor(width / 10));
        
      transformation.overlay(
        source(text(text, textStyle))
          .position(new Position().gravity(compass('center')))
      );
    }
    
    image.addTransformation(transformation);
    return image.toURL();
  } catch (error) {
    return '/placeholder.svg';
  }
}

// Helper function to create a transformation for stadium images with text overlay
export const createStadiumImageTransformationWithText = (textContent: string, options: any = {}) => {
  return (transformation: Transformation) => {
    transformation
      .resize(pad().width(600).height(400).gravity(autoGravity().autoFocus(FocusOn.subject())))
      .chain(createTextOverlay(textContent, options));
  };
};
