/**
 * Sponsor-specific reference resolution utilities
 */

import { supabase } from '@/integrations/supabase/client';
import { fetchSanity } from '@/lib/sanity';
import { referenceCache } from './cache';
import { SanityDocument, SupabaseRecord, ReferenceOptions } from './types';

// Define types specific to sponsors
export interface SanitySponsor extends SanityDocument {
  _type: 'sponsor';
  name: string;
  tier?: string;
  logo?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  website?: string;
  description?: string;
  supabaseId?: string;
}

export interface SupabaseSponsor extends SupabaseRecord {
  name: string;
  logo_url?: string;
  logo_dark_url?: string;
  tier?: string;
  website?: string;
  description?: string;
  featured: boolean;
  sanity_id?: string;
}

/**
 * Resolve a sponsor in Supabase from a Sanity sponsor document
 */
export async function resolveSponsorSupabaseRecord(
  sponsor: SanitySponsor | null,
  options: ReferenceOptions = {}
): Promise<SupabaseSponsor | null> {
  if (!sponsor || !sponsor.supabaseId) {
    return null;
  }

  const { supabaseId } = sponsor;
  const cacheKey = `supabase:sponsor:${supabaseId}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<SupabaseSponsor | null>(
      cacheKey,
      async () => {
        const { data, error } = await supabase
          .from('sponsors')
          .select('*')
          .eq('id', supabaseId)
          .single();

        if (error) {
          console.error(`Error fetching sponsor record:`, error);
          return null;
        }

        return data as SupabaseSponsor;
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving Supabase sponsor for Sanity sponsor document:`, error);
    return null;
  }
}

/**
 * Resolve a sponsor in Sanity from a Supabase sponsor record
 */
export async function resolveSponsorSanityDocument(
  sponsor: SupabaseSponsor | null,
  options: ReferenceOptions = {}
): Promise<SanitySponsor | null> {
  if (!sponsor) return null;
  
  // First try to find by sanity_id if present
  if (sponsor.sanity_id) {
    const query = `*[_type == "sponsor" && _id == $sanityId][0]`;
    const sanitySponsor = await fetchSanity(query, { sanityId: sponsor.sanity_id });
    
    if (sanitySponsor) return sanitySponsor as SanitySponsor;
  }
  
  // Otherwise find by supabaseId field
  const query = `*[_type == "sponsor" && supabaseId == $supabaseId][0]`;
  const sanitySponsor = await fetchSanity(query, { supabaseId: sponsor.id });
  
  return sanitySponsor as SanitySponsor | null;
}

/**
 * Get featured sponsors from Supabase
 */
export async function getFeaturedSponsors(
  limit: number = 8,
  options: ReferenceOptions = {}
): Promise<SupabaseSponsor[]> {
  const { skipCache = false } = options;
  const cacheKey = `sponsors:featured:${limit}`;
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data, error } = await supabase
          .from('sponsors')
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(limit);
          
        if (error) {
          console.error('Error fetching featured sponsors:', error);
          return [];
        }
        
        return data as SupabaseSponsor[];
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching featured sponsors:', error);
    return [];
  }
}
