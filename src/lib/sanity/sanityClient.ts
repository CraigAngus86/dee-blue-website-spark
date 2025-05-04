
/**
 * Direct Sanity client implementation
 * Implements a clean approach to connecting to Sanity with proper error handling
 */
import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

// Fallback values for when environment variables aren't available
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21';
const TOKEN = process.env.SANITY_API_TOKEN;

// Debug configuration setup
console.log('Sanity Client Configuration:', {
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  tokenAvailable: !!TOKEN,
  usingFallbacks: !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET
});

/**
 * Create a direct Sanity client with explicit configuration
 */
export function createSanityClient(config: {
  useCdn?: boolean;
  token?: string;
  withCredentials?: boolean;
} = {}): SanityClient {
  const { useCdn = false, token = TOKEN, withCredentials = false } = config;
  
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    useCdn,
    token,
    withCredentials
  });
}

// Public client for general queries (read-only)
export const sanityClient = createSanityClient({ useCdn: true });

// Admin client for mutations (needs token)
export const sanityAdminClient = createSanityClient({ 
  useCdn: false, 
  token: TOKEN,
  withCredentials: true
});

/**
 * Helper function for fetching data with proper error handling
 */
export async function fetchSanityData<T = any>(query: string, params = {}): Promise<T> {
  try {
    console.log('Executing Sanity query:', { query, params });
    const result = await sanityClient.fetch<T>(query, params);
    return result;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    
    // More detailed error information
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    
    throw new Error(`Sanity query failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Test function to verify Sanity connection
 */
export async function testSanityConnection(): Promise<boolean> {
  try {
    console.log('Testing Sanity connection...');
    const result = await sanityClient.fetch('*[_type == "playerProfile"][0...1]');
    console.log('Sanity connection test successful:', result);
    return true;
  } catch (error) {
    console.error('Sanity connection test failed:', error);
    return false;
  }
}
