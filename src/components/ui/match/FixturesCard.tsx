
import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPinIcon, TicketIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FixturesCardProps {
  fixture: {
    id: string;
    competition?: string;
    date: string;
    time?: string;
    venue?: string;
    homeTeam: string;
    awayTeam: string;
    home: {
      name: string;
      logo?: string;
    };
    away: {
      name: string;
      logo?: string;
    };
    ticketLink?: string;
  };
}

export function FixturesCard({ fixture }: FixturesCardProps) {
  // Format date if available
  const formattedDate = fixture.date ? format(new Date(fixture.date), 'EEE, MMM d, yyyy') : 'TBD';
  
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        {/* Competition name */}
        {fixture.competition && (
          <div className="text-sm font-semibold text-primary mb-2">
            {fixture.competition}
          </div>
        )}
        
        {/* Teams and logos */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center w-1/3">
            {fixture.home.logo ? (
              <div className="w-16 h-16 relative mb-2">
                <Image 
                  src={fixture.home.logo} 
                  alt={fixture.home.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-muted mb-2 flex items-center justify-center rounded-full">
                {fixture.home.name.substring(0, 2)}
              </div>
            )}
            <span className="text-sm text-center font-medium">{fixture.home.name}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">vs</span>
          </div>
          
          <div className="flex flex-col items-center w-1/3">
            {fixture.away.logo ? (
              <div className="w-16 h-16 relative mb-2">
                <Image 
                  src={fixture.away.logo} 
                  alt={fixture.away.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-muted mb-2 flex items-center justify-center rounded-full">
                {fixture.away.name.substring(0, 2)}
              </div>
            )}
            <span className="text-sm text-center font-medium">{fixture.away.name}</span>
          </div>
        </div>
        
        {/* Match details */}
        <div className="space-y-2 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          
          {fixture.time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{fixture.time}</span>
            </div>
          )}
          
          {fixture.venue && (
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-muted-foreground" />
              <span>{fixture.venue}</span>
            </div>
          )}
        </div>
        
        {/* Ticket link */}
        {fixture.ticketLink && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full"
              asChild
            >
              <a href={fixture.ticketLink} target="_blank" rel="noopener noreferrer">
                <TicketIcon className="h-4 w-4 mr-2" />
                Buy Tickets
              </a>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
