"use client";
import React from 'react';
import { TeamLogo } from '../common/TeamLogo';

interface LeagueTableTeam {
  position: number;
  team_name: string;
  team_short_name: string;
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

interface MobileTableCardProps {
  tableData: LeagueTableTeam[];
}

export function MobileTableCard({ 
  tableData = []
}: MobileTableCardProps) {
  
  if (tableData.length === 0) {
    return (
      <div className="w-full">
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
      {/* Mobile League Table - Same design as MobileLeagueTable but all teams */}
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
        
        {/* Table Data - All Teams with Position-Based Coloring */}
        {tableData.map((team, index) => {
          const isBanksODee = team.team_name?.toLowerCase().includes("banks o' dee");
          const isFirstPosition = team.position === 1;
          const isLastPosition = team.position === tableData.length;
          
          // UPDATED: Standardized position-based coloring (same as desktop)
          let rowBg = '';
          if (isBanksODee) {
            rowBg = 'bg-[#f0f7ff]'; // Light blue for Banks o' Dee
          } else if (isFirstPosition) {
            rowBg = 'bg-[#f0fdf4]'; // Green for 1st position
          } else if (isLastPosition) {
            rowBg = 'bg-[#fef2f2]'; // Red for 18th position
          } else {
            rowBg = 'bg-white'; // White for all others
          }
          
          return (
            <div 
              key={team.position}
              className={`flex items-center p-3 ${
                index !== tableData.length - 1 ? 'border-b border-[#e5e7eb]' : ''
              } ${rowBg}`}
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
                    teamName={team.team_short_name || team.team_name}
                    size="sm"
                  />
                </div>
                <span className={`text-sm font-medium truncate ${
                  isBanksODee ? 'text-[#00105A]' : 'text-[#374151]'
                }`}>
                  {team.team_short_name || team.team_name}
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
    </div>
  );
}
