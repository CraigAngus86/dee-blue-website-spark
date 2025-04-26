
import React from "react";
import { Link } from "react-router-dom";
import { getMatchCenterMatches } from '@/mock-data/fixturesData';
import Container from "@/components/ui/layout/Container";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import MatchCarousel from "@/components/ui/match/MatchCarousel";
import LeaguePositionStrip from "@/components/ui/sections/LeaguePositionStrip";

const MatchCenter: React.FC = () => {
  const [matches, setMatches] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadMatches = async () => {
      const matchData = await getMatchCenterMatches();
      setMatches(matchData);
      setIsLoading(false);
    };
    
    loadMatches();
  }, []);
  
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
        
        <div className="px-4 md:px-6 pb-6">
          <h3 className="text-lg font-semibold mb-4">League Position</h3>
          <LeaguePositionStrip 
            position={3}
            points={72}
            form={['W', 'W', 'L', 'W', 'W']}
          />
        </div>
      </div>
    </Container>
  );
};

export default MatchCenter;
