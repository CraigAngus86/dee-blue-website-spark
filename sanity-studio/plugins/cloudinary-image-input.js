
import React from 'react';
import CloudinaryImageInput from '../components/CloudinaryImageInput';

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
    { name: 'alt', type: 'string' },
    { name: 'caption', type: 'string' },
    { name: 'credit', type: 'string' }
  ]
};
