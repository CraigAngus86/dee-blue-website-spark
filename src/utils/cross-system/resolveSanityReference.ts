
/**
 * Utility to resolve Sanity documents from Supabase entity references
 */

import { fetchSanityData } from '@/lib/sanity/client';
import { referenceCache } from './cache';
import { SanityDocument, SupabaseRecord, ReferenceOptions } from './types';

/**
 * Resolve a Sanity document referenced by a Supabase entity
 * @param record Supabase record containing a sanityId field
 * @param docType Sanity document type to query
 * @param options Resolution options
 * @returns Referenced Sanity document or null if not found
 */
export async function resolveSanityReference<T extends SanityDocument>(
  record: SupabaseRecord | null,
  docType: string,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!record || !record.sanity_id) {
    console.warn(`Invalid record or missing sanity_id for record:`, record);
    return null;
  }

  const { sanity_id } = record;
  const cacheKey = `sanity:${docType}:${sanity_id}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<T | null>(
      cacheKey,
      async () => {
        const query = `*[_type == $docType && _id == $id][0]`;
        const params = { docType, id: sanity_id };
        
        const result = await fetchSanityData(query, params);
        return result as T;
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving Sanity reference for ${sanity_id}:`, error);
    return null;
  }
}

/**
 * Resolve multiple Sanity documents referenced by Supabase entities
 * @param records Array of Supabase records containing sanityId fields
 * @param docType Sanity document type to query
 * @param options Resolution options
 * @returns Array of referenced Sanity documents (null values filtered out)
 */
export async function resolveSanityReferences<T extends SanityDocument>(
  records: SupabaseRecord[] | null,
  docType: string,
  options: ReferenceOptions = {}
): Promise<T[]> {
  if (!records || records.length === 0) {
    return [];
  }

  const validRecords = records.filter(rec => rec && rec.sanity_id);
  const sanityIds = validRecords.map(rec => rec.sanity_id);
  
  if (sanityIds.length === 0) {
    return [];
  }

  const cacheKey = `sanity:${docType}:multiple:${sanityIds.join(',')}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<T[]>(
      cacheKey,
      async () => {
        const query = `*[_type == $docType && _id in $ids]`;
        const params = { docType, ids: sanityIds };
        
        const results = await fetchSanityData(query, params);
        return results as T[];
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving multiple Sanity references:`, error);
    return [];
  }
}
