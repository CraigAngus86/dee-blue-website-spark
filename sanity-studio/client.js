
import { createClient } from '@sanity/client'

// Get environment variables or use defaults
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'gxtptap2';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2024-05-04';

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false // Don't use CDN in studio for latest content
})

export const fetchSanityData = async (query, params = {}) => {
  return sanityClient.fetch(query, params)
}

export default sanityClient
