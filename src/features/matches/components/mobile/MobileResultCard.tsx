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
  
  // Competition handling with fallbacks
  const competitionName = 
    result.competition?.name || 
    (typeof result.competition === 'string' ? result.competition : 'Scottish Highland Football League');
  
  // Format date to "Sat 12 Apr" format
  const formatDate = (dateString: string): string => {
    try {
      if (!dateString) return 'TBA';
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('en-GB', { month: 'short' });
      const weekday = date.toLocaleString('en-GB', { weekday: 'short' });
      return `${weekday} ${day} ${month}`;
    } catch (e) {
      return 'TBA';
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden border border-[#e5e7eb]">
      {/* Header Badge - Competition Name (same as fixtures) */}
      <div className="px-4 py-2 text-center bg-[#00105A] text-white">
        <span className="text-sm font-bold uppercase tracking-wide">
          {competitionName}
        </span>
      </div>

      <div className="p-3 space-y-2">
        {/* Logo/Score Section - No competition name here */}
        <div className="flex items-center justify-between py-2">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            <TeamLogo 
              logoUrl={result.home_team_logo} 
              teamName={result.home_team_name || result.home_team}
              size="md"
            />
            <p className="text-sm text-[#374151] mt-1 text-center font-semibold">
              {result.home_team_name || result.home_team}
            </p>
          </div>

          {/* Score Section */}
          <div className="flex-shrink-0 mx-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00105A]">
                {result.home_score || 0} - {result.away_score || 0}
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
            <p className="text-sm text-[#374151] mt-1 text-center font-semibold">
              {result.away_team_name || result.away_team}
            </p>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center text-sm text-[#6b7280]">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="font-medium">{result.venue || 'Spain Park'}</span>
        </div>

        {/* Date */}
        <div className="flex items-center justify-center text-sm text-[#6b7280]">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="font-medium">{formatDate(result.match_date)}</span>
        </div>
      </div>

      {/* Action Icons - Gallery + Report for results */}
      <div className="px-4 py-1 border-t border-[#e5e7eb] bg-[#f9fafb] flex justify-center">
        <div className="flex space-x-8">
          <button
            onClick={() => {
              if (result.gallery_link && onGalleryClick) {
                onGalleryClick(result.gallery_link);
              } else {
                console.log('Gallery click - no link available');
              }
            }}
            className={`flex flex-col items-center p-1 rounded transition-colors min-h-[44px] min-w-[44px] ${
              result.gallery_link 
                ? 'hover:bg-[#C5E7FF] cursor-pointer' 
                : 'cursor-default'
            }`}
            disabled={!result.gallery_link}
            aria-label="View gallery"
          >
            <Camera className={`h-5 w-5 ${
              result.gallery_link ? 'text-[#00105A]' : 'text-[#9CA3AF]'
            }`} />
            <span className={`text-xs mt-1 font-medium ${
              result.gallery_link ? 'text-[#6b7280]' : 'text-[#9CA3AF]'
            }`}>
              Gallery
            </span>
          </button>
          
          <button
            onClick={() => {
              if (result.match_report_link && onReportClick) {
                onReportClick(result.match_report_link);
              } else {
                console.log('Report click - no link available');
              }
            }}
            className={`flex flex-col items-center p-1 rounded transition-colors min-h-[44px] min-w-[44px] ${
              result.match_report_link 
                ? 'hover:bg-[#C5E7FF] cursor-pointer' 
                : 'cursor-default'
            }`}
            disabled={!result.match_report_link}
            aria-label="Read report"
          >
            <FileText className={`h-5 w-5 ${
              result.match_report_link ? 'text-[#00105A]' : 'text-[#9CA3AF]'
            }`} />
            <span className={`text-xs mt-1 font-medium ${
              result.match_report_link ? 'text-[#6b7280]' : 'text-[#9CA3AF]'
            }`}>
              Report
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
