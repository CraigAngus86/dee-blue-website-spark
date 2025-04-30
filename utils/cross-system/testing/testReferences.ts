
/**
 * Test utilities for cross-system reference resolution
 * 
 * NOTE: This file is for testing purposes and should not be imported in production code.
 */

import { supabase } from '@/integrations/supabase/client';
import sanityClient from '../../../../../sanity-studio/client';
import { resolvePlayerFromProfile, getPlayerWithProfile } from '../player';
import { resolveMatchFromGallery, getMatchWithContent } from '../match';
import { resolveSponsorFromDocument, getSponsorWithContent } from '../sponsor';
import { referenceCache } from '../cache';

/**
 * Test player reference resolution
 */
export async function testPlayerReference(): Promise<void> {
  try {
    console.log('Testing player reference resolution...');
    
    // Get a player profile from Sanity
    const query = `*[_type == "playerProfile"][0]`;
    const playerProfile = await sanityClient.fetch(query);
    
    if (!playerProfile) {
      console.log('No player profiles found in Sanity');
      return;
    }
    
    console.log('Found Sanity player profile:', playerProfile._id);
    
    // Resolve the player from the profile
    const player = await resolvePlayerFromProfile(playerProfile);
    console.log('Resolved player:', player ? `${player.name} (${player.id})` : 'Not found');
    
    // Test bidirectional resolution with player ID
    if (player) {
      const result = await getPlayerWithProfile(player.id);
      console.log('Full player with profile:', 
        result.player ? result.player.name : 'No player',
        result.profile ? 'with profile' : 'without profile'
      );
    }
  } catch (error) {
    console.error('Error testing player reference:', error);
  }
}

/**
 * Test match reference resolution
 */
export async function testMatchReference(): Promise<void> {
  try {
    console.log('Testing match reference resolution...');
    
    // Get a match gallery from Sanity
    const query = `*[_type == "matchGallery"][0]`;
    const matchGallery = await sanityClient.fetch(query);
    
    if (!matchGallery) {
      console.log('No match galleries found in Sanity');
      return;
    }
    
    console.log('Found Sanity match gallery:', matchGallery._id);
    
    // Resolve the match from the gallery
    const match = await resolveMatchFromGallery(matchGallery);
    console.log('Resolved match:', match ? 
      `${match.match_date} - Match ID: ${match.id}` : 
      'Not found'
    );
    
    // Test bidirectional resolution with match ID
    if (match) {
      const result = await getMatchWithContent(match.id);
      console.log('Full match with content:', 
        result.match ? `Match date: ${result.match.match_date}` : 'No match',
        result.gallery ? 'with gallery' : 'without gallery',
        `with ${result.newsArticles.length} news articles`
      );
    }
  } catch (error) {
    console.error('Error testing match reference:', error);
  }
}

/**
 * Test sponsor reference resolution
 */
export async function testSponsorReference(): Promise<void> {
  try {
    console.log('Testing sponsor reference resolution...');
    
    // Get a sponsor from Sanity
    const query = `*[_type == "sponsor"][0]`;
    const sponsor = await sanityClient.fetch(query);
    
    if (!sponsor) {
      console.log('No sponsors found in Sanity');
      return;
    }
    
    console.log('Found Sanity sponsor:', sponsor._id);
    
    // Resolve the sponsor from Sanity document
    const sponsorRecord = await resolveSponsorFromDocument(sponsor);
    console.log('Resolved sponsor:', sponsorRecord ? 
      `${sponsorRecord.name} (${sponsorRecord.id})` : 
      'Not found'
    );
    
    // Test bidirectional resolution with sponsor ID
    if (sponsorRecord) {
      const result = await getSponsorWithContent(sponsorRecord.id);
      console.log('Full sponsor with content:', 
        result.sponsor ? result.sponsor.name : 'No sponsor',
        result.sponsorDocument ? 'with Sanity document' : 'without Sanity document'
      );
    }
  } catch (error) {
    console.error('Error testing sponsor reference:', error);
  }
}

/**
 * Run all reference resolution tests
 */
export async function runAllTests(): Promise<void> {
  console.log('Running cross-system reference resolution tests...');
  
  // Clear cache before testing
  referenceCache.clear();
  
  await testPlayerReference();
  await testMatchReference();
  await testSponsorReference();
  
  console.log('All tests completed.');
}

// Only run tests when explicitly called
// This prevents tests from running when importing the module
// runAllTests().catch(console.error);
