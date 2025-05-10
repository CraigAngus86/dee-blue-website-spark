
/**
 * Types for cross-system reference resolution
 */

// Base types for Sanity and Supabase
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt?: string;
  _updatedAt?: string;
  supabaseId?: string;
}

export interface SupabaseRecord {
  id: string;
  created_at?: string;
  updated_at?: string;
  sanity_id?: string;
}

// Reference resolution options
export interface ReferenceOptions {
  skipCache?: boolean;
  includeRelated?: boolean;
}

// Sanity document types
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
  number?: number;
  nationality?: string;
  bio?: string;
  member_type?: string;
  didYouKnow?: string;
  stats?: any;
}

export interface SanityMatchGallery extends SanityDocument {
  title?: string;
  result?: string;
  date?: string;
  gallery?: {
    images: Array<{
      asset: {
        _ref: string;
      };
      caption?: string;
    }>;
  };
}

export interface SanitySponsor extends SanityDocument {
  name?: string;
  logo?: {
    asset: {
      _ref: string;
    };
  };
  darkLogo?: {
    asset: {
      _ref: string;
    };
  };
  tier?: string;
  website?: string;
  description?: string;
  featured?: boolean;
}

export interface SanityTeam extends SanityDocument {
  name?: string;
  shortName?: string;
  logo?: {
    asset: {
      _ref: string;
    };
  };
  primaryColor?: string;
  website?: string;
}

// Supabase record types
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
}

export interface SupabaseMatch extends SupabaseRecord {
  season_id: string;
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  match_date: string;
  match_time?: string;
  venue?: string;
  home_score?: number;
  away_score?: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'postponed' | 'cancelled';
  home_scorers?: string[];
  away_scorers?: string[];
  attendance?: number;
  is_highlighted?: boolean;
  match_report_link?: string;
}

export interface SupabaseSponsor extends SupabaseRecord {
  name: string;
  tier?: string;
  logo_url?: string;
  logo_dark_url?: string;
  website?: string;
  description?: string;
  featured?: boolean;
}

export interface SupabaseTeam extends SupabaseRecord {
  name: string;
  short_name?: string;
  logo_url?: string;
  website?: string;
  primary_color?: string;
  stadium_name?: string;
  founded_year?: number;
}
