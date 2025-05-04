
import { simpleSanityClient } from '@/lib/sanity-client-simple';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

/**
 * Resolve a reference to a Sanity document
 * @param documentType Sanity document type
 * @param id Document ID (could be _id or a reference field)
 * @param options Resolution options
 * @returns Referenced Sanity document or null if not found
 */
export default async function resolveSanityReference<T = any>(
  documentType: string,
  id: string | null | undefined,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!id) return null;
  
  const { skipCache = false } = options;
  const cacheKey = `sanity:${documentType}:${id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        console.log(`Resolving Sanity reference: ${documentType} with ID ${id}`);
        
        // Determine if it's a direct _id reference or a field match
        const isDirectId = id.startsWith('drafts.') || id.includes('-');
        
        // Construct appropriate query
        const query = isDirectId
          ? `*[_type == $docType && _id == $id][0]`
          : `*[_type == $docType && supabaseId == $id][0]`;
        
        const params = {
          docType: documentType,
          id: id
        };
        
        const document = await simpleSanityClient.fetch(query, params);
        return document || null;
      } catch (error) {
        console.error(`Error resolving Sanity reference for ${documentType}:${id}:`, error);
        return null;
      }
    },
    skipCache
  );
}
