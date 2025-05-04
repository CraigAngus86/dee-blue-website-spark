
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
    },
    {
      name: 'crop',
      title: 'Crop',
      type: 'string',
      options: {
        list: [
          { title: 'No crop', value: 'none' },
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Featured (3:4)', value: 'featured' },
          { title: 'Wide (16:9)', value: 'wide' },
          { title: 'Panoramic (21:9)', value: 'panoramic' }
        ]
      },
      initialValue: 'none',
      description: 'Select a crop preset for this image'
    },
    {
      name: 'hotspot',
      title: 'Hotspot',
      type: 'object',
      fields: [
        { name: 'x', type: 'number' },
        { name: 'y', type: 'number' },
        { name: 'height', type: 'number' },
        { name: 'width', type: 'number' }
      ]
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
