
/**
 * Cross-system reference resolution utilities
 * 
 * This module provides utilities for resolving references between 
 * Sanity CMS documents and Supabase records.
 */

// Export types
export * from './types';

// Export cache utilities but don't re-export ReferenceCache which is already exported from types
export { referenceCache } from './cache';

// Re-export core utilities
export { default as resolveSupabaseReference } from './resolveSupabaseReference';
export { default as resolveSanityReference } from './resolveSanityReference';

// Re-export entity-specific utilities
export * from './player';
export * from './match';
export * from './sponsor';
