
/**
 * Utility to resolve Supabase entities from Sanity document references
 */

import { supabase } from '@/lib/supabase/client';
import { referenceCache } from './cache';
import { SanityDocument, SupabaseRecord, ReferenceOptions } from './types';

/**
 * Resolve a Supabase entity referenced by a Sanity document
 * @param document Sanity document containing a supabaseId field
 * @param table Supabase table name to query
 * @param options Resolution options
 * @returns Referenced Supabase entity or null if not found
 */
export async function resolveSupabaseReference<T extends SupabaseRecord>(
  document: SanityDocument | null,
  table: string,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!document || !document.supabaseId) {
    console.warn(`Invalid document or missing supabaseId for ${document?._type} document`);
    return null;
  }

  const { supabaseId } = document;
  const cacheKey = `supabase:${table}:${supabaseId}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<T | null>(
      cacheKey,
      async () => {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('id', supabaseId)
          .single();

        if (error) {
          console.error(`Error fetching ${table} record:`, error);
          return null;
        }

        return data as T;
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving Supabase reference for ${document._type}:`, error);
    return null;
  }
}

/**
 * Resolve multiple Supabase entities referenced by Sanity documents
 * @param documents Array of Sanity documents containing supabaseId fields
 * @param table Supabase table name to query
 * @param options Resolution options
 * @returns Array of referenced Supabase entities (null values filtered out)
 */
export async function resolveSupabaseReferences<T extends SupabaseRecord>(
  documents: SanityDocument[] | null,
  table: string,
  options: ReferenceOptions = {}
): Promise<T[]> {
  if (!documents || documents.length === 0) {
    return [];
  }

  const validDocuments = documents.filter(doc => doc && doc.supabaseId);
  const supabaseIds = validDocuments.map(doc => doc.supabaseId);
  
  if (supabaseIds.length === 0) {
    return [];
  }

  const cacheKey = `supabase:${table}:multiple:${supabaseIds.join(',')}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<T[]>(
      cacheKey,
      async () => {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .in('id', supabaseIds);

        if (error) {
          console.error(`Error fetching ${table} records:`, error);
          return [];
        }

        return data as T[];
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving multiple Supabase references:`, error);
    return [];
  }
}
