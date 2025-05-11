// Types for news features

/**
 * Represents a Cloudinary image format
 */
export interface CloudinaryImage {
  public_id: string;
  format?: string;
  secure_url?: string;
  url?: string;
  alt?: string;
}

/**
 * Represents a legacy Sanity image format
 */
export interface SanityImage {
  url: string;
  alt?: string;
}

/**
 * Represents a news article
 */
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: string;
  mainImage?: CloudinaryImage | SanityImage;
  excerpt?: string;
  body: any; // Supports Portable Text blocks
  author?: string;
  isFeature?: boolean;
  matchId?: string;
  relatedPlayers?: {
    id: string;
    name: string;
    slug: string;
    profileImage?: CloudinaryImage | SanityImage;
  }[];
  gallery?: {
    images: (CloudinaryImage | SanityImage)[];
  };
}

/**
 * Type guard to check if an image is a Cloudinary image
 */
export function isCloudinaryImage(image: any): image is CloudinaryImage {
  return image && typeof image.public_id === 'string';
}

/**
 * Type guard to check if an image is a Sanity image
 */
export function isSanityImage(image: any): image is SanityImage {
  return image && typeof image.url === 'string' && !image.public_id;
}

/**
 * Get the appropriate URL for an image, handling both formats
 */
export function getImageUrl(
  image: CloudinaryImage | SanityImage | undefined, 
  options?: {
    width?: number;
    height?: number;
    aspect?: string;
    gravity?: string;
  }
): string {
  if (!image) return '';
  
  if (isCloudinaryImage(image)) {
    const { public_id, format = 'jpg' } = image;
    
    const baseUrl = 'https://res.cloudinary.com/dlkpaw2a0/image/upload';
    const { width, height, aspect = '16:9', gravity = 'auto:faces' } = options || {};
    
    let transform = `c_fill,g_${gravity}`;
    
    if (aspect) {
      transform += `,ar_${aspect}`;
    }
    
    if (width) {
      transform += `,w_${width}`;
    }
    
    if (height) {
      transform += `,h_${height}`;
    }
    
    transform += ',q_auto:good,f_auto';
    
    return `${baseUrl}/${transform}/${public_id}.${format}`;
  }
  
  return image.url;
}
