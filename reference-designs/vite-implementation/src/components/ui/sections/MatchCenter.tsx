import React from "react";
import { Link } from "react-router-dom";
import { getMatchCenterMatches } from '@/mock-data/fixturesData';
import Container from "@/components/ui/layout/Container";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import MatchCarousel from "@/components/ui/match/MatchCarousel";
import Text from "@/components/ui/typography/Text";

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
        
        <div className="px-4 sm:px-6 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-primary">Highland League Table</h3>
            <Link 
              to="/match-centre" 
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center"
            >
              View Full Table 
              <span className="inline-block ml-1">→</span>
            </Link>
          </div>
          
          <div className="flex items-center p-4 rounded-md bg-white border border-gray-100">
            <div className="flex items-center mr-8">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mr-4">
                3
              </div>
              <div>
                <Text as="div" weight="bold" color="primary" size="large">Banks o' Dee</Text>
              </div>
            </div>
            
            <div className="flex items-center space-x-8 ml-auto">
              <div className="text-center px-4">
                <Text as="div" size="large" weight="bold" color="primary">72</Text>
                <Text as="div" size="xs" color="muted">POINTS</Text>
              </div>
              
              <div className="text-center px-4 hidden md:block">
                <Text as="div" size="large" weight="medium" color="primary">22</Text>
                <Text as="div" size="xs" color="muted">WON</Text>
              </div>
              
              <div className="text-center px-4 hidden md:block">
                <Text as="div" size="large" weight="medium" color="primary">6</Text>
                <Text as="div" size="xs" color="muted">DRAWN</Text>
              </div>
              
              <div className="text-center px-4 hidden md:block">
                <Text as="div" size="large" weight="medium" color="primary">6</Text>
                <Text as="div" size="xs" color="muted">LOST</Text>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex space-x-1.5">
                  <div className="w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center font-semibold">W</div>
                  <div className="w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center font-semibold">W</div>
                  <div className="w-7 h-7 rounded-full bg-red-500 text-white text-sm flex items-center justify-center font-semibold">L</div>
                  <div className="w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center font-semibold">W</div>
                  <div className="w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center font-semibold">W</div>
                </div>
                <Text as="div" size="xs" color="muted" className="mt-1">FORM</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MatchCenter;
