"use client";
import React from 'react';
import { Calendar, MapPin, Camera, FileText } from 'lucide-react';
import { TeamLogo } from '../common/TeamLogo';

interface MobileResultCardProps {
  result: any;
  onGalleryClick?: (galleryId: string) => void;
  onReportClick?: (reportId: string) => void;
}

export function MobileResultCard({
  result,
  onGalleryClick,
  onReportClick
}: MobileResultCardProps) {
  // Competition handling with fallbacks (updated default)
  const competitionName =
    result.competition?.name ||
    (typeof result.competition === 'string' ? result.competition : 'UAE Second Division');

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

  return (
    <div
      className="w-full rounded-lg overflow-hidden border border-[rgb(var(--medium-gray))] bg-[rgb(var(--white))]"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Header Badge - Competition Name */}
      <div className="px-4 py-2 text-center bg-[rgb(var(--brand-black))] text-[rgb(var(--white))]">
        <span className="text-sm font-bold uppercase tracking-wide">
          {competitionName}
        </span>
      </div>

      <div className="p-3 space-y-2">
        {/* Logo / Score Section */}
        <div className="flex items-center justify-between py-2">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            <TeamLogo
              logoUrl={result.home_team_logo}
              teamName={result.home_team_name || result.home_team}
              size="md"
            />
            <p className="text-sm text-[rgb(var(--brand-black))] mt-1 text-center font-semibold">
              {result.home_team_name || result.home_team}
            </p>
          </div>

          {/* Score */}
          <div className="flex-shrink-0 mx-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-[rgb(var(--brand-black))]">
                {result.home_score ?? 0} - {result.away_score ?? 0}
              </div>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            <TeamLogo
              logoUrl={result.away_team_logo}
              teamName={result.away_team_name || result.away_team}
              size="md"
            />
            <p className="text-sm text-[rgb(var(--brand-black))] mt-1 text-center font-semibold">
              {result.away_team_name || result.away_team}
            </p>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center text-sm text-[rgb(var(--dark-gray))]">
          <MapPin className="h-4 w-4 mr-1 text-[rgb(var(--gray))]" />
          <span className="font-medium">{result.venue || 'TBD'}</span>
        </div>

        {/* Date */}
        <div className="flex items-center justify-center text-sm text-[rgb(var(--dark-gray))]">
          <Calendar className="h-4 w-4 mr-1 text-[rgb(var(--gray))]" />
          <span className="font-medium">{formatDate(result.match_date)}</span>
        </div>
      </div>

      {/* Action row - Gallery + Report */}
      <div className="px-4 py-1 border-t border-[rgb(var(--medium-gray))] bg-[rgb(var(--warm-gray))] flex justify-center">
        <div className="flex space-x-8">
          {/* Gallery */}
          <button
            onClick={() => {
              if (result.gallery_link && onGalleryClick) onGalleryClick(result.gallery_link);
              else console.log('Gallery click - no link available');
            }}
            className={`flex flex-col items-center p-1 rounded transition-colors min-h-[44px] min-w-[44px] ${
              result.gallery_link ? 'hover:bg-[rgb(var(--white))] cursor-pointer' : 'cursor-default'
            }`}
            disabled={!result.gallery_link}
            aria-label="View gallery"
          >
            <Camera
              className={`h-5 w-5 ${
                result.gallery_link
                  ? 'text-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))]'
                  : 'text-[rgb(var(--medium-gray))]'
              }`}
            />
            <span
              className={`text-xs mt-1 font-medium ${
                result.gallery_link ? 'text-[rgb(var(--dark-gray))]' : 'text-[rgb(var(--medium-gray))]'
              }`}
            >
              Gallery
            </span>
          </button>

          {/* Report */}
          <button
            onClick={() => {
              if (result.match_report_link && onReportClick) onReportClick(result.match_report_link);
              else console.log('Report click - no link available');
            }}
            className={`flex flex-col items-center p-1 rounded transition-colors min-h-[44px] min-w-[44px] ${
              result.match_report_link ? 'hover:bg-[rgb(var(--white))] cursor-pointer' : 'cursor-default'
            }`}
            disabled={!result.match_report_link}
            aria-label="Read report"
          >
            <FileText
              className={`h-5 w-5 ${
                result.match_report_link
                  ? 'text-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))]'
                  : 'text-[rgb(var(--medium-gray))]'
              }`}
            />
            <span
              className={`text-xs mt-1 font-medium ${
                result.match_report_link ? 'text-[rgb(var(--dark-gray))]' : 'text-[rgb(var(--medium-gray))]'
              }`}
            >
              Report
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
