
/**
 * Utility for syncing data from Supabase to Sanity
 */

import { createClient } from '@sanity/client';

// Initialize Sanity client for data import
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

/**
 * Import Supabase players to Sanity
 */
export async function importPlayersToSanity(): Promise<{
  created: number;
  updated: number;
  failed: number;
}> {
  const result = {
    created: 0,
    updated: 0,
    failed: 0,
  };
  
  try {
    // Import from Supabase module
    const { supabase } = await import('@/integrations/supabase/client');
    
    console.log('Fetching players from Supabase...');
    const { data: players, error } = await supabase
      .from('people')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching players:', error);
      return result;
    }
    
    console.log(`Found ${players.length} players in Supabase`);
    
    // Process each player
    for (const player of players) {
      try {
        // Check if player already exists in Sanity
        const existingPlayer = await sanityClient.fetch(
          `*[_type == "playerProfile" && supabaseId == $supabaseId][0]`,
          { supabaseId: player.id }
        );
        
        if (existingPlayer) {
          // Update existing player
          const updated = await sanityClient.patch(existingPlayer._id)
            .set({
              playerName: player.name,
              firstName: player.first_name,
              lastName: player.last_name,
              position: player.player_position,
              supabaseId: player.id,
              // Don't update image or other content that might be managed in Sanity
            })
            .commit();
            
          console.log(`Updated player profile for ${player.name}`);
          result.updated++;
        } else {
          // Create new player
          const newPlayer = await sanityClient.create({
            _type: 'playerProfile',
            playerName: player.name,
            firstName: player.first_name,
            lastName: player.last_name,
            position: player.player_position,
            supabaseId: player.id,
            // Set defaults for required fields
            accolades: [],
            personalFacts: [],
          });
          
          console.log(`Created player profile for ${player.name} with ID ${newPlayer._id}`);
          result.created++;
        }
      } catch (error) {
        console.error(`Error processing player ${player.name}:`, error);
        result.failed++;
      }
    }
    
    return result;
  } catch (error) {
    console.error('Error importing players to Sanity:', error);
    return result;
  }
}

/**
 * Import Supabase sponsors to Sanity
 */
export async function importSponsorsToSanity(): Promise<{
  created: number;
  updated: number;
  failed: number;
}> {
  const result = {
    created: 0,
    updated: 0,
    failed: 0,
  };
  
  try {
    // Import from Supabase module
    const { supabase } = await import('@/integrations/supabase/client');
    
    console.log('Fetching sponsors from Supabase...');
    const { data: sponsors, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching sponsors:', error);
      return result;
    }
    
    console.log(`Found ${sponsors.length} sponsors in Supabase`);
    
    // Process each sponsor
    for (const sponsor of sponsors) {
      try {
        // Check if sponsor already exists in Sanity
        const existingSponsor = await sanityClient.fetch(
          `*[_type == "sponsor" && supabaseId == $supabaseId][0]`,
          { supabaseId: sponsor.id }
        );
        
        if (existingSponsor) {
          // Update existing sponsor
          const updated = await sanityClient.patch(existingSponsor._id)
            .set({
              name: sponsor.name,
              website: sponsor.website,
              tier: sponsor.tier,
              featured: sponsor.featured,
              supabaseId: sponsor.id,
              // Don't update image or other content that might be managed in Sanity
            })
            .commit();
            
          console.log(`Updated sponsor profile for ${sponsor.name}`);
          result.updated++;
        } else {
          // Create new sponsor
          const newSponsor = await sanityClient.create({
            _type: 'sponsor',
            name: sponsor.name,
            website: sponsor.website,
            tier: sponsor.tier,
            featured: sponsor.featured,
            supabaseId: sponsor.id,
          });
          
          console.log(`Created sponsor profile for ${sponsor.name} with ID ${newSponsor._id}`);
          result.created++;
        }
      } catch (error) {
        console.error(`Error processing sponsor ${sponsor.name}:`, error);
        result.failed++;
      }
    }
    
    return result;
  } catch (error) {
    console.error('Error importing sponsors to Sanity:', error);
    return result;
  }
}
