export default {
    name: 'mainImage',
    title: 'Main Image',
    type: 'image',
    options: {
      hotspot: true
    },
    fields: [
      {
        name: 'alt',
        title: 'Alternative Text',
        type: 'string',
        description: 'Important for SEO and accessibility',
        validation: Rule => Rule.required()
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
        description: 'Caption displayed below the image'
      },
      {
        name: 'attribution',
        title: 'Attribution',
        type: 'string',
        description: 'Photographer or source credit'
      }
    ],
    preview: {
      select: {
        imageUrl: 'asset.url',
        title: 'caption',
        alt: 'alt'
      },
      prepare({title, imageUrl, alt}) {
        return {
          title: title || alt || 'Image',
          subtitle: alt,
          imageUrl
        }
      }
    }
  }