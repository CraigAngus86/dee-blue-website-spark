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
  // NO withCredentials here!
});

// Simple test function
export async function testSanityConnection() {
  try {
    console.log('Testing Sanity connection...');
    // Use a very simple query that should always work - using * to fetch any document
    const result = await sanitySimple.fetch(`*[_id == "drafts.whatever" || _id == "whatever"][0...1]`);
    console.log('Sanity connection successful:', result);
    return { success: true, message: 'Connection successful' };
  } catch (error) {
    console.error('Sanity connection test failed:', error);
    return {
      success: false,
      message: `Connection failed: ${error.message}`
    };
  }
}

export async function fetchSanityData(query, params) {
  try {
    console.log('Executing Sanity query:', { query, paramsKeys: params ? Object.keys(params) : [] });
    
    // For Sanity's v2024-04-30 API, we need to use the correct URL format
    let url = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
    
    // Add parameters if they exist
    if (params && Object.keys(params).length > 0) {
      const paramString = Object.entries(params)
        .map(([key, value]) => `$${key}=${encodeURIComponent(JSON.stringify(value))}`)
        .join('&');
      url += `&${paramString}`;
    }
    
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    console.log('Fetching from Sanity:', url);
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
}