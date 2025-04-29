// Sanity client configuration
// Copy this to your project's lib directory
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'gxtptap2',
  dataset: 'production',
  apiVersion: '2025-04-29',
  useCdn: true,
});
