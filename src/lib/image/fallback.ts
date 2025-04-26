
import { getPlaceholderImageUrl } from "../ImageUtils";

export type ImageCategory = 
  | 'news' 
  | 'players' 
  | 'team' 
  | 'stadium' 
  | 'sponsors' 
  | 'competitions' 
  | 'matchday';

/**
 * Get a fallback image URL for a specific category
 */
export const getFallbackImage = (
  category: ImageCategory,
  width = 400,
  height = 300
): string => {
  const fallbacks: Record<ImageCategory, string> = {
    news: "https://images.unsplash.com/photo-1495020689067-958852a7765e",
    players: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    team: "https://images.unsplash.com/photo-1459865264687-595d652de67e",
    stadium: "https://images.unsplash.com/photo-1577223618563-67fb5a0e4141",
    sponsors: getPlaceholderImageUrl(width, height, "Sponsor Logo"),
    competitions: getPlaceholderImageUrl(width, height, "Competition"),
    matchday: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
  };

  return fallbacks[category];
};

/**
 * Get dimensions for different image categories
 */
export const getImageDimensions = (category: ImageCategory): { width: number; height: number } => {
  const dimensions: Record<ImageCategory, { width: number; height: number }> = {
    news: { width: 1200, height: 630 },
    players: { width: 400, height: 600 },
    team: { width: 1200, height: 800 },
    stadium: { width: 1920, height: 1080 },
    sponsors: { width: 400, height: 200 },
    competitions: { width: 800, height: 800 },
    matchday: { width: 1200, height: 800 }
  };

  return dimensions[category];
};
