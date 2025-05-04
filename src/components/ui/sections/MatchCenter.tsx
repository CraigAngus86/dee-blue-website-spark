
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCarousel from '@/components/ui/match/MatchCarousel';
import LeagueTable from '@/components/ui/match/LeagueTable';
import FeaturedMatch from '@/components/ui/sections/FeaturedMatch';
import { Match } from '@/types/match';
import Heading from '@/components/ui/typography/Heading';

interface MatchCenterProps {
  upcomingMatches?: Match[];
  recentResults?: Match[];
  leagueTable?: any[];
  featuredMatch?: Match;
}

interface LeagueTableProps {
  data: any[];
  selectedSeason?: string;
}

const MatchCenter: React.FC<MatchCenterProps> = ({
  upcomingMatches = [],
  recentResults = [],
  leagueTable = [],
  featuredMatch
}) => {
  const hasData = upcomingMatches.length > 0 || recentResults.length > 0 || leagueTable.length > 0;
  
  if (!hasData) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <Heading as="h2" size="2xl" className="mb-4">
          Match Center
        </Heading>
        <p className="text-muted-foreground">
          Stay updated with the latest fixtures, results, and the current league table.
        </p>
      </div>

      {featuredMatch && (
        <div className="mb-8">
          <FeaturedMatch match={featuredMatch} />
        </div>
      )}

      <Tabs defaultValue="fixtures" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="table">League Table</TabsTrigger>
        </TabsList>
        <TabsContent value="fixtures" className="w-full">
          {upcomingMatches.length > 0 ? (
            <MatchCarousel matches={upcomingMatches} />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No upcoming fixtures at this time.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="results">
          {recentResults.length > 0 ? (
            <MatchCarousel matches={recentResults} />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No recent results to show.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="table">
          {leagueTable.length > 0 ? (
            <LeagueTable data={leagueTable} selectedSeason="2023/24" />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">League table is not available.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchCenter;
