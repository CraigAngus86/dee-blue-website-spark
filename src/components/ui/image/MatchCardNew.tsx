
import React from 'react';
import { Match } from '@/types/match';
import { CardNew } from '@/components/ui/CardNew';
import { Badge } from '@/components/ui/badge';
import CompetitorLogo from './CompetitorLogo';
import { Clock, MapPin } from 'lucide-react';

interface MatchCardNewProps {
  match: Match;
  variant: 'past' | 'future' | 'next';
  className?: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Result badge component showing W/L/D for completed matches
const ResultBadge = ({ match }: { match: Match }) => {
  if (!match.isCompleted || !match.result) return null;
  
  // Determine if Banks o' Dee is home or away team
  const isBanksHome = match.homeTeam.includes("Banks o' Dee");
  const banksScore = isBanksHome ? match.result.homeScore : match.result.awayScore;
  const opponentScore = isBanksHome ? match.result.awayScore : match.result.homeScore;
  
  // Determine result
  let result: 'win' | 'loss' | 'draw' = 'draw';
  if (banksScore > opponentScore) result = 'win';
  if (banksScore < opponentScore) result = 'loss';
  
  return (
    <div className={`
      absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
      ${result === 'win' ? 'bg-green-500' : result === 'loss' ? 'bg-red-500' : 'bg-amber-500'}
    `}>
      {result === 'win' ? 'W' : result === 'loss' ? 'L' : 'D'}
    </div>
  );
};

const MatchCardNew: React.FC<MatchCardNewProps> = ({ match, variant, className }) => {
  const isPast = match.isCompleted || variant === 'past';
  const isNext = variant === 'next';

  return (
    <CardNew 
      className={`relative ${className}`}
      elevation={isNext ? "md" : "sm"}
      hoverEffect={true}
    >
      {/* Result Badge - W/L/D for completed matches */}
      <ResultBadge match={match} />
      
      {/* Competition header */}
      <div className="p-3 border-b border-gray-100 flex justify-between items-center">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {match.competition}
        </div>
        
        {isPast ? (
          <Badge variant="secondary" className="text-xs">RESULT</Badge>
        ) : isNext ? (
          <Badge variant="destructive" className="text-xs">NEXT MATCH</Badge>
        ) : (
          <Badge variant="outline" className="text-xs">UPCOMING</Badge>
        )}
      </div>
      
      {/* Match Content */}
      <div className="p-4">
        {/* Date and time */}
        <div className="text-sm text-gray-600 mb-3 flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {formatDate(match.date)} {match.time && `• ${match.time}`}
        </div>
        
        {/* Teams and score */}
        <div className="flex items-center justify-between my-4">
          {/* Home team */}
          <div className="flex flex-col items-center text-center w-5/12">
            <CompetitorLogo
              name={match.homeTeam}
              size="sm"
              className="w-12 h-12"
            />
            <span className={`mt-2 text-sm ${match.homeTeam.includes("Banks o' Dee") ? "font-bold" : ""}`}>
              {match.homeTeam}
            </span>
          </div>
          
          {/* Score or VS */}
          <div className="text-center w-2/12 px-2">
            {isPast && match.result ? (
              <div className="text-2xl font-bold">
                {match.result.homeScore} <span className="text-lg text-gray-400">-</span> {match.result.awayScore}
              </div>
            ) : (
              <div className="text-xl font-medium text-gray-400">
                VS
              </div>
            )}
            {isPast && <div className="text-xs text-gray-500 mt-1">FT</div>}
          </div>
          
          {/* Away team */}
          <div className="flex flex-col items-center text-center w-5/12">
            <CompetitorLogo
              name={match.awayTeam}
              size="sm"
              className="w-12 h-12"
            />
            <span className={`mt-2 text-sm ${match.awayTeam.includes("Banks o' Dee") ? "font-bold" : ""}`}>
              {match.awayTeam}
            </span>
          </div>
        </div>
        
        {/* Venue */}
        <div className="text-sm text-gray-500 flex items-center mt-4">
          <MapPin className="w-4 h-4 mr-1" />
          {match.venue}
        </div>
      </div>
      
      {/* Action Footer */}
      {isPast && match.matchReportLink && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <a 
            href={match.matchReportLink} 
            className="text-sm text-primary font-medium hover:underline"
          >
            Match Report →
          </a>
        </div>
      )}
      
      {!isPast && match.ticketLink && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <a 
            href={match.ticketLink} 
            className="text-sm text-primary font-medium hover:underline"
          >
            Buy Tickets →
          </a>
        </div>
      )}
    </CardNew>
  );
};

export default MatchCardNew;
