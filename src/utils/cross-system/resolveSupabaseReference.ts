
import { supabase } from '@/lib/supabase/client';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

/**
 * Resolve a reference to a Supabase record
 * @param tableName Supabase table name
 * @param id Record ID
 * @param options Resolution options
 * @returns Referenced Supabase record or null if not found
 */
export default async function resolveSupabaseReference<T = any>(
  tableName: string,
  id: string | null | undefined,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!id) return null;
  
  const { skipCache = false } = options;
  const cacheKey = `supabase:${tableName}:${id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        console.log(`Resolving Supabase reference: ${tableName} with ID ${id}`);
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error(`Error resolving Supabase reference for ${tableName}:${id}:`, error);
          return null;
        }
        
        return data as T;
      } catch (error) {
        console.error(`Exception resolving Supabase reference for ${tableName}:${id}:`, error);
        return null;
      }
    },
    skipCache
  );
}
