/**
 * Sponsor-specific reference resolution utilities
 */

import { supabase } from '@/integrations/supabase/client';
import sanityClient from '../../../../sanity-studio/client';
import { 
  SanitySponsor,
  SupabaseSponsor,
  ReferenceOptions 
} from './types';
import { resolveSupabaseReference } from './resolveSupabaseReference';
import { resolveSanityDocumentBySupabaseId } from './resolveSanityReference';
import { referenceCache } from './cache';

/**
 * Resolve a sponsor from a Sanity sponsor document
 * @param sponsorDoc Sanity sponsor document
 * @param options Resolution options
 * @returns Referenced sponsor from Supabase
 */
export async function resolveSponsorFromDocument(
  sponsorDoc: SanitySponsor | null,
  options: ReferenceOptions = {}
): Promise<SupabaseSponsor | null> {
  return resolveSupabaseReference<SupabaseSponsor>(sponsorDoc, 'sponsors', options);
}

/**
 * Resolve a Sanity sponsor document from a Supabase sponsor record
 * @param sponsor Supabase sponsor record
 * @param options Resolution options
 * @returns Referenced Sanity sponsor document
 */
export async function resolveSponsorDocumentFromRecord(
  sponsor: SupabaseSponsor | null,
  options: ReferenceOptions = {}
): Promise<SanitySponsor | null> {
  if (!sponsor) return null;
  
  // First try to find by sanity_id if present
  if (sponsor.sanity_id) {
    const query = `*[_type == "sponsor" && _id == $sanityId][0]`;
    const sponsorDoc = await sanityClient.fetch(query, { sanityId: sponsor.sanity_id });
    
    if (sponsorDoc) return sponsorDoc as SanitySponsor;
  }
  
  // Otherwise find by supabaseId field
  return resolveSanityDocumentBySupabaseId<SanitySponsor>(sponsor.id, 'sponsor', options);
}

/**
 * Get a sponsor with its associated Sanity content
 * @param sponsorId Supabase sponsor ID
 * @param options Resolution options
 * @returns Sponsor with related content
 */
export async function getSponsorWithContent(
  sponsorId: string,
  options: ReferenceOptions = {}
): Promise<{ 
  sponsor: SupabaseSponsor | null, 
  sponsorDocument: SanitySponsor | null 
}> {
  const { skipCache = false } = options;
  const cacheKey = `sponsor:withContent:${sponsorId}`;
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data: sponsor, error } = await supabase
          .from('sponsors')
          .select('*')
          .eq('id', sponsorId)
          .single();
          
        if (error || !sponsor) {
          return { sponsor: null, sponsorDocument: null };
        }
        
        const sponsorDocument = await resolveSponsorDocumentFromRecord(sponsor as SupabaseSponsor, options);
        
        return { 
          sponsor: sponsor as SupabaseSponsor,
          sponsorDocument
        };
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching sponsor with content:', error);
    return { sponsor: null, sponsorDocument: null };
  }
}

/**
 * Get all sponsors with their associated Sanity content
 * @param options Resolution options
 * @returns Array of sponsors with related content
 */
export async function getAllSponsorsWithContent(
  options: ReferenceOptions = {}
): Promise<Array<{ 
  sponsor: SupabaseSponsor, 
  sponsorDocument: SanitySponsor | null 
}>> {
  const { skipCache = false } = options;
  const cacheKey = 'sponsors:withContent';
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data: sponsors, error } = await supabase
          .from('sponsors')
          .select('*');
          
        if (error || !sponsors) {
          return [];
        }
        
        const results = await Promise.all(
          sponsors.map(async (sponsor) => {
            const sponsorDocument = await resolveSponsorDocumentFromRecord(
              sponsor as SupabaseSponsor, 
              options
            );
            
            return {
              sponsor: sponsor as SupabaseSponsor,
              sponsorDocument
            };
          })
        );
        
        return results;
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching all sponsors with content:', error);
    return [];
  }
}
