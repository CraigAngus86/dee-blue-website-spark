
import React from 'react';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Team } from '@/lib/fixtures-data';

interface MatchCardProps {
  competition: string;
  date: string;
  time: string;
  venue: string;
  home: Team;
  away: Team;
  result?: {
    homeScore: number;
    awayScore: number;
    matchReportLink?: string;
  };
}

export const TeamDisplay = ({ team, isHome = false }: { team: Team, isHome?: boolean }) => (
  <div className={`flex ${isHome ? 'flex-row' : 'flex-row-reverse'} items-center gap-3`}>
    <div className="w-10 h-10 relative">
      <Image 
        src={team.logo} 
        alt={`${team.name} logo`} 
        fill
        className="object-contain"
      />
    </div>
    <span className="font-semibold">{team.name}</span>
  </div>
);

export const MatchCardNew = ({ 
  competition, 
  date, 
  time, 
  venue, 
  home, 
  away, 
  result 
}: MatchCardProps) => {
  const isMatchOver = Boolean(result);
  const dateObj = parseISO(date);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="text-sm text-gray-600 mb-2">
        {competition} • {format(dateObj, 'dd MMM yyyy')} • {time} • {venue}
      </div>
      
      <div className="flex justify-between items-center my-4">
        <div className="flex-1">
          <TeamDisplay team={home} isHome={true} />
        </div>
        
        <div className="mx-4 text-center">
          {isMatchOver ? (
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold">{result?.homeScore}</span>
              <span className="mx-2 text-gray-400">-</span>
              <span className="text-2xl font-bold">{result?.awayScore}</span>
            </div>
          ) : (
            <div className="text-lg font-semibold">VS</div>
          )}
        </div>
        
        <div className="flex-1 text-right">
          <TeamDisplay team={away} isHome={false} />
        </div>
      </div>
      
      <Separator className="my-3" />
      
      <div className="flex justify-between items-center">
        <div className="text-sm">
          {isMatchOver ? (
            <span className="text-green-600 font-medium">Final Result</span>
          ) : (
            <span className="text-blue-600 font-medium">Upcoming Match</span>
          )}
        </div>
        
        {isMatchOver && result?.matchReportLink && (
          <a 
            href={result.matchReportLink} 
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Match Report
          </a>
        )}
      </div>
    </div>
  );
};
