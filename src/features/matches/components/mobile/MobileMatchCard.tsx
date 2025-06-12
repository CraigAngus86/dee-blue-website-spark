"use client";
import React from 'react';
import { Calendar, MapPin, Camera, FileText, Ticket } from 'lucide-react';
import { TeamLogo } from '../common/TeamLogo';

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

interface MobileMatchCardProps {
  match: MatchInfo;
  matchType: 'LAST RESULT' | 'NEXT MATCH' | 'UPCOMING MATCH';
  onGalleryClick?: (galleryId: string) => void;
  onReportClick?: (reportId: string) => void;
  onTicketClick?: (ticketUrl: string) => void;
}

export function MobileMatchCard({ 
  match, 
  matchType,
  onGalleryClick,
  onReportClick,
  onTicketClick
}: MobileMatchCardProps) {
  const isNextMatch = matchType === 'NEXT MATCH';
  const isLastResult = matchType === 'LAST RESULT';
  const isUpcoming = matchType === 'UPCOMING MATCH' || matchType === 'NEXT MATCH';
  
  // Competition handling with fallbacks
  const competitionName = 
    match.competition?.name || 
    (typeof match.competition === 'string' ? match.competition : 'Scottish Highland Football League');
  
  // Format date to "Sat 12 Apr" format
  const formatDate = (dateString: string): string => {
    try {
      if (!dateString) return 'TBA';
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('en-GB', { month: 'short' });
      const weekday = date.toLocaleString('en-GB', { weekday: 'short' });
      return `${weekday} ${day} ${month}`;
    } catch (e) {
      return 'TBA';
    }
  };

  // Format time
  const formatTime = (timeString?: string): string => {
    if (!timeString) return 'TBA';
    try {
      const time = new Date(`1970-01-01T${timeString}`);
      return time.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } catch (e) {
      return timeString;
    }
  };

  return (
    <div className={`w-full bg-white rounded-lg shadow-sm overflow-hidden ${
      isNextMatch ? 'border-2 border-[#FFD700]' : 'border-2 border-[#00105A]'
    }`}>
      {/* 1. Header Badge - Updated styling */}
      <div className={`px-4 py-2 text-center ${
        isNextMatch ? 'bg-[#00105A] text-white' : 'bg-[#f3f4f6] text-[#00105A]'
      }`}>
        <span className="text-sm font-bold uppercase tracking-wide">
          {matchType}
        </span>
      </div>

      <div className="p-3 space-y-2">
        {/* 2. Competition */}
        <div className="text-center">
          <p className="text-sm text-[#6b7280] font-medium">
            {competitionName}
          </p>
        </div>

        {/* 3. Logo/Scores Section */}
        <div className="flex items-center justify-between py-2">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            <TeamLogo 
              logoUrl={match.home_team_logo} 
              teamName={match.home_team_name}
              size="md"
            />
            <p className="text-sm text-[#374151] mt-1 text-center font-semibold">
              {match.home_team_name}
            </p>
          </div>

          {/* Score/VS Section */}
          <div className="flex-shrink-0 mx-3">
            {isLastResult && match.home_score !== undefined && match.away_score !== undefined ? (
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00105A]">
                  {match.home_score} - {match.away_score}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-xl font-semibold text-[#6b7280]">
                  vs
                </div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            <TeamLogo 
              logoUrl={match.away_team_logo} 
              teamName={match.away_team_name}
              size="md"
            />
            <p className="text-sm text-[#374151] mt-1 text-center font-semibold">
              {match.away_team_name}
            </p>
          </div>
        </div>

        {/* 4. Venue */}
        <div className="flex items-center justify-center text-sm text-[#6b7280]">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="font-medium">{match.venue || 'Spain Park'}</span>
        </div>

        {/* 5. Date/Time */}
        <div className="flex items-center justify-center text-sm text-[#6b7280]">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="font-medium">{formatDate(match.match_date)} • {formatTime(match.match_time)}</span>
        </div>
      </div>

      {/* 6. Action Icons - Now with inactive states like desktop */}
      <div className="px-4 py-1 border-t border-[#e5e7eb] bg-[#f9fafb] flex justify-center">
        <div className="flex space-x-8">
          {isUpcoming ? (
            /* Tickets only for Next Match and Upcoming */
            <button
              onClick={() => {
                if (match.ticket_link && onTicketClick) {
                  onTicketClick(match.ticket_link);
                } else {
                  console.log('Ticket click - no link available');
                }
              }}
              className={`flex flex-col items-center p-1 rounded transition-colors min-h-[44px] min-w-[44px] ${
                match.ticket_link 
                  ? 'hover:bg-[#C5E7FF] cursor-pointer' 
                  : 'cursor-default'
              }`}
              disabled={!match.ticket_link}
              aria-label="Buy tickets"
            >
              <Ticket className={`h-5 w-5 ${
                match.ticket_link ? 'text-[#00105A]' : 'text-[#9CA3AF]'
              }`} />
              <span className={`text-xs mt-1 font-medium ${
                match.ticket_link ? 'text-[#6b7280]' : 'text-[#9CA3AF]'
              }`}>
                Tickets
              </span>
            </button>
          ) : (
            /* Gallery + Report for Last Result */
            <>
              <button
                onClick={() => {
                  if (match.gallery_link && onGalleryClick) {
                    onGalleryClick(match.gallery_link);
                  } else {
                    console.log('Gallery click - no link available');
                  }
                }}
                className={`flex flex-col items-center p-1 rounded transition-colors min-h-[44px] min-w-[44px] ${
                  match.gallery_link 
                    ? 'hover:bg-[#C5E7FF] cursor-pointer' 
                    : 'cursor-default'
                }`}
                disabled={!match.gallery_link}
                aria-label="View gallery"
              >
                <Camera className={`h-5 w-5 ${
                  match.gallery_link ? 'text-[#00105A]' : 'text-[#9CA3AF]'
                }`} />
                <span className={`text-xs mt-1 font-medium ${
                  match.gallery_link ? 'text-[#6b7280]' : 'text-[#9CA3AF]'
                }`}>
                  Gallery
                </span>
              </button>
              
              <button
                onClick={() => {
                  if (match.match_report_link && onReportClick) {
                    onReportClick(match.match_report_link);
                  } else {
                    console.log('Report click - no link available');
                  }
                }}
                className={`flex flex-col items-center p-1 rounded transition-colors min-h-[44px] min-w-[44px] ${
                  match.match_report_link 
                    ? 'hover:bg-[#C5E7FF] cursor-pointer' 
                    : 'cursor-default'
                }`}
                disabled={!match.match_report_link}
                aria-label="Read report"
              >
                <FileText className={`h-5 w-5 ${
                  match.match_report_link ? 'text-[#00105A]' : 'text-[#9CA3AF]'
                }`} />
                <span className={`text-xs mt-1 font-medium ${
                  match.match_report_link ? 'text-[#6b7280]' : 'text-[#9CA3AF]'
                }`}>
                  Report
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
