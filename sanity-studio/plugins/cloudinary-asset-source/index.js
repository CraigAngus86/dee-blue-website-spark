
import { definePlugin } from 'sanity';
import { cloudinaryAssetSourcePlugin } from 'sanity-plugin-cloudinary';

/**
 * Custom Cloudinary asset source plugin for Banks o' Dee FC
 */
export const banksDeeCloudinaryPlugin = definePlugin(() => {
  return {
    name: 'banksDeeCloudinaryPlugin',
    plugins: [
      cloudinaryAssetSourcePlugin({
        // Configuration from environment variables
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0',
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        
        // Default folder for uploads
        folder: 'banksofdeefc'
      })
    ]
  };
});

export default banksDeeCloudinaryPlugin;
