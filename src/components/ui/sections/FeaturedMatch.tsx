
import React from "react";
import MatchCard from "@/components/ui/image/MatchCard";
import { upcomingFixtures } from "@/mock-data/fixturesData";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface FeaturedMatchProps {
  matches?: typeof upcomingFixtures;
  className?: string;
  maxMatches?: number;
}

const FeaturedMatch: React.FC<FeaturedMatchProps> = ({
  matches = upcomingFixtures,
  className,
  maxMatches = 3
}) => {
  const [activeMatch, setActiveMatch] = useState(0);
  const displayMatches = matches.slice(0, maxMatches);
  
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="bg-primary py-3 px-4">
        <h2 className="text-white font-bold text-xl">Upcoming Matches</h2>
      </div>
      
      <div className="p-4">
        {displayMatches.map((match, index) => (
          <div 
            key={index} 
            className={`transition-opacity duration-300 ${index === activeMatch ? 'opacity-100' : 'hidden'}`}
          >
            <MatchCard
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              competition={`${match.competition} - ${match.round}`}
              date={match.date}
              time={match.time}
              venue={match.venue}
              status="upcoming"
              ticketLink={match.ticketLink}
            />
          </div>
        ))}
        
        {/* Match selector controls */}
        {displayMatches.length > 1 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray">Next {displayMatches.length} matches</span>
              <div className="flex space-x-2">
                {displayMatches.map((_, index) => (
                  <button 
                    key={index} 
                    onClick={() => setActiveMatch(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeMatch ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Show match ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            {/* Interactive slider */}
            <Slider 
              value={[activeMatch]} 
              max={displayMatches.length - 1} 
              step={1} 
              onValueChange={(values) => setActiveMatch(values[0])}
              className="mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedMatch;
