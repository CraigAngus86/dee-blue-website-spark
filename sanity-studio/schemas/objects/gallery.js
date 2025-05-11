export default {
    name: 'gallery',
    title: 'Gallery',
    type: 'object',
    fields: [
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'cloudinary.asset' }],
        options: {
          layout: 'grid'
        }
      }
    ]
  }
