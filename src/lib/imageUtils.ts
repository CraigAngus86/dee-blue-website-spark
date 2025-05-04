
/**
 * Utility functions for handling images throughout the application
 */

/**
 * Resolve image path to the correct URL format based on source
 */
export function resolveImagePath(src: string | undefined | null): string {
  // If src is undefined or null, return a placeholder or empty string
  if (src === undefined || src === null) {
    return '';
  }
  
  // If it's already a URL, return it as is
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }
  
  // If it's a relative path, format it correctly
  if (!src.startsWith('/')) {
    return `/${src}`;
  }
  
  return src;
}

/**
 * Handle image loading errors and provide fallback images
 */
export function handleImageError(src: string, fallback?: string): string {
  console.error(`Failed to load image: ${src}`);
  return fallback || createPlaceholder(400, 300);
}

/**
 * Generate a placeholder image for failed loads
 */
export function createPlaceholder(width: number = 400, height: number = 300, text?: string): string {
  const placeholderText = text || 'Image not available';
  return `https://placehold.co/${width}x${height}/CCCCCC/333333?text=${encodeURIComponent(placeholderText)}`;
}

/**
 * Transform image URL for performance optimizations
 */
export function transformImage(src: string, options: { width?: number; height?: number }): string {
  // TODO: Implement actual Cloudinary transformation logic
  return src;
}

/**
 * Get a stadium image path based on filename and view
 */
export function getStadiumImage(filename: string, view: string = 'main'): string {
  return `/images/stadium/${view}/${filename}`;
}

/**
 * Get a news image path
 */
export function getNewsImage(filename: string): string {
  return `/images/news/${filename}`;
}

/**
 * Get competitor logo path
 */
export function getCompetitorLogo(teamName: string): string {
  // Convert team name to a URL-friendly format
  const normalizedName = teamName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `/images/logos/teams/${normalizedName}.png`;
}

/**
 * Get club logo with variant
 */
export function getClubLogo(filename: string, variant: string = 'square'): string {
  return `/images/logos/club/${variant}/${filename}`;
}
