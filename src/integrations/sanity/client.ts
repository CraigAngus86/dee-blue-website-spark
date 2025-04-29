
// This file provides TypeScript type definitions for the Sanity client
// while re-exporting the actual client from sanity-studio/client.js

// Import the client from the sanity-studio folder
import sanityClient, { fetchSanityData as fetchData } from '../../sanity-studio/client.js';

// Re-export with TypeScript types
export const fetchSanityData = fetchData as (query: string, params?: Record<string, any>) => Promise<any>;

// Re-export the client
export default sanityClient;
