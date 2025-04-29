export default {
    name: 'gallery',
    title: 'Gallery',
    type: 'array',
    of: [
      {
        type: 'image',
        options: {
          hotspot: true
        },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative Text',
            description: 'Important for SEO and accessibility',
            validation: Rule => Rule.required()
          },
          {
            name: 'caption',
            type: 'string',
            title: 'Caption',
            description: 'Caption displayed below the image'
          },
          {
            name: 'attribution',
            type: 'string',
            title: 'Attribution',
            description: 'Photographer or source credit'
          }
        ]
      }
    ],
    options: {
      layout: 'grid'
    }
  }