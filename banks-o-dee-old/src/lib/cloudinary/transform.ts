
"use client";

/**
 * TEMPORARY MOCK IMPLEMENTATION
 * 
 * This is a temporary mock of the Cloudinary transform utilities
 * to allow the build to succeed while we resolve the TypeScript issues
 * with the actual Cloudinary SDK implementation.
 */

// Mock CloudinaryImage class that mimics the API surface
export class CloudinaryImage {
  private publicId: string;
  
  constructor(publicId: string = '') {
    this.publicId = publicId;
  }
  
  // Mock resize methods
  resize() { return this; }
  
  // Mock effect methods
  effect() { return this; }
  
  // Mock overlay methods
  overlay() { return this; }
  
  // Convert to URL - returns a placeholder or static path
  toURL(): string {
    // If this is a player image, return a specific placeholder
    if (this.publicId.includes('player')) {
      return '/assets/images/players/headshot_dummy.jpg';
    }
    
    // If this is a team image
    if (this.publicId.includes('team')) {
      return '/assets/images/team/Squad1.jpg';
    }
    
    // If this is a news image
    if (this.publicId.includes('news')) {
      return '/assets/images/news/News1.jpg';
    }
    
    // If this is a stadium image
    if (this.publicId.includes('stadium')) {
      return '/assets/images/stadium/Spain Park.jpg';
    }
    
    // If this is a sponsor image
    if (this.publicId.includes('sponsor')) {
      return '/assets/images/sponsors/Global.png';
    }
    
    // Default placeholder
    return '/placeholder.svg';
  }
  
  // String representation - same as URL for compatibility
  toString(): string {
    return this.toURL();
  }
}

// Mock Cloudinary instance
export const cld = {
  image: (publicId: string): CloudinaryImage => new CloudinaryImage(publicId)
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

/**
 * Transform an image using Cloudinary (MOCK)
 * @param publicId Cloudinary public ID
 * @param options Transform options
 * @returns Transformed image URL (actually a static placeholder)
 */
export function transformImage(publicId: string, options: TransformOptions = {}): string {
  if (!publicId) {
    return '/placeholder.svg';
  }

  try {
    const image = new CloudinaryImage(publicId);
    return image.toURL();
  } catch (error) {
    console.error('Error transforming Cloudinary image:', error);
    return '/placeholder.svg';
  }
}

/**
 * Generate a player profile square thumbnail (MOCK)
 */
export function playerProfileSquare(publicId: string): string {
  return '/assets/images/players/headshot_dummy.jpg';
}

/**
 * Generate a player profile featured image (MOCK)
 */
export function playerProfileFeatured(publicId: string): string {
  return '/assets/images/players/headshot_dummy.jpg';
}

/**
 * Generate a player action shot (MOCK)
 */
export function playerAction(publicId: string): string {
  return '/assets/images/players/headshot_dummy.jpg';
}

/**
 * Generate a match gallery thumbnail (MOCK)
 */
export function matchGalleryThumb(publicId: string): string {
  return '/assets/images/matchday/MatchDay1.jpg';
}

/**
 * Generate a featured match image (MOCK)
 */
export function matchFeatured(publicId: string): string {
  return '/assets/images/matchday/MatchDay1.jpg';
}

/**
 * Generate a featured news image (MOCK)
 */
export function newsFeatured(publicId: string): string {
  return '/assets/images/news/News1.jpg';
}

/**
 * Generate a news thumbnail (MOCK)
 */
export function newsThumbnail(publicId: string): string {
  return '/assets/images/news/News1.jpg';
}

/**
 * Generate a sponsor logo (MOCK)
 */
export function sponsorLogo(publicId: string): string {
  return '/assets/images/sponsors/Global.png';
}

/**
 * Generate a stadium panoramic image (MOCK)
 */
export function stadiumPanoramic(publicId: string): string {
  return '/assets/images/stadium/Spain Park.jpg';
}

/**
 * Generate a stadium facility image (MOCK)
 */
export function stadiumFacility(publicId: string): string {
  return '/assets/images/stadium/Spain Park.jpg';
}

/**
 * Generate a hero banner image (MOCK)
 */
export function heroBanner(publicId: string): string {
  return '/assets/images/team/Squad1.jpg';
}

/**
 * Generate a card image (MOCK)
 */
export function cardImage(publicId: string): string {
  return '/assets/images/news/News1.jpg';
}

/**
 * Generate a silhouette placeholder image (MOCK)
 */
export function createSilhouettePlaceholder(width: number = 300, height: number = 300, text?: string): string {
  return '/placeholder.svg';
}
