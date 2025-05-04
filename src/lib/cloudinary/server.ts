
/**
 * Server-side Cloudinary configuration for authenticated operations
 * This can access server-only environment variables
 */
import { v2 as cloudinaryServer } from 'cloudinary';

// Configure Cloudinary with proper environment variables (server-side only)
cloudinaryServer.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Log environment status for debugging (only on server)
console.log('[Server] Cloudinary configuration:', { 
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0',
  apiKeyAvailable: !!process.env.CLOUDINARY_API_KEY,
  apiSecretAvailable: !!process.env.CLOUDINARY_API_SECRET
});

// Export the server-side Cloudinary instance
export { cloudinaryServer };

// Get person folder path (for players, staff, etc)
export const getPersonFolderPath = (personId: string) => {
  return `banksofdeefc/people/person-${personId}`;
};
