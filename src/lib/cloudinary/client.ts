
/**
 * Client-side Cloudinary configuration
 * This uses public environment variables only for client-side usage
 */
import { Cloudinary } from '@cloudinary/url-gen';

// Initialize client-side Cloudinary instance (uses only public env variables)
export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0'
  },
  url: {
    secure: true
  }
});

// Helper functions for generating Cloudinary URLs (client-side safe)
export const getPlayerImageUrl = (publicId: string, options: {
  width?: number;
  height?: number;
  crop?: string;
} = {}) => {
  if (!publicId) return '';
  
  // Default options
  const { 
    width = 300, 
    height = 300, 
    crop = 'fill' 
  } = options;
  
  // Create a URL with transformations
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0'
  }/image/upload/c_${crop},w_${width},h_${height}/${publicId}`;
};

// Default upload presets
export const UPLOAD_PRESETS = {
  PLAYER: 'player-upload', // Preset for player profiles
  NEWS: 'news-upload',     // Preset for news articles
  MATCH: 'match-upload',   // Preset for match galleries
  DEFAULT: 'default-upload' // Fallback preset
};
