
/**
 * Enhanced utility for syncing data from Supabase to Sanity
 * with detailed error logging and validation
 */

import { createClient } from '@sanity/client';
import { supabase } from '@/lib/supabase/client';

// Initialize Sanity client for data import
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Import result interface
export interface ImportResult {
  created: number;
  updated: number;
  failed: number;
  errors: Record<string, string>;
  processingStats: {
    total: number;
    processed: number;
  };
}

// Import options interface
export interface ImportOptions {
  batchSize?: number;
  onProgress?: (stats: ImportResult) => void;
  dryRun?: boolean;
}

/**
 * Field mapping helper to transform Supabase data to Sanity format
 */
function mapPlayerFields(player: any) {
  return {
    _type: 'playerProfile',
    playerName: player.name || `${player.first_name} ${player.last_name}`,
    firstName: player.first_name,
    lastName: player.last_name,
    position: player.player_position?.toLowerCase() || undefined,
    jerseyNumber: player.jersey_number,
    nationality: player.nationality || 'Scotland',
    supabaseId: player.id,
    // Set defaults for required fields
    accolades: [],
    personalFacts: player.did_you_know ? [
      {
        question: 'Did you know?',
        answer: player.did_you_know
      }
    ] : [],
  };
}

/**
 * Import Supabase players to Sanity with enhanced error handling
 */
export async function importPlayersToSanity(options: ImportOptions = {}): Promise<ImportResult> {
  const { batchSize = 5, onProgress, dryRun = false } = options;
  
  const result: ImportResult = {
    created: 0,
    updated: 0,
    failed: 0,
    errors: {},
    processingStats: {
      total: 0,
      processed: 0
    }
  };
  
  try {
    console.log('Fetching players from Supabase...');
    const { data: players, error } = await supabase
      .from('people')
      .select('*')
      .not('player_position', 'is', null);
      
    if (error) {
      console.error('Error fetching players:', error);
      result.errors['fetch'] = `Failed to fetch players: ${error.message}`;
      return result;
    }
    
    const validPlayers = players.filter(player => 
      player.first_name && 
      player.last_name
    );
    
    console.log(`Found ${players.length} players in Supabase, ${validPlayers.length} with valid data`);
    
    result.processingStats.total = validPlayers.length;
    
    // Process players in batches to avoid rate limits
    for (let i = 0; i < validPlayers.length; i += batchSize) {
      const batch = validPlayers.slice(i, i + batchSize);
      
      // Process batch sequentially to avoid conflicts
      for (const player of batch) {
        try {
          result.processingStats.processed++;
          
          // Check if player already exists in Sanity
          const existingPlayer = await sanityClient.fetch(
            `*[_type == "playerProfile" && supabaseId == $supabaseId][0]`,
            { supabaseId: player.id }
          );

          // Map player fields for Sanity
          const playerDoc = mapPlayerFields(player);
          
          // Skip actual writing if in dry run mode
          if (dryRun) {
            console.log(`[DRY RUN] Would ${existingPlayer ? 'update' : 'create'} player ${player.name}`);
            existingPlayer ? result.updated++ : result.created++;
            continue;
          }
          
          if (existingPlayer) {
            // Update existing player
            const updated = await sanityClient.patch(existingPlayer._id)
              .set(playerDoc)
              .commit();
              
            console.log(`Updated player profile for ${player.name}`);
            result.updated++;
          } else {
            // Create new player
            const newPlayer = await sanityClient.create(playerDoc);
            
            console.log(`Created player profile for ${player.name} with ID ${newPlayer._id}`);
            result.created++;
          }
          
          // Call progress callback if provided
          if (onProgress) {
            onProgress({ ...result });
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error(`Error processing player ${player.name}:`, error);
          result.failed++;
          result.errors[player.id] = `Error with ${player.name || player.first_name}: ${errorMessage}`;
          
          // Call progress callback if provided
          if (onProgress) {
            onProgress({ ...result });
          }
        }
      }
      
      // Small delay between batches to avoid rate limits
      if (i + batchSize < validPlayers.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error importing players to Sanity:', error);
    result.errors['general'] = `General import error: ${errorMessage}`;
    return result;
  }
}

/**
 * Import Supabase sponsors to Sanity with enhanced error handling
 */
export async function importSponsorsToSanity(options: ImportOptions = {}): Promise<ImportResult> {
  const { batchSize = 5, onProgress, dryRun = false } = options;
  
  const result: ImportResult = {
    created: 0,
    updated: 0,
    failed: 0,
    errors: {},
    processingStats: {
      total: 0,
      processed: 0
    }
  };
  
  try {
    console.log('Fetching sponsors from Supabase...');
    const { data: sponsors, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching sponsors:', error);
      result.errors['fetch'] = `Failed to fetch sponsors: ${error.message}`;
      return result;
    }
    
    console.log(`Found ${sponsors.length} sponsors in Supabase`);
    result.processingStats.total = sponsors.length;
    
    // Process sponsors in batches
    for (let i = 0; i < sponsors.length; i += batchSize) {
      const batch = sponsors.slice(i, i + batchSize);
      
      // Process batch sequentially
      for (const sponsor of batch) {
        try {
          result.processingStats.processed++;
          
          if (!sponsor.name) {
            throw new Error('Sponsor name is required');
          }
          
          // Check if sponsor already exists in Sanity
          const existingSponsor = await sanityClient.fetch(
            `*[_type == "sponsor" && supabaseId == $supabaseId][0]`,
            { supabaseId: sponsor.id }
          );
          
          // Skip actual writing if in dry run mode
          if (dryRun) {
            console.log(`[DRY RUN] Would ${existingSponsor ? 'update' : 'create'} sponsor ${sponsor.name}`);
            existingSponsor ? result.updated++ : result.created++;
            continue;
          }
          
          const sponsorDoc = {
            _type: 'sponsor',
            name: sponsor.name,
            website: sponsor.website,
            tier: sponsor.tier,
            featured: sponsor.featured,
            supabaseId: sponsor.id,
          };
          
          if (existingSponsor) {
            // Update existing sponsor
            const updated = await sanityClient.patch(existingSponsor._id)
              .set(sponsorDoc)
              .commit();
              
            console.log(`Updated sponsor profile for ${sponsor.name}`);
            result.updated++;
          } else {
            // Create new sponsor
            const newSponsor = await sanityClient.create(sponsorDoc);
            
            console.log(`Created sponsor profile for ${sponsor.name} with ID ${newSponsor._id}`);
            result.created++;
          }
          
          // Call progress callback if provided
          if (onProgress) {
            onProgress({ ...result });
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error(`Error processing sponsor ${sponsor.name}:`, error);
          result.failed++;
          result.errors[sponsor.id] = `Error with ${sponsor.name}: ${errorMessage}`;
          
          // Call progress callback if provided
          if (onProgress) {
            onProgress({ ...result });
          }
        }
      }
      
      // Small delay between batches
      if (i + batchSize < sponsors.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error importing sponsors to Sanity:', error);
    result.errors['general'] = `General import error: ${errorMessage}`;
    return result;
  }
}
