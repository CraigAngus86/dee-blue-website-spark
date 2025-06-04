/**
 * Metadata types for Cloudinary uploads
 */
import { ContentType } from './client';

/**
 * Interface for metadata to be attached to Cloudinary uploads
 */
export interface CloudinaryMetadata {
  contentType: string;
  entityId?: string;
  type?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

/**
 * Format tags for Cloudinary uploads
 * @param tags Custom tags to include
 * @param contentType Content type tag
 * @returns Formatted array of tags
 */
export function formatTags(tags: string[], contentType: ContentType | string): string[] {
  const allTags = ['banksofdeefc'];
  
  // Add content type tag
  allTags.push(contentType.toString().toLowerCase());
  
  // Add custom tags
  if (tags && tags.length > 0) {
    allTags.push(...tags.map(tag => tag.toLowerCase()));
  }
  
  // Remove duplicates and return
  return Array.from(new Set(allTags));
}

/**
 * Create metadata for Cloudinary uploads
 * @param contentType Type of content
 * @param entityId Entity identifier
 * @param altText Alternative text for accessibility
 * @param customData Additional custom metadata
 * @returns Formatted metadata
 */
export function createMetadata(
  contentType: ContentType | string,
  entityId: string,
  altText: string,
  customData: Record<string, any> = {}
): Record<string, any> {
  return {
    alt: altText,
    contentType: contentType.toString(),
    entityId,
    banksofdeefc: true,
    ...customData
  };
}
