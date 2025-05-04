
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar, Clock, MapPin } from 'lucide-react';
import { Match } from '@/types/match';

interface FixturesCardProps {
  match: Match;
  showVenue?: boolean;
  showTime?: boolean;
  showLocation?: boolean;
  showDate?: boolean;
  showTicketLink?: boolean;
  showCompetition?: boolean;
  showMatchReport?: boolean;
  className?: string;
  isSimplified?: boolean;
}

function formatMatchDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'EEE, dd MMM yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr;
  }
}

function formatMatchTime(timeStr?: string): string {
  if (!timeStr) return 'TBA';
  
  try {
    // Extract hours and minutes from the time string (HH:MM:SS)
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeStr;
  }
}

export function FixturesCard({
  match,
  showVenue = true,
  showTime = true,
  showLocation = true,
  showDate = true,
  showTicketLink = true,
  showCompetition = true,
  showMatchReport = true,
  className = '',
  isSimplified = false,
}: FixturesCardProps) {
  const isResult = match.status === 'completed';

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="p-4 flex flex-col bg-white">
        <div className="flex flex-col space-y-2">
          {/* Date and Competition */}
          <div className="flex justify-between items-center text-sm text-slate-600">
            {showDate && (
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>{formatMatchDate(match.match_date)}</span>
              </div>
            )}
            {showTime && (
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{formatMatchTime(match.match_time)}</span>
              </div>
            )}
          </div>

          {/* Competition Badge */}
          {showCompetition && match.competition && (
            <div className="flex justify-start">
              <Badge variant="outline" className="bg-slate-50 text-slate-800">
                {match.competition.name}
              </Badge>
            </div>
          )}

          {/* Teams Section */}
          <div className="grid grid-cols-3 items-center mt-3 mb-3">
            {/* Home Team */}
            <div className="flex flex-col items-center justify-center text-center">
              {match.home_team?.logo_url && (
                <div className="w-16 h-16 mb-2 relative">
                  <img 
                    src={match.home_team.logo_url}
                    alt={`${match.home_team.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <h3 className="font-medium text-sm">{match.home_team?.name}</h3>
            </div>

            {/* Score */}
            <div className="flex justify-center items-center">
              {isResult && typeof match.home_score === 'number' && typeof match.away_score === 'number' ? (
                <div className="text-2xl font-bold">
                  {match.home_score} - {match.away_score}
                </div>
              ) : (
                <div className="text-sm font-medium text-slate-500">vs</div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center justify-center text-center">
              {match.away_team?.logo_url && (
                <div className="w-16 h-16 mb-2 relative">
                  <img 
                    src={match.away_team.logo_url}
                    alt={`${match.away_team.name} logo`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <h3 className="font-medium text-sm">{match.away_team?.name}</h3>
            </div>
          </div>

          {/* Venue */}
          {!isSimplified && showVenue && match.venue && (
            <div className="flex items-center text-sm text-slate-600 mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{match.venue}</span>
            </div>
          )}

          {/* Links */}
          {!isSimplified && (
            <div className="mt-3 space-y-2">
              {showTicketLink && match.ticket_link && !isResult && (
                <Button variant="default" className="w-full text-sm" asChild>
                  <a href={match.ticket_link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5 mr-2" />
                    Buy Tickets
                  </a>
                </Button>
              )}

              {showMatchReport && match.match_report_link && isResult && (
                <Button variant="outline" className="w-full text-sm" asChild>
                  <a href={match.match_report_link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5 mr-2" />
                    Match Report
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
