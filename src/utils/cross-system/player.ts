
/**
 * Player-specific reference resolution utilities
 */

import { supabase } from '@/integrations/supabase/client';
import { SanityPlayerProfile, SupabasePerson, ReferenceOptions } from './types';
import { referenceCache } from './cache';

/**
 * Resolve a player from a Sanity player profile
 * @param playerProfile Sanity player profile document
 * @param options Resolution options
 * @returns Referenced player from Supabase
 */
export async function resolvePlayerFromProfile(
  playerProfile: SanityPlayerProfile | null,
  options: ReferenceOptions = {}
): Promise<SupabasePerson | null> {
  if (!playerProfile) {
    console.warn('No player profile provided to resolvePlayerFromProfile');
    return null;
  }

  const { skipCache = false } = options;
  const supabaseId = playerProfile.supabaseId || playerProfile._id;
  
  if (!supabaseId) {
    console.warn(`Player profile ${playerProfile._id} has no supabaseId`);
    return null;
  }

  try {
    const cacheKey = `player:${supabaseId}`;
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        // Query Supabase for player data
        const { data, error } = await supabase
          .from('people')
          .select('*')
          .eq('id', supabaseId)
          .single();

        if (error) {
          if (error.code !== 'PGRST116') { // Not found error
            console.error(`Error fetching player with ID ${supabaseId}:`, error);
          }
          return null;
        }

        return data as SupabasePerson;
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving player from profile ${playerProfile._id}:`, error);
    return null;
  }
}

export default {
  resolvePlayerFromProfile
};
