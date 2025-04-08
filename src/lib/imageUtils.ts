
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
  // Return correct path to logo in the src/assets folder structure
  return `/src/assets/images/logos/banks-o-dee-logo-${background}.png`;
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
 * Get news images with proper paths
 */
export const getNewsImage = (
  filename: string,
  size: 'thumbnail' | 'full' = 'full'
): string => {
  // Return the path to the news image
  return `/src/assets/images/news/${filename}${size === 'thumbnail' ? '-thumb' : ''}`;
};

/**
 * Get stadium images
 */
export const getStadiumImage = (
  filename: string,
  view: 'aerial' | 'main' | 'pitch' | 'facilities' | 'other' = 'main'
): string => {
  // Return the path to the stadium image
  return `/src/assets/images/stadium/${filename}`;
};

/**
 * Get team photo with proper path
 */
export const getTeamImage = (
  filename: string,
  category: 'squad' | 'training' | 'celebration' | 'other' = 'squad'
): string => {
  // Return the path to the team image
  return `/src/assets/images/team/${filename}`;
};

/**
 * Get player image with proper path
 */
export const getPlayerImage = (
  playerId: string,
  type: 'headshot' | 'action' | 'profile' = 'headshot'
): string => {
  // Return the path to the player image
  return `/src/assets/images/players/player-${playerId}${type !== 'headshot' ? `-${type}` : ''}.jpg`;
};

/**
 * Get competition image with proper path
 */
export const getCompetitionImage = (
  filename: string,
  type: 'trophy' | 'logo' | 'winners' | 'other' = 'logo'
): string => {
  // Return the path to the competition image
  return `/src/assets/images/competitions/${filename}`;
};

/**
 * Get competitor logo with proper path
 */
export const getCompetitorLogo = (
  teamName: string,
  variant?: 'default' | 'alternate'
): string => {
  // Convert team name to kebab-case for filename
  const filename = teamName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
    
  return `/src/assets/images/competitors/${filename}${variant === 'alternate' ? '-alt' : ''}.png`;
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

/**
 * Generate a Lovable uploads path for an image
 * For images uploaded directly via Lovable's interface
 */
export const getLovableUploadPath = (uuid: string): string => {
  return `/lovable-uploads/${uuid}`;
};

/**
 * Get newly uploaded player headshots
 */
export const getPlayerHeadshot = (
  playerNumber: number,
  name?: string
): string => {
  return `/src/assets/images/players/player${playerNumber}${name ? `-${name}` : ''}.jpg`;
};
