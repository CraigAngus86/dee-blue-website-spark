
import React, { useState, useEffect } from "react";
import { upcomingFixtures, recentResults } from "@/mock-data/fixturesData";
import Container from "@/components/ui/layout/Container";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import { ButtonNew } from "@/components/ui/ButtonNew";
import { Calendar, Clock, Trophy, ChevronRight } from "lucide-react";
import MatchCardNew from "@/components/ui/image/MatchCardNew";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
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
  
  // We'll need 2 past matches and 2 future matches plus the next match
  const pastMatches = recentResults.slice(0, 2);
  const futureMatches = upcomingFixtures.slice(1, 3);
  
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
  
  return (
    <Container>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
        {/* Section Header with new styling */}
        <div className="px-4 sm:px-6 pt-8 pb-4">
          <SectionHeader 
            title="Match Centre" 
            textColor="primary"
          />
        </div>
        
        {/* Next Match Countdown */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Left: Next Match Title */}
            <div className="mb-4 md:mb-0">
              <Text as="span" weight="semibold" size="large" color="primary" className="uppercase">
                Next Match
              </Text>
              <div className="flex items-center mt-1">
                <Trophy className="h-4 w-4 text-accent mr-2" />
                <Text color="muted" size="small">
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
        
        {/* Match Cards Carousel */}
        <div className="p-4 md:p-6">
          <div className="relative">
            <Carousel className="w-full" opts={{ align: "center" }}>
              <CarouselContent>
                {/* Past Matches (2) */}
                {pastMatches.map((match) => (
                  <CarouselItem key={match.id} className="sm:basis-full md:basis-1/2 lg:basis-1/3 pl-4 pr-4">
                    <MatchCardNew
                      match={match}
                      variant="past"
                      className="h-full"
                    />
                  </CarouselItem>
                ))}
                
                {/* Next Match (1) - Always in center */}
                <CarouselItem key={nextMatch.id} className="sm:basis-full md:basis-1/2 lg:basis-1/3 pl-4 pr-4">
                  <MatchCardNew
                    match={nextMatch}
                    variant="next"
                    className="h-full transform scale-105 z-10"
                  />
                </CarouselItem>
                
                {/* Future Matches (2) */}
                {futureMatches.map((match) => (
                  <CarouselItem key={match.id} className="sm:basis-full md:basis-1/2 lg:basis-1/3 pl-4 pr-4">
                    <MatchCardNew
                      match={match}
                      variant="future"
                      className="h-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </div>
            </Carousel>
          </div>
        </div>
        
        {/* Bank o' Dee League Position */}
        <div className="p-4 md:p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <Heading level={3} className="text-primary text-lg">Highland League Table</Heading>
            <ButtonNew 
              variant="tertiary" 
              size="sm"
              iconRight={<ChevronRight className="w-4 h-4" />}
              href="/table"
            >
              View Full Table
            </ButtonNew>
          </div>
          
          {/* Key Stats Only */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div>
                  <div className="font-semibold text-lg text-primary">Banks o' Dee FC</div>
                  <div className="text-sm text-gray-500">Highland League</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-8 mt-2 sm:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">60</div>
                  <div className="text-xs text-gray-500 uppercase">Points</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex space-x-1 justify-center">
                    <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold">W</div>
                    <div className="bg-amber-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold">D</div>
                    <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold">W</div>
                    <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold">W</div>
                    <div className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold">L</div>
                  </div>
                  <div className="text-xs text-gray-500 uppercase text-center mt-1">Form</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MatchCenter;
