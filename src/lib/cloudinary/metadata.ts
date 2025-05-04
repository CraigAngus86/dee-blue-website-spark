
/**
 * Types for Cloudinary metadata
 */
export enum ContentType {
  NEWS = 'news',
  PLAYER = 'player',
  MATCH = 'match',
  TEAM = 'team',
  SPONSOR = 'sponsor',
  STADIUM = 'stadium',
  OTHER = 'other'
}

export interface CloudinaryMetadata {
  contentType: ContentType | string;
  entityId?: string;
  type?: string;
  metadata?: Record<string, any>;
  tags?: string[];
}

export function createMetadata(
  contentType: ContentType | string,
  entityId: string,
  altText: string,
  metadata: Record<string, any> = {}
): Record<string, any> {
  return {
    contentType,
    entityId,
    altText,
    ...metadata
  };
}

export function formatTags(tags: string[], contentType: ContentType | string): string[] {
  return [contentType, ...tags].filter(Boolean);
}
