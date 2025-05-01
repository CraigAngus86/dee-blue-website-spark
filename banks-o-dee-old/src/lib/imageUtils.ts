
/**
 * Main entry point for all image-related utilities
 * This file consolidates and re-exports all image handling functionality
 * to provide a single, consistent interface for image operations.
 * 
 * @module imageUtils
 */

export {
  // Types for image configuration
  type ImageSize,
  type ImageVariant,
  type ImageBackground,
  type CompetitionImageType,
  type ImageFit,
  type ImageTransformOptions,

  // Core utilities
  resolveImagePath,
  createPlaceholder,
  handleImageError,
  mapSizeToPixels,
  transformImage,

  // Category-specific image resolvers
  getClubLogo,
  getCompetitorLogo,
  getPlayerImage,
  getNewsImage,
  getStadiumImage,
  getTeamImage,
  getMatchDayImage,
} from './utils/ImageUtils';

