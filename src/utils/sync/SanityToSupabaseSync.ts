/**
 * Utility for syncing data from Sanity to Supabase
 */

import { supabase } from '@/integrations/supabase/client';
import { SanityDocument } from '../cross-system/types';

// Types for webhook payload
export interface SanityWebhookPayload {
  _id: string;
  _type: string;
  _rev?: string;
  operation: 'create' | 'update' | 'delete';
  [key: string]: any;
}

/**
 * Process a webhook payload from Sanity and sync to Supabase
 */
export async function processSanityWebhook(payload: SanityWebhookPayload): Promise<boolean> {
  try {
    console.log('Processing Sanity webhook:', payload.operation, payload._type, payload._id);
    
    switch (payload._type) {
      case 'playerProfile':
        return await syncPlayerProfile(payload);
      case 'sponsor':
        return await syncSponsor(payload);
      case 'match':
        return await syncMatch(payload);
      default:
        console.log(`No sync handler for document type: ${payload._type}`);
        return false;
    }
  } catch (error) {
    console.error('Error processing Sanity webhook:', error);
    return false;
  }
}

/**
 * Sync a player profile from Sanity to Supabase
 */
async function syncPlayerProfile(payload: SanityWebhookPayload): Promise<boolean> {
  try {
    if (payload.operation === 'delete') {
      // Only delete the reference, don't delete the actual player
      if (payload.supabaseId) {
        const { error } = await supabase
          .from('people')
          .update({ sanity_id: null })
          .eq('id', payload.supabaseId);
          
        if (error) throw error;
      }
      return true;
    }
    
    // Extract player data from payload
    const playerData = {
      name: payload.playerName,
      first_name: payload.firstName,
      last_name: payload.lastName,
      position: payload.position,
      bio: payload.bio ? JSON.stringify(payload.bio) : null,
      image_url: payload.profileImage?.asset?.url,
      jersey_number: payload.jerseyNumber,
      joined_date: payload.joinedDate,
      sanity_id: payload._id
    };
    
    // If we have a Supabase ID, update the existing record
    if (payload.supabaseId) {
      const { error } = await supabase
        .from('people')
        .update(playerData)
        .eq('id', payload.supabaseId);
        
      if (error) throw error;
      return true;
    }
    
    // Otherwise, create a new record
    const { data, error } = await supabase
      .from('people')
      .insert({
        ...playerData,
        // Set defaults for required fields
        nationality: 'Scotland',
      })
      .select('id')
      .single();
      
    if (error) throw error;
    
    // Update the Sanity document with the new Supabase ID
    // Note: This would require a separate mechanism to update Sanity
    console.log('Created new player record in Supabase with ID:', data.id);
    // TODO: Update Sanity document with new Supabase ID
    
    return true;
  } catch (error) {
    console.error('Error syncing player profile:', error);
    return false;
  }
}

/**
 * Sync a sponsor from Sanity to Supabase
 */
async function syncSponsor(payload: SanityWebhookPayload): Promise<boolean> {
  try {
    if (payload.operation === 'delete') {
      // Only delete the reference, don't delete the actual sponsor
      if (payload.supabaseId) {
        const { error } = await supabase
          .from('sponsors')
          .update({ sanity_id: null })
          .eq('id', payload.supabaseId);
          
        if (error) throw error;
      }
      return true;
    }
    
    // Extract sponsor data from payload
    const sponsorData = {
      name: payload.name,
      website: payload.website,
      logo_url: payload.logo?.asset?.url,
      logo_dark_url: payload.logoDark?.asset?.url,
      tier: payload.tier,
      featured: payload.featured,
      sanity_id: payload._id
    };
    
    // If we have a Supabase ID, update the existing record
    if (payload.supabaseId) {
      const { error } = await supabase
        .from('sponsors')
        .update(sponsorData)
        .eq('id', payload.supabaseId);
        
      if (error) throw error;
      return true;
    }
    
    // Otherwise, create a new record
    const { data, error } = await supabase
      .from('sponsors')
      .insert(sponsorData)
      .select('id')
      .single();
      
    if (error) throw error;
    
    // Update the Sanity document with the new Supabase ID
    console.log('Created new sponsor record in Supabase with ID:', data.id);
    // TODO: Update Sanity document with new Supabase ID
    
    return true;
  } catch (error) {
    console.error('Error syncing sponsor:', error);
    return false;
  }
}

/**
 * Sync a match from Sanity to Supabase
 */
async function syncMatch(payload: SanityWebhookPayload): Promise<boolean> {
  try {
    if (payload.operation === 'delete') {
      // Only delete the reference, don't delete the actual match
      if (payload.supabaseId) {
        const { error } = await supabase
          .from('match')
          .update({ sanity_id: null })
          .eq('id', payload.supabaseId);
          
        if (error) throw error;
      }
      return true;
    }
    
    // Extract match data from payload
    // Note: References would need to be resolved properly
    const matchData = {
      match_date: payload.date,
      match_time: payload.time,
      venue: payload.venue,
      status: payload.status || 'scheduled',
      home_score: payload.homeScore,
      away_score: payload.awayScore,
      ticket_link: payload.ticketLink,
      match_report_link: payload.matchReport?.asset?.url,
      sanity_id: payload._id
    };
    
    // If we have a Supabase ID, update the existing record
    if (payload.supabaseId) {
      const { error } = await supabase
        .from('match')
        .update(matchData)
        .eq('id', payload.supabaseId);
        
      if (error) throw error;
      return true;
    }
    
    // For new matches we would need to resolve team and competition references
    // This is just a placeholder, actual implementation would be more complex
    console.log('Creating a new match requires resolving team and competition references');
    return false;
  } catch (error) {
    console.error('Error syncing match:', error);
    return false;
  }
}
