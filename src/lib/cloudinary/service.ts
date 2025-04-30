import { cloudinary } from './config';
import { createPlayerUploadParams, createNewsUploadParams } from './upload';
import { CloudinaryMetadata, ContentType } from './metadata';
import { transformImage } from './transform';

/**
 * Interface for upload results
 */
export interface CloudinaryUploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  format: string;
  width: number;
  height: number;
  resourceType: string;
  createdAt: string;
  tags: string[];
  metadata: Record<string, any>;
  assetId?: string;
}

/**
 * Error thrown by Cloudinary operations
 */
export class CloudinaryError extends Error {
  public status?: number;
  public details?: any;

  constructor(message: string, status?: number, details?: any) {
    super(message);
    this.name = 'CloudinaryError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Main service class for interacting with Cloudinary
 * Provides methods for uploads, retrieval, and management
 */
export class CloudinaryService {
  /**
   * Upload a file to Cloudinary with appropriate parameters
   * @param file File to upload (Browser File or Node.js Buffer/Stream)
   * @param contentType Type of content being uploaded
   * @param entityId ID of the entity this image belongs to
   * @param options Additional options
   * @returns Upload result
   */
  static async uploadMedia(
    file: File | Buffer | any,
    contentType: ContentType,
    entityId: string,
    options: {
      type?: 'profile' | 'action' | 'featured' | 'logo' | 'content';
      index?: number;
      metadata?: Record<string, any>;
      tags?: string[];
    } = {}
  ): Promise<CloudinaryUploadResult> {
    try {
      // Generate appropriate upload parameters based on content type
      const uploadParams = this.getUploadParams(contentType, entityId, options);
      
      // Upload with universal upload adapter (browser or Node.js environment)
      const result = await this.universalUpload(file, uploadParams);
      
      return {
        publicId: result.public_id,
        url: result.url,
        secureUrl: result.secure_url,
        format: result.format,
        width: result.width,
        height: result.height,
        resourceType: result.resource_type,
        createdAt: result.created_at,
        tags: result.tags || [],
        metadata: result.metadata || {},
        assetId: result.asset_id,
      };
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new CloudinaryError(
        `Failed to upload ${contentType} image: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500,
        error
      );
    }
  }
  
  /**
   * Generate a signed URL for client-side uploads
   * @param contentType Type of content being uploaded
   * @param entityId ID of the entity this image belongs to
   * @param options Additional options
   * @returns Signed upload parameters
   */
  static generateSignedUploadParams(
    contentType: ContentType,
    entityId: string,
    options: {
      type?: 'profile' | 'action' | 'featured' | 'logo' | 'content';
      index?: number;
      metadata?: Record<string, any>;
      tags?: string[];
      maxFileSize?: number;
      allowedFormats?: string[];
    } = {}
  ): Record<string, any> {
    // Implementation would require server-side code with authentication
    // This is a placeholder - actual implementation requires backend support
    console.warn('generateSignedUploadParams requires server-side implementation');
    
    return {
      apiKey: 'CLOUDINARY_API_KEY', // Would be set from environment variables
      uploadParams: this.getUploadParams(contentType, entityId, options),
      timestamp: Math.round(new Date().getTime() / 1000),
      // Signature would be generated on the server
    };
  }
  
  /**
   * List assets in a specific folder
   * @param folder Folder path
   * @param options Listing options
   * @returns List of assets
   */
  static async listAssets(
    folder: string,
    options: {
      maxResults?: number;
      nextCursor?: string;
      tags?: string[];
      resourceType?: 'image' | 'video' | 'raw';
    } = {}
  ): Promise<{ assets: any[]; nextCursor?: string; total: number }> {
    try {
      // This is a placeholder - actual implementation requires backend support
      console.warn('listAssets requires server-side implementation');
      
      return {
        assets: [],
        total: 0
      };
    } catch (error) {
      console.error('Error listing Cloudinary assets:', error);
      throw new CloudinaryError(
        `Failed to list assets in folder ${folder}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500,
        error
      );
    }
  }
  
  /**
   * Delete an asset from Cloudinary
   * @param publicId Public ID of the asset to delete
   * @returns Result of deletion
   */
  static async deleteAsset(publicId: string): Promise<{ result: 'ok' | 'not_found' }> {
    try {
      // This is a placeholder - actual implementation requires backend support
      console.warn('deleteAsset requires server-side implementation');
      
      return { result: 'ok' };
    } catch (error) {
      console.error('Error deleting Cloudinary asset:', error);
      throw new CloudinaryError(
        `Failed to delete asset ${publicId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500,
        error
      );
    }
  }
  
  /**
   * Update asset metadata
   * @param publicId Public ID of the asset
   * @param metadata New metadata to set
   * @returns Updated asset details
   */
  static async updateMetadata(
    publicId: string,
    metadata: Record<string, any>
  ): Promise<{ publicId: string; metadata: Record<string, any> }> {
    try {
      // This is a placeholder - actual implementation requires backend support
      console.warn('updateMetadata requires server-side implementation');
      
      return {
        publicId,
        metadata,
      };
    } catch (error) {
      console.error('Error updating Cloudinary metadata:', error);
      throw new CloudinaryError(
        `Failed to update metadata for ${publicId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500,
        error
      );
    }
  }
  
  /**
   * Private method to get appropriate upload parameters based on content type
   */
  private static getUploadParams(
    contentType: ContentType,
    entityId: string,
    options: {
      type?: 'profile' | 'action' | 'featured' | 'logo' | 'content';
      index?: number;
      metadata?: Record<string, any>;
      tags?: string[];
    }
  ) {
    const { type, index, metadata, tags } = options;
    
    switch (contentType) {
      case ContentType.PLAYER:
        return createPlayerUploadParams(entityId, type as 'profile' | 'action' || 'profile', index);
      case ContentType.NEWS:
        return createNewsUploadParams(entityId, type as 'featured' | 'content' || 'featured', index);
      // Other content type handlers would be implemented here
      default:
        throw new Error(`Unsupported content type: ${contentType}`);
    }
  }
  
  /**
   * Universal upload method that works in both browser and Node.js
   * This is a placeholder - implementation would depend on environment
   */
  private static async universalUpload(file: any, uploadParams: any): Promise<any> {
    // This is a placeholder - actual implementation depends on environment
    console.warn('universalUpload requires environment-specific implementation');
    
    return {
      public_id: 'sample',
      url: 'https://example.com/sample.jpg',
      secure_url: 'https://example.com/sample.jpg',
      format: 'jpg',
      width: 800,
      height: 600,
      resource_type: 'image',
      created_at: new Date().toISOString(),
      tags: [],
      metadata: {},
    };
  }
}
