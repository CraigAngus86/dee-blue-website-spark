import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './structure'
import resolveProductionUrl from './resolveProductionUrl'
// Correct import for the Cloudinary schema plugin
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'
// Remove this line since we'll use the official plugin instead
// import { banksDeeCloudinaryPlugin } from './plugins/cloudinary-asset-source'

export default defineConfig({
  name: 'default',
  title: 'Banks o\' Dee FC',
  projectId: 'gxtptap2',
  dataset: 'production',
  plugins: [
    deskTool({
      structure,
      defaultDocumentNode: (S) => {
        // Implement preview view for document types
        const previews = ['newsArticle', 'playerProfile', 'sponsor', 'commercialPackage', 'stadiumInfo']
        if (previews.includes(S.context.documentType)) {
          return S.document().views([
            S.view.form(),
            S.view
              .component(() => import('./preview'))
              .title('Preview')
          ])
        }
        return S.document().views([S.view.form()])
      }
    }),
    visionTool(),
    // Use the correct plugin function name
    cloudinarySchemaPlugin({
      cloudName: process.env.SANITY_STUDIO_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.SANITY_STUDIO_CLOUDINARY_API_KEY,
      apiSecret: process.env.SANITY_STUDIO_CLOUDINARY_API_SECRET,
      // Define your Cloudinary folders structure
      folders: ['banksodeefc/people', 'banksodeefc/news', 'banksodeefc/matches', 'banksodeefc/sponsors', 'banksodeefc/stadium'],
      // Default upload preset - can be overridden in schema
      uploadPreset: 'player-upload'
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    productionUrl: resolveProductionUrl
  }
})