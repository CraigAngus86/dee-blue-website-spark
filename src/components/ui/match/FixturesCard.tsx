
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Match } from '@/types/match';
import { Calendar, ChevronRight, Loader2 } from 'lucide-react';

export interface FixturesCardProps {
  fixture?: Match;
  upcomingFixtures?: Match[];
  recentResults?: Match[];
  isLoading?: boolean;
}

export function FixturesCard({ 
  fixture, 
  upcomingFixtures = [], 
  recentResults = [], 
  isLoading = false 
}: FixturesCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fixtures & Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingFixtures && upcomingFixtures.length > 0 ? (
              upcomingFixtures.map((match) => (
                <MatchItem key={match.id} match={match} type="upcoming" />
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p>No upcoming fixtures at this time</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="results" className="space-y-4">
            {recentResults && recentResults.length > 0 ? (
              recentResults.map((match) => (
                <MatchItem key={match.id} match={match} type="result" />
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p>No recent results to show</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface MatchItemProps {
  match: Match;
  type: 'upcoming' | 'result';
}

function MatchItem({ match, type }: MatchItemProps) {
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <span>{match.competition}</span>
        <span>•</span>
        <span>{match.matchDate}</span>
        {match.matchTime && (
          <>
            <span>•</span>
            <span>{match.matchTime}</span>
          </>
        )}
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {match.homeTeamLogo && (
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src={match.homeTeamLogo} 
                alt={match.homeTeam} 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
          )}
          <span className="font-medium">{match.homeTeam}</span>
        </div>

        {type === 'result' && match.homeScore !== undefined && match.awayScore !== undefined ? (
          <div className="font-bold text-lg">
            {match.homeScore} - {match.awayScore}
          </div>
        ) : (
          <div className="font-bold">vs</div>
        )}

        <div className="flex items-center gap-3">
          <span className="font-medium">{match.awayTeam}</span>
          {match.awayTeamLogo && (
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src={match.awayTeamLogo} 
                alt={match.awayTeam} 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">{match.venue}</div>
      
      {type === 'upcoming' && match.ticketLink && (
        <div className="mt-3">
          <Button size="sm" asChild>
            <a href={match.ticketLink} target="_blank" rel="noopener noreferrer">
              Buy Tickets <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
      
      {type === 'result' && match.matchReportLink && (
        <div className="mt-3">
          <Button size="sm" variant="outline" asChild>
            <a href={match.matchReportLink} target="_blank" rel="noopener noreferrer">
              Match Report <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
