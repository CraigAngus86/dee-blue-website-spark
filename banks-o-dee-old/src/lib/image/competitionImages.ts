
import { getPlaceholderImage } from "./imageBase";

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
