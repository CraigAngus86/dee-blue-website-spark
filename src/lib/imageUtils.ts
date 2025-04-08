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
 * Generate a placeholder image URL
 */
export const getPlaceholderImage = (
  text: string,
  width = 400,
  height = 300,
  bgColor = "EEEEEE",
  textColor = "333333"
): string => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

/**
 * Get a formatted path to an asset based on its category
 * With fallback to placeholder
 */
export const getAssetPath = (category: string, filename: string, fallbackText?: string): string => {
  // Check if image is available in lovable-uploads
  const path = `/lovable-uploads/${category}/${filename}`;
  
  // If no fallback text is provided, return the path directly
  // The ResponsiveImage component will handle fallbacks
  return path;
};

/**
 * Get the path to club logo based on variant and background
 */
export const getClubLogo = (
  variant: 'rect' | 'square' | 'circle' = 'circle',
  background: 'light' | 'dark' = 'dark'
): string => {
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
  const formattedDate = matchDate.split('T')[0]; // Extract YYYY-MM-DD
  const opponentSlug = opponent.toLowerCase().replace(/\s+/g, '-');
  
  // Generate placeholder match photos
  return [
    {
      src: getPlaceholderImage(`Match Action vs ${opponent}`, 800, 600),
      thumbnail: getPlaceholderImage(`Match Action vs ${opponent}`, 300, 300),
      alt: `Action from match against ${opponent}`,
      caption: `Banks o' Dee vs ${opponent}`,
      category: 'action',
    },
    {
      src: getPlaceholderImage(`Fans at ${matchDate}`, 800, 600),
      thumbnail: getPlaceholderImage(`Fans`, 300, 300),
      alt: "Fans cheering",
      caption: "Fans cheering at Spain Park",
      category: 'fans',
    }
  ];
};

/**
 * Get news images with proper paths
 */
export const getNewsImage = (
  filename: string,
  size: 'thumbnail' | 'full' = 'full'
): string => {
  // Check if the news image is one of the ones from previous assets
  const legacyImages = [
    "2025-04-01-post-match-reaction.png",
    "2025-04-02-contract-extensions.png", 
    "2025-04-03-winton-lawson-deals.png",
    "2025-04-05-chairman-message.png",
    "2025-04-08-match-action-keeper-save.png"
  ];
  
  if (legacyImages.includes(filename)) {
    return `/src/assets/images/news/${filename}`;
  }
  
  // Otherwise use placeholder
  return getPlaceholderImage(`News: ${filename}`, 800, 450);
};

/**
 * Get stadium images
 */
export const getStadiumImage = (
  filename: string,
  view: 'aerial' | 'main' | 'pitch' | 'facilities' | 'other' = 'main'
): string => {
  return getPlaceholderImage(`Stadium: ${view}`, 1200, 800);
};

/**
 * Get team photo with proper path
 */
export const getTeamImage = (
  filename: string,
  category: 'squad' | 'training' | 'celebration' | 'other' = 'squad'
): string => {
  return getPlaceholderImage(`Team: ${category}`, 1200, 800);
};

/**
 * Get player image with proper path
 */
export const getPlayerImage = (
  playerId: string,
  type: 'headshot' | 'action' | 'profile' = 'headshot'
): string => {
  return getPlaceholderImage(`Player ${playerId} (${type})`, 400, 600);
};

/**
 * Get competition image with proper path
 */
export const getCompetitionImage = (
  filename: string,
  type: 'trophy' | 'logo' | 'winners' | 'other' = 'logo'
): string => {
  return getPlaceholderImage(`Competition: ${filename}`, 400, 400);
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
    
  return getPlaceholderImage(teamName, 200, 200);
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
  return getPlaceholderImage(`Player ${playerNumber}${name ? ` (${name})` : ''}`, 400, 600);
};
