
import React from "react";
import { Link } from "react-router-dom";
import { getMatchCenterMatches } from "@/mock-data/fixturesData";
import Container from "@/components/ui/layout/Container";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import MatchCarousel from "@/components/ui/match/MatchCarousel";
import LeagueTableWidget from "@/components/ui/match/LeagueTableWidget";

const MatchCenter: React.FC = () => {
  const matches = getMatchCenterMatches();
  
  console.log("Match Center loaded with matches:", matches.length);

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
        
        <div className="p-4 md:p-6">
          <MatchCarousel matches={matches} />
        </div>
        
        <LeagueTableWidget />
      </div>
    </Container>
  );
};

export default MatchCenter;
