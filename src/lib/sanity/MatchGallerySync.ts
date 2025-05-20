import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/client';

/**
 * Process a match gallery document from Sanity
 * Updates document fields based on match date and links gallery to match
 */
export async function syncMatchGallery(doc: any): Promise<boolean> {
  try {
    console.log(`Processing match gallery: ${doc.title || doc._id}`);
    
    // Only proceed if we have a match date
    if (!doc.matchDate) {
      console.warn('Match gallery missing match date:', doc._id);
      return false;
    }
    
    // Format date for Supabase query
    const formattedDate = new Date(doc.matchDate).toISOString().split('T')[0];
    
    // Find match by date
    const { data: match, error } = await supabase
      .from('match')
      .select(`
        id,
        match_date,
        home_team:teams!home_team_id(id, name),
        away_team:teams!away_team_id(id, name)
      `)
      .eq('match_date', formattedDate)
      .single();
    
    if (error || !match) {
      console.error(`No match found for date ${formattedDate}:`, error);
      return false;
    }
    
    // Generate folder name
    const date = new Date(match.match_date);
    const yearStr = date.getFullYear().toString().substr(-2);
    const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayStr = date.getDate().toString().padStart(2, '0');
    const dateStr = `${yearStr}${monthStr}${dayStr}`;
    const homeTeam = match.home_team?.name.replace(/\s+/g, '_') || 'Unknown';
    const awayTeam = match.away_team?.name.replace(/\s+/g, '_') || 'Unknown';
    const folderName = `${dateStr}_${homeTeam}_${awayTeam}`;
    
    // Only update Sanity if necessary fields are not already set
    if (!doc.supabaseId || !doc.homeTeam || !doc.awayTeam || !doc.folderName) {
      try {
        await sanityClient
          .patch(doc._id)
          .set({
            supabaseId: match.id,
            homeTeam: match.home_team?.name,
            awayTeam: match.away_team?.name,
            folderName: folderName  // Changed from galleryFolder to folderName
          })
          .commit();
        console.log(`Updated match gallery ${doc._id} with match data`);
      } catch (sanityError) {
        console.error(`Error updating Sanity document:`, sanityError);
        return false;
      }
    }
    
    // Link gallery to match in Supabase
    const galleryLink = `/galleries/${doc._id}`;
    const { error: updateError } = await supabase
      .from('match')
      .update({ gallery_link: galleryLink })
      .eq('id', match.id);
    
    if (updateError) {
      console.error(`Error updating match with gallery link:`, updateError);
      return false;
    }
    
    console.log(`Updated match ${match.id} with gallery link ${galleryLink}`);
    return true;
  } catch (error) {
    console.error(`Error syncing match gallery:`, error);
    return false;
  }
}
