
import React from 'react';

interface LeagueTableEntry {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface LeagueTableProps {
  tableData: any[];
  selectedSeason?: string;
  className?: string;
}

export const LeagueTable: React.FC<LeagueTableProps> = ({ 
  tableData, 
  selectedSeason = "2023/24", 
  className = "" 
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
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
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-3 whitespace-nowrap text-sm">{row.position}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{row.team_name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.matches_played}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.wins}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.draws}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.losses}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.goals_for}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.goals_against}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.goal_difference}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-center">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
