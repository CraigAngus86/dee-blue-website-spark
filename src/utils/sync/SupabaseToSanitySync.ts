/**
 * Enhanced utility for syncing data from Supabase to Sanity
 * with detailed error logging and validation
 */
import { sanityClient } from '@/lib/sanity/sanityClient';
import { supabase } from '@/lib/supabase/client';

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
  testSinglePlayer?: string; // Option to test import with a single player by ID
  debug?: boolean; // Option to enable debug mode
  includeStaff?: boolean; // Option to include staff members
}

/**
 * Field mapping helper to transform Supabase data to Sanity format
 */
function mapPlayerFields(person: any) {
  // Base fields for all personnel
  const baseFields = {
    _type: 'playerProfile',
    playerName: person.name || `${person.first_name} ${person.last_name}`,
    firstName: person.first_name,
    lastName: person.last_name,
    nationality: person.nationality || 'Scotland',
    supabaseId: person.id,
    // Set defaults for required fields
    accolades: [],
    personalFacts: person.did_you_know ? [
      {
        question: 'Did you know?',
        answer: person.did_you_know
      }
    ] : [],
  };

  // Add player-specific fields if it's a player
  if (person.player_position) {
    return {
      ...baseFields,
      position: person.player_position?.toLowerCase() || undefined,
      jerseyNumber: person.jersey_number,
    };
  } 
  // Add staff-specific fields if it's a staff member
  else if (person.staff_role) {
    return {
      ...baseFields,
      staffRole: person.staff_role?.toLowerCase() || undefined,
    };
  }

  // For any other personnel type
  return baseFields;
}

/**
 * Import Supabase personnel (players and staff) to Sanity with enhanced error handling
 */
export async function importPlayersToSanity(options: ImportOptions = {}): Promise<ImportResult> {
  const { 
    batchSize = 5, 
    onProgress, 
    dryRun = false, 
    testSinglePlayer = null, 
    debug = false,
    includeStaff = true
  } = options;
  
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
    let query = supabase.from('people').select('*');
    
    // If not including staff or only testing with a single player ID, adjust the query
    if (!includeStaff) {
      query = query.not('player_position', 'is', null);
    }
    
    // If testing with a single player
    if (testSinglePlayer) {
      query = query.eq('id', testSinglePlayer);
    }
    
    const { data: people, error } = await query;
      
    if (error) {
      console.error('Error fetching personnel:', error);
      result.errors['fetch'] = `Failed to fetch personnel: ${error.message}`;
      return result;
    }
    
    // Filter out entries without first_name and last_name as these are required
    const validPeople = people.filter(person => 
      person.first_name && 
      person.last_name
    );
    
    result.processingStats.total = validPeople.length;
    
    // Process personnel in batches to avoid rate limits
    for (let i = 0; i < validPeople.length; i += batchSize) {
      const batch = validPeople.slice(i, i + batchSize);
      
      // Process batch sequentially to avoid conflicts
      for (const person of batch) {
        try {
          result.processingStats.processed++;
          
          // Build the query with proper syntax
          const query = `*[_type == "playerProfile" && supabaseId == $supabaseId][0]`;
          const params = { supabaseId: person.id };
          
          let existingPerson;
          
          try {
            existingPerson = await sanityClient.fetch(query, params);
          } catch (sanityFetchError: any) {
            console.error('Sanity fetch error:', sanityFetchError);
            // Change the error message to avoid any string concatenation issues
            throw new Error(`Sanity fetch failed - check server logs for details`);
          }
          
          // Map person fields for Sanity
          const personDoc = mapPlayerFields(person);
          
          // Skip actual writing if in dry run mode
          if (dryRun) {
            existingPerson ? result.updated++ : result.created++;
            continue;
          }
          
          if (existingPerson) {
            // Update existing person
            try {
              const updated = await sanityClient
                .patch(existingPerson._id)
                .set(personDoc)
                .commit();
                
              result.updated++;
            } catch (updateError: any) {
              console.error('Error updating person:', updateError);
              throw new Error(`Update failed: ${updateError instanceof Error ? updateError.message : String(updateError)}`);
            }
          } else {
            // Create new person
            try {
              const newPerson = await sanityClient.create(personDoc);
              
              result.created++;
            } catch (createError: any) {
              console.error('Error creating person:', createError);
              throw new Error(`Creation failed: ${createError instanceof Error ? createError.message : String(createError)}`);
            }
          }
          
          // Call progress callback if provided
          if (onProgress) {
            onProgress({ ...result });
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error(`Error processing ${person.name || `${person.first_name} ${person.last_name}`}:`, error);
          result.failed++;
          result.errors[person.id] = `Error with ${person.name || person.first_name} ${person.last_name}: ${errorMessage}`;
          
          // Call progress callback if provided
          if (onProgress) {
            onProgress({ ...result });
          }
        }
      }
      
      // Small delay between batches to avoid rate limits
      if (i + batchSize < validPeople.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error importing personnel to Sanity:', error);
    result.errors['general'] = `General import error: ${errorMessage}`;
    return result;
  }
}

/**
 * Import Supabase sponsors to Sanity with enhanced error handling
 */
export async function importSponsorsToSanity(options: ImportOptions = {}): Promise<ImportResult> {
  const { batchSize = 5, onProgress, dryRun = false, debug = false } = options;
  
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
    const { data: sponsors, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching sponsors:', error);
      result.errors['fetch'] = `Failed to fetch sponsors: ${error.message}`;
      return result;
    }
    
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
          let existingSponsor;
          try {
            existingSponsor = await sanityClient.fetch(
              `*[_type == "sponsor" && supabaseId == $supabaseId][0]`,
              { supabaseId: sponsor.id }
            );
          } catch (sanityFetchError) {
            console.error('Sanity fetch error:', sanityFetchError);
            throw new Error(`Sanity fetch failed: ${sanityFetchError instanceof Error ? sanityFetchError.message : String(sanityFetchError)}`);
          }
          
          // Skip actual writing if in dry run mode
          if (dryRun) {
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
            try {
              const updated = await sanityClient
                .patch(existingSponsor._id)
                .set(sponsorDoc)
                .commit();
                
              result.updated++;
            } catch (updateError) {
              console.error('Error updating sponsor:', updateError);
              throw new Error(`Update failed: ${updateError instanceof Error ? updateError.message : String(updateError)}`);
            }
          } else {
            // Create new sponsor
            try {
              const newSponsor = await sanityClient.create(sponsorDoc);
              
              result.created++;
            } catch (createError) {
              console.error('Error creating sponsor:', createError);
              throw new Error(`Creation failed: ${createError instanceof Error ? createError.message : String(createError)}`);
            }
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
