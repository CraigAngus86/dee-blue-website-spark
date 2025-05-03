
import React from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ArrowRight, Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export interface MatchCardProps {
  competition: string;
  date: string;
  time?: string;
  venue?: string;
  home: string;
  away: string;
  result?: {
    homeScore: number;
    awayScore: number;
    matchReportLink?: string;
  };
  ticketLink?: string;
}

export const MatchCardNew: React.FC<MatchCardProps> = ({
  competition,
  date,
  time,
  venue,
  home,
  away,
  result,
  ticketLink,
}) => {
  // Format the date to be more readable
  const formattedDate = React.useMemo(() => {
    try {
      // Try to parse and format the date
      return format(parseISO(date), 'EEE, dd MMM yyyy');
    } catch (error) {
      // If parsing fails, return the original date
      return date;
    }
  }, [date]);

  const isCompleted = !!result;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="bg-primary text-white py-3 px-4">
        <div className="font-semibold truncate text-sm">{competition}</div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-4">
        {/* Date, Time, and Venue */}
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
          {time && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{time}</span>
            </div>
          )}
          {venue && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{venue}</span>
            </div>
          )}
        </div>
        
        {/* Teams and Scores */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex flex-col items-center text-center w-5/12">
            <span className="font-semibold truncate w-full">{home}</span>
          </div>
          
          <div className="flex items-center justify-center w-2/12">
            {isCompleted ? (
              <div className="text-center bg-gray-100 rounded-lg py-1 px-3">
                <span className="font-bold">{result.homeScore}</span>
                <span className="mx-1">-</span>
                <span className="font-bold">{result.awayScore}</span>
              </div>
            ) : (
              <div className="text-center text-gray-500">vs</div>
            )}
          </div>
          
          <div className="flex flex-col items-center text-center w-5/12">
            <span className="font-semibold truncate w-full">{away}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        {isCompleted && result.matchReportLink ? (
          <Link href={result.matchReportLink} className="w-full">
            <div className="bg-blue-100 text-blue-700 py-2 text-center text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center">
              Match Report <ArrowRight size={16} className="ml-1" />
            </div>
          </Link>
        ) : ticketLink ? (
          <Link href={ticketLink} className="w-full">
            <div className="bg-green-100 text-green-700 py-2 text-center text-sm font-medium hover:bg-green-200 transition-colors flex items-center justify-center">
              <Ticket size={16} className="mr-1" /> Buy Tickets
            </div>
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
};
