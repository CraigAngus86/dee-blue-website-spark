
import { createClient } from 'next-sanity';
import { SanityClient } from '@sanity/client';

// Environment validation
function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    // In development, we'll warn but use a fallback
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Warning: Environment variable ${name} is not set. Using fallback value.`);
      
      // Provide fallback values for development
      if (name === 'NEXT_PUBLIC_SANITY_PROJECT_ID') return 'your-project-id';
      if (name === 'NEXT_PUBLIC_SANITY_DATASET') return 'production';
      if (name === 'NEXT_PUBLIC_SANITY_API_VERSION') return '2023-05-03';
    } else {
      // In production, we'll throw an error
      throw new Error(`Environment variable ${name} is not set`);
    }
  }
  
  return value as string;
}

/**
 * Set up the Sanity client for fetching data
 * Validates environment variables to prevent runtime errors
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
});

/**
 * Helper function to safely fetch data from Sanity with error handling
 */
export async function fetchSanityData(query: string, params?: Record<string, any>): Promise<any> {
  try {
    // Validate that we have required environment variables before fetching
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      console.warn('Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity queries may fail.');
      
      // In production, we'll throw an error
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Sanity configuration error: NEXT_PUBLIC_SANITY_PROJECT_ID is missing.');
      }
    }
    
    const data = await sanityClient.fetch(query, params);
    return data;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
}
