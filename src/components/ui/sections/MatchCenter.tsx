
"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCarousel from "@/components/ui/match/MatchCarousel";
import LeagueTable from "@/components/ui/match/LeagueTable";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import { formatMatchData } from "@/lib/utils";

interface MatchCenterProps {
  upcomingMatches: any[];
  recentResults: any[];
  leagueTable: any[];
}

const MatchCenter: React.FC<MatchCenterProps> = ({ 
  upcomingMatches,
  recentResults,
  leagueTable
}) => {
  const [tabValue, setTabValue] = useState("fixtures");
  
  // Format the match data for the carousel component
  const formattedUpcoming = formatMatchData(upcomingMatches, false);
  const formattedResults = formatMatchData(recentResults, true);
  
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
            matches={formattedUpcoming}
          />
        </TabsContent>
        
        <TabsContent value="results" className="animation-fade-in">
          <MatchCarousel 
            matches={formattedResults}
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
