
import { ImageAsset, MatchPhoto } from "./types";

/**
 * Get responsive image srcSet for different screen sizes
 */
export const getResponsiveSrcSet = (
  basePath: string,
  sizes: { small?: string; medium?: string; large?: string; default: string }
): string => {
  const entries = [
    sizes.small && `${basePath}/${sizes.small} 640w`,
    sizes.medium && `${basePath}/${sizes.medium} 1024w`,
    sizes.large && `${basePath}/${sizes.large} 1920w`,
    `${basePath}/${sizes.default} 2560w`
  ].filter(Boolean);
  
  return entries.join(', ');
};

/**
 * Get a formatted path to an asset based on its category
 */
export const getAssetPath = (category: string, filename: string): string => {
  // Make category singular if it ends with 's'
  const singularCategory = category.endsWith('s') 
    ? category.slice(0, -1) 
    : category;
    
  return `/src/assets/images/${category}/${filename}`;
};

/**
 * Get the path to club logo based on variant and background
 */
export const getClubLogo = (
  variant: 'rect' | 'square' | 'circle' = 'circle',
  background: 'light' | 'dark' = 'dark'
): string => {
  // Use the uploaded club logos
  if (background === 'dark') {
    return "/lovable-uploads/c1270e92-10b7-4250-b57a-915bb40a0e12.png"; // Dark logo
  } else {
    return "/lovable-uploads/a5037c12-6941-420d-a1b7-a593e53a5e59.png"; // Light logo
  }
};

/**
 * Get match photos for a specific match
 */
export const getMatchPhotos = (
  matchDate: string,
  opponent: string,
  category?: string
): MatchPhoto[] => {
  // This is a placeholder - in a real app, this would fetch from an API or import from a data file
  // For now, we'll return an empty array
  // In production, this would load photos from the file system or a database
  
  const formattedDate = matchDate.split('T')[0]; // Extract YYYY-MM-DD
  const folderPath = `/src/assets/images/matchday/${formattedDate}-vs-${opponent.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Placeholder - this would be dynamically generated based on available files
  return [];
};

/**
 * Optimize image loading with quality and format options
 */
export const optimizeImageUrl = (
  url: string, 
  options?: { 
    width?: number; 
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  }
): string => {
  // In a real app with image optimization service like Cloudinary or imgix,
  // this would construct the proper URL with transformation parameters
  // For now we'll just return the original URL
  return url;
};
