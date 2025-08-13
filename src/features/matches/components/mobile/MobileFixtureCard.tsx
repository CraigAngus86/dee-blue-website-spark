"use client";
import React from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { TeamLogo } from '../common/TeamLogo';

interface MobileFixtureCardProps {
  fixture: any;
  onTicketClick?: (ticketUrl: string) => void;
}

export function MobileFixtureCard({
  fixture,
  onTicketClick
}: MobileFixtureCardProps) {
  // Competition handling with fallbacks
  const competitionName =
    fixture.competition?.name ||
    (typeof fixture.competition === 'string' ? fixture.competition : 'UAE Second Division');

  // Format date to "Sat 12 Apr"
  const formatDate = (dateString: string): string => {
    try {
      if (!dateString) return 'TBA';
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('en-GB', { month: 'short' });
      const weekday = date.toLocaleString('en-GB', { weekday: 'short' });
      return `${weekday} ${day} ${month}`;
    } catch {
      return 'TBA';
    }
  };

  // Format time
  const formatTime = (timeString?: string): string => {
    if (!timeString) return 'TBA';
    try {
      const time = new Date(`1970-01-01T${timeString}`);
      return time.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return timeString;
    }
  };

  return (
    <div className="w-full rounded-lg overflow-hidden border border-[rgb(var(--medium-gray))] bg-[rgb(var(--white))]" style={{ boxShadow: 'var(--shadow-sm)' }}>
      {/* Header Badge - Competition Name */}
      <div className="px-4 py-2 text-center bg-[rgb(var(--brand-black))] text-[rgb(var(--white))]">
        <span className="text-sm font-bold uppercase tracking-wide">
          {competitionName}
        </span>
      </div>

      <div className="p-3 space-y-2">
        {/* Logo / VS section */}
        <div className="flex items-center justify-between py-2">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            <TeamLogo
              // Note: Mobile TeamLogo expects logoUrl prop in your codebase
              logoUrl={fixture.home_team_logo}
              teamName={fixture.home_team_name || fixture.home_team}
              size="md"
            />
            <p className="text-sm text-[rgb(var(--brand-black))] mt-1 text-center font-semibold">
              {fixture.home_team_name || fixture.home_team}
            </p>
          </div>

          {/* VS */}
          <div className="flex-shrink-0 mx-3">
            <div className="text-center">
              <div className="text-xl font-semibold text-[rgb(var(--dark-gray))]">
                vs
              </div>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            <TeamLogo
              logoUrl={fixture.away_team_logo}
              teamName={fixture.away_team_name || fixture.away_team}
              size="md"
            />
            <p className="text-sm text-[rgb(var(--brand-black))] mt-1 text-center font-semibold">
              {fixture.away_team_name || fixture.away_team}
            </p>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center text-sm text-[rgb(var(--dark-gray))]">
          <MapPin className="h-4 w-4 mr-1 text-[rgb(var(--gray))]" />
          <span className="font-medium">{fixture.venue || 'TBD'}</span>
        </div>

        {/* Date/Time */}
        <div className="flex items-center justify-center text-sm text-[rgb(var(--dark-gray))]">
          <Calendar className="h-4 w-4 mr-1 text-[rgb(var(--gray))]" />
          <span className="font-medium">
            {formatDate(fixture.match_date)} • {formatTime(fixture.match_time)}
          </span>
        </div>
      </div>

      {/* Action row */}
      <div className="px-4 py-1 border-t border-[rgb(var(--medium-gray))] bg-[rgb(var(--warm-gray))] flex justify-center">
        <div className="flex space-x-8">
          <button
            onClick={() => {
              if (fixture.ticket_link && onTicketClick) {
                onTicketClick(fixture.ticket_link);
              } else {
                console.log('Ticket click - no link available');
              }
            }}
            className={`flex flex-col items-center p-1 rounded transition-colors min-h-[44px] min-w-[44px] ${
              fixture.ticket_link
                ? 'hover:bg-[rgb(var(--white))] cursor-pointer'
                : 'cursor-default'
            }`}
            disabled={!fixture.ticket_link}
            aria-label="Buy tickets"
          >
            <Ticket
              className={`h-5 w-5 ${
                fixture.ticket_link
                  ? 'text-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))]'
                  : 'text-[rgb(var(--medium-gray))]'
              }`}
            />
            <span
              className={`text-xs mt-1 font-medium ${
                fixture.ticket_link
                  ? 'text-[rgb(var(--dark-gray))]'
                  : 'text-[rgb(var(--medium-gray))]'
              }`}
            >
              Tickets
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
