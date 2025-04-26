import React from "react";
import MatchCard from "@/components/ui/image/MatchCard";
import { getUpcomingFixtures } from "@/mock-data/fixturesData";

interface FeaturedMatchProps {
  className?: string;
  maxMatches?: number;
}

/**
 * FeaturedMatch component displays upcoming match information in a prominent way
 * @component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {number} [props.maxMatches=3] - Maximum number of matches to display
 * 
 * @requires MatchCard component
 * @requires getUpcomingFixtures from fixturesData
 * 
 * @example
 * ```tsx
 * <FeaturedMatch maxMatches={2} />
 * ```
 * 
 * @limitation
 * Currently only supports a fixed number of matches and doesn't handle timezone differences
 */
const FeaturedMatch: React.FC<FeaturedMatchProps> = ({
  className,
  maxMatches = 3
}) => {
  const matches = getUpcomingFixtures().slice(0, maxMatches);
  
  return (
    <div className={`bg-gradient-to-br from-primary to-primary-dark rounded-lg overflow-hidden border border-white/10 shadow-xl ${className}`}>
      <div className="bg-primary/50 backdrop-blur-sm py-3 px-4 border-b border-white/10">
        <h2 className="text-white font-bold text-xl">Upcoming Matches</h2>
      </div>
      
      <div className="p-4 space-y-4">
        {matches.map((match, index) => (
          <div 
            key={match.id} 
            className={`${index > 0 ? 'mt-5 pt-5 border-t border-white/10' : ''}`}
          >
            <MatchCard
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              competition={match.competition}
              date={match.date}
              time={match.time}
              venue={match.venue}
              status="upcoming"
              ticketLink={match.ticketLink}
              className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMatch;
