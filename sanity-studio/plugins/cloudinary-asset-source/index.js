
import { definePlugin } from 'sanity';
import { cloudinaryAssetSourcePlugin } from 'sanity-plugin-cloudinary';

/**
 * Custom Cloudinary asset source plugin for Banks o' Dee FC
 * 
 * This uses our custom API endpoint for uploads to ensure consistency
 * between direct uploads and Sanity Studio uploads.
 */
export const banksDeeCloudinaryPlugin = definePlugin(() => {
  // Get environment variables with fallbacks
  const cloudName = process.env.SANITY_STUDIO_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0';
  const apiKey = process.env.SANITY_STUDIO_CLOUDINARY_API_KEY;
  
  // Log Cloudinary configuration (without exposing secrets)
  console.log('[Sanity Studio] Configuring Cloudinary plugin with cloud name:', cloudName);
  console.log('[Sanity Studio] API Key available:', !!apiKey);
  
  return {
    name: 'banksDeeCloudinaryPlugin',
    plugins: [
      cloudinaryAssetSourcePlugin({
        // Configuration from environment variables
        cloudName,
        apiKey,
        
        // Default folder for uploads
        folder: 'banksofdeefc',
        
        // Custom upload endpoint - this is key to making it work with our solution
        uploadPreset: 'player-upload',
        
        // Use the same API endpoint that works in the test page
        customUploadEndpoint: '/api/cloudinary/upload',
        
        // Add additional request headers for identification
        additionalParams: (file, context) => {
          // Extract document info for better organization
          const docType = context?.document?._type || 'unknown';
          const docId = context?.document?._id || 'unknown';
          
          console.log('[Sanity Studio] Preparing upload for:', { docType, docId, fileName: file.name });
          
          // Add a custom header to identify requests from Sanity Studio
          const headers = {
            'x-sanity-studio': 'true'
          };
          
          // Create metadata to be consistent with our test uploader
          return {
            headers,
            contentType: docType,
            entityId: docId,
            type: context?.field?.name || 'default',
            metadata: JSON.stringify({
              sanityDocId: docId,
              sanityDocType: docType,
              sanityFieldName: context?.field?.name,
            }),
            tags: [docType, 'sanity']
          };
        }
      })
    ]
  };
});

export default banksDeeCloudinaryPlugin;
