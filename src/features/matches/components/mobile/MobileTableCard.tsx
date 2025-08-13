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

export function MobileTableCard({ tableData = [] }: MobileTableCardProps) {
  if (tableData.length === 0) {
    return (
      <div className="w-full">
        <div className="bg-[rgb(var(--white))] rounded-lg shadow-sm p-4 border border-[rgb(var(--medium-gray))]">
          <div className="text-center text-[rgb(var(--dark-gray))]">
            <p className="text-sm">League table not available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile League Table */}
      <div className="bg-[rgb(var(--white))] rounded-lg shadow-sm border border-[rgb(var(--medium-gray))] overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center bg-[rgb(var(--brand-black))] text-[rgb(var(--white))] p-3">
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

        {/* Table Data with position-based colouring */}
        {tableData.map((team, index) => {
          const name = team.team_name || '';
          const isBaynounah = name.toLowerCase().includes('baynounah');

          // Promotion (1 & 2), Demotion (14 & 15)
          const isPromotion = team.position === 1 || team.position === 2;
          const isDemotion = team.position === 14 || team.position === 15;

          // Row background priority:
          // 1) Baynounah highlighted (warm gray)
          // 2) Promotion (green tint)
          // 3) Demotion (red tint)
          // 4) Default white
          let rowBg = 'bg-[rgb(var(--white))]';
          if (isBaynounah) rowBg = 'bg-[rgb(var(--warm-gray))]';
          else if (isPromotion) rowBg = 'bg-green-50';
          else if (isDemotion) rowBg = 'bg-red-50';

          return (
            <div
              key={team.position}
              className={`flex items-center p-3 ${
                index !== tableData.length - 1 ? 'border-b border-[rgb(var(--medium-gray))]' : ''
              } ${rowBg}`}
            >
              {/* Position */}
              <div className="flex-shrink-0 w-8 text-center">
                <span
                  className={`text-sm font-bold ${
                    isBaynounah ? 'text-[rgb(var(--brand-black))]' : 'text-[rgb(var(--dark-gray))]'
                  }`}
                >
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
                <span
                  className={`text-sm font-medium truncate ${
                    isBaynounah ? 'text-[rgb(var(--brand-black))]' : 'text-[rgb(var(--brand-black))]'
                  }`}
                >
                  {team.team_short_name || team.team_name}
                </span>
              </div>

              {/* Played */}
              <div className="flex-shrink-0 w-8 text-center">
                <span
                  className={`text-sm font-medium ${
                    isBaynounah ? 'text-[rgb(var(--brand-black))]' : 'text-[rgb(var(--dark-gray))]'
                  }`}
                >
                  {team.matches_played}
                </span>
              </div>

              {/* Points */}
              <div className="flex-shrink-0 w-12 text-center">
                <span
                  className={`text-sm font-bold ${
                    isBaynounah ? 'text-[rgb(var(--brand-black))]' : 'text-[rgb(var(--dark-gray))]'
                  }`}
                >
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
