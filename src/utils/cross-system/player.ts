
/**
 * Cross-system utility for player data management
 */

import { supabase } from './resolveSupabaseReference'; 
import { fetchSanity } from '@/lib/sanity';
import { referenceCache } from './cache';
import { resolveSanityReference } from './resolveSanityReference';

// Player types
export interface PlayerSupabase {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  image_url?: string;
  jersey_number?: number;
  nationality?: string;
  position?: string;
  bio?: string;
  joined_date?: string;
  sanity_id?: string;
}

export interface PlayerSanity {
  _id: string;
  _type: 'player';
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  profileImage?: {
    asset: {
      _ref: string;
    };
  };
  bio?: {
    _type: 'block';
    children: any[];
  }[];
  joinedDate?: string;
  supabaseId?: string;
}

/**
 * Get a player from Supabase by ID
 */
export async function getPlayerById(id: string): Promise<PlayerSupabase | null> {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as PlayerSupabase;
  } catch (error) {
    console.error('Error fetching player by ID:', error);
    return null;
  }
}

/**
 * Get a player from Sanity by ID
 */
export async function getPlayerByIdFromSanity(id: string): Promise<PlayerSanity | null> {
  try {
    const query = `*[_type == "player" && _id == $id][0]`;
    const player = await fetchSanity<PlayerSanity>(query, { id });
    return player;
  } catch (error) {
    console.error('Error fetching player from Sanity by ID:', error);
    return null;
  }
}

/**
 * Get a player by either Supabase ID or Sanity ID
 */
export async function getPlayerByAnyId(id: string, source?: 'supabase' | 'sanity'): Promise<PlayerSupabase | PlayerSanity | null> {
  if (source === 'supabase') {
    return getPlayerById(id);
  } else if (source === 'sanity') {
    return getPlayerByIdFromSanity(id);
  }

  // Try both if source is not specified
  const supabasePlayer = await getPlayerById(id);
  if (supabasePlayer) return supabasePlayer;

  return getPlayerByIdFromSanity(id);
}

/**
 * Resolve related Sanity player document from a Supabase player record
 */
export async function resolvePlayerSanityDocument(
  supabasePlayer: PlayerSupabase
): Promise<PlayerSanity | null> {
  if (!supabasePlayer || !supabasePlayer.sanity_id) return null;
  
  return resolveSanityReference<PlayerSanity>(
    { id: supabasePlayer.id, sanity_id: supabasePlayer.sanity_id },
    'player'
  );
}

/**
 * Resolve related Supabase player record from a Sanity player document
 */
export async function resolvePlayerSupabaseRecord(
  sanityPlayer: PlayerSanity
): Promise<PlayerSupabase | null> {
  if (!sanityPlayer || !sanityPlayer.supabaseId) return null;
  
  return supabase
    .from('players')
    .select('*')
    .eq('id', sanityPlayer.supabaseId)
    .single()
    .then(({ data }) => data as PlayerSupabase)
    .catch(error => {
      console.error('Error resolving player Supabase record:', error);
      return null;
    });
}
