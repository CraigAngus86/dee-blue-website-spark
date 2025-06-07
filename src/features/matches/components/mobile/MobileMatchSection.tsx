"use client";
import React from 'react';
import Link from 'next/link';
import { MobileMatchCard } from './MobileMatchCard';
import { MobileLeagueTable } from './MobileLeagueTable';

interface MatchInfo {
  id: string;
  match_date: string;
  match_time?: string;
  venue: string;
  status: string;
  home_team_name: string;
  away_team_name: string;
  home_team_logo?: string;
  away_team_logo?: string;
  home_score?: number;
  away_score?: number;
  competition: {
    id: string;
    name: string;
    short_name?: string;
  };
  ticket_link?: string;
  match_report_link?: string;
  gallery_link?: string;
}

interface MobileMatchSectionProps {
  recentMatches: MatchInfo[];
  upcomingMatches: MatchInfo[];
  leagueData?: {
    position: number;
    points: number;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    form: ('W' | 'L' | 'D')[];
  };
  leagueTable?: any[];
  onGalleryClick?: (galleryId: string) => void;
  onReportClick?: (reportId: string) => void;
  onTicketClick?: (ticketUrl: string) => void;
}

export function MobileMatchSection({ 
  recentMatches = [], 
  upcomingMatches = [], 
  leagueData,
  leagueTable = [],
  onGalleryClick,
  onReportClick,
  onTicketClick
}: MobileMatchSectionProps) {
  
  // Get the last result (most recent completed match)
  let lastResult = null;
  try {
    if (Array.isArray(recentMatches) && recentMatches.length > 0) {
      lastResult = recentMatches.find(match => 
        match && 
        typeof match === 'object' &&
        (match.status === 'completed' || match.home_score !== undefined)
      );
    }
  } catch (error) {
    console.error('Error finding last result:', error);
    lastResult = null;
  }

  // Get upcoming matches - first is "next", second is "upcoming"
  let nextMatch = null;
  let upcomingMatch = null;
  try {
    if (Array.isArray(upcomingMatches) && upcomingMatches.length > 0) {
      const filteredUpcoming = upcomingMatches.filter(match => 
        match && 
        typeof match === 'object' &&
        match.status !== 'completed' && 
        match.home_score === undefined
      );
      
      nextMatch = filteredUpcoming[0] || null;
      upcomingMatch = filteredUpcoming[1] || null;
    }
  } catch (error) {
    console.error('Error finding upcoming matches:', error);
    nextMatch = null;
    upcomingMatch = null;
  }

  return (
    <div className="w-full space-y-6">
      {/* Match Cards Section */}
      <div className="space-y-4">
        {/* 1. Last Result Card */}
        {lastResult ? (
          <div>
            <MobileMatchCard
              match={lastResult}
              matchType="LAST RESULT"
              onGalleryClick={onGalleryClick}
              onReportClick={onReportClick}
              onTicketClick={onTicketClick}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-[#e5e7eb]">
            <div className="text-center text-[#6b7280]">
              <p className="text-sm">No recent results to display</p>
            </div>
          </div>
        )}

        {/* 2. Next Match Card */}
        {nextMatch ? (
          <div>
            <MobileMatchCard
              match={nextMatch}
              matchType="NEXT MATCH"
              onGalleryClick={onGalleryClick}
              onReportClick={onReportClick}
              onTicketClick={onTicketClick}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-[#e5e7eb]">
            <div className="text-center text-[#6b7280]">
              <p className="text-sm">No next match to display</p>
            </div>
          </div>
        )}

        {/* 3. Upcoming Match Card */}
        {upcomingMatch ? (
          <div>
            <MobileMatchCard
              match={upcomingMatch}
              matchType="UPCOMING MATCH"
              onGalleryClick={onGalleryClick}
              onReportClick={onReportClick}
              onTicketClick={onTicketClick}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-[#e5e7eb]">
            <div className="text-center text-[#6b7280]">
              <p className="text-sm">No additional upcoming matches</p>
            </div>
          </div>
        )}

        {/* 4. View All Matches Link */}
        <div className="text-center pt-2">
          <Link 
            href="/matches" 
            className="text-[#00105A] hover:text-[#FFD700] transition-colors font-medium"
          >
            View All Matches →
          </Link>
        </div>
      </div>

      {/* League Table Section */}
      <div>
        <MobileLeagueTable 
          leagueTable={leagueTable}
          banksODeePosition={leagueData?.position || 0}
        />
      </div>
    </div>
  );
}
