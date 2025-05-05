export default {
  name: 'cloudinaryImage',
  title: 'Cloudinary Image',
  type: 'object',
  fields: [
    {
      name: 'asset',
      title: 'Asset',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL',
          type: 'string'
        },
        {
          name: 'public_id',
          title: 'Public ID',
          type: 'string'
        }
      ]
    },
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'asset.url'
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || 'Untitled image',
        // Using string representation instead of JSX
        media: media
      };
    }
  }
}