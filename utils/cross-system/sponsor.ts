/**
 * Sponsor cross-system utilities
 * Allows working with sponsor data across Supabase and Sanity
 */

// Import necessary utilities
import { resolveSanityReference } from './resolveSanityReference';
import { resolveSupabaseReference } from './resolveSupabaseReference';
import type { CrossSystemReference } from './types';

/**
 * Get a sponsor by its ID from the appropriate system
 */
export async function getSponsorById(id: string, options: { system?: 'supabase' | 'sanity' } = {}): Promise<any> {
  if (options.system === 'sanity') {
    // Get from Sanity
    return { id, _type: 'sponsor', name: 'Placeholder Sponsor' }; // Placeholder
  } else {
    // Get from Supabase
    return { id, type: 'sponsor', name: 'Placeholder Sponsor' }; // Placeholder
  }
}

/**
 * Resolve a cross-system sponsor reference to get the full sponsor object
 */
export async function resolveSponsorReference(reference: CrossSystemReference): Promise<any> {
  if (reference.system === 'sanity') {
    return resolveSanityReference(reference as any);
  } else {
    return resolveSupabaseReference(reference as any);
  }
}

export default {
  getSponsorById,
  resolveSponsorReference
};
