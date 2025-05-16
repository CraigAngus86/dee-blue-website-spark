import React, { useState, useEffect } from 'react';
import { getLatestResults, groupMatchesByMonth } from '@/features/matches/hooks/useMatchesData';
import { getCompetitions } from '@/features/matches/hooks/useMatchesData';
import { Competition } from '@/features/matches/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

export function ResultsPanel() {
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
        
        // Fetch results
        const results = await getLatestResults(selectedCompetition || undefined);
        console.log('Latest results:', results);
        setMatches(results);
        
        // Group results by month
        const grouped = await groupMatchesByMonth(results);
        setGroupedMatches(grouped);
      } catch (error) {
        console.error('Error loading results data:', error);
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
          <h2 className="text-xl font-bold">Recent Results</h2>
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
          <p className="text-gray-500">No results to display</p>
        </div>
      )}

      {/* Results by month */}
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
              const homeScore = match.home_score || match.homeScore || 0;
              const awayScore = match.away_score || match.awayScore || 0;
              const matchReportLink = match.match_report_link || match.matchReportLink;
              
              return (
                <Card key={match.id} className="overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex justify-between items-center text-lg">
                      <span>{competition.name || competition}</span>
                      <span className="text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                        Final Result
                      </span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-6">
                      {/* Teams and Score */}
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
                        
                        <div className="text-2xl font-bold mx-4">
                          {homeScore} - {awayScore}
                        </div>
                        
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
                        
                        {venue && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{venue}</span>
                          </div>
                        )}
                        
                        {matchReportLink && (
                          <div className="flex justify-end gap-2 mt-2">
                            <Link href={matchReportLink} className="text-sm text-primary hover:underline">
                              Match Report
                            </Link>
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
