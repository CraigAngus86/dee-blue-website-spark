
/**
 * Types for Cloudinary metadata
 */

export enum ContentType {
  PLAYER = 'player',
  NEWS = 'news',
  MATCH = 'match',
  STADIUM = 'stadium',
  SPONSOR = 'sponsor',
  FAN = 'fan',
  GENERAL = 'general'
}

export interface CloudinaryMetadata {
  contentType: ContentType;
  entityId?: string;
  type?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}
