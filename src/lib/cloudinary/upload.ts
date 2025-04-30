
import { FOLDERS, getPersonFolder, getMatchFolder, getNewsArticleFolder, getSponsorFolder } from './config';
import { CloudinaryMetadata, ContentType, createMetadata, formatTags } from './metadata';

/**
 * Upload options for Cloudinary
 */
export interface UploadParams {
  folder: string;
  public_id?: string;
  resource_type?: 'image' | 'video' | 'raw' | 'auto';
  metadata?: CloudinaryMetadata;
  tags?: string[];
  context?: Record<string, any>;
  transformation?: Record<string, any>[];
}

/**
 * Creates upload parameters for a player image
 * @param playerId Player UUID or ID
 * @param imageType Type of player image (profile, action)
 * @param index Optional index for multiple images of same type
 */
export function createPlayerUploadParams(
  playerId: string,
  imageType: 'profile' | 'action' = 'profile',
  index?: number
): UploadParams {
  const folder = getPersonFolder(playerId);
  const publicId = index ? `${imageType}-${index}` : imageType;
  
  return {
    folder,
    public_id: publicId,
    resource_type: 'image',
    metadata: createMetadata(
      ContentType.PLAYER,
      playerId,
      `Image of player ${playerId}`,
    ),
    tags: formatTags(['player', imageType], ContentType.PLAYER)
  };
}

/**
 * Creates upload parameters for a team image
 * @param teamId Team UUID or ID
 * @param imageType Type of team image
 */
export function createTeamUploadParams(
  teamId: string,
  imageType: 'logo' | 'squad' | 'training' = 'logo'
): UploadParams {
  const folder = FOLDERS.TEAMS;
  const publicId = `team-${teamId}-${imageType}`;
  
  return {
    folder,
    public_id: publicId,
    resource_type: 'image',
    metadata: createMetadata(
      ContentType.TEAM,
      teamId,
      `${imageType} image for team ${teamId}`,
    ),
    tags: formatTags(['team', imageType], ContentType.TEAM)
  };
}

/**
 * Creates upload parameters for a match gallery image
 * @param matchId Match UUID or ID
 * @param category Image category
 * @param index Image index
 */
export function createMatchGalleryUploadParams(
  matchId: string,
  category: 'action' | 'celebration' | 'fans' | 'pre-match' | 'post-match',
  index: number
): UploadParams {
  const folder = `${getMatchFolder(matchId)}/gallery`;
  const publicId = `${category}-${index}`;
  
  return {
    folder,
    public_id: publicId,
    resource_type: 'image',
    metadata: createMetadata(
      ContentType.MATCH,
      matchId,
      `${category} image from match ${matchId}`,
    ),
    tags: formatTags(['match', 'gallery', category], ContentType.MATCH)
  };
}

/**
 * Creates upload parameters for a news article image
 * @param articleId Article UUID or ID
 * @param imageType Type of article image
 * @param index Optional index for multiple images
 */
export function createNewsUploadParams(
  articleId: string,
  imageType: 'featured' | 'content' = 'featured',
  index?: number
): UploadParams {
  const folder = getNewsArticleFolder(articleId);
  const publicId = index ? `${imageType}-${index}` : imageType;
  
  return {
    folder,
    public_id: publicId,
    resource_type: 'image',
    metadata: createMetadata(
      ContentType.NEWS,
      articleId,
      `${imageType} image for article ${articleId}`,
    ),
    tags: formatTags(['news', imageType], ContentType.NEWS)
  };
}

/**
 * Creates upload parameters for a sponsor logo
 * @param sponsorId Sponsor UUID or ID
 * @param variant Logo variant (light or dark)
 */
export function createSponsorLogoUploadParams(
  sponsorId: string,
  variant: 'light' | 'dark' = 'dark'
): UploadParams {
  const folder = getSponsorFolder(sponsorId);
  const publicId = `logo-${variant}`;
  
  return {
    folder,
    public_id: publicId,
    resource_type: 'image',
    metadata: createMetadata(
      ContentType.SPONSOR,
      sponsorId,
      `${variant} logo for sponsor ${sponsorId}`,
    ),
    tags: formatTags(['sponsor', 'logo', variant], ContentType.SPONSOR)
  };
}

/**
 * Creates upload parameters for a stadium image
 * @param area Stadium area
 * @param name Descriptive name for the image
 */
export function createStadiumUploadParams(
  area: 'exterior' | 'facilities' | 'interior',
  name: string
): UploadParams {
  const folder = `${FOLDERS.STADIUM}/${area}`;
  const publicId = name.toLowerCase().replace(/\s+/g, '-');
  
  return {
    folder,
    public_id: publicId,
    resource_type: 'image',
    metadata: createMetadata(
      ContentType.STADIUM,
      'spain-park', // Stadium identifier
      `${area} image of Spain Park: ${name}`,
    ),
    tags: formatTags(['stadium', area], ContentType.STADIUM)
  };
}
