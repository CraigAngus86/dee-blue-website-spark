
/**
 * Type definitions for cross-system references
 */

// Supabase types
export interface SupabasePerson {
  id: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  player_position?: string;
  nationality?: string;
  image_url?: string;
  jersey_number?: number;
  appearances?: number;
  goals?: number;
  assists?: number;
  clean_sheets?: number;
  yellow_cards?: number;
  red_cards?: number;
  sanity_id?: string;
  bio?: string;
}

// Sanity types
export interface SanityPlayerProfile {
  _id: string;
  supabaseId?: string;
  firstName?: string;
  lastName?: string;
  playerName?: string;
  playerPosition?: string;
  staffType?: string;
  staffRole?: string;
  nationality?: string;
  profileImage?: {
    asset?: {
      url?: string;
      public_id?: string;
    }
  };
  number?: number;
  extendedBio?: any;
  careerHistory?: any[];
}

// Reference options
export interface ReferenceOptions {
  skipCache?: boolean;
  includeRelated?: boolean;
}

// Cache interface
export interface ReferenceCache {
  get: (key: string) => Promise<any | null>;
  set: (key: string, value: any, ttlSeconds?: number) => Promise<void>;
  getOrSet: (key: string, fetchFn: () => Promise<any>, skipCache?: boolean) => Promise<any>;
  clear: (pattern?: string) => Promise<void>;
}
