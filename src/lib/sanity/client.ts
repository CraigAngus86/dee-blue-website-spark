import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
// Environment variables with fallbacks
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || 'v2021-10-21';
// Client configuration
const config = {
  projectId,
  dataset,
  apiVersion,
  // Disable CDN for fresher content
  useCdn: false,
};
// Initialize client
const sanityClient = createClient(config);
// Initialize URL builder
const builder = imageUrlBuilder(sanityClient);
// Export the builder function
export const urlFor = (source: any) => {
  return builder.image(source);
};
// Export the client
export { sanityClient };
