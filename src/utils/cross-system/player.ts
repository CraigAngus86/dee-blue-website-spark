
import { supabase } from '@/lib/supabase/client';
import { client } from '@/lib/sanity/client';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

/**
 * Interface for player details that can be resolved from both systems
 */
export interface CrossSystemPlayer {
  id?: string | number;
  sanityId?: string;
  supabaseId?: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  position?: string;
  jerseyNumber?: number;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
  nationality?: string;
  bio?: string;
  imageUrl?: string;
  stats?: {
    appearances?: number;
    goals?: number;
    assists?: number;
    cleanSheets?: number;
    yellowCards?: number;
    redCards?: number;
  };
}

/**
 * Resolves a player reference from Supabase
 */
export async function resolveSupabasePlayer(
  id: number | string | null | undefined,
  options: ReferenceOptions = {}
): Promise<CrossSystemPlayer | null> {
  if (!id) return null;
  
  const cacheKey = `supabase:player:${id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from('people')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error(`Error resolving Supabase player ${id}:`, error);
          return null;
        }
        
        if (!data) {
          return null;
        }
        
        return {
          id: data.id,
          supabaseId: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          fullName: `${data.first_name} ${data.last_name}`,
          position: data.player_position,
          jerseyNumber: data.jersey_number,
          dateOfBirth: data.date_of_birth,
          nationality: data.nationality,
          bio: data.bio,
          imageUrl: data.image_url,
          stats: {
            appearances: data.appearances,
            goals: data.goals,
            assists: data.assists,
            cleanSheets: data.clean_sheets,
            yellowCards: data.yellow_cards,
            redCards: data.red_cards
          }
        };
      } catch (error) {
        console.error(`Error resolving Supabase player ${id}:`, error);
        return null;
      }
    },
    options.skipCache
  );
}

/**
 * Get all players from Supabase with optional filtering
 */
export async function getSupabasePlayers(
  options: ReferenceOptions & { 
    positionFilter?: string;
    limit?: number;
    includeRelated?: boolean;
  } = {}
): Promise<CrossSystemPlayer[]> {
  const { positionFilter, limit = 100 } = options;
  const cacheKey = `supabase:all-players:${positionFilter || 'all'}:${limit}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        let query = supabase
          .from('people')
          .select('*')
          .is('player_position', 'not.null');
          
        if (positionFilter) {
          query = query.eq('player_position', positionFilter);
        }
        
        const { data, error } = await query
          .order('jersey_number', { ascending: true })
          .limit(limit);
          
        if (error) {
          console.error('Error fetching players:', error);
          return [];
        }
        
        if (!data || !data.length) {
          return [];
        }
        
        return data.map(player => ({
          id: player.id,
          supabaseId: player.id,
          firstName: player.first_name,
          lastName: player.last_name,
          fullName: `${player.first_name} ${player.last_name}`,
          position: player.player_position,
          jerseyNumber: player.jersey_number,
          dateOfBirth: player.date_of_birth,
          nationality: player.nationality,
          bio: player.bio,
          imageUrl: player.image_url,
          stats: {
            appearances: player.appearances,
            goals: player.goals,
            assists: player.assists,
            cleanSheets: player.clean_sheets,
            yellowCards: player.yellow_cards,
            redCards: player.red_cards
          }
        }));
      } catch (error) {
        console.error('Error fetching players:', error);
        return [];
      }
    },
    options.skipCache
  );
}
