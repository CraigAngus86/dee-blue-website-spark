"use client";
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface MatchCardProps {
  match: any;
  matchType?: 'FINAL RESULT' | 'NEXT MATCH' | 'UPCOMING MATCH';
  isCurrentMatch?: boolean;
}

export function MatchCard({ 
  match, 
  matchType = 'UPCOMING MATCH',
  isCurrentMatch = false 
}: MatchCardProps) {
  const isNextMatch = matchType === 'NEXT MATCH' || isCurrentMatch;
  const isResult = matchType === 'FINAL RESULT';
  
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
      console.error('Error formatting date:', e);
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
  
  return (
    <div
      className={`w-full rounded-lg overflow-hidden shadow-sm 
        ${isNextMatch ? 'border-[#FFD700] border' : 'border border-[#e5e7eb]'}
        transition-all duration-300 hover:shadow-md`}
    >
      {/* Match card */}
      <div className="h-full bg-white">
        {/* Header with proper styling */}
        <div className={`px-4 py-3 text-center 
          ${isNextMatch ? 'bg-[#00105A]' : 'bg-white border-b border-[#e5e7eb]'}`}
        >
          <div className={`text-sm font-semibold uppercase tracking-wide
            ${isNextMatch ? 'text-white' : 'text-[#00105A]'}`}
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
        
        {/* Teams and score/vs - with increased padding for better vertical centering */}
        <div className="px-4 py-8">
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
        </div>
        
        {/* Match details - date and venue */}
        <div className="px-5 py-4 border-t border-[#e5e7eb] bg-[#f9fafb] flex justify-between items-center">
          {/* Date and time */}
          <div className="flex items-center text-[#4b5563] text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>
              {formatDate(match.match_date)}
              {match.match_time && ` • ${formatTime(match.match_time)}`}
            </span>
          </div>
          
          {/* Venue */}
          {match.venue && (
            <div className="flex items-center text-[#4b5563] text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate max-w-[100px]">{match.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
