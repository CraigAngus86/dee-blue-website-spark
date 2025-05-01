
import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

// Environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-30';

// Client configuration
const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
};

// Standard client for regular content fetching
export const sanityClient = createClient(config);

// Preview client for draft content
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper to determine which client to use
export const getClient = (usePreview = false) => (usePreview ? previewClient : sanityClient);

// Helper function for simple queries
export async function fetchSanityData(query: string, params = {}, usePreview = false) {
  try {
    const client = getClient(usePreview);
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Error fetching Sanity data:', error);
    throw error;
  }
}

// Image URL builder for Sanity images
export const urlForImage = (source: Image) => {
  return createImageUrlBuilder(config).image(source);
};
