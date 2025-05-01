/**
 * Team-specific reference resolution utilities
 */

import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/client';
import { 
  SanityTeam, 
  SupabaseTeam,
  ReferenceOptions 
} from './types';
import { resolveSupabaseReference } from './resolveSupabaseReference';
import { resolveSanityDocumentBySupabaseId } from './resolveSanityReference';
import { referenceCache } from './cache';

/**
 * Resolve a team from a Sanity team document
 * @param teamDoc Sanity team document
 * @param options Resolution options
 * @returns Referenced team from Supabase
 */
export async function resolveTeamFromDocument(
  teamDoc: SanityTeam | null,
  options: ReferenceOptions = {}
): Promise<SupabaseTeam | null> {
  return resolveSupabaseReference<SupabaseTeam>(teamDoc, 'teams', options);
}

/**
 * Resolve a Sanity team document from a Supabase team record
 * @param team Supabase team record
 * @param options Resolution options
 * @returns Referenced Sanity team document
 */
export async function resolveTeamDocumentFromRecord(
  team: SupabaseTeam | null,
  options: ReferenceOptions = {}
): Promise<SanityTeam | null> {
  if (!team) return null;
  
  // First try to find by sanity_id if present
  if (team.sanity_id) {
    const query = `*[_type == "team" && _id == $sanityId][0]`;
    const teamDoc = await sanityClient.fetch(query, { sanityId: team.sanity_id });
    
    if (teamDoc) return teamDoc as SanityTeam;
  }
  
  // Otherwise find by supabaseId field
  return resolveSanityDocumentBySupabaseId<SanityTeam>(team.id, 'team', options);
}

/**
 * Get a team with its associated Sanity content
 * @param teamId Supabase team ID
 * @param options Resolution options
 * @returns Team with related content
 */
export async function getTeamWithContent(
  teamId: string,
  options: ReferenceOptions = {}
): Promise<{ 
  team: SupabaseTeam | null, 
  teamDocument: SanityTeam | null 
}> {
  const { skipCache = false } = options;
  const cacheKey = `team:withContent:${teamId}`;
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data: team, error } = await supabase
          .from('teams')
          .select('*')
          .eq('id', teamId)
          .single();
          
        if (error || !team) {
          return { team: null, teamDocument: null };
        }
        
        const teamDocument = await resolveTeamDocumentFromRecord(team as SupabaseTeam, options);
        
        return { 
          team: team as SupabaseTeam,
          teamDocument
        };
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching team with content:', error);
    return { team: null, teamDocument: null };
  }
}

/**
 * Get all teams with their associated Sanity content
 * @param options Resolution options
 * @returns Array of teams with related content
 */
export async function getAllTeamsWithContent(
  options: ReferenceOptions = {}
): Promise<Array<{ 
  team: SupabaseTeam, 
  teamDocument: SanityTeam | null 
}>> {
  const { skipCache = false } = options;
  const cacheKey = 'teams:withContent';
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data: teams, error } = await supabase
          .from('teams')
          .select('*');
          
        if (error || !teams) {
          return [];
        }
        
        const results = await Promise.all(
          teams.map(async (team) => {
            const teamDocument = await resolveTeamDocumentFromRecord(
              team as SupabaseTeam, 
              options
            );
            
            return {
              team: team as SupabaseTeam,
              teamDocument
            };
          })
        );
        
        return results;
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching all teams with content:', error);
    return [];
  }
}
