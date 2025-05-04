
import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/ui/hero/HeroSection';
import { FixturesCard } from '@/components/ui/match/FixturesCard';
import { getUpcomingMatches } from '@/utils/cross-system/match';

export const metadata: Metadata = {
  title: "Fixtures | Banks o' Dee FC",
  description: "View upcoming fixtures for Banks o' Dee Football Club",
};

export default async function FixturesPage() {
  // Fetch upcoming fixtures
  const upcomingMatches = await getUpcomingMatches(10);
  
  return (
    <main>
      <HeroSection
        title="Fixtures"
        imageSrc="/images/stadium/spain-park-match.jpg"
        imageAlt="Spain Park on match day"
      />
      
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map(match => (
              <FixturesCard 
                key={match.id} 
                match={match} 
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No upcoming fixtures at this time</h3>
              <p className="mt-2 text-gray-500">Please check back soon for updates</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
