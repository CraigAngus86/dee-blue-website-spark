
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getMatchCenterMatches, getResults, getUpcomingFixtures, leagueTableData } from "@/mock-data/fixturesData";
import Container from "@/components/ui/layout/Container";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import MatchCard from "@/components/ui/image/MatchCard"; // Switch back to MatchCard
import LeagueTableWidget from "@/components/ui/match/LeagueTableWidget";

const MatchCenter: React.FC = () => {
  const pastMatches = getResults().slice(0, 2);
  const upcomingFixtures = getUpcomingFixtures();
  const nextMatch = upcomingFixtures[0];
  const futureMatches = upcomingFixtures.slice(1, 2); // Only take one future match
  
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
        
        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Latest Result */}
          {pastMatches[0] && (
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Latest Result</h3>
              <MatchCard
                homeTeam={pastMatches[0].homeTeam}
                awayTeam={pastMatches[0].awayTeam}
                competition={pastMatches[0].competition}
                date={pastMatches[0].date}
                time={pastMatches[0].time}
                venue={pastMatches[0].venue}
                status="completed"
                result={pastMatches[0].result}
                matchReportLink="#"
              />
            </div>
          )}
          
          {/* Next Match */}
          {nextMatch && (
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Next Match</h3>
              <MatchCard
                homeTeam={nextMatch.homeTeam}
                awayTeam={nextMatch.awayTeam}
                competition={nextMatch.competition}
                date={nextMatch.date}
                time={nextMatch.time}
                venue={nextMatch.venue}
                status="upcoming"
                ticketLink={nextMatch.ticketLink}
              />
            </div>
          )}
          
          {/* Upcoming Match */}
          {futureMatches[0] && (
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Upcoming Match</h3>
              <MatchCard
                homeTeam={futureMatches[0].homeTeam}
                awayTeam={futureMatches[0].awayTeam}
                competition={futureMatches[0].competition}
                date={futureMatches[0].date}
                time={futureMatches[0].time}
                venue={futureMatches[0].venue}
                status="upcoming"
                ticketLink={futureMatches[0].ticketLink}
              />
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
