
import React from 'react';
import { fixtures } from '@/lib/fixtures-data';
import { Metadata } from 'next';
import GradientSeparator from '@/components/ui/separators/GradientSeparator';
import MatchCarousel from '@/components/ui/match/MatchCarousel';
import FixturesCard from '@/components/ui/match/FixturesCard';
import { formatDate } from '@/lib/utils';
import { Match } from '@/types/match';

export const metadata: Metadata = {
  title: 'Fixtures | Banks o\' Dee FC',
  description: 'View upcoming fixtures for Banks o\' Dee Football Club',
};

// Helper function to convert fixture format
function convertFixtureToMatch(fixture: any): Match {
  return {
    id: fixture.id,
    competition: fixture.competition,
    date: fixture.date,
    time: fixture.time,
    venue: fixture.venue,
    homeTeam: fixture.home.name,
    awayTeam: fixture.away.name,
    result: fixture.result,
    ticketLink: fixture.ticketLink,
    // Add home and away directly for backward compatibility
    home: fixture.home.name,
    away: fixture.away.name
  };
}

export default async function FixturesPage() {
  // Divide fixtures into groups by month
  const fixturesByMonth: { [key: string]: any[] } = {};

  fixtures.forEach(fixture => {
    try {
      // Format date to get month and year
      const date = new Date(fixture.date);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!fixturesByMonth[monthYear]) {
        fixturesByMonth[monthYear] = [];
      }
      
      fixturesByMonth[monthYear].push(fixture);
    } catch (e) {
      console.error(`Error processing fixture: ${fixture.id}`, e);
    }
  });

  // Sort months chronologically
  const sortedMonths = Object.keys(fixturesByMonth).sort((a, b) => {
    const dateA = new Date(fixturesByMonth[a][0].date);
    const dateB = new Date(fixturesByMonth[b][0].date);
    return dateA.getTime() - dateB.getTime();
  });

  // Convert fixtures to Match format for MatchCarousel
  const matchFixtures: Match[] = fixtures.map(convertFixtureToMatch);

  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-transparent py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fixtures</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Upcoming fixtures for Banks o&apos; Dee FC
          </p>
          
          {/* Fixtures Carousel */}
          <div className="mt-8">
            <MatchCarousel 
              fixtures={fixtures}
              title="Upcoming Fixtures"
            />
          </div>
        </div>
      </div>

      <GradientSeparator />

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">All Fixtures</h2>
        
        {sortedMonths.length > 0 ? (
          sortedMonths.map((month) => (
            <div key={month} className="mb-12">
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b">{month}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fixturesByMonth[month].map((fixture) => (
                  <FixturesCard
                    key={fixture.id}
                    competition={fixture.competition}
                    date={formatDate(fixture.date)}
                    time={fixture.time}
                    venue={fixture.venue}
                    home={fixture.home.name}
                    away={fixture.away.name}
                    result={fixture.result}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No fixtures currently available.</p>
          </div>
        )}
      </div>
    </main>
  );
}
