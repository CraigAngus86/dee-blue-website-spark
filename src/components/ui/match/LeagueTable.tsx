
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
  selectedSeason: string;
  data: LeagueTableEntry[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({ selectedSeason, data }) => {
  return (
    <div className="overflow-x-auto">
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
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-3 whitespace-nowrap text-sm">{row.position}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{row.team}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.played}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.won}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.drawn}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.lost}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.goalsFor}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.goalsAgainst}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{row.goalDifference}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-center">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
