import { createClient } from 'next-sanity';

// Directly use environment variables with hardcoded fallbacks for critical values
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-30';

// Create the client with direct values
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Preview client
export const previewClient = process.env.SANITY_API_TOKEN
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : sanityClient;

// Helper to determine which client to use
export const getClient = (usePreview = false) => 
  (usePreview && process.env.SANITY_API_TOKEN) ? previewClient : sanityClient;

// Helper function to fetch data
export async function fetchSanityData(query: string, params?: Record<string, any>, usePreview = false): Promise<any> {
  try {
    const client = getClient(usePreview);
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
}
