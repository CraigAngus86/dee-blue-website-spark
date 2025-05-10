/**
 * Player-specific reference resolution utilities
 */

import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/client';
import { 
  SanityPlayerProfile, 
  SupabasePerson,
  ReferenceOptions 
} from './types';
import { resolveSupabaseReference } from './resolveSupabaseReference';
import { resolveSanityDocumentBySupabaseId } from './resolveSanityReference';
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
  return resolveSupabaseReference<SupabasePerson>(playerProfile, 'people', options);
}

/**
 * Resolve a Sanity player profile from a Supabase player record
 * @param player Supabase player record
 * @param options Resolution options
 * @returns Referenced Sanity player profile
 */
export async function resolveProfileFromPlayer(
  player: SupabasePerson | null,
  options: ReferenceOptions = {}
): Promise<SanityPlayerProfile | null> {
  if (!player) return null;
  
  const { includeRelated = false } = options;
  
  // First try to find by sanity_id if present
  if (player.sanity_id) {
    const query = `*[_type == "playerProfile" && _id == $sanityId][0]`;
    const profile = await sanityClient.fetch(query, { sanityId: player.sanity_id });
    
    if (profile) return profile as SanityPlayerProfile;
  }
  
  // Otherwise find by supabaseId field
  return resolveSanityDocumentBySupabaseId<SanityPlayerProfile>(player.id, 'playerProfile', options);
}

/**
 * Get a player with their associated Sanity profile data
 * @param playerId Supabase player ID
 * @param options Resolution options
 * @returns Player with profile data
 */
export async function getPlayerWithProfile(
  playerId: string,
  options: ReferenceOptions = {}
): Promise<{ player: SupabasePerson | null, profile: SanityPlayerProfile | null }> {
  const { skipCache = false } = options;
  const cacheKey = `player:withProfile:${playerId}`;
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data: player, error } = await supabase
          .from('people')
          .select('*')
          .eq('id', playerId)
          .single();
          
        if (error || !player) {
          return { player: null, profile: null };
        }
        
        const profile = await resolveProfileFromPlayer(player as SupabasePerson, options);
        
        return { 
          player: player as SupabasePerson,
          profile
        };
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching player with profile:', error);
    return { player: null, profile: null };
  }
}

/**
 * Get all players with their associated Sanity profile data
 * @param options Resolution options
 * @returns Array of players with profile data
 */
export async function getAllPlayersWithProfiles(
  options: ReferenceOptions = {}
): Promise<Array<{ player: SupabasePerson, profile: SanityPlayerProfile | null }>> {
  const { skipCache = false } = options;
  const cacheKey = 'players:withProfiles';
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data: players, error } = await supabase
          .from('people')
          .select('*')
          .is('player_position', 'not.null');
          
        if (error || !players) {
          return [];
        }
        
        const results = await Promise.all(
          players.map(async (player) => {
            const profile = await resolveProfileFromPlayer(player as SupabasePerson, options);
            return {
              player: player as SupabasePerson,
              profile
            };
          })
        );
        
        return results;
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching all players with profiles:', error);
    return [];
  }
}
