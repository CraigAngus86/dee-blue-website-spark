
/**
 * Cross-system reference resolution utilities
 * 
 * This module provides utilities for resolving references between 
 * Sanity CMS documents and Supabase records.
 */

// Re-export all utilities
export * from './types';
export * from './cache';
export * from './resolveSupabaseReference';
export * from './resolveSanityReference';
export * from './player';
export * from './match';

// Export sponsor separately once it's implemented
// export * from './sponsor';
