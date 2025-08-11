"use client";
import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { TeamLogo } from "./TeamLogo";

interface MatchCardProps {
  match: any;
  matchType?: "FINAL RESULT" | "NEXT MATCH" | "UPCOMING MATCH";
  isCurrentMatch?: boolean;
  onGalleryClick?: (galleryId: string) => void;
  onReportClick?: (reportId: string) => void;
  onTicketClick?: (ticketUrl: string) => void;
}

/** Brand-clean: tokens only, no hex; neutral defaults. */
export const MatchCard = React.memo(function MatchCard({
  match,
  matchType = "UPCOMING MATCH",
  isCurrentMatch = false,
  onGalleryClick,
  onReportClick,
  onTicketClick,
}: MatchCardProps) {
  const isNextMatch = matchType === "NEXT MATCH" || isCurrentMatch;
  const isResult = matchType === "FINAL RESULT";
  const isUpcoming = matchType !== "FINAL RESULT"; // upcoming OR next

  // Prefer short_name when available for tighter UI
  const competitionName =
    match?.competition?.short_name ??
    match?.competition?.name ??
    (typeof match?.competition === "string" ? match.competition : "League");

  // Date helpers
  const toISODate = (dateString?: string) => {
    try {
      if (!dateString) return undefined;
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return undefined;
      return d.toISOString().slice(0, 10);
    } catch {
      return undefined;
    }
  };

  const formatDate = (dateString?: string): string => {
    try {
      if (!dateString) return "TBA";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "TBA";
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

  const dateISO = toISODate(match?.match_date);
  const timeDisplay = formatTime(match?.match_time);
  const timeISO = dateISO && timeDisplay ? `${dateISO}T${timeDisplay}:00` : undefined;

  // Icon click handlers
  const handleGalleryClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (match?.gallery_link && onGalleryClick) onGalleryClick(match.gallery_link);
  };

  const handleReportClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (match?.match_report_link && onReportClick) onReportClick(match.match_report_link);
  };

  const handleTicketClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (match?.ticket_link) {
      if (onTicketClick) onTicketClick(match.ticket_link);
      else window.open(match.ticket_link, "_blank");
    }
  };

  const btnBase =
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
  const enabled = "text-link hover:text-link-hover";
  const disabled = "text-text-muted cursor-default pointer-events-none opacity-50";

  return (
    <div
      className={`w-full rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md
        ${isNextMatch ? "border-accent border" : "border border-separator"}`}
      role="article"
      aria-label={`${match?.home_team_name ?? "Home Team"} vs ${match?.away_team_name ?? "Away Team"}`}
    >
      {/* Card surface */}
      <div className="h-full bg-white">
        {/* Header */}
        <div
          className={`px-4 py-3 text-center ${
            isNextMatch ? "bg-accent" : "bg-white border-b border-separator"
          }`}
        >
          <div
            className={`text-sm font-semibold uppercase tracking-wide ${
              isNextMatch ? "text-white" : "text-text-strong"
            }`}
          >
            {matchType}
          </div>
        </div>

        {/* Competition */}
        <div className="px-4 py-2 text-center border-b border-separator">
          <div className="text-xs text-text-muted font-medium truncate">{competitionName}</div>
        </div>

        {/* Teams + score/vs */}
        <div className="px-4 py-6">
          <div className="flex justify-between items-center">
            {/* Home */}
            <div className="text-center w-5/12">
              <TeamLogo
                logoUrl={match?.home_team_logo || match?.home_team?.logo_url}
                teamName={match?.home_team_name || match?.home_team?.name || "Home Team"}
                className="mx-auto"
              />
            </div>

            {/* Middle */}
            <div className="text-center w-2/12">
              {isResult ? (
                <div className="text-2xl font-bold font-heading text-text-strong">
                  {(match?.home_score ?? 0)} - {(match?.away_score ?? 0)}
                </div>
              ) : (
                <div className="text-2xl font-bold text-text-muted">VS</div>
              )}
            </div>

            {/* Away */}
            <div className="text-center w-5/12">
              <TeamLogo
                logoUrl={match?.away_team_logo || match?.away_team?.logo_url}
                teamName={match?.away_team_name || match?.away_team?.name || "Away Team"}
                className="mx-auto"
              />
            </div>
          </div>

          {/* Venue */}
          {match?.venue && (
            <div className="flex items-center justify-center text-text-muted text-xs mt-3">
              <MapPin className="h-3 w-3 mr-1" aria-hidden="true" />
              <span>{match.venue}</span>
            </div>
          )}
        </div>

        {/* Footer: date, time, actions */}
        <div className="px-4 py-3 border-t border-separator bg-light-gray flex justify-between items-center">
          {/* Date + time */}
          <div className="flex items-center text-text-muted text-xs">
            <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
            <span>
              <time dateTime={dateISO}>{formatDate(match?.match_date)}</time>
              {timeDisplay && (
                <>
                  {" "}
                  • <time dateTime={timeISO}>{timeDisplay}</time>
                </>
              )}
            </span>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            {isUpcoming ? (
              // Ticket for upcoming
              <button
                type="button"
                onClick={handleTicketClick}
                className={`${match?.ticket_link ? enabled : disabled} ${btnBase}`}
                title="Buy Tickets"
                disabled={!match?.ticket_link}
                aria-disabled={!match?.ticket_link}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                <span className="sr-only">Buy Tickets</span>
              </button>
            ) : (
              // Report + Gallery for results
              <>
                <button
                  type="button"
                  onClick={handleReportClick}
                  className={`${match?.match_report_link ? enabled : disabled} ${btnBase}`}
                  title="Match Report"
                  disabled={!match?.match_report_link}
                  aria-disabled={!match?.match_report_link}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="sr-only">Match Report</span>
                </button>

                <button
                  type="button"
                  onClick={handleGalleryClick}
                  className={`${match?.gallery_link ? enabled : disabled} ${btnBase}`}
                  title="Photo Gallery"
                  disabled={!match?.gallery_link}
                  aria-disabled={!match?.gallery_link}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="sr-only">Photo Gallery</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
