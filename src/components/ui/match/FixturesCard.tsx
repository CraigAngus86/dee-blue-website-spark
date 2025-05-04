
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { Match } from '@/types/match';

export interface FixturesCardProps {
  match: Match;
  className?: string;
}

export function FixturesCard({ match, className = '' }: FixturesCardProps) {
  // Format match date
  const formattedDate = match.match_date ? format(parseISO(match.match_date), 'EEEE, do MMMM yyyy') : '';
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex justify-between items-center text-lg">
          <span>{match.competition.name}</span>
          {match.ticket_link && (
            <a 
              href={match.ticket_link} 
              className="text-sm bg-primary text-white px-3 py-1 rounded-full flex items-center space-x-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Ticket className="h-4 w-4 mr-1" />
              <span>Tickets</span>
            </a>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Teams */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full p-2 mb-2 flex items-center justify-center">
                {match.home_team.logo_url ? (
                  <img 
                    src={match.home_team.logo_url} 
                    alt={match.home_team.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-xs text-gray-400">No logo</div>
                )}
              </div>
              <span className="font-medium">{match.home_team.name}</span>
            </div>
            
            <div className="text-2xl font-bold text-gray-400 mx-4">vs</div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full p-2 mb-2 flex items-center justify-center">
                {match.away_team.logo_url ? (
                  <img 
                    src={match.away_team.logo_url} 
                    alt={match.away_team.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-xs text-gray-400">No logo</div>
                )}
              </div>
              <span className="font-medium">{match.away_team.name}</span>
            </div>
          </div>
          
          {/* Match Details */}
          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
            
            {match.match_time && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span>{match.match_time}</span>
              </div>
            )}
            
            {match.venue && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{match.venue}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
