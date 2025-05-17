"use client";

import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface MatchCardProps {
  match: any;
  isCurrentMatch?: boolean;
}

export function MatchCard({ match, isCurrentMatch = false }: MatchCardProps) {
  console.log("MatchCard - Rendering match:", match.id);
  
  // Check for test or dummy match (added in our getMatches fallback)
  const isTestMatch = match.id?.startsWith('test-');
  
  // Determine if match is upcoming or a result
  const isUpcoming = match.status === 'scheduled' || !match.home_score;
  
  // Safe access with fallbacks
  const homeTeam = match.home_team || { name: 'Home Team', logo_url: '' };
  const awayTeam = match.away_team || { name: 'Away Team', logo_url: '' };
  const competition = match.competition || { name: 'Match' };
  
  // Format date simply to avoid errors
  const matchDate = match.match_date || '';
  let formattedDate = 'TBA';
  try {
    formattedDate = matchDate 
      ? new Date(matchDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
      : 'TBA';
  } catch (e) {
    console.error('Error formatting date:', e);
  }
  
  return (
    <div className={`bg-white rounded-md shadow-md border border-gray-200 overflow-hidden h-full 
      ${isCurrentMatch ? 'border-[#FFD700] border-2' : ''}
      ${isTestMatch ? 'border-blue-300' : ''}`}>
      {/* Header */}
      <div className="bg-[#00105A] px-3 py-2 flex justify-between items-center">
        <div className="text-xs font-medium text-white truncate">
          {competition.name}
        </div>
        <div className={`text-[10px] px-2 py-0.5 rounded font-medium 
          ${isUpcoming ? 'bg-[#FFD700] text-[#00105A]' : 'bg-[#C5E7FF] text-[#00105A]'}`}>
          {isUpcoming ? 'UPCOMING MATCH' : 'FINAL RESULT'}
        </div>
      </div>
      
      {/* Teams */}
      <div className="p-3 flex-grow">
        <div className="flex justify-between items-center">
          {/* Home team */}
          <div className="text-center w-5/12">
            <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-1 flex items-center justify-center">
              {homeTeam.logo_url ? (
                <img 
                  src={homeTeam.logo_url} 
                  alt={homeTeam.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500 font-semibold">
                  {getInitials(homeTeam.name)}
                </span>
              )}
            </div>
            <div className="font-medium text-xs">{homeTeam.name}</div>
          </div>
          
          {/* Score/VS */}
          <div className="text-center w-2/12">
            {isUpcoming ? (
              <div className="text-lg font-bold text-gray-600">VS</div>
            ) : (
              <div className="text-lg font-bold">
                {match.home_score ?? 0} - {match.away_score ?? 0}
              </div>
            )}
          </div>
          
          {/* Away team */}
          <div className="text-center w-5/12">
            <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-1 flex items-center justify-center">
              {awayTeam.logo_url ? (
                <img 
                  src={awayTeam.logo_url} 
                  alt={awayTeam.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500 font-semibold">
                  {getInitials(awayTeam.name)}
                </span>
              )}
            </div>
            <div className="font-medium text-xs">{awayTeam.name}</div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 flex justify-between">
        <div className="flex items-center text-gray-600 text-xs">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
          {match.match_time && <span> • {match.match_time}</span>}
        </div>
        
        {match.venue && (
          <div className="flex items-center text-gray-600 text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate max-w-[80px]">{match.venue}</span>
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
