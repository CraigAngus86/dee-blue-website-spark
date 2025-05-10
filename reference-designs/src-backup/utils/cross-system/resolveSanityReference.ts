
/**
 * Utility to resolve Sanity documents from Supabase record references
 */

import { sanityClient } from '@/lib/sanity/client';
import { referenceCache } from './cache';
import { SanityDocument, SupabaseRecord, ReferenceOptions } from './types';

/**
 * Resolve a Sanity document referenced by a Supabase record
 * @param record Supabase record containing a sanity_id field
 * @param documentType Sanity document type to query
 * @param options Resolution options
 * @returns Referenced Sanity document or null if not found
 */
export async function resolveSanityReference<T extends SanityDocument>(
  record: SupabaseRecord | null,
  documentType: string,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!record || !record.sanity_id) {
    console.warn(`Invalid record or missing sanity_id for record ID ${record?.id}`);
    return null;
  }

  const { sanity_id } = record;
  const cacheKey = `sanity:${documentType}:${sanity_id}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<T | null>(
      cacheKey,
      async () => {
        const query = `*[_type == $documentType && _id == $sanityId][0]`;
        const params = { documentType, sanityId: sanity_id };
        
        const document = await sanityClient.fetch(query, params);
        
        return document as T;
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving Sanity reference for ${documentType}:`, error);
    return null;
  }
}

/**
 * Alternative: Resolve a Sanity document by Supabase ID reference
 * @param supabaseId Supabase entity ID
 * @param documentType Sanity document type to query
 * @param options Resolution options
 * @returns Referenced Sanity document or null if not found
 */
export async function resolveSanityDocumentBySupabaseId<T extends SanityDocument>(
  supabaseId: string,
  documentType: string,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!supabaseId) {
    console.warn('Missing supabaseId parameter');
    return null;
  }

  const cacheKey = `sanity:${documentType}:bySupabaseId:${supabaseId}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<T | null>(
      cacheKey,
      async () => {
        const query = `*[_type == $documentType && supabaseId == $supabaseId][0]`;
        const params = { documentType, supabaseId };
        
        const document = await sanityClient.fetch(query, params);
        
        return document as T;
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving Sanity document by Supabase ID for ${documentType}:`, error);
    return null;
  }
}

/**
 * Resolve multiple Sanity documents by Supabase ID references
 * @param supabaseIds Array of Supabase entity IDs
 * @param documentType Sanity document type to query
 * @param options Resolution options
 * @returns Array of referenced Sanity documents
 */
export async function resolveSanityDocumentsBySupabaseIds<T extends SanityDocument>(
  supabaseIds: string[],
  documentType: string,
  options: ReferenceOptions = {}
): Promise<T[]> {
  if (!supabaseIds || supabaseIds.length === 0) {
    return [];
  }

  const cacheKey = `sanity:${documentType}:bySupabaseIds:${supabaseIds.join(',')}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<T[]>(
      cacheKey,
      async () => {
        const query = `*[_type == $documentType && supabaseId in $supabaseIds]`;
        const params = { documentType, supabaseIds };
        
        const documents = await sanityClient.fetch(query, params);
        
        return documents as T[];
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving multiple Sanity documents by Supabase IDs for ${documentType}:`, error);
    return [];
  }
}
