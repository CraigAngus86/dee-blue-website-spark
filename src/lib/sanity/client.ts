
import { createClient } from 'next-sanity';

/**
 * Safely gets environment variables with proper fallbacks
 * to ensure we always have valid configuration values.
 */
function getSanityConfig() {
  // Log the current environment for debugging purposes
  console.log(`Environment mode: ${process.env.NODE_ENV}`);
  
  // Get projectId with proper fallback
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2';
  console.log(`Using Sanity projectId: [${projectId}]`);
  
  // Get dataset with proper fallback
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  console.log(`Using Sanity dataset: [${dataset}]`);
  
  // Get API version with proper fallback
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-30';
  console.log(`Using Sanity API version: [${apiVersion}]`);
  
  return {
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === 'production',
  };
}

/**
 * Set up the Sanity client for fetching data using our configuration helper.
 */
export const sanityClient = createClient(getSanityConfig());

/**
 * Preview client for draft content with authentication token
 */
export const previewClient = process.env.SANITY_API_TOKEN
  ? createClient({
      ...getSanityConfig(),
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : sanityClient;

/**
 * Helper to determine which client to use based on preview mode
 */
export const getClient = (usePreview = false) => 
  (usePreview && process.env.SANITY_API_TOKEN) ? previewClient : sanityClient;

/**
 * Helper function to safely fetch data from Sanity with error handling.
 */
export async function fetchSanityData(query: string, params?: Record<string, any>, usePreview = false): Promise<any> {
  try {
    const client = getClient(usePreview);
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
}

/**
 * Image URL builder function placeholder - import and initialize if needed.
 * Uncomment when needed:
 */
// import imageUrlBuilder from '@sanity/image-url';
// export const urlForImage = (source) => imageUrlBuilder(getSanityConfig()).image(source);

