cat > src/features/matches/components/common/MatchCard.tsx << 'ENDOFFILE'
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
  // Determine if match is upcoming or a result
  const isUpcoming = match.status === 'scheduled' || !match.home_score;
  const isNextMatch = matchType === 'NEXT MATCH' || isCurrentMatch;
  
  // Safe access with fallbacks - matching the original property structure
  const homeTeam = match.home_team || { name: 'Home Team', logo_url: '' };
  const awayTeam = match.away_team || { name: 'Away Team', logo_url: '' };
  const competition = match.competition?.name || match.competition || 'Match';
  
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
    <div className={`bg-white rounded-md shadow-md overflow-hidden h-full 
      ${isNextMatch ? 'border-[#FFD700] border-2' : 'border border-gray-200'}`}>
      {/* Header */}
      <div className={`px-4 py-3 text-center 
        ${isNextMatch ? 'bg-[#00105A]' : 'bg-white border-b border-gray-200'}`}>
        <div className={`text-sm font-semibold uppercase tracking-wide
          ${isNextMatch ? 'text-white' : 'text-[#00105A]'}`}>
          {matchType}
        </div>
      </div>
      
      {/* Competition Name */}
      <div className="px-4 py-2 text-center text-sm text-gray-600 border-b border-gray-100">
        {competition}
      </div>
      
      {/* Teams and Score - with increased vertical padding for better centering */}
      <div className="px-4 py-8 flex justify-between items-center">
        <div className="w-5/12 flex justify-center">
          <TeamLogo 
            logoUrl={homeTeam.logo_url} 
            teamName={homeTeam.name}
            size="md"
            className="mx-auto"
          />
        </div>
        
        <div className="w-2/12 text-center">
          {!isUpcoming ? (
            <div className="text-2xl font-bold">
              {match.home_score ?? 0} - {match.away_score ?? 0}
            </div>
          ) : (
            <div className="text-xl font-bold text-gray-700">
              VS
            </div>
          )}
        </div>
        
        <div className="w-5/12 flex justify-center">
          <TeamLogo 
            logoUrl={awayTeam.logo_url} 
            teamName={awayTeam.name}
            size="md"
            className="mx-auto"
          />
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
        <div className="flex items-center text-gray-600 text-xs">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
          {match.match_time && <span> • {match.match_time}</span>}
        </div>
        
        {match.venue && (
          <div className="flex items-center text-gray-600 text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate max-w-[100px]">{match.venue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
ENDOFFILE