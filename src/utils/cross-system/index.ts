
/**
 * Cross-system reference resolution utilities
 * 
 * This module provides utilities for resolving references between 
 * Sanity CMS documents and Supabase records.
 */

// Re-export all utilities
export * from './types';
export * from './cache';

// Export the reference resolution functions directly from the module
export { 
  resolveSupabaseReference, 
  resolveSupabaseReferences 
} from './resolveSupabaseReference';

export { 
  resolveSanityReference, 
  resolveSanityReferences,
  resolveSanityDocumentBySupabaseId 
} from './resolveSanityReference';

// Export specific utility modules for entity types
export * from './player';
export * from './match';
export * from './sponsor';
export * from './team';
