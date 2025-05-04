
/**
 * Type definitions for Cloudinary metadata
 */

export enum ContentType {
  PLAYER = 'playerProfile',
  NEWS = 'newsArticle',
  MATCH = 'matchGallery',
  SPONSOR = 'sponsor',
  STADIUM = 'stadium',
  OTHER = 'other'
}

export interface CloudinaryMetadata {
  contentType: string;
  entityId?: string;
  type?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  uploadPreset?: string;
}
