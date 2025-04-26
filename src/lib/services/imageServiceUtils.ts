
import { ImageService, DefaultImageService } from './ImageService';

// Singleton instance for the current image service
let currentService: ImageService = new DefaultImageService();

/**
 * Get the current image service instance
 * @returns The current image service
 */
export const getImageService = (): ImageService => currentService;

/**
 * Set a new image service implementation
 * This will be used when integrating with Cloudinary or other services
 * @param service - The image service implementation to use
 */
export const setImageService = (service: ImageService) => {
  currentService = service;
};
