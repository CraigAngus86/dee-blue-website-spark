
import React from 'react';
import { Match } from '@/types/match';
import { CalendarDays, MapPin, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import Heading from '@/components/ui/typography/Heading';
import { Card, CardContent } from '@/components/ui/card';

interface FeaturedMatchProps {
  match: Match;
}

const FeaturedMatch: React.FC<FeaturedMatchProps> = ({ match }) => {
  const isHomeGame = match.venue?.toLowerCase().includes('spain park');
  
  return (
    <Card className="overflow-hidden border-2 border-primary/20">
      <div className="bg-primary/10 py-3 px-4 border-b border-primary/20">
        <Heading as="h3" size="lg" className="text-primary">
          Featured Match
        </Heading>
      </div>
      
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Heading as="h4" size="md" className="text-primary">
              {match.competition}
            </Heading>

            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>{match.date && formatDate(new Date(match.date))}</span>
              {match.time && <span> | {match.time}</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 items-center my-4">
            <div className="col-span-3 text-right">
              <div className="font-bold text-lg">{match.homeTeam || match.home}</div>
            </div>
            
            <div className="col-span-1 flex justify-center">
              <span className="bg-primary/10 text-primary font-bold rounded-full h-8 w-8 flex items-center justify-center">
                VS
              </span>
            </div>
            
            <div className="col-span-3">
              <div className="font-bold text-lg">{match.awayTeam || match.away}</div>
            </div>
          </div>
          
          {match.venue && (
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{match.venue}</span>
            </div>
          )}
          
          {match.ticketLink && (
            <div className="mt-4">
              <Button className="w-full" asChild>
                <a href={match.ticketLink} target="_blank" rel="noopener noreferrer">
                  <Ticket className="mr-2 h-4 w-4" /> Get Tickets
                </a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedMatch;
