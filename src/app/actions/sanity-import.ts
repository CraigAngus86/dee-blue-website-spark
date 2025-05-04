
'use server'

import { importPlayersToSanity, importSponsorsToSanity, ImportResult, ImportOptions } from '@/utils/sync/SupabaseToSanitySync';

/**
 * Server action to import players from Supabase to Sanity
 */
export async function importPlayers(options: ImportOptions = {}): Promise<ImportResult> {
  console.log('Server Action: Importing players with options:', JSON.stringify({
    ...options,
    // Don't log callbacks in console
    onProgress: options.onProgress ? '[Function]' : undefined
  }));
  
  try {
    // Check if token is available
    if (!process.env.SANITY_API_TOKEN) {
      console.error('SANITY_API_TOKEN is not available in server environment');
      return {
        created: 0,
        updated: 0,
        failed: 1,
        errors: { 
          auth: 'Sanity API token is not available. Please check server environment variables.' 
        },
        processingStats: {
          total: 0,
          processed: 0
        }
      };
    }
    
    // We can't use the progress callback directly from the client
    // So we'll run without it and return the final result
    const importOptions = {
      ...options,
      onProgress: undefined // Remove any client-side callback
    };
    
    const result = await importPlayersToSanity(importOptions);
    return result;
  } catch (error) {
    console.error('Error in importPlayers server action:', error);
    return {
      created: 0,
      updated: 0,
      failed: 1,
      errors: { 
        general: `Import failed: ${error instanceof Error ? error.message : String(error)}` 
      },
      processingStats: {
        total: 0,
        processed: 0
      }
    };
  }
}

/**
 * Server action to import sponsors from Supabase to Sanity
 */
export async function importSponsors(options: ImportOptions = {}): Promise<ImportResult> {
  console.log('Server Action: Importing sponsors with options:', JSON.stringify({
    ...options,
    // Don't log callbacks in console
    onProgress: options.onProgress ? '[Function]' : undefined
  }));
  
  try {
    // Check if token is available
    if (!process.env.SANITY_API_TOKEN) {
      console.error('SANITY_API_TOKEN is not available in server environment');
      return {
        created: 0,
        updated: 0,
        failed: 1,
        errors: { 
          auth: 'Sanity API token is not available. Please check server environment variables.' 
        },
        processingStats: {
          total: 0,
          processed: 0
        }
      };
    }
    
    // We can't use the progress callback directly from the client
    // So we'll run without it and return the final result
    const importOptions = {
      ...options,
      onProgress: undefined // Remove any client-side callback
    };
    
    const result = await importSponsorsToSanity(importOptions);
    return result;
  } catch (error) {
    console.error('Error in importSponsors server action:', error);
    return {
      created: 0,
      updated: 0,
      failed: 1,
      errors: { 
        general: `Import failed: ${error instanceof Error ? error.message : String(error)}` 
      },
      processingStats: {
        total: 0,
        processed: 0
      }
    };
  }
}
