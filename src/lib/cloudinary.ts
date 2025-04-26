
import { Cloudinary } from '@cloudinary/url-gen';

/**
 * Cloudinary configuration for URL generation
 * This instance is used for creating Cloudinary transformation URLs
 */
export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0'
  },
  url: {
    secure: true
  }
});

/**
 * Gets the Cloudinary cloud name from environment or config
 */
export const getCloudName = (): string => {
  return import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0';
};

/**
 * Checks if Cloudinary is configured and should be used
 */
export const isCloudinaryEnabled = (): boolean => {
  return import.meta.env.VITE_USE_CLOUDINARY === 'true';
};

/**
 * Gets the Cloudinary upload preset name for unsigned uploads
 */
export const getUploadPreset = (): string => {
  return import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';
};
