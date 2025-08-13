"use client";

import React from 'react';
import { format, parseISO } from 'date-fns';
import { Ticket } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface FixtureCardProps {
  fixture: any;
}

export function FixtureCard({ fixture }: FixtureCardProps) {
  return (
    <div className="bg-[rgb(var(--white))] rounded-md shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-[rgb(var(--medium-gray))] overflow-hidden mb-4">
      {/* Header bar */}
      <div className="bg-[rgb(var(--brand-black))] px-4 py-2 flex justify-between items-center">
        <div className="text-sm font-medium text-[rgb(var(--white))]">
          {fixture.competition}
        </div>
        <div className="text-xs bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))] font-medium px-2 py-1 rounded">
          UPCOMING MATCH
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          {/* Home team */}
          <div className="text-center w-5/12">
            <TeamLogo
              logoId={fixture.home_team_logo}
              teamName={fixture.home_team}
              size="md"
              className="mx-auto mb-2 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="font-medium text-[rgb(var(--brand-black))] text-sm">
              {fixture.home_team}
            </div>
          </div>

          {/* VS */}
          <div className="text-xl font-bold text-[rgb(var(--dark-gray))] w-2/12 text-center">
            VS
          </div>

          {/* Away team */}
          <div className="text-center w-5/12">
            <TeamLogo
              logoId={fixture.away_team_logo}
              teamName={fixture.away_team}
              size="md"
              className="mx-auto mb-2 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="font-medium text-[rgb(var(--brand-black))] text-sm">
              {fixture.away_team}
            </div>
          </div>
        </div>

        {/* Match meta */}
        <div className="border-t border-[rgb(var(--medium-gray))] mt-4 pt-4 grid grid-cols-3 items-center">
          {/* Date/time */}
          <div className="text-left text-sm text-[rgb(var(--dark-gray))]">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-[rgb(var(--gray))] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {format(parseISO(fixture.match_date), 'EEE d MMM yyyy')}
                {fixture.match_time && ` • ${fixture.match_time.substring(0, 5)}`}
              </span>
            </div>
          </div>

          {/* Venue */}
          <div className="text-center text-sm text-[rgb(var(--dark-gray))]">
            <div className="flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-1 text-[rgb(var(--gray))] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{fixture.venue || 'TBD'}</span>
            </div>
          </div>

          {/* Ticket link */}
          <div className="text-right">
            <a
              href={fixture.ticket_link || '#'}
              className={`${
                fixture.ticket_link
                  ? 'text-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))]'
                  : 'text-[rgb(var(--medium-gray))] cursor-default'
              } transition-colors inline-block`}
              title="Buy Tickets"
              onClick={(e) => !fixture.ticket_link && e.preventDefault()}
            >
              <Ticket className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
