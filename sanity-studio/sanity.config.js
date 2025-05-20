import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './structure'
import resolveProductionUrl from './resolveProductionUrl'
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'
import refreshMatchDataAction from './documentActions/refreshMatchData'
import generateFolderNameAction from './documentActions/generateFolderName'

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
    cloudinarySchemaPlugin({
      cloudName: process.env.SANITY_STUDIO_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.SANITY_STUDIO_CLOUDINARY_API_KEY,
      apiSecret: process.env.SANITY_STUDIO_CLOUDINARY_API_SECRET,
      folders: ['banksofdeefc/people', 'banksodeefc/news', 'banksodeefc/matches', 'banksodeefc/sponsors', 'banksodeefc/stadium'],
      uploadPreset: 'player-upload'
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    productionUrl: resolveProductionUrl,
    actions: (prev, context) => {
      if (context.schemaType === 'matchGallery') {
        return [...prev, generateFolderNameAction]
      }
      return prev
    }
  }
})
