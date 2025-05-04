
import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/client';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

export interface CrossSystemSponsor {
  id?: string;
  name: string;
  tier?: string;
  website?: string;
  logoUrl?: string;
  logoDarkUrl?: string;
  description?: string;
  featured?: boolean;
}

/**
 * Resolves a sponsor from Supabase by ID
 */
export async function resolveSupabaseSponsor(
  id: string | null | undefined,
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
          
        if (error || !data) {
          console.error(`Error resolving Supabase sponsor ${id}:`, error);
          return null;
        }
        
        return {
          id: data.id,
          name: data.name,
          tier: data.tier,
          website: data.website,
          logoUrl: data.logo_url,
          logoDarkUrl: data.logo_dark_url,
          description: data.description,
          featured: data.featured
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
 * Get all sponsors from Supabase
 */
export async function getSupabaseSponsors(
  options: ReferenceOptions & {
    tier?: string;
    featuredOnly?: boolean;
  } = {}
): Promise<CrossSystemSponsor[]> {
  const { tier, featuredOnly = false } = options;
  const cacheKey = `supabase:sponsors:${tier || 'all'}:${featuredOnly ? 'featured' : 'all'}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        let query = supabase
          .from('sponsors')
          .select('*');
        
        if (tier) {
          query = query.eq('tier', tier);
        }
        
        if (featuredOnly) {
          query = query.eq('featured', true);
        }
        
        const { data, error } = await query.order('name');
        
        if (error || !data) {
          console.error('Error fetching sponsors:', error);
          return [];
        }
        
        return data.map(sponsor => ({
          id: sponsor.id,
          name: sponsor.name,
          tier: sponsor.tier,
          website: sponsor.website,
          logoUrl: sponsor.logo_url,
          logoDarkUrl: sponsor.logo_dark_url,
          description: sponsor.description,
          featured: sponsor.featured
        }));
      } catch (error) {
        console.error('Error fetching sponsors:', error);
        return [];
      }
    },
    options.skipCache
  );
}
