
"use client";

import React, { useState } from 'react';
import { leagueTableData } from '@/lib/fixtures-data';
import LoadingState from '../common/LoadingState';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeagueTableProps {
  selectedSeason: string;
}

interface FormIcon {
  label: string;
  color: string;
}

const getFormIcon = (result: string): FormIcon => {
  switch (result) {
    case 'W':
      return { label: 'W', color: 'bg-green-500 text-white' };
    case 'D':
      return { label: 'D', color: 'bg-yellow-500 text-white' };
    case 'L':
      return { label: 'L', color: 'bg-red-500 text-white' };
    default:
      return { label: '-', color: 'bg-gray-300 text-gray-700' };
  }
};

const LeagueTable: React.FC<LeagueTableProps> = ({ selectedSeason }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, this would fetch data based on the selected season
  // For now, we'll use the static league table data
  React.useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading data for the selected season
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [selectedSeason]);
  
  if (isLoading) {
    return <LoadingState count={1} />;
  }
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-12 text-center">Pos</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center w-12">P</TableHead>
              <TableHead className="text-center w-12">W</TableHead>
              <TableHead className="text-center w-12">D</TableHead>
              <TableHead className="text-center w-12">L</TableHead>
              <TableHead className="text-center w-12">GF</TableHead>
              <TableHead className="text-center w-12">GA</TableHead>
              <TableHead className="text-center w-12">GD</TableHead>
              <TableHead className="text-center w-12">Pts</TableHead>
              <TableHead className="text-center hidden md:table-cell">Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leagueTableData.map((team) => (
              <TableRow 
                key={team.position}
                className={`hover:bg-gray-50 ${team.team.includes("Banks o' Dee") ? "bg-blue-50" : ""}`}
              >
                <TableCell className="text-center font-medium">{team.position}</TableCell>
                <TableCell className={`font-medium ${team.team.includes("Banks o' Dee") ? "font-bold" : ""}`}>
                  {team.team}
                </TableCell>
                <TableCell className="text-center">{team.played}</TableCell>
                <TableCell className="text-center">{team.won}</TableCell>
                <TableCell className="text-center">{team.drawn}</TableCell>
                <TableCell className="text-center">{team.lost}</TableCell>
                <TableCell className="text-center">{team.goalsFor}</TableCell>
                <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                <TableCell className="text-center">{team.goalDifference}</TableCell>
                <TableCell className="text-center font-medium">{team.points}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex space-x-1 justify-center">
                    {team.form.map((result, idx) => {
                      const formIcon = getFormIcon(result);
                      return (
                        <div 
                          key={idx}
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${formIcon.color}`}
                        >
                          {formIcon.label}
                        </div>
                      );
                    })}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeagueTable;
