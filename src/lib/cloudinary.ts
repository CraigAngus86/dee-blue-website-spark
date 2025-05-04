
import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions/resize';
import { quality } from '@cloudinary/url-gen/actions/delivery';

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
  
  const { width, height, crop, qualityValue } = options;
  
  let image = cloudinary.image(publicId);
  
  if (width || height) {
    // Use proper SDK methods for resizing
    const cropMode = crop || 'fill';
    
    switch(cropMode) {
      case 'fill':
        image = image.resize(Resize.fill(width, height));
        break;
      case 'scale':
        image = image.resize(Resize.scale(width, height));
        break;
      case 'crop':
        image = image.resize(Resize.crop(width, height));
        break;
      case 'thumb':
        image = image.resize(Resize.thumbnail(width, height));
        break;
    }
  }
  
  if (qualityValue) {
    image = image.delivery(quality(qualityValue));
  }
  
  return image.toURL();
};

// Export additional Cloudinary utility functions if needed
