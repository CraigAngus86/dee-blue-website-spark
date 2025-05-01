
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface LeagueTableProps {
  data: any[]; // Main table data
  selectedSeason: string;
}

/**
 * League table component to display standings
 * This is a client component as it includes interactive elements
 */
const LeagueTable: React.FC<LeagueTableProps> = ({ data, selectedSeason }) => {
  return (
    <div className="overflow-x-auto">
      <h3 className="font-semibold text-lg mb-3">{selectedSeason} League Table</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Pos</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-center w-12">P</TableHead>
            <TableHead className="text-center w-12">W</TableHead>
            <TableHead className="text-center w-12">D</TableHead>
            <TableHead className="text-center w-12">L</TableHead>
            <TableHead className="text-center w-12">GF</TableHead>
            <TableHead className="text-center w-12">GA</TableHead>
            <TableHead className="text-center w-12">GD</TableHead>
            <TableHead className="text-center w-12">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((team, index) => (
            <TableRow key={team.id || index} className={team.name === "Banks o' Dee" ? "font-bold bg-blue-50" : ""}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell className="text-center">{team.played}</TableCell>
              <TableCell className="text-center">{team.won}</TableCell>
              <TableCell className="text-center">{team.drawn}</TableCell>
              <TableCell className="text-center">{team.lost}</TableCell>
              <TableCell className="text-center">{team.goalsFor}</TableCell>
              <TableCell className="text-center">{team.goalsAgainst}</TableCell>
              <TableCell className="text-center">{team.goalDifference}</TableCell>
              <TableCell className="text-center font-bold">{team.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeagueTable;
