/**
 * Utility for syncing data from Sanity to Supabase
 */
import { supabase } from '@/integrations/supabase/client';
// Type for webhook payload
interface SanityWebhookPayload {
  _id: string;
  _rev?: string;
  _type: string;
  [key: string]: any;
}
// Result type
interface ProcessResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}
/**
 * Process webhook from Sanity and sync to Supabase
 */
export async function processSanityWebhook(payload: SanityWebhookPayload): Promise<boolean> {
  // Switch based on document type
  switch (payload._type) {
    case 'playerProfile':
      return await syncPlayerProfile(payload);
      
    case 'sponsor':
      return await syncSponsor(payload);
      
    case 'match':
      return await syncMatch(payload);
      
    default:
      console.warn(`Unhandled document type in webhook: ${payload._type}`);
      return false;
  }
}
/**
 * Sync player profile from Sanity to Supabase
 */
async function syncPlayerProfile(doc: SanityWebhookPayload): Promise<boolean> {
  try {
    // Check if we already have this player in Supabase
    let existingPlayer = null;
    
    // If we have a supabaseId field, find the existing player
    if (doc.supabaseId) {
      const { data, error } = await supabase
        .from('people')
        .select('*')
        .eq('id', doc.supabaseId)
        .single();
        
      if (!error) {
        existingPlayer = data;
      }
    }
    
    // Map Sanity fields to Supabase fields
    const playerData = {
      first_name: doc.firstName || '',
      last_name: doc.lastName || '',
      name: doc.playerName || `${doc.firstName || ''} ${doc.lastName || ''}`.trim() || 'Unnamed Player',
      player_position: doc.position?.toUpperCase() || null,
      nationality: doc.nationality || 'Scotland',
      jersey_number: doc.jerseyNumber || null,
      bio: doc.extendedBio ? JSON.stringify(doc.extendedBio) : null,
      did_you_know: doc.didYouKnow || null,
      // Note: We're not setting sanity_id directly in the update object as it's handled separately
    };
    
    // If player exists, update it
    if (existingPlayer) {
      const { data, error } = await supabase
        .from('people')
        .update(playerData)
        .eq('id', doc.supabaseId)
        .select();
        
      if (error) {
        console.error(`Error updating player in Supabase:`, error);
        return false;
      }
      
      return true;
    } else {
      // Create new player
      // Include the Sanity ID in the creation
      const { data, error } = await supabase
        .from('people')
        .insert({
          ...playerData,
          sanity_id: doc._id // This is safe to include during creation
        })
        .select();
        
      if (error) {
        console.error(`Error creating player in Supabase:`, error);
        return false;
      }
      
      // Update the Sanity document with the new Supabase ID
      // Note: This would ideally be done using the Sanity client directly
      // but we're working with what we have in this file
      
      return true;
    }
  } catch (error) {
    console.error(`Error syncing player profile:`, error);
    return false;
  }
}
/**
 * Sync sponsor from Sanity to Supabase
 */
async function syncSponsor(doc: SanityWebhookPayload): Promise<boolean> {
  try {
    // Check if we already have this sponsor in Supabase
    let existingSponsor = null;
    
    // If we have a supabaseId field, find the existing sponsor
    if (doc.supabaseId) {
      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('id', doc.supabaseId)
        .single();
        
      if (!error) {
        existingSponsor = data;
      }
    }
    
    // Map Sanity fields to Supabase fields
    const sponsorData = {
      name: doc.name || 'Unnamed Sponsor',
      website: doc.website || null,
      tier: doc.tier || null,
      featured: doc.featured || false,
      description: doc.description || null,
      // Handle logo/image fields appropriately
      logo_url: doc.logo?.asset?.url || null,
      logo_dark_url: doc.darkLogo?.asset?.url || null,
    };
    
    // If sponsor exists, update it
    if (existingSponsor) {
      const { error } = await supabase
        .from('sponsors')
        .update(sponsorData)
        .eq('id', doc.supabaseId);
        
      if (error) {
        console.error(`Error updating sponsor in Supabase:`, error);
        return false;
      }
      
      return true;
    } else {
      // Create new sponsor
      const { data, error } = await supabase
        .from('sponsors')
        .insert({
          ...sponsorData,
          sanity_id: doc._id
        })
        .select();
        
      if (error) {
        console.error(`Error creating sponsor in Supabase:`, error);
        return false;
      }
      
      return true;
    }
  } catch (error) {
    console.error(`Error syncing sponsor:`, error);
    return false;
  }
}
/**
 * Sync match from Sanity to Supabase
 */
async function syncMatch(doc: SanityWebhookPayload): Promise<boolean> {
  try {
    // Check if we already have this match in Supabase
    let existingMatch = null;
    
    // If we have a supabaseId field, find the existing match
    if (doc.supabaseId) {
      const { data, error } = await supabase
        .from('match')
        .select('*')
        .eq('id', doc.supabaseId)
        .single();
        
      if (!error) {
        existingMatch = data;
      }
    }
    
    // Map Sanity fields to Supabase fields
    // Note: This is a simplified version and would need to be expanded
    // based on your actual schema and requirements
    const matchData = {
      // Required fields with defaults
      competition_id: doc.competition?.id || existingMatch?.competition_id || '00000000-0000-0000-0000-000000000000',
      home_team_id: doc.homeTeam?.id || existingMatch?.home_team_id || '00000000-0000-0000-0000-000000000000',
      away_team_id: doc.awayTeam?.id || existingMatch?.away_team_id || '00000000-0000-0000-0000-000000000000',
      match_date: doc.date || existingMatch?.match_date || new Date().toISOString().split('T')[0],
      
      // Optional fields
      season_id: doc.season?.id || existingMatch?.season_id || null,
      match_time: doc.time || existingMatch?.match_time || null,
      venue: doc.venue || existingMatch?.venue || null,
      home_score: doc.homeScore || existingMatch?.home_score || null,
      away_score: doc.awayScore || existingMatch?.away_score || null,
      status: doc.status || existingMatch?.status || 'scheduled',
    };
    
    // If match exists, update it
    if (existingMatch) {
      const { error } = await supabase
        .from('match')
        .update(matchData)
        .eq('id', doc.supabaseId);
        
      if (error) {
        console.error(`Error updating match in Supabase:`, error);
        return false;
      }
      
      return true;
    } else {
      // Create new match
      const { data, error } = await supabase
        .from('match')
        .insert({
          ...matchData,
          sanity_id: doc._id
        })
        .select();
        
      if (error) {
        console.error(`Error creating match in Supabase:`, error);
        return false;
      }
      
      return true;
    }
  } catch (error) {
    console.error(`Error syncing match:`, error);
    return false;
  }
}
/**
 * Record webhook activity in the database for auditing
 */
export async function logWebhookActivity(
  payload: SanityWebhookPayload,
  status: string,
  error?: any
): Promise<void> {
  try {
    const { error: logError } = await supabase
      .from('webhook_logs')
      .insert({
        event_type: 'sanity.update',
        document_type: payload._type,
        document_id: payload._id,
        operation: payload._rev ? 'update' : 'create',
        status: status,
        error_message: error ? String(error) : null,
        payload: payload
      });
      
    if (logError) {
      console.error('Error logging webhook activity:', logError);
    }
  } catch (err) {
    console.error('Error logging webhook activity:', err);
  }
}
