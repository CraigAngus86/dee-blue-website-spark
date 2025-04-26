import { getPlaceholderImageUrl } from "../ImageUtils";

/**
 * Get competition image with proper path
 */
export const getCompetitionImage = (
  filename: string,
  type: 'trophy' | 'logo' | 'winners' | 'other' = 'logo'
): string => {
  // No competition images available yet, use placeholder
  return getPlaceholderImageUrl(400, 400, `Competition: ${filename}`);
};
