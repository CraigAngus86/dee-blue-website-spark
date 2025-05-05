
/**
 * Server-side Cloudinary configuration for authenticated operations
 * This can access server-only environment variables
 */
import { v2 as cloudinaryServer } from 'cloudinary';
import { UPLOAD_PRESETS } from './client';
import { serverEnv, publicEnv } from '@/lib/env';

// Configure Cloudinary with proper environment variables (server-side only)
cloudinaryServer.config({
  cloud_name: publicEnv.getCloudinaryCloudName(),
  api_key: serverEnv.getCloudinaryApiKey(),
  api_secret: serverEnv.getCloudinaryApiSecret(),
  secure: true
});

// Log environment status for debugging (only on server)
console.log('[Server] Cloudinary configuration:', { 
  cloudName: publicEnv.getCloudinaryCloudName(),
  apiKeyAvailable: !!serverEnv.getCloudinaryApiKey(),
  apiSecretAvailable: !!serverEnv.getCloudinaryApiSecret()
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
