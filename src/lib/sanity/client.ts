
/**
 * Sanity client configuration
 */
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Fallback values - IMPORTANT: These must be set for the client to work properly
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21';

// Debug configuration values
console.log("Sanity Config:", { 
  projectId, 
  dataset, 
  apiVersion,
  usingFallbacks: !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET
});

// Client configuration
const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We'll set this to true for production
};

// Create the client instance with a simpler approach
export const sanityClient = createClient(config);

// Helper for fetching data with specified projection
export async function fetchSanityData(query: string, params = {}) {
  try {
    return await sanityClient.fetch(query, params);
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    throw new Error(`Sanity query failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Set up the image URL builder
const builder = imageUrlBuilder(sanityClient);

// Helper function to get image URL from Sanity
export function urlFor(source: any) {
  return builder.image(source);
}

// For backward compatibility
export const getClient = () => sanityClient;
