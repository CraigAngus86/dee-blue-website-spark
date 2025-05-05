
import React from 'react';
import CloudinaryImageInput from '../components/CloudinaryImageInput';

// Define the plugin according to Sanity v3 requirements
export default {
  name: 'cloudinary-image-input',
  title: 'Cloudinary Image Input',
  component: CloudinaryImageInput,
  fields: [
    {
      name: 'asset',
      type: 'object',
      fields: [
        { name: 'url', type: 'string' },
        { name: 'public_id', type: 'string' }
      ]
    },
    { name: 'alt', type: 'string' }
  ]
};
