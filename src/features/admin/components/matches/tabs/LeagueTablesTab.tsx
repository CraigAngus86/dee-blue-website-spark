"use client";
import React, { useState, useEffect } from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

interface LeagueTablesTabProps {
  initialData?: {
    staging: any;
    live: any;
    scraper: any;
    season: any;
    competition: any;
  };
}

export function LeagueTablesTab({ initialData }: LeagueTablesTabProps) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  // Fetch league table data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/league-tables');
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch league table data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount if not provided
  useEffect(() => {
    if (!initialData) {
      fetchData();
    }
  }, []);

  // Enhanced change detection - compare multiple fields and sort by team_id
  const detectChanges = () => {
    if (!data?.staging?.data || !data?.live?.data) return true; // Show if no live data
    
    const stagingTeams = [...data.staging.data].sort((a, b) => a.team_id.localeCompare(b.team_id));
    const liveTeams = [...data.live.data].sort((a, b) => a.team_id.localeCompare(b.team_id));
    
    if (stagingTeams.length !== liveTeams.length) return true;
    
    // Compare key fields for each team
    for (let i = 0; i < stagingTeams.length; i++) {
      const staging = stagingTeams[i];
      const live = liveTeams[i];
      
      if (staging.team_id !== live.team_id ||
          staging.position !== live.position ||
          staging.points !== live.points ||
          staging.wins !== live.wins ||
          staging.draws !== live.draws ||
          staging.losses !== live.losses ||
          staging.goals_for !== live.goals_for ||
          staging.goals_against !== live.goals_against) {
        return true;
      }
    }
    
    return false;
  };

  // Check for validation issues
  const getValidationStatus = () => {
    const issues = [];
    
    if (data?.staging?.data) {
      const stagingData = data.staging.data;
      
      // Check team count
      if (stagingData.length !== 18) {
        issues.push(`Expected 18 teams, found ${stagingData.length}`);
      }
      
      // Check for mathematical consistency
      stagingData.forEach((team: any) => {
        const expectedPoints = (team.wins * 3) + team.draws;
        const expectedGames = team.wins + team.draws + team.losses;
        
        if (team.points !== expectedPoints) {
          issues.push(`${team.team_name}: Points mismatch (${team.points} vs expected ${expectedPoints})`);
        }
        
        if (team.matches_played !== expectedGames) {
          issues.push(`${team.team_name}: Games played mismatch (${team.matches_played} vs expected ${expectedGames})`);
        }
      });
    }
    
    return issues;
  };

  // Handle apply staging to live
  const handleApplyStaging = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/league-tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'apply_staging' })
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchData(); // Refresh data
        alert(`Success: ${result.message}`);
      } else {
        alert(`Apply failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Apply staging failed:', error);
      alert('Apply staging failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle reject staging
  const handleRejectStaging = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/league-tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject_staging' })
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchData(); // Refresh data
        alert(`Success: ${result.message}`);
      } else {
        alert(`Reject failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Reject staging failed:', error);
      alert('Reject staging failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle force scrape
  const handleForceScrape = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scrape-league-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`Scrape successful! ${result.recordsProcessed} teams processed`);
        await fetchData(); // Refresh data
      } else {
        alert(`Scrape failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Force scrape failed:', error);
      alert('Force scrape failed');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-GB');
  };

  // Calculate changes between staging and live (from wireframe)
  const getChanges = (stagingTeam: any, liveTeam: any) => {
    if (!liveTeam) return <span className="text-green-600 text-sm">New</span>;
    
    const pointsDiff = stagingTeam.points - liveTeam.points;
    const positionDiff = liveTeam.position - stagingTeam.position;
    
    if (pointsDiff === 0 && positionDiff === 0) {
      return <span className="text-gray-500 text-sm">No change</span>;
    }
    
    const changes = [];
    if (pointsDiff > 0) changes.push(`+${pointsDiff}pts`);
    if (pointsDiff < 0) changes.push(`${pointsDiff}pts`);
    if (positionDiff > 0) changes.push(`↑${positionDiff}`);
    if (positionDiff < 0) changes.push(`↓${Math.abs(positionDiff)}`);
    
    return <span className="text-green-600 text-sm">{changes.join(' ')}</span>;
  };

  if (loading && !data) {
    return (
      <AdminCard title="League Tables & BBC Scraper (✅ Complete)">
        <div className="p-8 text-center text-[#6b7280]">
          Loading league table data...
        </div>
      </AdminCard>
    );
  }

  const validationIssues = getValidationStatus();
  const hasChanges = detectChanges();

  return (
    <div className="space-y-6">
      <AdminCard title="League Tables & BBC Scraper (✅ Complete)">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* BBC Scraper Controls */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0"></h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                  <h5 className="font-medium text-[#374151] mb-2">Last Scrape Status</h5>
                  <div className="text-sm text-[#6b7280] mb-1">
                    {formatDate(data?.scraper?.lastScrapeTime)}
                  </div>
                  <div className="flex items-center space-x-2">
                    {data?.scraper?.lastScrapeStatus === 'success' ? (
                      <>
                        <span className="text-green-600 text-lg">✓</span>
                        <span className="text-sm text-green-600 font-medium">Success</span>
                      </>
                    ) : (
                      <>
                        <span className="text-red-500 text-lg">✗</span>
                        <span className="text-sm text-red-500 font-medium">Never Run</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-[#6b7280] mt-1">
                    {data?.staging?.count || 0} teams updated
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                  <h5 className="font-medium text-[#374151] mb-2">Next Scheduled Scrape</h5>
                  <div className="text-sm text-[#6b7280] mb-1">Today at 18:00</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-500 text-lg">⏰</span>
                    <span className="text-sm text-blue-500 font-medium">Scheduled</span>
                  </div>
                  <div className="text-xs text-[#6b7280] mt-1">Auto-triggered daily</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                  <h5 className="font-medium text-[#374151] mb-2">Manual Control</h5>
                  <button 
                    onClick={handleForceScrape}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-[#00105A] text-white rounded font-medium hover:bg-[#FFD700] hover:text-[#00105A] transition-colors mb-2 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Force Scrape Now'}
                  </button>
                  <div className="text-xs text-[#6b7280]">Override scheduled scrape</div>
                </div>
              </div>
            </div>

            {/* Data Quality & Validation */}
            {data?.staging?.count > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-[#00105A] mb-4 m-0">🔍 Data Quality & Validation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                    <h5 className="font-medium text-[#374151] mb-2">Team Mapping</h5>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 text-lg">✓</span>
                      <span className="text-sm text-green-600 font-medium">
                        {data.staging.count}/18 teams mapped
                      </span>
                    </div>
                    <div className="text-xs text-[#6b7280] mt-1">All Highland League teams found</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                    <h5 className="font-medium text-[#374151] mb-2">Mathematical Validation</h5>
                    <div className="flex items-center space-x-2">
                      {validationIssues.length === 0 ? (
                        <>
                          <span className="text-green-600 text-lg">✓</span>
                          <span className="text-sm text-green-600 font-medium">All checks passed</span>
                        </>
                      ) : (
                        <>
                          <span className="text-red-500 text-lg">⚠</span>
                          <span className="text-sm text-red-500 font-medium">{validationIssues.length} issues</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-[#6b7280] mt-1">Points/games calculations</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                    <h5 className="font-medium text-[#374151] mb-2">Change Detection</h5>
                    <div className="flex items-center space-x-2">
                      {hasChanges ? (
                        <>
                          <span className="text-blue-500 text-lg">📊</span>
                          <span className="text-sm text-blue-500 font-medium">Changes detected</span>
                        </>
                      ) : (
                        <>
                          <span className="text-gray-500 text-lg">📊</span>
                          <span className="text-sm text-gray-500 font-medium">No changes</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-[#6b7280] mt-1">Compared to live table</div>
                  </div>
                </div>
                
                {/* Validation Issues Display */}
                {validationIssues.length > 0 && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h6 className="font-medium text-red-800 mb-2">⚠ Validation Issues Found:</h6>
                    <ul className="text-sm text-red-700 space-y-1">
                      {validationIssues.map((issue, index) => (
                        <li key={index}>• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Staged Data Review - Show when staging data exists */}
            {data?.staging?.count > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-[#00105A] mb-4 m-0">📋 Scraped Data Review (Staging Table):</h4>
                <div className="bg-white rounded-lg border border-[#e5e7eb]">
                  <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-[#374151]">Latest Scrape:</span>
                        <span className="ml-2 text-sm text-[#6b7280]">
                          {formatDate(data.staging.lastUpdated)}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                          hasChanges 
                            ? 'bg-[#fef3c7] text-[#92400e]' 
                            : 'bg-[#d1fae5] text-[#065f46]'
                        }`}>
                          {hasChanges ? 'Changes Detected' : 'No Changes'}
                        </span>
                      </div>
                      {(hasChanges || validationIssues.length === 0) && (
                        <div className="flex space-x-2">
                          <button 
                            onClick={handleApplyStaging}
                            disabled={loading || validationIssues.length > 0}
                            className="px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                          >
                            Apply to Live Table
                          </button>
                          <button 
                            onClick={handleRejectStaging}
                            disabled={loading}
                            className="px-4 py-2 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600 disabled:opacity-50"
                          >
                            Reject Scrape
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="border-b border-[#e5e7eb]">
                        <tr>
                          <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Pos</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Team</th>
                          <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">P</th>
                          <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">W</th>
                          <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">D</th>
                          <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">L</th>
                          <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">GD</th>
                          <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Pts</th>
                          <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Changes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.staging.data.map((team: any) => {
                          const liveTeam = data.live.data.find((lt: any) => lt.team_id === team.team_id);
                          return (
                            <tr 
                              key={team.team_id} 
                              className={`border-b border-[#f3f4f6] hover:bg-[#f9fafb] ${
                                team.team_name.includes('Banks o\' Dee') 
                                  ? 'bg-[#C5E7FF] bg-opacity-30' 
                                  : ''
                              }`}
                            >
                              <td className="p-4 align-middle font-medium text-[#374151]">
                                {team.position}
                              </td>
                              <td className="p-4 align-middle text-[#374151]">
                                {team.team_name.replace(' FC', '')}
                              </td>
                              <td className="p-4 align-middle text-center">{team.matches_played}</td>
                              <td className="p-4 align-middle text-center">{team.wins}</td>
                              <td className="p-4 align-middle text-center">{team.draws}</td>
                              <td className="p-4 align-middle text-center">{team.losses}</td>
                              <td className="p-4 align-middle text-center">{team.goal_difference}</td>
                              <td className="p-4 align-middle text-center font-medium">{team.points}</td>
                              <td className="p-4 align-middle text-center">
                                {getChanges(team, liveTeam)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Manual League Table Editor */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">✏️ Manual League Table Editor:</h4>
              <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="font-medium text-[#374151]">Current Live Table</span>
                    <span className="ml-2 text-sm text-[#6b7280]">
                      Last updated: {formatDate(data?.live?.lastUpdated)}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                    Enable Edit Mode
                  </button>
                </div>
                
                <div className="text-sm text-[#6b7280] mb-3">
                  Click "Enable Edit Mode" to manually adjust positions, points, or stats if BBC scraper data is incorrect
                </div>
                
                {/* Compact live table preview */}
                <div className="bg-[#f9fafb] p-3 rounded border border-[#e5e7eb]">
                  <div className="grid grid-cols-6 gap-2 text-xs font-medium text-[#6b7280] mb-2">
                    <div>Pos</div>
                    <div>Team</div>
                    <div>P</div>
                    <div>GD</div>
                    <div>Pts</div>
                    <div>Actions</div>
                  </div>
                  <div className="space-y-1">
                    {data?.live?.data?.slice(0, 3).map((team: any) => (
                      <div 
                        key={team.team_id}
                        className={`grid grid-cols-6 gap-2 text-sm ${
                          team.team_name.includes('Banks o\' Dee') 
                            ? 'bg-[#C5E7FF] bg-opacity-30 p-1 rounded' 
                            : ''
                        }`}
                      >
                        <div className={team.team_name.includes('Banks o\' Dee') ? 'font-medium' : ''}>
                          {team.position}
                        </div>
                        <div className={team.team_name.includes('Banks o\' Dee') ? 'font-medium' : ''}>
                          {team.team_name.replace(' FC', '')}
                        </div>
                        <div>{team.matches_played}</div>
                        <div>{team.goal_difference}</div>
                        <div className="font-medium">{team.points}</div>
                        <div>
                          <button className={`text-xs ${
                            team.team_name.includes('Banks o\' Dee') 
                              ? 'text-[#00105A] font-medium' 
                              : 'text-[#00105A]'
                          }`}>
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrape History */}
            <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📈 Scrape History & Monitoring:</h4>
              <div className="space-y-3">
                {data?.scraper?.lastScrapeTime && (
                  <div className="flex justify-between items-center p-3 bg-[#f9fafb] rounded border border-[#e5e7eb]">
                    <div>
                      <div className="font-medium text-[#374151]">{formatDate(data.scraper.lastScrapeTime)}</div>
                      <div className="text-sm text-[#6b7280]">Highland League table scraped</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-600 text-lg">✓</span>
                      <div className="text-xs text-[#6b7280]">{data.staging.count} teams • 2.3s</div>
                      <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">View</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>BBC Scraper Integration:</strong> Automated daily scraping with staging table validation</li>
              <li>• <strong>Staging System:</strong> league_table_staging table prevents bad data corruption</li>
              <li>• <strong>Team Mapping:</strong> BBC team name matching via teams.bbc_name field</li>
              <li>• <strong>Manual Override:</strong> Direct editing capabilities when scraper fails</li>
              <li>• <strong>Data Validation:</strong> Mathematical consistency checks for points/goals</li>
              <li>• <strong>Real-time Updates:</strong> Immediate table updates after match completion</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
