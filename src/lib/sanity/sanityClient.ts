// src/lib/sanity/sanityClient.ts
import { sanitySimple, fetchSanityData } from './sanity-simple';

// Re-export the fetchSanityData function
export { fetchSanityData };

// Export the client for compatibility with existing code
export const sanityClient = sanitySimple;