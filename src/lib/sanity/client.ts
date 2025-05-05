
import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { publicEnv, serverEnv, isServer } from '@/lib/env';

// Environment variables from our utilities
const projectId = publicEnv.getSanityProjectId();
const dataset = publicEnv.getSanityDataset();
const apiVersion = publicEnv.getSanityApiVersion();

// Client configuration
const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
};

// Standard client for regular content fetching
export const sanityClient = createClient(config);

// Preview client for draft content (server-side only)
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: isServer ? serverEnv.getSanityToken() : undefined,
});

// Helper to determine which client to use
export const getClient = (usePreview = false) => (usePreview ? previewClient : sanityClient);

// Helper function for simple queries
export async function fetchSanityData<T = any>(query: string, params = {}, usePreview = false): Promise<T> {
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
