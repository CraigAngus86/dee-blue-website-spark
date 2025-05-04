/**
 * Player-specific reference resolution utilities
 */

import { supabase } from '@/integrations/supabase/client';
import { fetchSanity } from '@/lib/sanity';
import { referenceCache } from './cache';
import { resolveSupabaseReference } from './resolveSupabaseReference';
import { resolveSanityDocumentBySupabaseId } from './resolveSanityReference';
import { SanityDocument, SupabaseRecord, ReferenceOptions } from './types';

// Define types specific to players
export interface SanityPlayerProfile extends SanityDocument {
  playerName?: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  profileImage?: {
    asset: {
      _ref: string;
    };
  };
  jerseyNumber?: number;
  nationality?: string;
  bio?: string;
  member_type?: string;
  didYouKnow?: string;
  stats?: any;
}

export interface SupabasePerson extends SupabaseRecord {
  first_name: string;
  last_name: string;
  name: string;
  player_position?: string;
  staff_role?: string;
  position?: string;
  image_url?: string;
  jersey_number?: number;
  nationality?: string;
  bio?: string;
  joined_date?: string;
  social_media?: Record<string, string>;
  academy_player?: boolean;
  did_you_know?: string;
}

/**
 * Resolve a player from a Sanity player profile
 */
export async function resolvePlayerFromProfile(
  playerProfile: SanityPlayerProfile | null,
  options: ReferenceOptions = {}
): Promise<SupabasePerson | null> {
  return resolveSupabaseReference<SupabasePerson>(playerProfile, 'people', options);
}

/**
 * Resolve a Sanity player profile from a Supabase player record
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
    const profile = await fetchSanity(query, { sanityId: player.sanity_id });
    
    if (profile) return profile as SanityPlayerProfile;
  }
  
  // Otherwise find by supabaseId field
  return resolveSanityDocumentBySupabaseId<SanityPlayerProfile>(player.id, 'playerProfile', options);
}

/**
 * Get a player with their associated Sanity profile data
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
