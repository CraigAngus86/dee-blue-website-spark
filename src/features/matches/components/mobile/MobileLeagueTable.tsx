"use client";
import React from 'react';
import Link from 'next/link';
import { TeamLogo } from '../common/TeamLogo';

interface LeagueTableTeam {
  position: number;
  team_name: string;
  team_logo?: string;
  points: number;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  form?: ('W' | 'D' | 'L')[];
}

interface MobileLeagueTableProps {
  leagueTable: LeagueTableTeam[];
  banksODeePosition: number;
}

export function MobileLeagueTable({ 
  leagueTable = [], 
  banksODeePosition 
}: MobileLeagueTableProps) {
  
  // Get the 3 teams to display (BOD ± 1)
  const getDisplayTeams = (): LeagueTableTeam[] => {
    if (!leagueTable || leagueTable.length === 0 || !banksODeePosition) {
      return [];
    }

    let startPosition: number;
    let endPosition: number;

    if (banksODeePosition === 1) {
      // If BOD is 1st, show positions 1, 2, 3
      startPosition = 1;
      endPosition = 3;
    } else if (banksODeePosition >= leagueTable.length) {
      // If BOD is last, show last 3
      startPosition = Math.max(1, leagueTable.length - 2);
      endPosition = leagueTable.length;
    } else {
      // Normal case: BOD ± 1
      startPosition = banksODeePosition - 1;
      endPosition = banksODeePosition + 1;
    }

    return leagueTable
      .filter(team => team.position >= startPosition && team.position <= endPosition)
      .sort((a, b) => a.position - b.position);
  };

  const displayTeams = getDisplayTeams();

  if (displayTeams.length === 0) {
    return (
      <div className="w-full">
        <div className="mb-4 flex items-center">
          <div className="w-1.5 h-10 bg-[#00105A] mr-3"></div>
          <h3 className="text-lg font-bold text-[#00105A]">Highland League Table</h3>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-[#e5e7eb]">
          <div className="text-center text-[#6b7280]">
            <p className="text-sm">League table not available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* League Header */}
      <div className="mb-4 flex items-center">
        <div className="w-1.5 h-10 bg-[#00105A] mr-3"></div>
        <h3 className="text-lg font-bold text-[#00105A]">Highland League Table</h3>
      </div>
      
      {/* Mobile League Table */}
      <div className="bg-white rounded-lg shadow-sm border border-[#e5e7eb] overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center bg-[#00105A] text-white p-3">
          {/* POS */}
          <div className="flex-shrink-0 w-8 text-center">
            <span className="text-xs font-bold uppercase">POS</span>
          </div>
          
          {/* TEAM */}
          <div className="flex-1 mx-3">
            <span className="text-xs font-bold uppercase">TEAM</span>
          </div>
          
          {/* P (Played) */}
          <div className="flex-shrink-0 w-8 text-center">
            <span className="text-xs font-bold uppercase">P</span>
          </div>
          
          {/* PTS */}
          <div className="flex-shrink-0 w-12 text-center">
            <span className="text-xs font-bold uppercase">PTS</span>
          </div>
        </div>

        {/* Table Data */}
        {displayTeams.map((team, index) => {
          const isBanksODee = team.team_name?.toLowerCase().includes("banks o' dee");
          
          return (
            <div 
              key={team.position}
              className={`flex items-center p-3 ${
                index !== displayTeams.length - 1 ? 'border-b border-[#e5e7eb]' : ''
              } ${
                isBanksODee ? 'bg-[#f0f7ff]' : 'bg-white'
              }`}
            >
              {/* Position */}
              <div className="flex-shrink-0 w-8 text-center">
                <span className={`text-sm font-bold ${
                  isBanksODee ? 'text-[#00105A]' : 'text-[#6b7280]'
                }`}>
                  {team.position}
                </span>
              </div>
              
              {/* Logo + Team Name */}
              <div className="flex items-center flex-1 mx-3">
                <div className="flex-shrink-0 mr-2">
                  <TeamLogo 
                    logoUrl={team.team_logo} 
                    teamName={team.team_name}
                    size="sm"
                  />
                </div>
                <span className={`text-sm font-medium truncate ${
                  isBanksODee ? 'text-[#00105A]' : 'text-[#374151]'
                }`}>
                  {team.team_name}
                </span>
              </div>
              
              {/* Played */}
              <div className="flex-shrink-0 w-8 text-center">
                <span className={`text-sm font-medium ${
                  isBanksODee ? 'text-[#00105A]' : 'text-[#6b7280]'
                }`}>
                  {team.matches_played}
                </span>
              </div>
              
              {/* Points */}
              <div className="flex-shrink-0 w-12 text-center">
                <span className={`text-sm font-bold ${
                  isBanksODee ? 'text-[#00105A]' : 'text-[#6b7280]'
                }`}>
                  {team.points}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Full Table Link */}
      <div className="text-center pt-4">
        <Link 
          href="/matches?tab=table" 
          className="text-[#00105A] hover:text-[#FFD700] transition-colors font-medium"
        >
          View Full Table →
        </Link>
      </div>
    </div>
  );
}
