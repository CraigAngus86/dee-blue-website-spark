
/**
 * Re-export all image utilities from the consolidated location
 * This file serves as the main entry point for all image-related utilities
 */

export {
  type ImageSize,
  type ImageVariant,
  type ImageBackground,
  type CompetitionImageType,
  type ImageFit,
  type ImageTransformOptions,
  resolveImagePath,
  createPlaceholder,
  handleImageError,
  mapSizeToPixels,
  transformImage,
  getClubLogo,
  getCompetitorLogo,
  getPlayerImage,
  getNewsImage,
  getStadiumImage,
} from './utils/ImageUtils';

