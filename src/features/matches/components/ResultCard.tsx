"use client";

import React from 'react';
import { format, parseISO } from 'date-fns';
import { FileText, Camera } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface ResultCardProps {
  result: any;
  onGalleryClick?: (galleryId: string) => void;
  onReportClick?: (reportId: string) => void;
}

export function ResultCard({ result, onGalleryClick, onReportClick }: ResultCardProps) {
  return (
    <div
      className="bg-[rgb(var(--white))] rounded-md transition-all duration-300 hover:-translate-y-1 border border-[rgb(var(--medium-gray))] overflow-hidden mb-4"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Header bar */}
      <div className="bg-[rgb(var(--brand-black))] px-4 py-2 flex justify-between items-center">
        <div className="text-sm font-medium text-[rgb(var(--white))]">
          {result.competition}
        </div>
        <div className="text-xs bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))] font-medium px-2 py-1 rounded">
          FINAL RESULT
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          {/* Home team */}
          <div className="text-center w-5/12">
            <TeamLogo
              logoId={result.home_team_logo}
              teamName={result.home_team}
              size="md"
              className="mx-auto mb-2 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="font-medium text-[rgb(var(--brand-black))] text-sm">
              {result.home_team}
            </div>
          </div>

          {/* Score */}
          <div className="text-xl font-bold w-2/12 text-center text-[rgb(var(--brand-black))]">
            {result.home_score} - {result.away_score}
          </div>

          {/* Away team */}
          <div className="text-center w-5/12">
            <TeamLogo
              logoId={result.away_team_logo}
              teamName={result.away_team}
              size="md"
              className="mx-auto mb-2 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="font-medium text-[rgb(var(--brand-black))] text-sm">
              {result.away_team}
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="border-t border-[rgb(var(--medium-gray))] mt-4 pt-4 grid grid-cols-3 items-center">
          {/* Date */}
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
              <span>{format(parseISO(result.match_date), 'EEE d MMM yyyy')}</span>
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
              <span>{result.venue || 'TBD'}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="text-right">
            <div className="flex space-x-3 justify-end">
              {/* Match report (button for callbacks) */}
              <button
                className={`${
                  result.match_report_link
                    ? 'text-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))]'
                    : 'text-[rgb(var(--medium-gray))] cursor-default'
                } transition-colors`}
                title="Match Report"
                onClick={(e) => {
                  e.preventDefault();
                  if (result.match_report_link && onReportClick) {
                    onReportClick(result.match_report_link);
                  }
                }}
                disabled={!result.match_report_link}
                aria-disabled={!result.match_report_link}
              >
                <FileText className="w-5 h-5" />
              </button>

              {/* Gallery (anchor for deep link, with optional callback) */}
              <a
                href={result.gallery_link || '#'}
                className={`${
                  result.gallery_link
                    ? 'text-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))]'
                    : 'text-[rgb(var(--medium-gray))] cursor-default'
                } transition-colors`}
                title="Photo Gallery"
                onClick={(e) => {
                  if (!result.gallery_link) {
                    e.preventDefault();
                    return;
                  }
                  // If a handler is provided, use it to open a modal/lightbox, etc.
                  if (onGalleryClick) {
                    e.preventDefault();
                    onGalleryClick(result.gallery_link);
                  }
                }}
                aria-disabled={!result.gallery_link}
              >
                <Camera className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
