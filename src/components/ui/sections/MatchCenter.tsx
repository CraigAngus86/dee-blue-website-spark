
import React from "react";
import { Link } from "react-router-dom";
import { getUpcomingFixtures, getResults, leagueTableData } from "@/mock-data/fixturesData";
import Container from "@/components/ui/layout/Container";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import MatchCountdown from "@/components/ui/match/MatchCountdown";
import MatchCarousel from "@/components/ui/match/MatchCarousel";
import LeagueTableWidget from "@/components/ui/match/LeagueTableWidget";

const MatchCenter: React.FC = () => {
  // Get the next match from the upcoming fixtures - force refreshing the data
  const upcomingFixtures = getUpcomingFixtures();
  const nextMatch = upcomingFixtures.length > 0 ? upcomingFixtures[0] : null;
  
  // We'll need 2 past matches and 2 future matches plus the next match
  const pastMatches = getResults().slice(0, 2);
  const futureMatches = upcomingFixtures.slice(1, 3);
  
  // Create the matches array with null check for nextMatch
  const allMatches = [
    ...pastMatches,
    ...(nextMatch ? [nextMatch] : []),
    ...futureMatches
  ].filter(Boolean); // Filter out any undefined values

  console.log("Match Center data loaded:", { 
    upcomingCount: upcomingFixtures.length, 
    pastCount: pastMatches.length, 
    nextMatch: nextMatch?.id
  });

  return (
    <Container>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 pt-8 pb-4 flex justify-between items-center">
          <SectionHeader 
            title="Match Centre" 
            textColor="primary"
          />
          <Link 
            to="/match-centre" 
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All Matches →
          </Link>
        </div>
        
        {/* Next Match Countdown */}
        {nextMatch && (
          <MatchCountdown 
            nextMatch={{
              competition: nextMatch.competition,
              round: nextMatch.round || "",
              date: nextMatch.date,
              time: nextMatch.time || "TBD"
            }} 
          />
        )}
        
        {/* Match Carousel */}
        <div className="p-4 md:p-6">
          {allMatches.length > 0 ? (
            <MatchCarousel matches={allMatches} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              No matches available at the moment
            </div>
          )}
        </div>
        
        {/* League Table Widget */}
        <LeagueTableWidget />
      </div>
    </Container>
  );
};

export default MatchCenter;
