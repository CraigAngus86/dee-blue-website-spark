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
  // Check if image is available in assets/images
  const path = `/assets/images/${category}/${filename}`;
  
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
  const logoName = background === 'dark' ? 'BOD_Logo_Navy_square.png' : 'BOD_Logo_White_square.png';
  return `/assets/images/logos/${logoName}`;
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
  
  return [
    {
      src: `/assets/images/matchday/MatchDay1.jpg`,
      thumbnail: `/assets/images/matchday/MatchDay1.jpg`,
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
  // We'll use the News1-News5 images from the assets directory
  // If filename explicitly references one of these, use it
  const newsImages = ["News1.jpg", "News2.jpg", "News3.jpg", "News4.jpg", "News5.jpg"];
  
  if (newsImages.includes(filename)) {
    return `/assets/images/news/${filename}`;
  }
  
  // Otherwise use the first image as default or a placeholder
  return newsImages.length > 0 
    ? `/assets/images/news/${newsImages[0]}`
    : getPlaceholderImage(`News: ${filename}`, 800, 450);
};

/**
 * Get stadium images
 */
export const getStadiumImage = (
  filename: string = "Spain Park.jpg",
  view: 'aerial' | 'main' | 'pitch' | 'facilities' | 'other' = 'main'
): string => {
  // Check if the specific filename exists in the stadium assets
  return `/assets/images/stadium/${filename}`;
};

/**
 * Get team photo with proper path
 */
export const getTeamImage = (
  filename: string = "Squad1.jpg",
  category: 'squad' | 'training' | 'celebration' | 'other' = 'squad'
): string => {
  // Map the category to actual available filenames
  if (category === 'training') {
    const trainingImages = [
      "Training1_Square.jpg",
      "Training2_Square.jpg",
      "Training3_Square.jpg",
      "Training4_Square.jpg"
    ];
    
    // If filename is specified and exists in training images, use it
    if (filename !== "Squad1.jpg" && trainingImages.includes(filename)) {
      return `/assets/images/team/${filename}`;
    }
    
    // Otherwise pick the first training image
    return `/assets/images/team/${trainingImages[0]}`;
  }
  
  // Default to the squad image
  return `/assets/images/team/Squad1.jpg`;
};

/**
 * Get player image with proper path
 */
export const getPlayerImage = (
  playerId: string,
  type: 'headshot' | 'action' | 'profile' = 'headshot'
): string => {
  // Available player headshots
  const playerImages = [
    "Ewen_Headshot.jpg",
    "Gilly_Headshot.jpg",
    "Hamish_Headshot.jpg",
    "Jevan_Headshot.jpg",
    "Lachie Test.jpg",
    "Laws_Headshot.jpg",
    "Luke_Headshot.jpg",
    "Mags_Headshot.jpg"
  ];
  
  // If playerId is a number, try to map it to an available image
  const playerIndex = parseInt(playerId) - 1;
  if (!isNaN(playerIndex) && playerIndex >= 0 && playerIndex < playerImages.length) {
    return `/assets/images/players/${playerImages[playerIndex]}`;
  }
  
  // Fallback to the dummy headshot
  return `/assets/images/players/headshot_dummy.jpg`;
};

/**
 * Get competition image with proper path
 */
export const getCompetitionImage = (
  filename: string,
  type: 'trophy' | 'logo' | 'winners' | 'other' = 'logo'
): string => {
  // Check if image exists in competitions assets
  // Currently no competition images are available, use placeholder
  return getPlaceholderImage(`Competition: ${filename}`, 400, 400);
};

/**
 * Get competitor logo with proper path
 */
export const getCompetitorLogo = (
  teamName: string,
  variant?: 'default' | 'alternate'
): string => {
  // Convert team name to match the format of the competitor image files
  // Available competitor images: Brechin.png, Brora.png, etc.
  
  // Extract the first part of the team name (before any spaces)
  const teamKey = teamName.split(' ')[0];
  
  // List of available competitor images
  const competitorImages = [
    "Brechin",
    "Brora",
    "Buckie",
    "Clach",
    "Deveronvale",
    "Formartine",
    "Forres",
    "Fraserburgh",
    "Huntly",
    "Keith",
    "Locos",
    "Lossie",
    "Nairn",
    "Rothes",
    "Strathspey",
    "Turriff",
    "Wick"
  ];
  
  // Find a matching competitor image
  const match = competitorImages.find(name => 
    teamKey.toLowerCase().includes(name.toLowerCase()) || 
    name.toLowerCase().includes(teamKey.toLowerCase())
  );
  
  if (match) {
    return `/assets/images/competitors/${match}.png`;
  }
  
  // Fallback to placeholder if no match is found
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
  // In a real app with image optimization service, this would apply transformations
  return url;
};

/**
 * Get sponsor logo path
 */
export const getSponsorLogo = (
  sponsorName: string,
  variant: 'default' | 'light' | 'dark' = 'default'
): string => {
  // Available sponsor images
  const sponsorImages = {
    "AD23": "AD23.jpg",
    "BJK Winton": "BJK Winton copy.jpg",
    "GDI": "GDI.jpeg",
    "Global": "Global.png",
    "Three60": "Three60 copy.jpg",
    "Saltire": "saltire.jpg"
  };
  
  // Find a matching sponsor image - exact match or partial match
  const exactMatch = sponsorImages[sponsorName as keyof typeof sponsorImages];
  if (exactMatch) {
    return `/assets/images/sponsors/${exactMatch}`;
  }
  
  // Try to find partial match
  const sponsorKey = Object.keys(sponsorImages).find(key => 
    sponsorName.toLowerCase().includes(key.toLowerCase()) ||
    key.toLowerCase().includes(sponsorName.toLowerCase())
  );
  
  if (sponsorKey) {
    return `/assets/images/sponsors/${sponsorImages[sponsorKey as keyof typeof sponsorImages]}`;
  }
  
  // Fallback to placeholder
  return getPlaceholderImage(`Sponsor: ${sponsorName}`, 400, 200);
};

/**
 * Get newly uploaded player headshots
 */
export const getPlayerHeadshot = (
  playerNumber: number,
  name?: string
): string => {
  // Available player headshots
  const playerImages = [
    "Ewen_Headshot.jpg",
    "Gilly_Headshot.jpg",
    "Hamish_Headshot.jpg",
    "Jevan_Headshot.jpg",
    "Lachie Test.jpg",
    "Laws_Headshot.jpg",
    "Luke_Headshot.jpg",
    "Mags_Headshot.jpg"
  ];
  
  // If playerNumber is within range, use the corresponding image
  if (playerNumber > 0 && playerNumber <= playerImages.length) {
    return `/assets/images/players/${playerImages[playerNumber - 1]}`;
  }
  
  // Fallback to the dummy headshot
  return `/assets/images/players/headshot_dummy.jpg`;
};
