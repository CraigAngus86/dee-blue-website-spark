
import { definePlugin } from 'sanity';
import { cloudinaryAssetSourcePlugin } from 'sanity-plugin-cloudinary';

/**
 * Custom Cloudinary asset source plugin for Banks o' Dee FC
 * Extends the base Cloudinary plugin with custom folder structure and metadata handling
 */
export const banksDeeCloudinaryPlugin = definePlugin(() => {
  return {
    name: 'banksDeeCloudinaryPlugin',
    plugins: [
      cloudinaryAssetSourcePlugin({
        // Configuration - these should come from environment variables in production
        cloudName: 'dlkpaw2a0',
        apiKey: process.env.CLOUDINARY_API_KEY,
        
        // Folder mapping for different document types
        folders: {
          // For news articles, map to the appropriate folder structure
          newsArticle: (document) => {
            return `banksofdeefc/news/article-${document._id}/`;
          },
          
          // For player profiles
          playerProfile: (document) => {
            return `banksofdeefc/people/person-${document._id}/`;
          },
          
          // For match galleries
          matchGallery: (document) => {
            return `banksofdeefc/matches/match-${document._id}/gallery/`;
          },
          
          // For stadium info
          stadiumInfo: () => {
            return 'banksofdeefc/stadium/';
          },
          
          // For sponsors
          sponsor: (document) => {
            return `banksofdeefc/sponsors/sponsor-${document._id}/`;
          },
          
          // Default folder for other document types
          _default: 'banksofdeefc/other/'
        },
        
        // Default metadata fields
        metadata: [
          { name: 'alt', title: 'Alt Text', type: 'string', required: true },
          { name: 'caption', title: 'Caption', type: 'string' },
          { name: 'credit', title: 'Credit/Attribution', type: 'string' }
        ],
        
        // Default values for metadata, can use document field references
        defaultMetadata: (document) => {
          return {
            alt: document.title || 'Banks o\' Dee FC image',
            caption: document.description || '',
            credit: 'Banks o\' Dee FC'
          };
        },
        
        // Default tags based on document type
        tags: (document) => {
          const docType = document._type;
          const tags = [docType];
          
          // Add specific tags based on document type
          switch (docType) {
            case 'playerProfile':
              tags.push('player', 'profile');
              break;
            case 'newsArticle':
              tags.push('news');
              break;
            case 'matchGallery':
              tags.push('match', 'gallery');
              break;
            case 'sponsor':
              tags.push('sponsor', 'commercial');
              break;
          }
          
          return tags;
        }
      })
    ],
    
    // This section can be used to add custom components or schema types
    // This would require more complex setup and is left as a placeholder
    schema: {
      types: [],
    }
  };
});

export default banksDeeCloudinaryPlugin;
