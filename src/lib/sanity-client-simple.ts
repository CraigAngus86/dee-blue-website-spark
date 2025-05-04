
/**
 * Simple Sanity Client
 * 
 * A minimal implementation of the Sanity client with no extra functionality
 * beyond basic query and mutation capabilities. This is designed to avoid
 * any potential issues with the more complex client implementation.
 */
import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

// Environment variables with fallbacks
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21';
const TOKEN = process.env.SANITY_API_TOKEN;

/**
 * Create a minimal Sanity client with only essential configuration
 */
export function createSimpleSanityClient(): SanityClient {
  // Log configuration for debugging
  console.log('Creating simple Sanity client with:', { 
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    tokenAvailable: !!TOKEN
  });
  
  // Create with minimal configuration
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    token: TOKEN,
    useCdn: false,
    // Explicitly NOT using withCredentials as it conflicts with token auth
  });
}

// Export a single client instance
export const simpleSanityClient = createSimpleSanityClient();

/**
 * Simple test function to verify Sanity connection
 */
export async function testSimpleSanityConnection(): Promise<{
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}> {
  try {
    console.log('Testing simple Sanity connection...');
    
    // Use a simple query that should work on any project
    const result = await simpleSanityClient.fetch('*[_type == "playerProfile"][0...1]');
    
    console.log('Simple Sanity connection test successful:', result);
    return {
      success: true,
      message: 'Successfully connected to Sanity API',
      data: result
    };
  } catch (error) {
    console.error('Simple Sanity connection test failed:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return {
      success: false,
      message: `Failed to connect to Sanity API: ${errorMessage}`,
      error
    };
  }
}
