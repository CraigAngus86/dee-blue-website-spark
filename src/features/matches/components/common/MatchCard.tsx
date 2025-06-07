"use client";
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface MatchCardProps {
  match: any;
  matchType?: 'FINAL RESULT' | 'NEXT MATCH' | 'UPCOMING MATCH';
  isCurrentMatch?: boolean;
  onGalleryClick?: (galleryId: string) => void;
  onReportClick?: (reportId: string) => void;
  onTicketClick?: (ticketUrl: string) => void;
}

export function MatchCard({ 
  match, 
  matchType = 'UPCOMING MATCH',
  isCurrentMatch = false,
  onGalleryClick,
  onReportClick,
  onTicketClick
}: MatchCardProps) {
  const isNextMatch = matchType === 'NEXT MATCH' || isCurrentMatch;
  const isResult = matchType === 'FINAL RESULT';
  const isUpcoming = matchType === 'UPCOMING MATCH' || matchType === 'NEXT MATCH';
  
  // Competition handling with fallbacks
  const competitionName = 
    match.competition?.name || 
    (typeof match.competition === 'string' ? match.competition : 'SCOTTISH HIGHLAND FOOTBALL LEAGUE');
  
  // Format date to "Sat 12 Apr" format
  const formatDate = (dateString: string): string => {
    try {
      if (!dateString) return 'TBA';
      const date = new Date(dateString);
      
      // Get day of the month
      const day = date.getDate();
      
      // Get short month name
      const month = date.toLocaleString('en-GB', { month: 'short' });
      
      // Get short day name
      const weekday = date.toLocaleString('en-GB', { weekday: 'short' });
      
      return `${weekday} ${day} ${month}`;
    } catch (e) {
      return 'TBA';
    }
  };
  
  // Format time to ensure proper format
  const formatTime = (timeString: string): string => {
    if (!timeString) return '';
    // If it's already in HH:MM format, return it directly
    if (timeString.includes(':')) {
      return timeString.substring(0, 5); // Get first 5 chars (HH:MM)
    }
    return timeString;
  };

  // Icon click handlers
  const handleGalleryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (match.gallery_link && onGalleryClick) {
      onGalleryClick(match.gallery_link);
    }
  };

  const handleReportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (match.match_report_link && onReportClick) {
      onReportClick(match.match_report_link);
    }
  };

  const handleTicketClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (match.ticket_link) {
      if (onTicketClick) {
        onTicketClick(match.ticket_link);
      } else {
        window.open(match.ticket_link, '_blank');
      }
    }
  };
  
  return (
    <div
      className={`w-full rounded-lg overflow-hidden shadow-sm 
        ${isNextMatch ? 'border-[#FFD700] border' : 'border border-[#e5e7eb]'}
        transition-all duration-300 hover:shadow-md`}
    >
      {/* Match card */}
      <div className="h-full bg-[#ffffff]">
        {/* Header with proper styling */}
        <div className={`px-4 py-3 text-center 
          ${isNextMatch ? 'bg-[#00105A]' : 'bg-[#ffffff] border-b border-[#e5e7eb]'}`}
        >
          <div className={`text-sm font-semibold uppercase tracking-wide
            ${isNextMatch ? 'text-[#ffffff]' : 'text-[#00105A]'}`}
          >
            {matchType}
          </div>
        </div>
        
        {/* Competition name */}
        <div className="px-4 py-2 text-center border-b border-[#e5e7eb]">
          <div className="text-xs text-[#4b5563] font-medium truncate">
            {competitionName}
          </div>
        </div>
        
        {/* Teams and score/vs */}
        <div className="px-4 py-6">
          <div className="flex justify-between items-center">
            {/* Home team */}
            <div className="text-center w-5/12">
              <TeamLogo 
                logoUrl={match.home_team_logo || (match.home_team && match.home_team.logo_url)} 
                teamName={match.home_team_name || (match.home_team && match.home_team.name) || 'Home Team'} 
                className="mx-auto"
              />
            </div>
            
            {/* Score or VS */}
            <div className="text-center text-2xl font-bold w-2/12">
              {isResult ? (
                <div>
                  {match.home_score || 0} - {match.away_score || 0}
                </div>
              ) : (
                <div className="text-[#4b5563]">
                  VS
                </div>
              )}
            </div>
            
            {/* Away team */}
            <div className="text-center w-5/12">
              <TeamLogo 
                logoUrl={match.away_team_logo || (match.away_team && match.away_team.logo_url)} 
                teamName={match.away_team_name || (match.away_team && match.away_team.name) || 'Away Team'}
                className="mx-auto" 
              />
            </div>
          </div>

          {/* NEW: Venue moved here under teams/score */}
          {match.venue && (
            <div className="flex items-center justify-center text-[#4b5563] text-xs mt-3">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{match.venue}</span>
            </div>
          )}
        </div>
        
        {/* NEW: Match details footer with date + icons */}
        <div className="px-4 py-3 border-t border-[#e5e7eb] bg-[#f9fafb] flex justify-between items-center">
          {/* Date and time */}
          <div className="flex items-center text-[#4b5563] text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>
              {formatDate(match.match_date)}
              {match.match_time && ` • ${formatTime(match.match_time)}`}
            </span>
          </div>
          
          {/* Action icons */}
          <div className="flex space-x-2">
            {isUpcoming ? (
              /* Ticket icon for upcoming matches */
              <button 
                onClick={handleTicketClick}
                className={`${match.ticket_link ? 'text-[#00105A] hover:text-[#FFD700]' : 'text-[#9CA3AF] cursor-default'} transition-colors`}
                title="Buy Tickets"
                disabled={!match.ticket_link}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </button>
            ) : (
              /* Gallery and report icons for completed matches */
              <>
                <button 
                  onClick={handleReportClick}
                  className={`${match.match_report_link ? 'text-[#00105A] hover:text-[#FFD700]' : 'text-[#9CA3AF] cursor-default'} transition-colors`}
                  title="Match Report"
                  disabled={!match.match_report_link}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                
                <button 
                  onClick={handleGalleryClick}
                  className={`${match.gallery_link ? 'text-[#00105A] hover:text-[#FFD700]' : 'text-[#9CA3AF] cursor-default'} transition-colors`}
                  title="Photo Gallery"
                  disabled={!match.gallery_link}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
