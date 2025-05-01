
/**
 * Types for Cloudinary operations 
 * These provide consistent type safety across the application
 */

/**
 * Allowed image formats for Cloudinary operations
 */
export type ImageFormat = 'auto' | 'webp' | 'jpg' | 'png' | 'svg';

/**
 * Image gravity options for positioning and cropping
 */
export type ImageGravity = 'auto' | 'center' | 'face' | 'faces' | 'north' | 'south' | 'east' | 'west' | 'north_east' | 'north_west' | 'south_east' | 'south_west';

/**
 * Image crop modes for resizing
 */
export type ImageCropMode = 'fill' | 'scale' | 'fit' | 'limit' | 'thumb' | 'crop' | 'mfit' | 'pad';

/**
 * Standard device sizes for responsive images
 */
export type DeviceSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Quality settings for image optimization
 */
export type ImageQuality = 'auto' | number;

/**
 * Options for Cloudinary transformations
 */
export interface CloudinaryTransformationOptions {
  width?: number;
  height?: number;
  crop?: ImageCropMode;
  gravity?: ImageGravity;
  quality?: ImageQuality;
  format?: ImageFormat;
  effect?: string;
  angle?: number | string;
  opacity?: number;
  overlay?: string;
  underlay?: string;
  background?: string;
  border?: string;
  radius?: number | string;
  aspectRatio?: string;
  x?: number;
  y?: number;
  zoom?: number;
  dpr?: number | string;
  fetchFormat?: ImageFormat;
  density?: number;
  flags?: string;
  transformation?: string;
  [key: string]: any;
}

/**
 * Structure of a Cloudinary asset response
 */
export interface CloudinaryAsset {
  public_id: string;
  format: string;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  context?: Record<string, any>;
  metadata?: Record<string, any>;
  tags?: string[];
  etag?: string;
  version?: number;
  asset_id?: string;
  signature?: string;
  original_filename?: string;
}

/**
 * Structure for Cloudinary upload response
 */
export interface CloudinaryUploadResponse extends CloudinaryAsset {
  original_filename: string;
  signature: string;
  version: number;
  asset_id: string;
}

/**
 * Structure for upload request parameters
 */
export interface CloudinaryUploadParams {
  folder?: string;
  public_id?: string;
  resource_type?: 'image' | 'video' | 'raw' | 'auto';
  tags?: string[];
  context?: Record<string, any>;
  metadata?: Record<string, any>;
  transformation?: CloudinaryTransformationOptions | Array<CloudinaryTransformationOptions>;
  format?: ImageFormat;
  type?: 'upload' | 'private' | 'authenticated';
  access_mode?: 'public' | 'private' | 'authenticated';
  unique_filename?: boolean;
  overwrite?: boolean;
  invalidate?: boolean;
  discard_original_filename?: boolean;
  faces?: boolean;
  detection?: 'adv_face' | 'coco_v1' | 'fashion' | 'object_recognition';
  categorization?: 'google_tagging' | 'aws_rek_tagging' | 'imagga_tagging';
  auto_tagging?: number;
  background_removal?: 'cloudinary_ai' | 'pixelz' | 'remove_bg';
  file?: File | Blob | Buffer | string;
}

/**
 * Interface for image upload hooks
 */
export interface ImageUploadHook {
  uploadImage: (file: File, options?: Partial<CloudinaryUploadParams>) => Promise<CloudinaryUploadResponse>;
  isUploading: boolean;
  progress: number;
  error: Error | null;
  reset: () => void;
}

/**
 * Interface for Cloudinary React components props
 */
export interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  crop?: ImageCropMode;
  gravity?: ImageGravity;
  quality?: ImageQuality;
  format?: ImageFormat;
  responsive?: boolean;
  placeholder?: boolean;
  transformation?: CloudinaryTransformationOptions | Array<CloudinaryTransformationOptions>;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  [key: string]: any;
}
