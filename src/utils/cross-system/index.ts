
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

// Export the resolver functions
export { default as resolveSupabaseReference } from './resolveSupabaseReference';
export { default as resolveSanityReference } from './resolveSanityReference';

// Re-export match-specific utilities if they exist
// Note: These will be implemented as needed for completeness
