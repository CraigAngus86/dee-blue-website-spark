
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

// Export the core reference utility functions from match.ts
export { resolveSupabaseReference, resolveSanityReference } from './match';

// Export match-specific utilities
export { 
  resolveMatchFromDocument, 
  resolveDocumentFromMatch,
  getUpcomingMatches, 
  getRecentMatches 
} from './match';

// Explicitly export other utilities as needed
// For backward compatibility (will export more as implemented)
