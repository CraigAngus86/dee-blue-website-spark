
import React from "react";
import { getUpcomingFixtures, getResults } from "@/mock-data/fixturesData";
import Container from "@/components/ui/layout/Container";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import MatchCountdown from "@/components/ui/match/MatchCountdown";
import MatchCarousel from "@/components/ui/match/MatchCarousel";
import LeagueTableWidget from "@/components/ui/match/LeagueTableWidget";

const MatchCenter: React.FC = () => {
  // Get the next match from the upcoming fixtures
  const nextMatch = getUpcomingFixtures()[0];
  
  // We'll need 2 past matches and 2 future matches plus the next match
  const pastMatches = getResults().slice(0, 2);
  const futureMatches = getUpcomingFixtures().slice(1, 3);
  
  const allMatches = [...pastMatches, nextMatch, ...futureMatches];

  // Prepare the match data for the MatchCountdown component
  const countdownMatchData = {
    competition: nextMatch.competition,
    round: nextMatch.round || "", // Provide empty string as fallback
    date: nextMatch.date,
    time: nextMatch.time || "TBD"
  };

  return (
    <Container>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Section Header */}
        <div className="px-4 sm:px-6 pt-8 pb-4">
          <SectionHeader 
            title="Match Centre" 
            textColor="primary"
          />
        </div>
        
        {/* Next Match Countdown */}
        <MatchCountdown nextMatch={countdownMatchData} />
        
        {/* Match Carousel */}
        <div className="p-4 md:p-6">
          <MatchCarousel matches={allMatches} />
        </div>
        
        {/* League Table Widget */}
        <LeagueTableWidget />
      </div>
    </Container>
  );
};

export default MatchCenter;
