
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';
import { sanityClient } from '@/lib/sanity/client';

/**
 * Resolves a reference to a Sanity document
 * 
 * @param documentType - Sanity document type
 * @param id - Document ID to fetch
 * @param options - Options for resolving the reference
 * @returns The resolved document or null if not found
 */
async function resolveSanityReference<T = any>(
  documentType: string,
  id: string | null | undefined,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!id) {
    return null;
  }
  
  // Generate cache key
  const cacheKey = `sanity:${documentType}:${id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        // Build the GROQ query
        const query = `*[_type == "${documentType}" && _id == "${id}"][0]`;
        
        // Execute the query
        const document = await sanityClient.fetch<T>(query);
        
        if (!document) {
          return null;
        }
        
        return document;
      } catch (error) {
        console.error(`Error resolving Sanity reference ${documentType}:${id}:`, error);
        return null;
      }
    },
    options.skipCache
  );
}

export default resolveSanityReference;
