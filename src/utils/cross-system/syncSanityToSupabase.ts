
import { supabase } from '@/lib/supabase/client';

/**
 * Synchronize a Sanity player profile to Supabase
 * Called after saving a player profile in Sanity
 */
export async function syncPlayerProfileToSupabase(profileData: any): Promise<string | null> {
  try {
    console.log('Syncing player profile to Supabase:', profileData._id);
    
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
    
    // Extract image URL - handle both normal Sanity image asset and cloudinaryImage type
    let imageUrl = null;
    if (profileImage) {
      // Handle cloudinaryImage type
      if (profileImage.asset && profileImage.asset.url) {
        imageUrl = profileImage.asset.url;
      } 
      // Handle regular Sanity image asset
      else if (profileImage.asset && profileImage.asset._ref) {
        // This is a Sanity asset reference
        // For now, we'll just leave it as null - we can implement asset URL resolution if needed
        console.log('Found Sanity image reference, no direct URL available');
      }
    }
    
    console.log('Profile image information:', { profileImage, imageUrl });
    
    // Prepare data for Supabase
    const peopleData = {
      first_name: firstName,
      last_name: lastName,
      name: playerName || `${firstName} ${lastName}`,
      nationality: nationality || 'Scotland',
      player_position: playerPosition,
      staff_role: staffRole,
      position: playerPosition ? 'player' : (staffRole ? 'staff' : undefined),
      image_url: imageUrl,
      // Include the reference back to Sanity
      sanity_id: sanityId.replace('drafts.', '')
    };
    
    // If we already have a Supabase ID, update the record
    if (supabaseId) {
      console.log('Updating existing record in Supabase with ID:', supabaseId);
      
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
      console.log('Creating new record in Supabase');
      
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
