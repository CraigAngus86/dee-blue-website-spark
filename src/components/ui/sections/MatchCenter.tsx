
"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCarousel from "@/components/ui/match/MatchCarousel";
import LeagueTable from "@/components/ui/match/LeagueTable";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import { formatMatchData } from "@/lib/utils";
import { Match } from "@/types/match";

interface MatchCenterProps {
  upcomingMatches: any[];
  recentResults: any[];
  leagueTable: any[];
}

// Extended Match type to match the shape returned by formatMatchData
interface FormattedMatch {
  id: any;
  date: any;
  time: any;
  venue: any;
  homeTeam: { id: any; name: any; logo: any; };
  awayTeam: { id: any; name: any; logo: any; };
  competition: { id: any; name: any; shortName: any; logo: any; };
  result?: { homeScore: any; awayScore: any; matchReportLink: any; };
  ticketLink: any;
  status: any;
}

// Update LeagueTable props interface
interface ExtendedLeagueTableProps {
  leagueTable: any[];
  selectedSeason: string;
}

const MatchCenter: React.FC<MatchCenterProps> = ({ 
  upcomingMatches,
  recentResults,
  leagueTable
}) => {
  const [tabValue, setTabValue] = useState("fixtures");
  
  // Format the match data for the carousel component
  const formattedUpcoming = formatMatchData(upcomingMatches, false) as FormattedMatch[];
  const formattedResults = formatMatchData(recentResults, true) as FormattedMatch[];
  
  return (
    <div>
      <SectionHeader
        title="Match Center"
        subtitle="Upcoming fixtures, recent results and league standings"
      />
      
      <Tabs 
        defaultValue="fixtures" 
        className="w-full"
        value={tabValue}
        onValueChange={setTabValue}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="table">League Table</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fixtures" className="animation-fade-in">
          <MatchCarousel 
            matches={formattedUpcoming as unknown as Match[]}
          />
        </TabsContent>
        
        <TabsContent value="results" className="animation-fade-in">
          <MatchCarousel 
            matches={formattedResults as unknown as Match[]}
          />
        </TabsContent>
        
        <TabsContent value="table" className="animation-fade-in">
          <LeagueTable 
            leagueTable={leagueTable} 
            selectedSeason="2023/24"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchCenter;
