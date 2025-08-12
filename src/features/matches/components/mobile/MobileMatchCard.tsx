"use client";
import React from "react";
import { Calendar, MapPin, Camera, FileText, Ticket } from "lucide-react";
import { TeamLogo } from "../common/TeamLogo";

interface MatchInfo {
  id: string;
  match_date: string;
  match_time?: string;
  venue: string;
  status: string;
  home_team_name: string;
  away_team_name: string;
  home_team_logo?: string;
  away_team_logo?: string;
  home_score?: number;
  away_score?: number;
  competition: {
    id: string;
    name: string;
    short_name?: string;
  };
  ticket_link?: string;
  match_report_link?: string;
  gallery_link?: string;
}

interface MobileMatchCardProps {
  match: MatchInfo;
  matchType: "FINAL RESULT" | "NEXT MATCH" | "UPCOMING MATCH" | "LAST RESULT";
  onGalleryClick?: (galleryId: string) => void;
  onReportClick?: (reportId: string) => void;
  onTicketClick?: (ticketUrl: string) => void;
}

export function MobileMatchCard({
  match,
  matchType,
  onGalleryClick,
  onReportClick,
  onTicketClick,
}: MobileMatchCardProps) {
  const isNextMatch = matchType === "NEXT MATCH";
  const isFinalResult = matchType === "FINAL RESULT" || matchType === "LAST RESULT";
  const isUpcoming = !isFinalResult;

  const competitionName =
    match.competition?.short_name ??
    match.competition?.name ??
    (typeof match.competition === "string" ? match.competition : "League");

  const formatDate = (dateString?: string): string => {
    try {
      if (!dateString) return "TBA";
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return "TBA";
      const day = date.getDate();
      const month = date.toLocaleString("en-GB", { month: "short" });
      const weekday = date.toLocaleString("en-GB", { weekday: "short" });
      return `${weekday} ${day} ${month}`;
    } catch {
      return "TBA";
    }
  };

  const formatTime = (timeString?: string): string =>
    !timeString ? "" : timeString.includes(":") ? timeString.substring(0, 5) : timeString;

  const dateISO = (() => {
    try {
      const d = match?.match_date ? new Date(match.match_date) : null;
      return d && !Number.isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : undefined;
    } catch {
      return undefined;
    }
  })();
  const timeDisplay = formatTime(match?.match_time);
  const timeISO = dateISO && timeDisplay ? `${dateISO}T${timeDisplay}:00` : undefined;

  const btnBase =
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--white))]";
  const enabled = "text-link hover:text-link-hover";
  const disabled = "text-text-muted cursor-default pointer-events-none opacity-50";

  return (
    <div
      className={`w-full bg-[rgb(var(--white))] rounded-lg shadow-sm overflow-hidden ${
        isNextMatch ? "border border-accent" : "border border-separator"
      }`}
      role="article"
      aria-label={`${match?.home_team_name ?? "Home Team"} vs ${match?.away_team_name ?? "Away Team"}`}
    >
      {/* 1) Header badge */}
      <div
        className={`px-4 py-2 text-center ${
          isNextMatch
            ? "bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))]"
            : "bg-[rgb(var(--white))] border-b border-separator text-text-strong"
        }`}
      >
        <span className="text-sm font-bold uppercase tracking-wide">
          {isFinalResult ? "FINAL RESULT" : matchType}
        </span>
      </div>

      <div className="p-3 space-y-2">
        {/* 2) Competition */}
        <div className="text-center">
          <p className="text-sm text-text-muted font-medium truncate">{competitionName}</p>
        </div>

        {/* 3) Logos & score */}
        <div className="flex items-center justify-between py-2">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            <TeamLogo logoUrl={match.home_team_logo} teamName={match.home_team_name} size="md" />
            <p className="text-sm text-text-strong mt-1 text-center font-semibold">
              {match.home_team_name}
            </p>
          </div>

          {/* Score / VS */}
          <div className="flex-shrink-0 mx-3">
            {isFinalResult && match.home_score !== undefined && match.away_score !== undefined ? (
              <div className="text-center">
                <div className="text-3xl font-semibold text-text-strong">
                  {match.home_score} - {match.away_score}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-xl font-semibold text-text-muted">VS</div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            <TeamLogo logoUrl={match.away_team_logo} teamName={match.away_team_name} size="md" />
            <p className="text-sm text-text-strong mt-1 text-center font-semibold">
              {match.away_team_name}
            </p>
          </div>
        </div>

        {/* 4) Venue */}
        {match?.venue && (
          <div className="flex items-center justify-center text-sm text-text-muted">
            <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
            <span className="font-medium">{match.venue}</span>
          </div>
        )}

        {/* 5) Date/Time */}
        <div className="flex items-center justify-center text-sm text-text-muted">
          <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
          <span>
            <time dateTime={dateISO}>{formatDate(match.match_date)}</time>
            {timeDisplay && (
              <>
                {" "}
                • <time dateTime={timeISO}>{timeDisplay}</time>
              </>
            )}
          </span>
        </div>
      </div>

      {/* 6) Actions */}
      <div className="px-4 py-1 border-t border-separator bg-[rgb(var(--warm-gray))] flex justify-center">
        <div className="flex space-x-8">
          {isUpcoming ? (
            <button
              onClick={() => match.ticket_link && onTicketClick?.(match.ticket_link)}
              className={`flex flex-col items-center p-1 rounded min-h-[44px] min-w-[44px] ${
                match.ticket_link ? enabled : disabled
              } ${btnBase}`}
              disabled={!match.ticket_link}
              aria-label="Buy tickets"
              type="button"
            >
              <Ticket className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs mt-1 font-medium">Tickets</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => match.gallery_link && onGalleryClick?.(match.gallery_link)}
                className={`flex flex-col items-center p-1 rounded min-h-[44px] min-w-[44px] ${
                  match.gallery_link ? enabled : disabled
                } ${btnBase}`}
                disabled={!match.gallery_link}
                aria-label="View gallery"
                type="button"
              >
                <Camera className="h-5 w-5" aria-hidden="true" />
                <span className="text-xs mt-1 font-medium">Gallery</span>
              </button>

              <button
                onClick={() => match.match_report_link && onReportClick?.(match.match_report_link)}
                className={`flex flex-col items-center p-1 rounded min-h-[44px] min-w-[44px] ${
                  match.match_report_link ? enabled : disabled
                } ${btnBase}`}
                disabled={!match.match_report_link}
                aria-label="Read report"
                type="button"
              >
                <FileText className="h-5 w-5" aria-hidden="true" />
                <span className="text-xs mt-1 font-medium">Report</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
