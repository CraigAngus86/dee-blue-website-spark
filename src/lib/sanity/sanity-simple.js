
// src/lib/sanity/sanity-simple.js - Replace entire file
import { createClient } from '@sanity/client';

// Get the token from environment variables
const token = process.env.SANITY_API_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = 'v2021-10-21';

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
    console.log('Testing Sanity connection...');
    // Use a very simple query that should always work - using * to fetch any document
    const result = await sanitySimple.fetch(`*[_type == "sanity.imageAsset"][0...1]`);
    console.log('Sanity connection successful:', result);
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
    console.log('Executing Sanity query:', { query, paramsKeys: params ? Object.keys(params) : [] });
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
