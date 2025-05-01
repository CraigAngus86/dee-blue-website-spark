
"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LeagueTableProps {
  leagueTable: any[];
  selectedSeason?: string;
  className?: string;
}

const LeagueTable: React.FC<LeagueTableProps> = ({ 
  leagueTable, 
  selectedSeason = "2023/24",
  className 
}) => {
  // Team highlighting
  const isHomeTeam = (teamName: string) => {
    return teamName.includes("Banks o") || teamName.includes("Banks O") || teamName.includes("Banks o'");
  };

  return (
    <div className={cn("overflow-x-auto", className)}>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Highland Football League {selectedSeason}</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-200 text-gray-600">
            <th className="px-2 py-3 text-left">Pos</th>
            <th className="px-2 py-3 text-left">Team</th>
            <th className="px-2 py-3 text-center">P</th>
            <th className="px-2 py-3 text-center">W</th>
            <th className="px-2 py-3 text-center">D</th>
            <th className="px-2 py-3 text-center">L</th>
            <th className="px-2 py-3 text-center">GF</th>
            <th className="px-2 py-3 text-center">GA</th>
            <th className="px-2 py-3 text-center">GD</th>
            <th className="px-2 py-3 text-center">Pts</th>
            <th className="px-2 py-3 text-center">Form</th>
          </tr>
        </thead>
        <tbody>
          {leagueTable && leagueTable.length > 0 ? (
            leagueTable.map((team) => (
              <tr
                key={team.id}
                className={cn(
                  "border-b border-gray-200 hover:bg-gray-50 transition-colors",
                  isHomeTeam(team.team_name) ? "bg-primary-50" : ""
                )}
              >
                <td className="px-2 py-3 font-medium">{team.position}</td>
                <td className="px-2 py-3">
                  <div className="flex items-center space-x-2">
                    {team.team_logo && (
                      <div className="w-6 h-6 relative">
                        <Image 
                          src={team.team_logo} 
                          alt={team.team_name}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className={cn("text-sm font-medium", isHomeTeam(team.team_name) ? "text-primary font-semibold" : "")}>
                      {team.team_name}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-3 text-center">{team.matches_played}</td>
                <td className="px-2 py-3 text-center">{team.wins}</td>
                <td className="px-2 py-3 text-center">{team.draws}</td>
                <td className="px-2 py-3 text-center">{team.losses}</td>
                <td className="px-2 py-3 text-center">{team.goals_for}</td>
                <td className="px-2 py-3 text-center">{team.goals_against}</td>
                <td className="px-2 py-3 text-center">{team.goal_difference}</td>
                <td className="px-2 py-3 text-center font-bold">{team.points}</td>
                <td className="px-2 py-3">
                  <div className="flex justify-center space-x-1">
                    {team.form && team.form.map((result: string, idx: number) => (
                      <span
                        key={idx}
                        className={cn(
                          "w-5 h-5 flex items-center justify-center text-xs text-white font-medium rounded-full",
                          result === "W" ? "bg-green-500" : 
                          result === "D" ? "bg-yellow-500" : 
                          "bg-red-500"
                        )}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11} className="px-2 py-8 text-center text-gray-500">
                No league data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
