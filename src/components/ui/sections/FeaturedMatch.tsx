
import React from "react";
import MatchCard from "@/components/ui/image/MatchCard";
import { upcomingFixtures } from "@/mock-data/fixturesData";

interface FeaturedMatchProps {
  match?: typeof upcomingFixtures[0];
  className?: string;
}

const FeaturedMatch: React.FC<FeaturedMatchProps> = ({
  match = upcomingFixtures[0], // Default to first upcoming match
  className
}) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="bg-primary py-3 px-4">
        <h2 className="text-white font-bold text-xl">Next Match</h2>
      </div>
      
      <div className="p-4">
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
    </div>
  );
};

export default FeaturedMatch;
