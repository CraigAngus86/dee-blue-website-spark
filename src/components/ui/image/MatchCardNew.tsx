
import React from 'react';
import { Match } from '@/types/match';
import { CardNew } from '@/components/ui/CardNew';
import CompetitorLogo from './CompetitorLogo';
import { Clock, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
    month: 'short'
  });
};

const MatchCardNew: React.FC<MatchCardNewProps> = ({ match, variant, className }) => {
  const isPast = match.isCompleted || variant === 'past';
  const isNext = variant === 'next';
  const isMobile = useIsMobile();

  return (
    <CardNew 
      className={`relative ${className}`}
      elevation={isNext ? "md" : "sm"}
      hoverEffect={true}
    >
      <div className={`p-3 text-center font-semibold text-sm uppercase ${isNext ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700'}`}>
        {isPast ? 'FINAL RESULT' : isNext ? 'NEXT MATCH' : 'UPCOMING MATCH'}
      </div>
      
      <div className="p-3 text-center text-xs font-medium text-gray-500 uppercase">
        {match.competition}
      </div>
      
      <div className="flex items-center justify-between px-3 sm:px-6 py-4">
        <div className="flex flex-col items-center text-center w-[35%] sm:w-5/12">
          <CompetitorLogo
            name={match.homeTeam}
            size={isMobile ? "sm" : "md"}
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
          <span className={`mt-2 text-xs sm:text-sm ${match.homeTeam.includes("Banks o' Dee") ? "font-bold" : ""}`}>
            {match.homeTeam}
          </span>
        </div>
        
        <div className="text-center w-[30%] sm:w-2/12">
          {isPast && match.result ? (
            <div className="flex flex-col items-center justify-center">
              <div className="text-lg sm:text-2xl font-bold">
                {match.result.homeScore}
              </div>
              <div className="text-sm sm:text-lg text-gray-400 my-1">-</div>
              <div className="text-lg sm:text-2xl font-bold">
                {match.result.awayScore}
              </div>
            </div>
          ) : (
            <div className="text-base sm:text-xl font-bold text-gray-700">
              VS
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center text-center w-[35%] sm:w-5/12">
          <CompetitorLogo
            name={match.awayTeam}
            size={isMobile ? "sm" : "md"}
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
          <span className={`mt-2 text-xs sm:text-sm ${match.awayTeam.includes("Banks o' Dee") ? "font-bold" : ""}`}>
            {match.awayTeam}
          </span>
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-center mb-1">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-500" />
          <span className="text-xs sm:text-sm text-gray-600">
            {formatDate(match.date)} • {match.time}
          </span>
        </div>
        
        <div className="flex items-center justify-center">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-500" />
          <span className="text-xs sm:text-sm text-gray-600">{match.venue}</span>
        </div>
      </div>
      
      {isNext && match.ticketLink && (
        <div className="p-3 text-center border-t border-gray-100 bg-gray-50">
          <a 
            href={match.ticketLink} 
            className="text-sm text-primary font-medium hover:underline"
          >
            MATCH DETAILS
          </a>
        </div>
      )}
    </CardNew>
  );
};

export default MatchCardNew;

