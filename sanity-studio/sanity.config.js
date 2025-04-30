
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './structure'
import resolveProductionUrl from './resolveProductionUrl'
import { banksDeeCloudinaryPlugin } from './plugins/cloudinary-asset-source'

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
    banksDeeCloudinaryPlugin(),
  ],

  schema: {
    types: schemaTypes,
  },
  
  document: {
    productionUrl: resolveProductionUrl
  }
})
