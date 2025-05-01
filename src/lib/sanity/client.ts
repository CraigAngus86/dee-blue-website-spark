import { createClient } from 'next-sanity';

/**
 * Retrieves a required environment variable.
 * If the variable is missing, it returns a fallback value in development,
 * or throws an error in production.
 */
function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Warning: Environment variable ${name} is not set. Using fallback value.`);
      // Provide fallback values for development
      if (name === 'NEXT_PUBLIC_SANITY_PROJECT_ID') return 'your-project-id';
      if (name === 'NEXT_PUBLIC_SANITY_DATASET') return 'production';
      if (name === 'NEXT_PUBLIC_SANITY_API_VERSION') return '2023-05-03';
    } else {
      throw new Error(`Environment variable ${name} is not set`);
    }
  }
  return value as string;
}

/**
 * Set up the Sanity client for fetching data.
 * Uses the helper function to read required environment variables.
 */
export const sanityClient = createClient({
  projectId: getRequiredEnvironmentVariable('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: getRequiredEnvironmentVariable('NEXT_PUBLIC_SANITY_DATASET'),
  apiVersion: getRequiredEnvironmentVariable('NEXT_PUBLIC_SANITY_API_VERSION'),
  useCdn: process.env.NODE_ENV === 'production',
});

/**
 * Helper function to safely fetch data from Sanity with error handling.
 */
export async function fetchSanityData(query: string, params?: Record<string, any>): Promise<any> {
  try {
    // Validate that we have required environment variables before fetching
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) {
      console.warn('Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity queries may fail.');
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
