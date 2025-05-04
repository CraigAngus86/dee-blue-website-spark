
/**
 * Cross-system utility for sponsor data management
 */

import { supabase } from './resolveSupabaseReference'; 
import { fetchSanity } from '@/lib/sanity';
import { referenceCache } from './cache';
import { resolveSanityReference } from './resolveSanityReference';

// Sponsor types
export interface SponsorSupabase {
  id: string;
  name: string;
  logo_url?: string;
  logo_dark_url?: string;
  website?: string;
  tier?: string;
  featured?: boolean;
  sanity_id?: string;
}

export interface SponsorSanity {
  _id: string;
  _type: 'sponsor';
  name: string;
  logo?: {
    asset: {
      _ref: string;
    };
  };
  logoDark?: {
    asset: {
      _ref: string;
    };
  };
  website?: string;
  tier?: string;
  featured?: boolean;
  supabaseId?: string;
}

/**
 * Get a sponsor from Supabase by ID
 */
export async function getSponsorById(id: string): Promise<SponsorSupabase | null> {
  try {
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as SponsorSupabase;
  } catch (error) {
    console.error('Error fetching sponsor by ID:', error);
    return null;
  }
}

/**
 * Get a sponsor from Sanity by ID
 */
export async function getSponsorByIdFromSanity(id: string): Promise<SponsorSanity | null> {
  try {
    const query = `*[_type == "sponsor" && _id == $id][0]`;
    const sponsor = await fetchSanity<SponsorSanity>(query, { id });
    return sponsor;
  } catch (error) {
    console.error('Error fetching sponsor from Sanity by ID:', error);
    return null;
  }
}

/**
 * Get a sponsor by either Supabase ID or Sanity ID
 */
export async function getSponsorByAnyId(id: string, source?: 'supabase' | 'sanity'): Promise<SponsorSupabase | SponsorSanity | null> {
  if (source === 'supabase') {
    return getSponsorById(id);
  } else if (source === 'sanity') {
    return getSponsorByIdFromSanity(id);
  }

  // Try both if source is not specified
  const supabaseSponsor = await getSponsorById(id);
  if (supabaseSponsor) return supabaseSponsor;

  return getSponsorByIdFromSanity(id);
}

/**
 * Resolve related Sanity sponsor document from a Supabase sponsor record
 */
export async function resolveSponsorSanityDocument(
  supabaseSponsor: SponsorSupabase
): Promise<SponsorSanity | null> {
  if (!supabaseSponsor || !supabaseSponsor.sanity_id) return null;
  
  return resolveSanityReference<SponsorSanity>(
    { id: supabaseSponsor.id, sanity_id: supabaseSponsor.sanity_id },
    'sponsor'
  );
}

/**
 * Resolve related Supabase sponsor record from a Sanity sponsor document
 */
export async function resolveSponsorSupabaseRecord(
  sanitySponsor: SponsorSanity
): Promise<SponsorSupabase | null> {
  if (!sanitySponsor || !sanitySponsor.supabaseId) return null;
  
  try {
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .eq('id', sanitySponsor.supabaseId)
      .single();
      
    if (error) {
      console.error('Error resolving sponsor Supabase record:', error);
      return null;
    }
    
    return data as SponsorSupabase;
  } catch (error) {
    console.error('Error resolving sponsor Supabase record:', error);
    return null;
  }
}
