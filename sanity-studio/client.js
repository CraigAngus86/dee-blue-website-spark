import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: 'gxtptap2',
  dataset: 'production',
  apiVersion: '2024-04-29', // Use today's date or the latest API version
  useCdn: true
})

export const fetchSanityData = async (query, params = {}) => {
  return sanityClient.fetch(query, params)
}

export default sanityClient
