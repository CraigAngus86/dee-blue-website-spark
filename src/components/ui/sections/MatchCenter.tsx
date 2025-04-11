
import React, { useState, useEffect } from "react";
import { upcomingFixtures, recentResults } from "@/mock-data/fixturesData";
import Container from "@/components/ui/layout/Container";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import { ButtonNew } from "@/components/ui/ButtonNew";
import { Calendar, Clock, Trophy } from "lucide-react";
import MatchCardNew from "@/components/ui/image/MatchCardNew";
import LeagueTableWidget from "@/components/ui/sections/LeagueTableWidget";
import SectionHeader from "@/components/ui/sections/SectionHeader";

interface MatchCenterProps {
  className?: string;
}

const MatchCenter: React.FC<MatchCenterProps> = ({ className }) => {
  const [nextMatchCountdown, setNextMatchCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Get the next match from the upcoming fixtures
  const nextMatch = upcomingFixtures[0];

  // Calculate countdown to next match
  useEffect(() => {
    if (!nextMatch) return;
    
    const calculateTimeLeft = () => {
      const nextMatchDate = new Date(`${nextMatch.date} ${nextMatch.time}`);
      const now = new Date();
      const difference = nextMatchDate.getTime() - now.getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };
    
    // Initial calculation
    setNextMatchCountdown(calculateTimeLeft());
    
    // Update countdown every second
    const timer = setInterval(() => {
      setNextMatchCountdown(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [nextMatch]);

  // Get two recent results and two upcoming fixtures
  const twoRecentResults = recentResults.slice(0, 2);
  const twoUpcomingFixtures = upcomingFixtures.slice(1, 3);
  
  // Arrange matches in order: 2 recent results, next match, 2 upcoming fixtures
  const matchDisplayOrder = [
    ...twoRecentResults, // Past matches
    nextMatch, // Next match
    ...twoUpcomingFixtures // Future matches
  ];
  
  return (
    <Container>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
        {/* Section Header */}
        <div className="px-8 py-6">
          <SectionHeader title="Matches & Stats" />
        </div>
        
        {/* Next Match Countdown */}
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Left: Next Match Title */}
            <div className="mb-4 md:mb-0">
              <Text as="span" weight="semibold" size="large" color="primary" className="uppercase">
                Next Match
              </Text>
              <div className="flex items-center mt-1">
                <Trophy className="h-4 w-4 text-accent mr-2" />
                <Text color="secondary" size="small">
                  {nextMatch.competition} - {nextMatch.round}
                </Text>
              </div>
            </div>
            
            {/* Center: Countdown Timer */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              {Object.entries(nextMatchCountdown).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-primary">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <Text size="xs" color="muted" className="uppercase mt-1">
                    {unit}
                  </Text>
                </div>
              ))}
            </div>
            
            {/* Right: Sync to Calendar */}
            <ButtonNew 
              variant="tertiary" 
              size="sm"
              iconLeft={<Calendar className="w-4 h-4" />}
            >
              Sync to Calendar
            </ButtonNew>
          </div>
        </div>
        
        {/* Match Cards Row */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {matchDisplayOrder.map((match, index) => {
              // Determine if this is a past match, next match, or future match
              const isPast = match.status === 'completed';
              const isNext = !isPast && index === 2; // Center match (next match)
              
              return (
                <MatchCardNew
                  key={match.id}
                  match={match}
                  variant={isPast ? "past" : isNext ? "next" : "future"}
                  className={isNext ? "md:col-span-1 order-3 md:order-none" : ""}
                />
              );
            })}
          </div>
        </div>
        
        {/* League Table */}
        <div className="px-8 py-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <Heading level={3} className="text-primary text-lg">Highland League Table</Heading>
            <ButtonNew 
              variant="tertiary" 
              size="sm"
            >
              View Full Table
            </ButtonNew>
          </div>
          
          <LeagueTableWidget />
        </div>
      </div>
    </Container>
  );
};

export default MatchCenter;
