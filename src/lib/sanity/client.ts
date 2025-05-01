
// src/lib/sanity/client.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Defensive configuration that uses hardcoded fallbacks matching your Sanity project
const projectId = 
  (typeof process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'string' && 
   process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.trim() !== '') 
    ? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID 
    : 'gxtptap2'; // Hardcoded fallback

const dataset = 
  (typeof process.env.NEXT_PUBLIC_SANITY_DATASET === 'string' && 
   process.env.NEXT_PUBLIC_SANITY_DATASET.trim() !== '') 
    ? process.env.NEXT_PUBLIC_SANITY_DATASET 
    : 'production';

const apiVersion = 
  (typeof process.env.NEXT_PUBLIC_SANITY_API_VERSION === 'string' && 
   process.env.NEXT_PUBLIC_SANITY_API_VERSION.trim() !== '') 
    ? process.env.NEXT_PUBLIC_SANITY_API_VERSION 
    : '2024-04-30';

// Log configuration for debugging
console.log('Sanity Configuration:', { 
  projectId: projectId.substring(0, 3) + '...', // Only log partial ID for security
  dataset, 
  apiVersion,
  mode: process.env.NODE_ENV 
});

// Create the configuration object defensively
const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
};

// Sanity client with error handling
let _sanityClient;
try {
  _sanityClient = createClient(config);
  console.log('Sanity client created successfully');
} catch (error) {
  console.error('Error creating Sanity client:', error);
  // Create a minimal client that won't break the build but will show errors when used
  _sanityClient = {
    fetch: () => Promise.reject(new Error('Sanity client failed to initialize')),
  };
}

export const sanityClient = _sanityClient;

// Preview client with fallback to regular client
let _previewClient;
try {
  const token = process.env.SANITY_API_TOKEN;
  _previewClient = (token && token.trim() !== '')
    ? createClient({
        ...config,
        useCdn: false,
        token,
      })
    : _sanityClient;
  console.log('Sanity preview client created successfully');
} catch (error) {
  console.error('Error creating Sanity preview client:', error);
  _previewClient = _sanityClient;
}

export const previewClient = _previewClient;

// Helper to determine which client to use
export const getClient = (usePreview = false) => 
  (usePreview && process.env.SANITY_API_TOKEN) ? previewClient : sanityClient;

// Set up the image URL builder
const builder = imageUrlBuilder({
  projectId,
  dataset,
});
export const urlForImage = (source) => source ? builder.image(source) : null;

// Helper function to safely fetch data from Sanity with error handling
export async function fetchSanityData(query, params, usePreview = false) {
  try {
    const client = getClient(usePreview);
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
}
