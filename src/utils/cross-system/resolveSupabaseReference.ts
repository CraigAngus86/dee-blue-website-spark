
import { supabase } from '@/lib/supabase/client';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

/**
 * Resolves a reference to a Supabase record
 * 
 * @param sourceObject - The source document containing information about the reference
 * @param tableName - Supabase table name to query
 * @param options - Options for resolving the reference
 * @returns The resolved record or null if not found
 */
async function resolveSupabaseReference<T = any>(
  sourceObject: any | null | undefined,
  tableName: string,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!sourceObject) {
    return null;
  }
  
  // Check for supabaseId in the source object
  const supabaseId = sourceObject.supabaseId || sourceObject.id;
  
  if (!supabaseId) {
    return null;
  }
  
  // Generate cache key
  const cacheKey = `supabase:${tableName}:${supabaseId}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', supabaseId)
          .single();
          
        if (error || !data) {
          console.error(`Error resolving Supabase reference ${tableName}:${supabaseId}:`, error);
          return null;
        }
        
        return data as T;
      } catch (error) {
        console.error(`Error resolving Supabase reference ${tableName}:${supabaseId}:`, error);
        return null;
      }
    },
    options.skipCache
  );
}

export default resolveSupabaseReference;
