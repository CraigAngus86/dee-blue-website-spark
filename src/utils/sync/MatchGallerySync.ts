import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/client';

export async function syncMatchGalleries() {
  try {
    // Get all match galleries from Sanity that need syncing
    const matchGalleries = await sanityClient.fetch(`
      *[_type == "matchGallery" && (!defined(supabaseId) || !defined(homeTeam) || !defined(awayTeam))] {
        _id,
        title,
        matchDate,
        supabaseId,
        homeTeam,
        awayTeam,
        folderName
      }
    `);

    console.log(`Found ${matchGalleries.length} match galleries to sync`);

    for (const doc of matchGalleries) {
      if (!doc.matchDate) {
        console.log(`Skipping gallery ${doc._id} - no match date`);
        continue;
      }

      const formattedDate = doc.matchDate.split('T')[0];
      
      // Use the same proper SQL function we created
      const { data, error } = await supabase.rpc('get_match_with_teams', {
        match_date_param: formattedDate
      });
      
      if (error || !data || data.length === 0) {
        console.log(`No match found for date ${formattedDate}`);
        continue;
      }
      
      const match = data[0];
      
      // Create folder name from properly typed data
      const date = new Date(match.match_date);
      const yearStr = date.getFullYear().toString().substr(-2);
      const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
      const dayStr = date.getDate().toString().padStart(2, '0');
      const dateStr = `${yearStr}${monthStr}${dayStr}`;
      const homeTeam = match.home_team_name?.replace(/\s+/g, '_') || 'Unknown';
      const awayTeam = match.away_team_name?.replace(/\s+/g, '_') || 'Unknown';
      const folderName = `${dateStr}_${homeTeam}_${awayTeam}`;

      // Only update Sanity if necessary fields are not already set
      if (!doc.supabaseId || !doc.homeTeam || !doc.awayTeam || !doc.folderName) {
        try {
          await sanityClient
            .patch(doc._id)
            .set({
              supabaseId: match.id,
              homeTeam: match.home_team_name,
              awayTeam: match.away_team_name,
              folderName: folderName
            })
            .commit();
          console.log(`Updated match gallery ${doc._id} with match data`);
        } catch (sanityError) {
          console.error(`Error updating gallery ${doc._id}:`, sanityError);
        }
      }
    }

    console.log('Match gallery sync completed');
  } catch (error) {
    console.error('Error in match gallery sync:', error);
  }
}
