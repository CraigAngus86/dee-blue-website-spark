import React, { useState, useEffect } from 'react';
import { getLeagueTable, getCurrentSeason, getSeasons } from '@/features/matches/hooks/useLeagueTable';
import { LeagueStanding } from '@/features/matches/types';
import { Card } from '@/components/ui/card';

// Banks o' Dee ID for highlighting in the table
const BANKS_O_DEE_ID = '402fccd1-5b8d-4fe3-b21a-96e34e207370';

export function TablePanel() {
  const [tableData, setTableData] = useState<LeagueStanding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        // Get current season if no season is selected
        if (!selectedSeason) {
          const currentSeason = await getCurrentSeason();
          if (currentSeason) {
            setSelectedSeason(currentSeason.id);
          }
        }
        
        // Get all seasons for dropdown
        const allSeasons = await getSeasons();
        setSeasons(allSeasons);
        
        // Get league table data
        const table = await getLeagueTable(selectedSeason || undefined);
        console.log('League table data:', table);
        setTableData(table);
      } catch (err) {
        console.error('Error loading league table:', err);
        setError('Failed to load league table. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [selectedSeason]);

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(e.target.value === 'all' ? null : e.target.value);
  };

  const FormIndicator = ({ result }: { result: 'W' | 'L' | 'D' }) => {
    const bgColor = 
      result === 'W' ? 'bg-green-500' : 
      result === 'D' ? 'bg-amber-500' : 
      'bg-red-500';
    
    return (
      <div className={`w-6 h-6 ${bgColor} rounded-full flex items-center justify-center text-xs text-white font-medium`}>
        {result}
      </div>
    );
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Season selector */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">League Table</h2>
          <div className="w-64">
            <select
              className="w-full rounded-md border border-gray-300 p-2"
              value={selectedSeason || ''}
              onChange={handleSeasonChange}
            >
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Empty state */}
      {tableData.length === 0 && (
        <div className="text-center p-12 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-500">No league table data available</p>
        </div>
      )}
      
      {/* League Table - Desktop */}
      {tableData.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <div className="inline-block min-w-full">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pos</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Team</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">P</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">W</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">D</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">L</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">GF</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">GA</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">GD</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Pts</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Form</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => {
                  // Handle different property names
                  const position = row.position;
                  const teamName = row.teamName || row.team_name;
                  const teamLogo = row.teamLogo || row.team_logo;
                  const played = row.played || row.matches_played;
                  const won = row.won || row.wins;
                  const drawn = row.drawn || row.draws;
                  const lost = row.lost || row.losses;
                  const goalsFor = row.goalsFor || row.goals_for;
                  const goalsAgainst = row.goalsAgainst || row.goals_against;
                  const goalDifference = row.goalDifference || row.goal_difference;
                  const points = row.points;
                  const form = row.form || [];
                  
                  const isBoD = teamName.includes("Banks o' Dee") || row.team_id === BANKS_O_DEE_ID;
                
                  return (
                    <tr 
                      key={row.id || index} 
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } ${
                        isBoD ? 'bg-primary/5 font-medium' : ''
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{position}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          {teamLogo ? (
                            <img 
                              src={teamLogo} 
                              alt={teamName} 
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                          )}
                          {teamName}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{played}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{won}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{drawn}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{lost}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{goalsFor}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{goalsAgainst}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{goalDifference}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-center">{points}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex justify-center gap-1">
                          {Array.isArray(form) && form.slice(0, 5).map((result, i) => (
                            <FormIndicator key={i} result={result as 'W' | 'L' | 'D'} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* League Table - Mobile */}
      {tableData.length > 0 && (
        <div className="md:hidden space-y-4">
          {tableData.map((row, index) => {
            // Handle different property names
            const position = row.position;
            const teamName = row.teamName || row.team_name;
            const teamLogo = row.teamLogo || row.team_logo;
            const played = row.played || row.matches_played;
            const won = row.won || row.wins;
            const drawn = row.drawn || row.draws;
            const lost = row.lost || row.losses;
            const points = row.points;
            const form = row.form || [];
            
            const isBoD = teamName.includes("Banks o' Dee") || row.team_id === BANKS_O_DEE_ID;
            
            return (
              <Card key={row.id || index} className={isBoD ? 'bg-primary/5' : ''}>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {position}
                      </div>
                      <div className="flex items-center gap-2">
                        {teamLogo ? (
                          <img 
                            src={teamLogo} 
                            alt={teamName} 
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        )}
                        <span className="font-medium">{teamName}</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold">{points}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 text-center text-sm text-gray-600">
                    <div>
                      <div className="font-semibold">P</div>
                      <div>{played}</div>
                    </div>
                    <div>
                      <div className="font-semibold">W-D-L</div>
                      <div>{won}-{drawn}-{lost}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Form</div>
                      <div className="flex justify-center gap-1 mt-1">
                        {Array.isArray(form) && form.slice(0, 3).map((result, i) => (
                          <FormIndicator key={i} result={result as 'W' | 'L' | 'D'} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
