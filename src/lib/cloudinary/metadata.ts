
/**
 * Standard metadata fields for Cloudinary assets
 */
export interface CloudinaryMetadata {
  content_type: string;
  entity_id: string;
  alt_text?: string;
  credit?: string;
  tags?: string[];
}

/**
 * Content types for metadata categorization
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
 * Creates metadata object for Cloudinary uploads
 * @param contentType Type of content
 * @param entityId UUID or identifier for the related entity
 * @param altText Accessibility text for the image
 * @param credit Attribution information
 * @param tags Array of tags for categorization
 */
export function createMetadata(
  contentType: ContentType | string,
  entityId: string,
  altText?: string,
  credit?: string,
  tags?: string[]
): CloudinaryMetadata {
  return {
    content_type: contentType,
    entity_id: entityId,
    alt_text: altText,
    credit: credit,
    tags: tags
  };
}

/**
 * Formats tags for Cloudinary metadata
 * Ensures consistent format and includes default tags
 * @param tags Custom tags to include
 * @param contentType Content type to auto-include as tag
 */
export function formatTags(tags: string[] = [], contentType?: string): string[] {
  const formattedTags = tags.map(tag => tag.toLowerCase().replace(/\s+/g, '-'));
  
  // Include content type as a tag if provided
  if (contentType) {
    formattedTags.push(contentType.toLowerCase());
  }
  
  // Add banks-o-dee tag to all assets
  formattedTags.push('banks-o-dee');
  
  return [...new Set(formattedTags)]; // Remove duplicates
}
