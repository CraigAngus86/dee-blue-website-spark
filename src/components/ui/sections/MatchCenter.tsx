import React from 'react';
import { MatchCentreCarousel } from '@/features/matches/components/home';
import { Match } from '@/types/match';

interface MatchCenterProps {
  upcomingMatches: Match[];
  recentResults: Match[];
  leagueTable?: any[];
}

export default function MatchCenter({ 
  upcomingMatches, 
  recentResults, 
  leagueTable = [] 
}: MatchCenterProps) {
  // Find Banks o' Dee in the league table
  const banksODee = leagueTable.find(team => 
    team.team_name?.toLowerCase().includes("banks o' dee")
  );
  
  // Format the league position data if Banks o' Dee is found
  const leaguePosition = banksODee ? {
    position: banksODee.position || 0,
    played: banksODee.matches_played || 0,
    won: banksODee.wins || 0,
    drawn: banksODee.draws || 0,
    lost: banksODee.losses || 0,
    points: banksODee.points || 0,
    form: banksODee.form || []
  } : undefined;
  
  return (
    <div className="container mx-auto px-4">
      <MatchCentreCarousel 
        upcomingMatches={upcomingMatches} 
        recentMatches={recentResults}
        leaguePosition={leaguePosition}
      />
    </div>
  );
}
