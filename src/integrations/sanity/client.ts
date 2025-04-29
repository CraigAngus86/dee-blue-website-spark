
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize the Sanity client
export const sanityClient = createClient({
  projectId: 'gxtptap2',
  dataset: 'production',
  apiVersion: '2023-05-03', // Use the latest API version
  useCdn: true, // Set to `false` if you want to ensure fresh data
});

// Set up a helper function for generating image URLs
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to fetch data
export async function fetchSanityData(query: string, params = {}) {
  try {
    return await sanityClient.fetch(query, params);
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    return null;
  }
}
