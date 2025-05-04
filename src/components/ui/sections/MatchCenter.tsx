
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCarousel from '../match/MatchCarousel';
import LeagueTable from '../match/LeagueTable';
import SectionHeader from './SectionHeader';
import FeaturedMatch from './FeaturedMatch';

interface MatchData {
  id: string;
  matchDate: string;
  matchTime?: string;
  competition: string;
  homeTeam: string;
  awayTeam: string; 
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  venue: string;
  ticketLink?: string;
}

interface ResultData extends MatchData {
  homeScore: number;
  awayScore: number;
  matchReport?: string;
}

// Define types to match the MatchCarousel component's expectations
type Match = {
  id: string;
  match_date: string;
  matchDate?: string; // Alternative property name
  home_team: any;
  homeTeam?: string; // Alternative property name
  away_team: any;
  awayTeam?: string; // Alternative property name
  venue?: string;
  ticketLink?: string;
  status: string;
  // Add other required properties
};

interface MatchCenterProps {
  upcomingMatches: any[];
  recentResults: any[];
  leagueTable: any[];
}

export default function MatchCenter({
  upcomingMatches,
  recentResults,
  leagueTable
}: MatchCenterProps) {
  // Format upcoming matches for the carousel - with type adaptation
  const formattedUpcoming = upcomingMatches.map(match => ({
    id: match.id,
    match_date: match.match_date,
    matchDate: match.match_date,
    matchTime: match.match_time,
    competition: match.competition?.name || '',
    homeTeam: match.home_team?.name || '',
    awayTeam: match.away_team?.name || '',
    homeTeamLogo: match.home_team?.logo_url,
    awayTeamLogo: match.away_team?.logo_url,
    venue: match.venue || 'TBA',
    ticketLink: match.ticket_link,
    // Add required properties for Match type
    home_team: match.home_team,
    away_team: match.away_team,
    status: match.status || 'scheduled'
  } as Match));

  // Format recent results for the carousel - with type adaptation
  const formattedResults = recentResults.map(match => ({
    id: match.id,
    match_date: match.match_date,
    matchDate: match.match_date,
    matchTime: match.match_time,
    competition: match.competition?.name || '',
    homeTeam: match.home_team?.name || '',
    awayTeam: match.away_team?.name || '',
    homeTeamLogo: match.home_team?.logo_url,
    awayTeamLogo: match.away_team?.logo_url,
    venue: match.venue || 'TBA',
    homeScore: match.home_score,
    awayScore: match.away_score,
    matchReport: match.match_report_link,
    // Add required properties for Match type
    home_team: match.home_team,
    away_team: match.away_team,
    status: match.status || 'completed'
  } as Match));

  // Featured match (most recent upcoming match)
  const featuredMatch = formattedUpcoming.length > 0 ? formattedUpcoming[0] : null;

  return (
    <div className="w-full">
      <SectionHeader 
        title="Match Center" 
        subtitle="Latest fixtures, results and league table"
      />

      {/* Featured Match */}
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

        <TabsContent value="fixtures" className="mt-0">
          <MatchCarousel matches={formattedUpcoming} type="fixture" />
        </TabsContent>

        <TabsContent value="results" className="mt-0">
          <MatchCarousel matches={formattedResults} type="result" />
        </TabsContent>

        <TabsContent value="table" className="mt-0">
          <LeagueTable tableData={leagueTable} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
