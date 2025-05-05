
/**
 * Types and utilities for Cloudinary metadata
 */

/**
 * Content type enumeration for organizing uploads
 */
export enum ContentType {
  PLAYER = 'player',
  TEAM = 'team',
  MATCH = 'match',
  NEWS = 'news',
  SPONSOR = 'sponsor',
  STADIUM = 'stadium',
  OTHER = 'other'
}

/**
 * Metadata structure for Cloudinary uploads
 */
export interface CloudinaryMetadata {
  contentType: ContentType | string;
  entityId?: string;
  type?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

/**
 * Create standardized metadata for Cloudinary uploads
 */
export function createMetadata(
  contentType: ContentType,
  entityId: string,
  description?: string,
  additionalData?: Record<string, any>
): CloudinaryMetadata {
  return {
    contentType,
    entityId,
    metadata: {
      description,
      ...additionalData
    }
  };
}

/**
 * Format tags consistently
 */
export function formatTags(tags: string[], contentType?: ContentType | string): string[] {
  const formattedTags = tags.map(tag => tag.toLowerCase().replace(/\s+/g, '-'));
  
  if (contentType) {
    formattedTags.unshift(contentType.toString().toLowerCase());
  }
  
  return [...new Set(formattedTags)]; // Remove duplicates
}
