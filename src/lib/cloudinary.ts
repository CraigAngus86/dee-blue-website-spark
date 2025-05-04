
import { Cloudinary } from '@cloudinary/url-gen';

// Initialize Cloudinary with cloud configuration
export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0'
  },
  url: {
    secure: true
  }
});

// Helper functions for working with Cloudinary
export const getCloudinaryImageUrl = (publicId: string, options: any = {}) => {
  if (!publicId) return '';
  
  const { width, height, crop, quality } = options;
  
  let url = cloudinary.image(publicId);
  
  if (width || height) {
    // Handle the resize transformation properly with string parameters
    const cropMode = crop || 'fill';
    const widthParam = width || 'auto';
    const heightParam = height || 'auto';
    
    url = url.resize(`${cropMode}_${widthParam}_${heightParam}`);
  }
  
  if (quality) {
    url = url.quality(quality);
  }
  
  return url.toURL();
};

// Export additional Cloudinary utility functions if needed
