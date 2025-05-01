
import { Cloudinary } from '@cloudinary/url-gen';

/**
 * Cloudinary configuration for Banks o' Dee FC
 * - Cloud name: dlkpaw2a0
 * - Project folder: banksofdeefc
 */
export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dlkpaw2a0'
  },
  url: {
    secure: true
  }
});

/**
 * Base folder for all Banks o' Dee FC assets
 */
export const BASE_FOLDER = 'banksofdeefc';

/**
 * Folder structure constants
 */
export const FOLDERS = {
  PEOPLE: `${BASE_FOLDER}/people`,
  TEAMS: `${BASE_FOLDER}/teams`,
  MATCHES: `${BASE_FOLDER}/matches`,
  NEWS: `${BASE_FOLDER}/news`,
  SPONSORS: `${BASE_FOLDER}/sponsors`,
  STADIUM: `${BASE_FOLDER}/stadium`,
};

/**
 * Get the full folder path for a person's assets
 * @param id Person UUID or identifier
 */
export const getPersonFolder = (id: string): string => {
  return `${FOLDERS.PEOPLE}/person-${id}`;
};

/**
 * Get the full folder path for a match's assets
 * @param id Match UUID or identifier
 */
export const getMatchFolder = (id: string): string => {
  return `${FOLDERS.MATCHES}/match-${id}`;
};

/**
 * Get the full folder path for match gallery images
 * @param id Match UUID or identifier
 */
export const getMatchGalleryFolder = (id: string): string => {
  return `${getMatchFolder(id)}/gallery`;
};

/**
 * Get the full folder path for a news article's assets
 * @param id Article UUID or identifier
 */
export const getNewsArticleFolder = (id: string): string => {
  return `${FOLDERS.NEWS}/article-${id}`;
};

/**
 * Get the full folder path for a sponsor's assets
 * @param id Sponsor UUID or identifier
 */
export const getSponsorFolder = (id: string): string => {
  return `${FOLDERS.SPONSORS}/sponsor-${id}`;
};

/**
 * Get the full stadium folder path for a specific area
 * @param area Stadium area (exterior, facilities, interior)
 */
export const getStadiumFolder = (area: 'exterior' | 'facilities' | 'interior'): string => {
  return `${FOLDERS.STADIUM}/${area}`;
};
