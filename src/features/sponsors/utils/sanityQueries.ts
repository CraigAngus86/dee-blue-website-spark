import { fetchSanityData } from '@/lib/sanity/sanityClient';

export interface SanitySponsors {
  principal: any[];
  main: any[];
  partner: any[];
}

export async function getSponsorsForHomepage(): Promise<SanitySponsors> {
  const query = `*[_type == "sponsor" && isActive == true] | order(primaryTier asc, name asc) {
    _id,
    name,
    slug,
    primaryTier,
    website,
    logo {
      public_id
    },
    additionalTypes {
      isMatchSponsor,
      isPlayerSponsor
    }
  }`;

  try {
    const sponsors = await fetchSanityData(query, {}, false);
    
    // Group by tier
    const groupedSponsors: SanitySponsors = {
      principal: sponsors?.filter(s => s.primaryTier === 'principal') || [],
      main: sponsors?.filter(s => s.primaryTier === 'main') || [],
      partner: sponsors?.filter(s => s.primaryTier === 'partner') || []
    };
    
    return groupedSponsors;
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return { principal: [], main: [], partner: [] };
  }
}

export async function getHeaderSponsors() {
  const query = `*[_type == "sponsor" && isActive == true && primaryTier in ["principal", "main"]] | order(primaryTier asc, name asc) {
    _id,
    name,
    website,
    logo {
      public_id
    },
    primaryTier
  }`;

  try {
    const sponsors = await fetchSanityData(query, {}, false);
    return sponsors || [];
  } catch (error) {
    console.error('Error fetching header sponsors:', error);
    return [];
  }
}
