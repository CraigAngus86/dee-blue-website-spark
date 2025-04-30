
export default {
  name: 'cloudinaryImage',
  title: 'Cloudinary Image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'cloudinary.asset',
      description: 'Upload or select an image from Cloudinary'
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
    }
  ],
  preview: {
    select: {
      media: 'image',
      title: 'alt',
      subtitle: 'caption'
    }
  }
}
