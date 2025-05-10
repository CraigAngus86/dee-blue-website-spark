// src/lib/sanity/sanity-simple.js
import { createClient } from '@sanity/client';
import { env } from '@/lib/env';

// Get environment variables from our utilities
const token = env.isServer ? env.sanity.token : null;
const projectId = env.sanity.projectId;
const dataset = env.sanity.dataset;
const apiVersion = '2021-10-21';

// Enhanced logging for token detection
console.log('Initializing Sanity client with token available:', !!token);
console.log('Environment variables available:', {
  NEXT_PUBLIC_SANITY_PROJECT_ID: !!projectId,
  NEXT_PUBLIC_SANITY_DATASET: !!dataset,
  SANITY_API_TOKEN: !!token,
});

// Create a simple Sanity client with minimal configuration
export const sanitySimple = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// Simple test function
export async function testSanityConnection() {
  try {
    console.log('Testing Sanity connection with token available:', !!token);
    // Use a very simple query that should always work - using * to fetch any document
    const result = await sanitySimple.fetch(`*[_type == "sanity.imageAsset"][0...1]`);
    console.log('Sanity connection successful:', result ? 'Data received' : 'No data');
    return { success: true, message: 'Connection successful', data: result };
  } catch (error) {
    console.error('Sanity connection test failed:', error);
    return {
      success: false,
      message: `Connection failed: ${error.message}`,
      error
    };
  }
}

export async function fetchSanityData(query, params) {
  try {
    console.log('Executing Sanity query with token available:', !!token);
    console.log('Query:', { query, paramsKeys: params ? Object.keys(params) : [] });
    const data = await sanitySimple.fetch(query, params);
    return data;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    console.log('Query that failed:', query);
    console.log('Params:', JSON.stringify(params));
    console.log('Project ID:', projectId);
    console.log('Dataset:', dataset);
    console.log('API Version:', apiVersion);
    console.log('Token available:', !!token);
    throw error;
  }
}
