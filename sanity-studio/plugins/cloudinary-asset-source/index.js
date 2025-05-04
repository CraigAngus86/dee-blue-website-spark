
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
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0';
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  // Log Cloudinary configuration (without exposing secrets)
  console.log('[Sanity Studio] Configuring Cloudinary plugin with cloud name:', cloudName);
  console.log('[Sanity Studio] API Key available:', !!apiKey);
  console.log('[Sanity Studio] API Secret available:', !!apiSecret);
  
  return {
    name: 'banksDeeCloudinaryPlugin',
    plugins: [
      cloudinaryAssetSourcePlugin({
        // Configuration from environment variables
        cloudName,
        apiKey,
        apiSecret,
        
        // Default folder for uploads
        folder: 'banksofdeefc',
        
        // Custom upload endpoint - this is key to making it work with our solution
        uploadPreset: undefined, // Don't use upload presets, use our custom endpoint
        
        // Use the same API endpoint that works in the test page
        customUploadEndpoint: '/api/cloudinary/upload',
        
        // Specify additional parameters that should be sent with the upload
        additionalParams: (file, context) => {
          // Extract document info for better organization
          const docType = context?.document?._type || 'unknown';
          const docId = context?.document?._id || 'unknown';
          
          console.log('[Sanity Studio] Preparing upload for:', { docType, docId, fileName: file.name });
          
          // Create metadata to be consistent with our test uploader
          return {
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
