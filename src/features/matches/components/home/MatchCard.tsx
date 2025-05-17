"use client";

import React from 'react';
import { Match } from '@/features/matches/types';
import { format, parseISO } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

interface MatchCardProps {
  match: Match;
  isCurrentMatch?: boolean;
}

export function MatchCard({ match, isCurrentMatch = false }: MatchCardProps) {
  // Determine if match is upcoming or a result
  const isUpcoming = match.status === 'scheduled';
  
  // Format date
  const matchDate = match.matchDate || match.match_date;
  const formattedDate = matchDate ? format(parseISO(matchDate), 'EEE d MMM') : 'TBA';
  
  // Format time if available
  const formattedTime = match.matchTime ? match.matchTime.substring(0, 5) : null;
  
  return (
    <div className={`bg-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col ${isCurrentMatch ? 'border-[#FFD700] border-2' : ''}`}>
      {/* Header with competition and status */}
      <div className="bg-[#00105A] px-3 py-2 flex justify-between items-center">
        <div className="text-xs font-medium text-white truncate">
          {match.competition?.name || match.competition}
        </div>
        <div className={`text-[10px] px-2 py-0.5 rounded font-medium ${isUpcoming ? 'bg-[#FFD700] text-[#00105A]' : 'bg-[#C5E7FF] text-[#00105A]'}`}>
          {isUpcoming ? 'UPCOMING MATCH' : 'FINAL RESULT'}
        </div>
      </div>
      
      {/* Teams and score/vs */}
      <div className="p-3 flex-grow">
        <div className="flex justify-between items-center mb-3">
          {/* Home team */}
          <div className="text-center w-5/12">
            <div className="w-12 h-12 bg-white rounded-full mx-auto mb-1 p-1 border border-gray-200 flex items-center justify-center">
              {match.home_team?.logo_url ? (
                <img 
                  src={match.home_team.logo_url} 
                  alt={match.home_team.name} 
                  className="max-w-full max-h-full rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-500">
                  {getInitials(match.home_team?.name || 'Home')}
                </div>
              )}
            </div>
            <div className="font-medium text-xs line-clamp-2 h-9">
              {match.home_team?.name || 'Home'}
            </div>
          </div>
          
          {/* Score or VS */}
          <div className="text-center w-2/12">
            {isUpcoming ? (
              <div className="text-lg font-bold text-gray-600">VS</div>
            ) : (
              <div className="text-lg font-bold">
                {match.home_score} - {match.away_score}
              </div>
            )}
          </div>
          
          {/* Away team */}
          <div className="text-center w-5/12">
            <div className="w-12 h-12 bg-white rounded-full mx-auto mb-1 p-1 border border-gray-200 flex items-center justify-center">
              {match.away_team?.logo_url ? (
                <img 
                  src={match.away_team.logo_url} 
                  alt={match.away_team.name} 
                  className="max-w-full max-h-full rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-500">
                  {getInitials(match.away_team?.name || 'Away')}
                </div>
              )}
            </div>
            <div className="font-medium text-xs line-clamp-2 h-9">
              {match.away_team?.name || 'Away'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Match details - date, time, venue */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center text-gray-600 text-xs">
          <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
          <span>
            {formattedDate}
            {formattedTime && ` • ${formattedTime}`}
          </span>
        </div>
        
        {match.venue && (
          <div className="flex items-center text-gray-600 text-xs">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate max-w-[100px]">{match.venue}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to get initials from a team name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
