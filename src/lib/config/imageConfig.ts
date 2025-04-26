
import { setupCloudinaryService } from '../services/CloudinaryImageService';

/**
 * Configures and initializes the image service
 * 
 * This should be called early in the application bootstrap process
 */
export const configureImageService = () => {
  // Check if we should use Cloudinary
  const useCloudinary = import.meta.env.VITE_USE_CLOUDINARY === 'true';
  
  if (useCloudinary) {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0';
    
    setupCloudinaryService({
      cloudName,
      autoFormat: true,
      autoQuality: true,
      defaultQuality: 80
    });
    
    console.info(`Cloudinary image service initialized for cloud: ${cloudName}`);
  } else {
    console.info('Using default image service (no Cloudinary)');
  }
};

/**
 * Environment-aware image configuration
 */
export const imageConfig = {
  breakpoints: {
    small: [320, 480, 640],
    medium: [768, 1024],
    large: [1280, 1536, 1920, 2560]
  },
  defaultQuality: 80,
  placeholderColor: 'CCCCCC',
  lazyLoadThreshold: '200px'
};
