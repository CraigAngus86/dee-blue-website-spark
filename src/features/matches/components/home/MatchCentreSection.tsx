"use client";

import React from 'react';
import { MatchCarousel } from './MatchCarousel';
import Link from 'next/link';

interface MatchInfo {
  id: string;
  match_date: string;
  match_time?: string;
  venue: string;
  status: string;
  home_team_name: string;
  away_team_name: string;
  home_team_logo: string;
  away_team_logo: string;
  home_score?: number;
  away_score?: number;
  competition: {
    id: string;
    name: string;
    short_name?: string;
  };
  ticket_link?: string;
  match_report_link?: string;
}

interface LeagueTableData {
  position: number;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  form: ('W' | 'L' | 'D')[];
}

interface MatchCentreSectionProps {
  recentMatches: MatchInfo[];
  upcomingMatches: MatchInfo[];
  leagueData?: LeagueTableData;
}

export function MatchCentreSection({ recentMatches, upcomingMatches, leagueData }: MatchCentreSectionProps) {
  return (
    <div className="w-full bg-gray-100 py-8 px-4 md:px-6 rounded-lg">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#00105A]">Match Centre</h2>
        <Link href="/fixtures" className="text-[#00105A] hover:text-[#FFD700] font-medium text-sm flex items-center">
          View All Matches <span className="ml-1">›</span>
        </Link>
      </div>
      
      <MatchCarousel recentMatches={recentMatches} upcomingMatches={upcomingMatches} />
      
      {leagueData && (
        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#00105A]">Highland League Table</h2>
            <Link href="/table" className="text-[#00105A] hover:text-[#FFD700] font-medium text-sm flex items-center">
              View Full Table <span className="ml-1">›</span>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-[#00105A] text-white font-bold h-12 w-12 rounded-full flex items-center justify-center text-xl">
                  {leagueData.position}
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-[#00105A]">Banks o' Dee</h3>
                <div className="grid grid-cols-5 gap-4 mt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00105A]">{leagueData.points}</div>
                    <div className="text-xs text-gray-500">POINTS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00105A]">{leagueData.won}</div>
                    <div className="text-xs text-gray-500">WON</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00105A]">{leagueData.drawn}</div>
                    <div className="text-xs text-gray-500">DRAWN</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00105A]">{leagueData.lost}</div>
                    <div className="text-xs text-gray-500">LOST</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">FORM</div>
                    <div className="flex space-x-1">
                      {leagueData.form.map((result, i) => (
                        <div 
                          key={i} 
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white 
                            ${result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-amber-500' : 'bg-red-500'}`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
