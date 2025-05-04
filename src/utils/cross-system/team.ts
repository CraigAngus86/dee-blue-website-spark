
import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/client';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';
import resolveSupabaseReference from './resolveSupabaseReference';
import resolveSanityReference from './resolveSanityReference';

export interface CrossSystemTeam {
  id: string;
  name: string;
  shortName?: string;
  logoUrl?: string;
  primaryColor?: string;
  website?: string;
  stadiumName?: string;
  foundedYear?: number;
}

/**
 * Get a team by ID from Supabase
 */
export async function getTeam(
  id: string | undefined | null, 
  options: ReferenceOptions = {}
): Promise<CrossSystemTeam | null> {
  if (!id) return null;
  
  return resolveSupabaseReference<CrossSystemTeam>('teams', id, options);
}

/**
 * Get all teams from Supabase
 */
export async function getAllTeams(
  options: ReferenceOptions = {}
): Promise<CrossSystemTeam[]> {
  const { skipCache = false } = options;
  const cacheKey = 'supabase:teams:all';
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .order('name');
        
        if (error) {
          console.error('Error fetching teams:', error);
          return [];
        }
        
        return data.map(team => ({
          id: team.id,
          name: team.name,
          shortName: team.short_name,
          logoUrl: team.logo_url,
          primaryColor: team.primary_color,
          website: team.website,
          stadiumName: team.stadium_name,
          foundedYear: team.founded_year
        }));
      } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
      }
    },
    skipCache
  );
}

/**
 * Get the Banks o' Dee team
 */
export async function getBanksODeeTeam(
  options: ReferenceOptions = {}
): Promise<CrossSystemTeam | null> {
  const { skipCache = false } = options;
  const cacheKey = 'supabase:team:banks-o-dee';
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .eq('name', 'Banks o\' Dee')
          .single();
        
        if (error) {
          console.error('Error fetching Banks o\' Dee team:', error);
          return null;
        }
        
        return {
          id: data.id,
          name: data.name,
          shortName: data.short_name,
          logoUrl: data.logo_url,
          primaryColor: data.primary_color,
          website: data.website,
          stadiumName: data.stadium_name,
          foundedYear: data.founded_year
        };
      } catch (error) {
        console.error('Error fetching Banks o\' Dee team:', error);
        return null;
      }
    },
    skipCache
  );
}
