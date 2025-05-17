import React from 'react';
import { MatchCarousel } from '@/features/matches/components/home/MatchCarousel';

interface MatchCenterProps {
  upcomingMatches: any[];
  recentResults: any[];
  leagueTable?: any[];
}

export default function MatchCenter({ 
  upcomingMatches = [], 
  recentResults = [], 
  leagueTable = [] 
}: MatchCenterProps) {
  // Debug logging to track data flow
  console.log("MatchCenter - upcomingMatches:", upcomingMatches?.length);
  console.log("MatchCenter - recentResults:", recentResults?.length);
  console.log("MatchCenter - leagueTable:", leagueTable?.length);
  
  // If we have league table entries but no matches, something could be wrong with the data fetching
  if ((upcomingMatches?.length === 0 && recentResults?.length === 0) && leagueTable?.length > 0) {
    console.warn("Got league table data but no match data - possible data fetching issue");
  }
  
  // Find Banks o' Dee in the league table
  const banksODee = leagueTable.find(team => 
    team?.team_name?.toLowerCase().includes("banks o' dee")
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
      {/* Main wrapper with vertical layout */}
      <div className="flex flex-col space-y-8">
        {/* Header with title and view all link */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#00105A]">Match Centre</h2>
          <a 
            href="/matches" 
            className="text-[#00105A] hover:text-[#FFD700] transition-colors flex items-center space-x-1"
          >
            <span>View All Matches</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        
        {/* Match Carousel - with proper debugging */}
        <MatchCarousel 
          recentMatches={recentResults}
          upcomingMatches={upcomingMatches}
        />
        
        {/* League Position section - will implement in Step 4 */}
        {leaguePosition && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#00105A]">Highland League Table</h3>
              <a 
                href="/matches?tab=table" 
                className="text-[#00105A] hover:text-[#FFD700] transition-colors flex items-center space-x-1"
              >
                <span className="text-sm">View Full Table</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-8 flex items-center justify-center">
              <p className="text-gray-500">League Table will be implemented in Step 4</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
