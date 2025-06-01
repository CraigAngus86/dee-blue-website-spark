import { Metadata } from 'next';
import { SpainParkHero } from '@/features/stadium/components/SpainParkHero';
import { StadiumOverview } from '@/features/stadium/components/StadiumOverview';
import { StadiumTimeline } from '@/features/stadium/components/StadiumTimeline';
import { StadiumFacilities } from '@/features/stadium/components/StadiumFacilities';
import { LocationDirections } from '@/features/stadium/components/LocationDirections';

export const metadata: Metadata = {
  title: 'Spain Park Stadium | Banks o\' Dee FC',
  description: 'Discover the home of Banks o\' Dee FC - Spain Park Stadium. Explore our history, facilities, and heritage dating back to 1902.',
};

export default function StadiumPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <SpainParkHero />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Stadium Overview */}
        <StadiumOverview />
        
        {/* Stadium Timeline */}
        <StadiumTimeline />
        
        {/* Stadium Facilities */}
        <StadiumFacilities />
        
        {/* Location & Directions */}
        <LocationDirections />
      </div>
    </main>
  );
}
