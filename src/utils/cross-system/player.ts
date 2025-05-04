
/**
 * Player-specific reference resolution utilities
 */

import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

/**
 * Resolve a player from a Sanity player profile
 * @param playerProfile Sanity player profile document
 * @param options Resolution options
 * @returns Referenced player from Supabase
 */
export async function resolvePlayerFromProfile(
  playerProfile: any | null,
  options: ReferenceOptions = {}
): Promise<any | null> {
  if (!playerProfile || !playerProfile.supabaseId) {
    return null;
  }
  
  const { skipCache = false } = options;
  const cacheKey = `player:${playerProfile.supabaseId}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from('people')
          .select('*')
          .eq('id', playerProfile.supabaseId)
          .single();
          
        if (error || !data) {
          console.error(`Error resolving player ${playerProfile.supabaseId}:`, error);
          return null;
        }
        
        return data;
      } catch (error) {
        console.error(`Error resolving player ${playerProfile.supabaseId}:`, error);
        return null;
      }
    },
    skipCache
  );
}

/**
 * Resolve a Sanity player profile from a Supabase player record
 * @param player Supabase player record
 * @param options Resolution options
 * @returns Referenced Sanity player profile
 */
export async function resolveProfileFromPlayer(
  player: any | null,
  options: ReferenceOptions = {}
): Promise<any | null> {
  if (!player || !player.id) return null;
  
  const { skipCache = false } = options;
  const cacheKey = `playerProfile:${player.id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const query = `*[_type == "playerProfile" && supabaseId == $supabaseId][0]`;
        const params = { supabaseId: player.id };
        
        const profile = await sanityClient.fetch(query, params);
        
        return profile || null;
      } catch (error) {
        console.error(`Error resolving player profile for ${player.id}:`, error);
        return null;
      }
    },
    skipCache
  );
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
): Promise<{ player: any | null, profile: any | null }> {
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
        
        const profile = await resolveProfileFromPlayer(player, options);
        
        return { 
          player,
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
): Promise<Array<{ player: any, profile: any | null }>> {
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
            const profile = await resolveProfileFromPlayer(player, options);
            return {
              player,
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
