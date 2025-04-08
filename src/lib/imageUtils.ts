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
  width = 400,
  height = 300,
  text = "Image"
): string => {
  return `https://placehold.co/${width}x${height}/EEEEEE/333333?text=${encodeURIComponent(text)}`;
};

/**
 * Get a formatted path to an asset based on its category
 * With fallback to placeholder
 */
export const getAssetPath = (category: string, filename: string, fallbackText?: string): string => {
  // Return the path with the correct format
  return `/assets/images/${category}/${filename}`;
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
  // Use the actual available matchday image
  return [
    {
      src: `/assets/images/matchday/MatchDay1.jpg`,
      thumbnail: `/assets/images/matchday/MatchDay1.jpg`,
      alt: `Action from match against ${opponent}`,
      caption: `Banks o' Dee vs ${opponent}`,
      category: 'action',
    },
    {
      src: getPlaceholderImage(800, 600, `Fans at ${matchDate}`),
      thumbnail: getPlaceholderImage(300, 300, `Fans`),
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
  index: number | string = 0,
  size: 'thumbnail' | 'full' = 'full'
): string => {
  // Convert string to number if needed
  const imageIndex = typeof index === 'string' ? parseInt(index, 10) : index;
  
  // Define available news images
  const newsImages = [
    '/assets/images/news/News1.jpg',
    '/assets/images/news/News2.jpg',
    '/assets/images/news/News3.jpg',
    '/assets/images/news/News4.jpg',
    '/assets/images/news/News5.jpg'
  ];
  
  // If index is within range, return that image
  if (imageIndex >= 0 && imageIndex < newsImages.length) {
    return newsImages[imageIndex];
  }
  
  // If input is a filename that matches News1.jpg to News5.jpg, use it directly
  if (typeof index === 'string' && /^News[1-5]\.jpg$/.test(index)) {
    return `/assets/images/news/${index}`;
  }
  
  // Otherwise return the first news image
  return newsImages[0];
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
  index: number | string = 0,
  category: 'squad' | 'training' | 'celebration' | 'other' = 'squad'
): string => {
  // Convert string to number if needed
  const imageIndex = typeof index === 'string' ? parseInt(index, 10) : index;
  
  // Map of available team images
  const teamImages = [
    "/assets/images/team/Squad1.jpg",
    "/assets/images/team/Training1_Square.jpg",
    "/assets/images/team/Training2_Square.jpg",
    "/assets/images/team/Training3_Square.jpg",
    "/assets/images/team/Training4_Square.jpg"
  ];
  
  // If index is within range, return that image
  if (imageIndex >= 0 && imageIndex < teamImages.length) {
    return teamImages[imageIndex];
  }
  
  // If index is a specific filename
  if (typeof index === 'string') {
    const trainingImages = [
      "Training1_Square.jpg",
      "Training2_Square.jpg",
      "Training3_Square.jpg",
      "Training4_Square.jpg"
    ];
    
    if (index === "Squad1.jpg") {
      return `/assets/images/team/${index}`;
    }
    
    if (trainingImages.includes(index)) {
      return `/assets/images/team/${index}`;
    }
  }
  
  // Default to the first image (squad)
  return teamImages[0];
};

/**
 * Get player image with proper path
 */
export const getPlayerImage = (
  playerId: string | number,
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
  if (typeof playerId === 'number') {
    const playerIndex = playerId - 1;
    if (playerIndex >= 0 && playerIndex < playerImages.length) {
      return `/assets/images/players/${playerImages[playerIndex]}`;
    }
  } else if (typeof playerId === 'string') {
    // Try to match player name to filename
    const playerName = playerId.toLowerCase();
    const matchedImage = playerImages.find(img => 
      img.toLowerCase().includes(playerName)
    );
    
    if (matchedImage) {
      return `/assets/images/players/${matchedImage}`;
    }
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
  // No competition images available yet, use placeholder
  return getPlaceholderImage(400, 400, `Competition: ${filename}`);
};

/**
 * Get competitor logo with proper path
 */
export const getCompetitorLogo = (
  teamName: string,
  variant?: 'default' | 'alternate'
): string => {
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
  return getPlaceholderImage(200, 200, teamName);
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
  // Available sponsor images with exact filenames
  const sponsorImages: Record<string, string> = {
    "AD23": "AD23.jpg",
    "BJK": "BJK Winton copy.jpg",
    "GDI": "GDI.jpeg",
    "Global": "Global.png",
    "Three60": "Three60 copy.jpg",
    "Saltire": "saltire.jpg"
  };
  
  // Find a matching sponsor image - exact match or partial match
  const exactMatch = sponsorImages[sponsorName] || sponsorImages[sponsorName.toUpperCase()];
  if (exactMatch) {
    return `/assets/images/sponsors/${exactMatch}`;
  }
  
  // Try to find partial match
  const sponsorKey = Object.keys(sponsorImages).find(key => 
    sponsorName.toLowerCase().includes(key.toLowerCase()) ||
    key.toLowerCase().includes(sponsorName.toLowerCase())
  );
  
  if (sponsorKey) {
    return `/assets/images/sponsors/${sponsorImages[sponsorKey]}`;
  }
  
  // Fallback to placeholder
  return getPlaceholderImage(400, 200, `Sponsor: ${sponsorName}`);
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

/**
 * Get matchday image with proper path
 */
export const getMatchDayImage = (): string => {
  return `/assets/images/matchday/MatchDay1.jpg`;
};
