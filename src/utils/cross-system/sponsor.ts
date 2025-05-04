
/**
 * Sponsor-specific reference resolution utilities
 */

import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

/**
 * Resolve a sponsor from a Sanity sponsor document
 * @param sponsorDocument Sanity sponsor document
 * @param options Resolution options
 * @returns Referenced sponsor from Supabase
 */
export async function resolveSponsorFromDocument(
  sponsorDocument: any | null,
  options: ReferenceOptions = {}
): Promise<any | null> {
  if (!sponsorDocument || !sponsorDocument.supabaseId) {
    return null;
  }
  
  const { skipCache = false } = options;
  const cacheKey = `sponsor:${sponsorDocument.supabaseId}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from('sponsors')
          .select('*')
          .eq('id', sponsorDocument.supabaseId)
          .single();
          
        if (error || !data) {
          console.error(`Error resolving sponsor ${sponsorDocument.supabaseId}:`, error);
          return null;
        }
        
        return data;
      } catch (error) {
        console.error(`Error resolving sponsor ${sponsorDocument.supabaseId}:`, error);
        return null;
      }
    },
    skipCache
  );
}

/**
 * Resolve a Sanity sponsor document from a Supabase sponsor record
 * @param sponsor Supabase sponsor record
 * @param options Resolution options
 * @returns Referenced Sanity sponsor document
 */
export async function resolveDocumentFromSponsor(
  sponsor: any | null,
  options: ReferenceOptions = {}
): Promise<any | null> {
  if (!sponsor || !sponsor.id) return null;
  
  const { skipCache = false } = options;
  const cacheKey = `sponsorDocument:${sponsor.id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const query = `*[_type == "sponsor" && supabaseId == $supabaseId][0]`;
        const params = { supabaseId: sponsor.id };
        
        const document = await sanityClient.fetch(query, params);
        
        return document || null;
      } catch (error) {
        console.error(`Error resolving sponsor document for ${sponsor.id}:`, error);
        return null;
      }
    },
    skipCache
  );
}

/**
 * Get all sponsors with their Sanity documents
 * @param options Resolution options
 * @returns Array of sponsors with their Sanity documents
 */
export async function getAllSponsorsWithDocuments(
  options: ReferenceOptions = {}
): Promise<Array<{ sponsor: any, document: any | null }>> {
  const { skipCache = false } = options;
  const cacheKey = 'sponsors:withDocuments';
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data: sponsors, error } = await supabase
          .from('sponsors')
          .select('*')
          .order('featured', { ascending: false })
          .order('name');
          
        if (error || !sponsors) {
          console.error('Error fetching sponsors:', error);
          return [];
        }
        
        const results = await Promise.all(
          sponsors.map(async (sponsor) => {
            const document = await resolveDocumentFromSponsor(sponsor, options);
            return {
              sponsor,
              document
            };
          })
        );
        
        return results;
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching all sponsors with documents:', error);
    return [];
  }
}

/**
 * Get featured sponsors
 * @param limit Maximum number of sponsors to return
 * @param options Resolution options
 * @returns Array of featured sponsors
 */
export async function getFeaturedSponsors(
  limit = 6,
  options: ReferenceOptions = {}
): Promise<any[]> {
  const { skipCache = false } = options;
  const cacheKey = `sponsors:featured:${limit}`;
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data: sponsors, error } = await supabase
          .from('sponsors')
          .select('*')
          .eq('featured', true)
          .order('name')
          .limit(limit);
          
        if (error || !sponsors) {
          console.error('Error fetching featured sponsors:', error);
          return [];
        }
        
        return sponsors;
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching featured sponsors:', error);
    return [];
  }
}
