// src/lib/sanity/sanityClient.ts
import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { env } from '@/lib/env';

// Environment variables with fallbacks
const projectId = env.sanity.projectId;
const dataset = env.sanity.dataset;
const apiVersion = env.sanity.apiVersion || '2024-04-30';

// Client configuration
const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN to always get fresh data
  perspective: 'published'
};

// Standard client for regular content fetching
export const sanityClient = createClient(config);

// Preview client for draft content
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: env.sanity.token,
});

// Helper to determine which client to use
export const getClient = (usePreview = false) => (usePreview ? previewClient : sanityClient);

// Helper function for simple queries
export async function fetchSanityData<T = any>(query: string, params = {}, usePreview = false) {
  try {
    const client = getClient(usePreview);
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error('Error fetching Sanity data:', error);
    throw error;
  }
}

// Image URL builder for Sanity images
export const urlForImage = (source: Image) => {
  return createImageUrlBuilder(config).image(source);
};

export default {
  sanityClient,
  previewClient,
  getClient,
  fetchSanityData,
  urlForImage,
};
