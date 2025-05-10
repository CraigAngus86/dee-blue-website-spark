/**
 * Server-side Cloudinary configuration for authenticated operations
 * This can access server-only environment variables
 */
import { v2 as cloudinaryServer } from 'cloudinary';
import { UPLOAD_PRESETS } from './client';
import { env } from '@/lib/env';

// Configure Cloudinary with proper environment variables (server-side only)
cloudinaryServer.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
  secure: true
});

// Log environment status for debugging (only on server)
console.log('[Server] Cloudinary configuration:', { 
  cloudName: env.cloudinary.cloudName,
  apiKeyAvailable: !!env.cloudinary.apiKey,
  apiSecretAvailable: !!env.cloudinary.apiSecret
});

// Export the server-side Cloudinary instance
export { cloudinaryServer };

// Get person folder path (for players, staff, etc)
export const getPersonFolderPath = (personId: string) => {
  return `banksofdeefc/people/person-${personId}`;
};

// Get upload preset based on content type
export const getUploadPreset = (contentType: string): string => {
  switch(contentType) {
    case 'player':
    case 'playerProfile':
      return UPLOAD_PRESETS.PLAYER;
    case 'news':
    case 'newsArticle':
      return UPLOAD_PRESETS.NEWS;
    case 'match':
    case 'matchGallery':
      return UPLOAD_PRESETS.MATCH;
    default:
      return UPLOAD_PRESETS.DEFAULT;
  }
};
