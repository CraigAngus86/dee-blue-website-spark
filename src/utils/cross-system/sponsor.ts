
import { supabase } from '@/lib/supabase/client';
import { client } from '@/lib/sanity/client';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';
import resolveSupabaseReference from './resolveSupabaseReference';
import resolveSanityReference from './resolveSanityReference';

/**
 * Interface for sponsor details that can be resolved from both systems
 */
export interface CrossSystemSponsor {
  id?: string | number;
  sanityId?: string;
  supabaseId?: number;
  name?: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  featured?: boolean;
  tier?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Resolves a sponsor reference from Supabase
 */
export async function resolveSupabaseSponsor(
  id: number | string | null | undefined,
  options: ReferenceOptions = {}
): Promise<CrossSystemSponsor | null> {
  if (!id) return null;
  
  const cacheKey = `supabase:sponsor:${id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from('sponsors')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error(`Error resolving Supabase sponsor ${id}:`, error);
          return null;
        }
        
        if (!data) {
          return null;
        }
        
        return {
          id: data.id,
          supabaseId: data.id,
          name: data.name,
          description: data.description,
          website: data.website,
          logoUrl: data.logo_url,
          featured: data.featured,
          tier: data.sponsor_tier,
          startDate: data.start_date,
          endDate: data.end_date
        };
      } catch (error) {
        console.error(`Error resolving Supabase sponsor ${id}:`, error);
        return null;
      }
    },
    options.skipCache
  );
}

/**
 * Get all sponsors from Supabase with optional filtering
 */
export async function getSupabaseSponsors(
  options: ReferenceOptions & { 
    featuredOnly?: boolean;
    tier?: string;
    limit?: number;
  } = {}
): Promise<CrossSystemSponsor[]> {
  const { featuredOnly, tier, limit = 100 } = options;
  const cacheKey = `supabase:all-sponsors:${featuredOnly ? 'featured' : 'all'}:${tier || 'all'}:${limit}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        let query = supabase.from('sponsors').select('*');
          
        if (featuredOnly) {
          query = query.eq('featured', true);
        }
        
        if (tier) {
          query = query.eq('sponsor_tier', tier);
        }
        
        const { data, error } = await query
          .order('featured', { ascending: false })
          .limit(limit);
          
        if (error) {
          console.error('Error fetching sponsors:', error);
          return [];
        }
        
        if (!data || !data.length) {
          return [];
        }
        
        return data.map(sponsor => ({
          id: sponsor.id,
          supabaseId: sponsor.id,
          name: sponsor.name,
          description: sponsor.description,
          website: sponsor.website,
          logoUrl: sponsor.logo_url,
          featured: sponsor.featured,
          tier: sponsor.sponsor_tier,
          startDate: sponsor.start_date,
          endDate: sponsor.end_date
        }));
      } catch (error) {
        console.error('Error fetching sponsors:', error);
        return [];
      }
    },
    options.skipCache
  );
}
