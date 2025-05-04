
/**
 * Utility to resolve Supabase entities from Sanity document references
 */

import { supabase } from '@/integrations/supabase/client';
import { referenceCache } from './cache';
import { SanityDocument, SupabaseRecord, ReferenceOptions } from './types';

/**
 * Resolve a Supabase entity referenced by a Sanity document
 */
export async function resolveSupabaseReference<T extends SupabaseRecord>(
  document: SanityDocument | null,
  tableName: string,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!document || !document.supabaseId) {
    console.warn(`Invalid document or missing supabaseId for ${document?._type} document`);
    return null;
  }

  const { supabaseId } = document;
  const cacheKey = `supabase:${tableName}:${supabaseId}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<T | null>(
      cacheKey,
      async () => {
        // Use type assertion to handle the dynamic table name
        const { data, error } = await supabase
          .from(tableName as any)
          .select('*')
          .eq('id', supabaseId)
          .single();

        if (error) {
          console.error(`Error fetching ${tableName} record:`, error);
          return null;
        }

        return data as unknown as T;
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
 */
export async function resolveSupabaseReferences<T extends SupabaseRecord>(
  documents: SanityDocument[] | null,
  tableName: string,
  options: ReferenceOptions = {}
): Promise<T[]> {
  if (!documents || documents.length === 0) {
    return [];
  }

  const validDocuments = documents.filter(doc => doc && doc.supabaseId);
  
  // Filter out any undefined supabase IDs and ensure they're strings
  const supabaseIds = validDocuments
    .map(doc => doc.supabaseId)
    .filter((id): id is string => id !== undefined && id !== null);
  
  if (supabaseIds.length === 0) {
    return [];
  }

  const cacheKey = `supabase:${tableName}:multiple:${supabaseIds.join(',')}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<T[]>(
      cacheKey,
      async () => {
        // Use type assertion to handle the dynamic table name
        const { data, error } = await supabase
          .from(tableName as any)
          .select('*')
          .in('id', supabaseIds);

        if (error) {
          console.error(`Error fetching ${tableName} records:`, error);
          return [];
        }

        return data as unknown as T[];
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving multiple Supabase references:`, error);
    return [];
  }
}
