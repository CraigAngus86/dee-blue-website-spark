
/**
 * Cross-system reference resolution utilities
 * 
 * This module provides utilities for resolving references between 
 * Sanity CMS documents and Supabase records.
 */

// Export types
export * from './types';

// Export cache utilities
export * from './cache';

// Export the core resolver utilities
export { default as resolveSupabaseReference } from './resolveSupabaseReference';
export { default as resolveSanityReference } from './resolveSanityReference';

// Re-export entity-specific utilities
export * from './player';
export * from './match';
export * from './sponsor';
