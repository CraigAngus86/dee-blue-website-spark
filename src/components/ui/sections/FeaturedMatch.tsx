import React from 'react';
import { format, parseISO } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket } from 'lucide-react';

interface FeaturedMatchProps {
  match: {
    id: string;
    matchDate: string;
    matchTime?: string;
    competition: string;
    homeTeam: string;
    awayTeam: string;
    homeTeamLogo?: string;
    awayTeamLogo?: string;
    venue: string;
    ticketLink?: string;
  };
  className?: string;
}

export function FeaturedMatch({ match, className = '' }: FeaturedMatchProps) {
  const {
    matchDate,
    matchTime,
    competition,
    homeTeam,
    awayTeam,
    homeTeamLogo,
    awayTeamLogo,
    venue,
    ticketLink,
  } = match;

  // Parse the date if it's a string, otherwise keep as is
  const formattedDate = typeof matchDate === 'string' 
    ? format(parseISO(matchDate), 'EEEE, do MMMM')
    : '';

  const formattedTime = matchTime || '3:00 PM';

  return (
    <Card className={`p-6 overflow-hidden relative ${className}`}>
      <div className="absolute top-0 right-0">
        <Badge variant="secondary" className="m-4">{competition}</Badge>
      </div>
      
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {formattedDate} • {formattedTime}
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center text-center space-y-2">
            {homeTeamLogo && (
              <div className="w-16 h-16 bg-white rounded-full p-1 flex items-center justify-center">
                <img
                  src={homeTeamLogo}
                  alt={homeTeam}
                  className="w-12 h-12 object-contain"
                />
              </div>
            )}
            <div className="font-semibold">{homeTeam}</div>
          </div>
          
          <div className="text-2xl font-bold">vs</div>
          
          <div className="flex flex-col items-center text-center space-y-2">
            {awayTeamLogo && (
              <div className="w-16 h-16 bg-white rounded-full p-1 flex items-center justify-center">
                <img
                  src={awayTeamLogo}
                  alt={awayTeam}
                  className="w-12 h-12 object-contain"
                />
              </div>
            )}
            <div className="font-semibold">{awayTeam}</div>
          </div>
        </div>
        
        <div className="text-sm text-center text-muted-foreground">
          {venue}
        </div>
        
        {ticketLink && (
          <Button variant="default" className="w-full mt-4" asChild>
            <a href={ticketLink} target="_blank" rel="noopener noreferrer">
              <Ticket className="mr-2 h-4 w-4" />
              Buy Tickets
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}
