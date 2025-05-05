
import React from 'react';
import { definePlugin } from 'sanity';

// Simple mock if the plugin isn't available
export const banksDeeCloudinaryPlugin = definePlugin(() => {
  return {
    name: 'cloudinary-asset-source',
    plugins: []
  };
});

// Export the default plugin
export default banksDeeCloudinaryPlugin;
