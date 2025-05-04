
/**
 * Cross-system reference types
 */

// Base interfaces for documents/records
export interface SanityDocument {
  _id: string;
  _type: string;
  _rev?: string;
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
  usePreview?: boolean;
}

// Team types
export interface SanityTeam extends SanityDocument {
  _type: 'team';
  name: string;
  shortName?: string;
  logo?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  supabaseId?: string;
}

export interface SupabaseTeam extends SupabaseRecord {
  name: string;
  short_name?: string;
  logo_url?: string;
  sanity_id?: string;
}

// Cache interface
export interface ReferenceCache {
  getOrSet<T>(key: string, factory: () => Promise<T>, skipCache?: boolean): Promise<T>;
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): void;
  clear(): void;
}
