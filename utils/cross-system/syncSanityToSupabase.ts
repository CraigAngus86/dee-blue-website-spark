import { supabase } from '@/lib/supabase/client';

/**
 * Synchronize a Sanity player profile to Supabase
 * Called after saving a player profile in Sanity
 */
export async function syncPlayerProfileToSupabase(profileData: any): Promise<string | null> {
  try {
    // Extract relevant fields from Sanity document
    const {
      _id: sanityId,
      firstName,
      lastName,
      playerName,
      playerPosition,
      staffRole,
      nationality,
      profileImage,
      supabaseId // This may be null if new document
    } = profileData;
    
    // Prepare data for Supabase
    const peopleData = {
      first_name: firstName,
      last_name: lastName,
      name: playerName || `${firstName} ${lastName}`,
      nationality: nationality || 'Scotland',
      player_position: playerPosition,
      staff_role: staffRole,
      position: playerPosition ? 'player' : (staffRole ? 'staff' : undefined),
      image_url: profileImage?.asset?.url || null,
      // Include the reference back to Sanity
      sanity_id: sanityId.replace('drafts.', '')
    };
    
    // If we already have a Supabase ID, update the record
    if (supabaseId) {
      const { data, error } = await supabase
        .from('people')
        .update(peopleData)
        .eq('id', supabaseId)
        .select('id');
        
      if (error) {
        console.error('Error updating person in Supabase:', error);
        return null;
      }
      
      console.log('Updated person in Supabase:', data?.[0]?.id);
      return data?.[0]?.id || supabaseId;
    } 
    // Otherwise, create a new record
    else {
      const { data, error } = await supabase
        .from('people')
        .insert([{
          ...peopleData,
          // Other fields that might be required
          created_at: new Date().toISOString()
        }])
        .select('id');
        
      if (error) {
        console.error('Error creating person in Supabase:', error);
        return null;
      }
      
      console.log('Created new person in Supabase:', data?.[0]?.id);
      return data?.[0]?.id;
    }
  } catch (error) {
    console.error('Error in syncPlayerProfileToSupabase:', error);
    return null;
  }
}

/**
 * Fetch a player profile from Supabase by Sanity ID
 */
export async function getPlayerProfileFromSupabase(sanityId: string): Promise<any | null> {
  try {
    // Remove drafts. prefix if present
    const cleanSanityId = sanityId.replace('drafts.', '');
    
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .eq('sanity_id', cleanSanityId)
      .single();
      
    if (error) {
      console.error('Error fetching person from Supabase:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getPlayerProfileFromSupabase:', error);
    return null;
  }
}

export default {
  syncPlayerProfileToSupabase,
  getPlayerProfileFromSupabase
};
