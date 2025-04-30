
/**
 * Common types for cross-system reference resolution
 */

import { PostgrestSingleResponse } from '@supabase/supabase-js';

/**
 * Base Sanity document interface
 */
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  [key: string]: any;
}

/**
 * Base Supabase record interface
 */
export interface SupabaseRecord {
  id: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

/**
 * Entity-specific Sanity document types
 */
export interface SanityPlayerProfile extends SanityDocument {
  _type: 'playerProfile';
  supabaseId: string;
  playerName?: string;
  profileImage?: any;
  extendedBio?: any;
}

export interface SanityMatchGallery extends SanityDocument {
  _type: 'matchGallery';
  supabaseId: string;
  title?: string;
  description?: string;
  matchDate?: string;
  coverImage?: any;
  photos?: Array<any>;
}

export interface SanitySponsor extends SanityDocument {
  _type: 'sponsor';
  supabaseId: string;
  name?: string;
  slug?: any;
  logo?: any;
  tier?: string;
}

export interface SanityCommercialPackage extends SanityDocument {
  _type: 'commercialPackage';
  supabaseId: string;
  title?: string;
  category?: string;
  price?: number;
  description?: any;
}

export interface SanityFanOfMonth extends SanityDocument {
  _type: 'fanOfMonth';
  supabaseId?: string;
  name?: string;
  monthYear?: string;
  shortBio?: string;
}

/**
 * Entity-specific Supabase record types
 */
export interface SupabasePerson extends SupabaseRecord {
  name: string;
  first_name: string;
  last_name: string;
  position?: string;
  player_position?: string;
  staff_role?: string;
  jersey_number?: number;
  image_url?: string;
  bio?: string;
  sanity_id?: string;
}

export interface SupabaseMatch extends SupabaseRecord {
  season_id?: string;
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  match_date: string;
  match_time?: string;
  home_score?: number;
  away_score?: number;
  venue?: string;
  status?: string;
  ticket_link?: string;
  match_report_link?: string;
  sanity_id?: string;
}

export interface SupabaseSponsor extends SupabaseRecord {
  name: string;
  tier?: string;
  logo_url?: string;
  website?: string;
  description?: string;
  sanity_id?: string;
}

export interface SupabaseCommercialPackage extends SupabaseRecord {
  name: string;
  type: string;
  description?: string;
  price?: number;
  sanity_id?: string;
}

export interface SupabaseFanOfMonth extends SupabaseRecord {
  name: string;
  featured_month: string;
  quote?: string;
  image_url?: string;
  fan_story?: string;
  sanity_id?: string;
}

/**
 * Generic fetch response type
 */
export type FetchResponse<T> = {
  data: T | null;
  error: Error | null;
};

/**
 * Reference resolution options
 */
export interface ReferenceOptions {
  skipCache?: boolean;
  includeRelated?: boolean;
}
