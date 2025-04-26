
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Match } from '@/types/match';
import Container from "@/components/ui/layout/Container";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import MatchCarousel from "@/components/ui/match/MatchCarousel";
import LeagueTableWidget from "@/components/ui/match/LeagueTableWidget";

/**
 * MatchCenter component displays match information and league standings
 * @component
 * 
 * @description
 * Central hub for match-related information including upcoming fixtures,
 * recent results, and current league position.
 * 
 * @requires MatchCarousel component
 * @requires LeagueTableWidget component
 * @requires getMatchCenterMatches from fixturesData
 * 
 * @example
 * ```tsx
 * <MatchCenter />
 * ```
 * 
 * @limitation
 * - Real-time updates not yet implemented
 * - Limited to displaying a fixed number of matches
 */

const MatchCenter: React.FC = () => {
  const { data: matches = [], isLoading } = useQuery({
    queryKey: ['matchCenterMatches'],
    queryFn: async (): Promise<Match[]> => {
      // Get the current date in ISO format
      const today = new Date().toISOString().split('T')[0];
      
      // Get recent completed matches (last 2)
      const { data: pastMatches } = await supabase
        .from('match')
        .select(`
          id,
          match_date,
          match_time,
          venue,
          status,
          is_completed,
          home_score,
          away_score,
          ticket_link,
          home_team:home_team_id(name),
          away_team:away_team_id(name),
          season_competition:season_competition_id(
            competition:competition_id(name)
          )
        `)
        .eq('status', 'completed')
        .order('match_date', { ascending: false })
        .limit(2);
      
      // Get the next match and up to 2 more upcoming matches
      const { data: upcomingMatches } = await supabase
        .from('match')
        .select(`
          id,
          match_date,
          match_time,
          venue,
          status,
          is_completed,
          home_score,
          away_score,
          ticket_link,
          home_team:home_team_id(name),
          away_team:away_team_id(name),
          season_competition:season_competition_id(
            competition:competition_id(name)
          )
        `)
        .gte('match_date', today)
        .in('status', ['scheduled', 'postponed'])
        .order('match_date', { ascending: true })
        .limit(3);
      
      // Transform the data to match our expected format
      const transformMatch = (item: any): Match => ({
        id: item.id,
        date: item.match_date,
        time: item.match_time,
        competition: item.season_competition.competition.name,
        homeTeam: item.home_team.name,
        awayTeam: item.away_team.name,
        venue: item.venue,
        status: item.status === 'completed' ? 'finished' : 'upcoming',
        isCompleted: item.is_completed,
        ticketLink: item.ticket_link,
        result: item.home_score !== null ? {
          homeScore: item.home_score,
          awayScore: item.home_score
        } : undefined
      });
      
      // Combine past matches and upcoming matches
      const allMatches = [
        ...(pastMatches || []).map(transformMatch),
        ...(upcomingMatches || []).map(transformMatch)
      ];
      
      console.log("Match Center loaded with matches:", allMatches.length);
      return allMatches;
    }
  });
  
  return (
    <Container>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 pt-8 pb-4 flex justify-between items-center">
          <div className="border-l-4 border-primary pl-3">
            <SectionHeader 
              title="Match Centre" 
              textColor="primary"
            />
          </div>
          <Link 
            to="/match-centre" 
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            View All Matches 
            <span className="inline-block ml-1">→</span>
          </Link>
        </div>
        
        <div className="p-4 md:p-6">
          <MatchCarousel matches={matches} isLoading={isLoading} />
        </div>
        
        <LeagueTableWidget />
      </div>
    </Container>
  );
};

export default MatchCenter;
