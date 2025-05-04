
import { ReferenceOptions } from './types';
import { supabase } from '@/lib/supabase/client';
import { referenceCache } from './cache';

/**
 * Resolves a reference to a Supabase record
 * 
 * @param table - Supabase table name
 * @param id - Record ID to fetch
 * @param options - Options for resolving the reference
 * @returns The resolved record or null if not found
 */
async function resolveSupabaseReference<T = any>(
  table: string,
  id: string | number | null | undefined,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!id) {
    return null;
  }
  
  // Generate cache key
  const cacheKey = `supabase:${table}:${id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error(`Error resolving Supabase reference ${table}:${id}:`, error);
          return null;
        }
        
        return data as T;
      } catch (error) {
        console.error(`Error resolving Supabase reference ${table}:${id}:`, error);
        return null;
      }
    },
    options.skipCache
  );
}

export default resolveSupabaseReference;
