
import React from 'react'

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
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed with the image'
    },
    {
      name: 'credit',
      title: 'Credit',
      type: 'string',
      description: 'Attribution for the image creator or source'
    }
  ],
  preview: {
    select: {
      title: 'alt',
      subtitle: 'caption',
      media: 'asset.url'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Untitled image',
        subtitle: subtitle || '',
        media: media ? React.createElement('img', { src: media, alt: '' }) : null
      };
    }
  }
}
