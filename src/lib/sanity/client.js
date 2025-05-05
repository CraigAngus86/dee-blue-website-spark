
import { createClient } from '@sanity/client';
import { publicEnv, serverEnv, isServer } from '@/lib/env';
import imageUrlBuilder from '@sanity/image-url';

// Get environment variables from our utilities
const projectId = publicEnv.getSanityProjectId();
const dataset = publicEnv.getSanityDataset();
const apiVersion = publicEnv.getSanityApiVersion();
const token = isServer ? serverEnv.getSanityToken() : undefined;

// Create a configuration object
const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token
};

// Create the client
const sanityClient = createClient(config);

// Create an image URL builder
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => {
  return builder.image(source);
};

// Helper function to fetch data
export async function fetchSanityData(query, params = {}, usePreview = false) {
  try {
    return await sanityClient.fetch(query, params);
  } catch (error) {
    console.error('Error fetching Sanity data:', error);
    throw error;
  }
}

export { sanityClient };
export default sanityClient;
