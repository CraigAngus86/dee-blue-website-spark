
import { definePlugin } from 'sanity';
import { cloudinaryAssetSourcePlugin } from 'sanity-plugin-cloudinary';

/**
 * Custom Cloudinary asset source plugin for Banks o' Dee FC
 */
export const banksDeeCloudinaryPlugin = definePlugin(() => {
  // Get environment variables with fallbacks
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0';
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  // Log Cloudinary configuration (without exposing secrets)
  console.log('Configuring Cloudinary plugin with cloud name:', cloudName);
  console.log('API Key available:', !!apiKey);
  console.log('API Secret available:', !!apiSecret);
  
  return {
    name: 'banksDeeCloudinaryPlugin',
    plugins: [
      cloudinaryAssetSourcePlugin({
        // Configuration from environment variables
        cloudName,
        apiKey,
        apiSecret,
        
        // Default folder for uploads
        folder: 'banksofdeefc'
      })
    ]
  };
});

export default banksDeeCloudinaryPlugin;
