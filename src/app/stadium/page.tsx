import { Metadata } from 'next';
import { SpainParkHero } from '@/features/stadium/components/SpainParkHero';
import { StadiumOverview } from '@/features/stadium/components/StadiumOverview';
import { StadiumTimeline } from '@/features/stadium/components/StadiumTimeline';
import { StadiumFacilities } from '@/features/stadium/components/StadiumFacilities';
import { LocationDirections } from '@/features/stadium/components/LocationDirections';
import { fetchSanityData } from '@/lib/sanity/sanityClient';

// Mobile Components (only the ones we still need)
import { MobileStadiumOverview } from '@/features/stadium/components/mobile/MobileStadiumOverview';
import { MobileStadiumFacilities } from '@/features/stadium/components/mobile/MobileStadiumFacilities';
import { MobileLocationMap } from '@/features/stadium/components/mobile/MobileLocationMap';
import { MobileGettingThere } from '@/features/stadium/components/mobile/MobileGettingThere';

export const metadata: Metadata = {
  title: 'Spain Park Stadium | Banks o\' Dee FC',
  description: 'Discover the home of Banks o\' Dee FC - Spain Park Stadium. Explore our history, facilities, and heritage dating back to 1902.',
};

async function getStadiumData() {
  try {
    const query = `*[_type == "stadiumInfo"][0] {
      _id,
      title,
      description,
      capacity,
      location,
      timeline[] {
        year,
        title,
        description,
        heroImage,
        expandedContent
      },
      facilities[] {
        name,
        description,
        icon,
        image
      },
      gallery
    }`;
    
    const stadiumData = await fetchSanityData(query, {}, false);
    return stadiumData;
  } catch (error) {
    console.error('Error fetching stadium data:', error);
    return null;
  }
}

export default async function StadiumPage() {
  const stadiumData = await getStadiumData();
  
  return (
    <main className="min-h-screen">
      {/* Hero Section - Shared for both desktop and mobile */}
      <SpainParkHero />
      
      {/* DESKTOP VERSION */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-8">
          <StadiumOverview />
          <StadiumTimeline data={stadiumData} />
          <StadiumFacilities />
          <LocationDirections />
        </div>
      </div>
      
      {/* MOBILE VERSION */}
      <div className="block md:hidden">
        <div className="container mx-auto px-4 py-8">
          <MobileStadiumOverview />
          <StadiumTimeline data={stadiumData} />  {/* Using same component - handles mobile internally */}
          <MobileStadiumFacilities />
          <MobileLocationMap />
          <MobileGettingThere />
        </div>
      </div>
    </main>
  );
}
