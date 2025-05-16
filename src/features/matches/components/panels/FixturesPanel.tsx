import React, { useState, useEffect } from 'react';
import { getUpcomingMatches, groupMatchesByMonth } from '@/features/matches/hooks/useMatchesData';
import { getCompetitions } from '@/features/matches/hooks/useMatchesData';
import { Match, Competition, GroupedMatches } from '@/features/matches/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

export function FixturesPanel() {
  const [matches, setMatches] = useState<any[]>([]);
  const [groupedMatches, setGroupedMatches] = useState<Record<string, any[]>>({});
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // Fetch competitions
        const comps = await getCompetitions();
        setCompetitions(comps);
        
        // Fetch matches
        const upcomingMatches = await getUpcomingMatches(selectedCompetition || undefined);
        console.log('Upcoming matches:', upcomingMatches);
        setMatches(upcomingMatches);
        
        // Group matches by month
        const grouped = await groupMatchesByMonth(upcomingMatches);
        setGroupedMatches(grouped);
      } catch (error) {
        console.error('Error loading fixtures data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [selectedCompetition]);

  const handleCompetitionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCompetition(value === 'all' ? null : value);
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-8">
      {/* Competition filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Upcoming Fixtures</h2>
          <div className="w-64">
            <select 
              className="w-full rounded-md border border-gray-300 p-2"
              value={selectedCompetition || 'all'}
              onChange={handleCompetitionChange}
            >
              <option value="all">All Competitions</option>
              {competitions.map((comp) => (
                <option key={comp.id} value={comp.id}>{comp.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Empty state */}
      {Object.keys(groupedMatches).length === 0 && (
        <div className="text-center p-12 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-500">No upcoming fixtures to display</p>
        </div>
      )}

      {/* Fixtures by month */}
      {Object.entries(groupedMatches).map(([month, monthMatches]) => (
        <div key={month} className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">{month}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthMatches.map((match) => {
              // Format match date
              const matchDate = match.match_date || match.matchDate;
              const formattedDate = matchDate ? format(parseISO(matchDate), 'EEEE, do MMMM yyyy') : '';
              
              // Handle different property names (snake_case vs camelCase)
              const competition = match.competition || { name: match.competition_short || match.competition_name || 'Unknown' };
              const homeTeam = match.homeTeam || {
                name: match.home_team || 'Home Team',
                logoUrl: match.home_team_logo || null
              };
              const awayTeam = match.awayTeam || {
                name: match.away_team || 'Away Team',
                logoUrl: match.away_team_logo || null
              };
              const venue = match.venue || 'TBA';
              const matchTime = match.match_time || match.matchTime;
              const ticketLink = match.ticket_link || match.ticketLink;
              
              return (
                <Card key={match.id} className="overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex justify-between items-center text-lg">
                      <span>{competition.name || competition}</span>
                      {ticketLink && (
                        <Link 
                          href={ticketLink} 
                          className="text-sm bg-primary text-white px-3 py-1 rounded-full flex items-center space-x-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Ticket className="h-4 w-4 mr-1" />
                          <span>Tickets</span>
                        </Link>
                      )}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-6">
                      {/* Teams */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full p-2 mb-2 flex items-center justify-center">
                            {homeTeam.logoUrl ? (
                              <img 
                                src={homeTeam.logoUrl} 
                                alt={homeTeam.name}
                                className="max-w-full max-h-full object-contain"
                              />
                            ) : (
                              <div className="text-xs text-gray-400">No logo</div>
                            )}
                          </div>
                          <span className="font-medium">{homeTeam.name}</span>
                        </div>
                        
                        <div className="text-2xl font-bold text-gray-400 mx-4">vs</div>
                        
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full p-2 mb-2 flex items-center justify-center">
                            {awayTeam.logoUrl ? (
                              <img 
                                src={awayTeam.logoUrl} 
                                alt={awayTeam.name}
                                className="max-w-full max-h-full object-contain"
                              />
                            ) : (
                              <div className="text-xs text-gray-400">No logo</div>
                            )}
                          </div>
                          <span className="font-medium">{awayTeam.name}</span>
                        </div>
                      </div>
                      
                      {/* Match Details */}
                      <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{formattedDate}</span>
                        </div>
                        
                        {matchTime && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{matchTime}</span>
                          </div>
                        )}
                        
                        {venue && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{venue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
