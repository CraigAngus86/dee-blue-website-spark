
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
 * Generate a placeholder image URL
 */
export const getPlaceholderImage = (
  width = 400,
  height = 300,
  text = "Image"
): string => {
  return `https://placehold.co/${width}x${height}/EEEEEE/333333?text=${encodeURIComponent(text)}`;
};

/**
 * Get a formatted path to an asset based on its category
 */
export const getAssetPath = (category: string, filename: string): string => {
  return `/assets/images/${category}/${filename}`;
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
  return url;
};
