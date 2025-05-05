import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

// Define the Match interface to match how it's used in the component
interface Match {
  id: string;
  matchDate: string; // Ensure this is required, not optional
  matchTime?: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  venue: string;
  ticketLink?: string;
}

export const MatchCenter: React.FC<{
  upcomingMatches: Match[];
  recentMatches: any[];
}> = ({ upcomingMatches = [], recentMatches = [] }) => {
  // Ensure all matchDate values are strings, not undefined
  const safeUpcomingMatches = upcomingMatches.map(match => ({
    ...match,
    matchDate: match.matchDate || new Date().toISOString().split('T')[0]
  }));

  return (
    <div>
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {safeUpcomingMatches.length > 0 ? (
            safeUpcomingMatches.map((match) => (
              <Card key={match.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{match.homeTeam} vs {match.awayTeam}</h3>
                      <p className="text-sm text-gray-500">{match.competition}</p>
                    </div>
                    <div>
                      {match.homeTeamLogo && (
                        <img src={match.homeTeamLogo} alt={match.homeTeam} className="w-8 h-8 mr-2" />
                      )}
                      {match.awayTeamLogo && (
                        <img src={match.awayTeamLogo} alt={match.awayTeam} className="w-8 h-8" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm">
                    Date: {format(new Date(match.matchDate), 'PPP')}
                    {match.matchTime && `, Time: ${match.matchTime}`}
                  </p>
                  <p className="text-sm">Venue: {match.venue}</p>
                  {match.ticketLink && (
                    <Button asChild variant="link" className="mt-2">
                      <a href={match.ticketLink} target="_blank" rel="noopener noreferrer">
                        Get Tickets
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No upcoming matches scheduled.</p>
          )}
        </TabsContent>
        <TabsContent value="recent">
          {recentMatches.length > 0 ? (
            recentMatches.map((match) => (
              <Card key={match.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{match.homeTeam} vs {match.awayTeam}</h3>
                      <p className="text-sm text-gray-500">{match.competition}</p>
                    </div>
                    <div>
                      {match.homeTeamLogo && (
                        <img src={match.homeTeamLogo} alt={match.homeTeam} className="w-8 h-8 mr-2" />
                      )}
                      {match.awayTeamLogo && (
                        <img src={match.awayTeamLogo} alt={match.awayTeam} className="w-8 h-8" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm">
                    Date: {format(new Date(match.matchDate), 'PPP')}
                    {match.matchTime && `, Time: ${match.matchTime}`}
                  </p>
                  <p className="text-sm">Venue: {match.venue}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No recent matches available.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchCenter;
