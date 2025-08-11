"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MobileMatchCard } from "./MobileMatchCard";
import { MobileLeagueTable } from "./MobileLeagueTable";

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

interface MobileMatchSectionProps {
  recentMatches: MatchInfo[];
  upcomingMatches: MatchInfo[];
  leagueData?: {
    position: number;
    points: number;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    form: ("W" | "L" | "D")[];
    goalDifference?: number;
    competitionName?: string;
    seasonName?: string;
    clubName?: string;
  };
  leagueTable?: any[];
  onGalleryClick?: (galleryId: string) => void;
  onReportClick?: (reportId: string) => void;
  onTicketClick?: (ticketUrl: string) => void;
}

export function MobileMatchSection({
  recentMatches = [],
  upcomingMatches = [],
  leagueData,
  leagueTable = [],
  onGalleryClick,
  onReportClick,
  onTicketClick,
}: MobileMatchSectionProps) {
  // Most recent completed match (newest first)
  const lastResult = useMemo(() => {
    try {
      const completed = (recentMatches || []).filter(
        (m) => m && (m.status === "completed" || m.home_score !== undefined)
      );
      completed.sort((a, b) => {
        const da = a?.match_date ? new Date(a.match_date).getTime() : 0;
        const db = b?.match_date ? new Date(b.match_date).getTime() : 0;
        return db - da; // newest first
      });
      return completed[0] || null;
    } catch {
      return null;
    }
  }, [recentMatches]);

  // Next & upcoming matches (soonest first)
  const { nextMatch, upcomingMatch } = useMemo(() => {
    try {
      const filtered = (upcomingMatches || [])
        .filter((m) => m && m.status !== "completed" && m.home_score === undefined)
        .sort((a, b) => {
          const da = a?.match_date ? new Date(a.match_date).getTime() : Number.MAX_SAFE_INTEGER;
          const db = b?.match_date ? new Date(b.match_date).getTime() : Number.MAX_SAFE_INTEGER;
          return da - db; // soonest first
        });

      return {
        nextMatch: filtered[0] || null,
        upcomingMatch: filtered[1] || null,
      };
    } catch {
      return { nextMatch: null, upcomingMatch: null };
    }
  }, [upcomingMatches]);

  return (
    <div className="w-full space-y-6">
      {/* Match Cards Section */}
      <div className="space-y-4">
        {/* 1) Final Result (centered contents) */}
        {lastResult ? (
          <MobileMatchCard
            match={lastResult}
            matchType="FINAL RESULT"
            onGalleryClick={onGalleryClick}
            onReportClick={onReportClick}
            onTicketClick={onTicketClick}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-separator">
            <div className="text-center text-text-muted">
              <p className="text-sm">No recent results to display</p>
            </div>
          </div>
        )}

        {/* 2) Next Match */}
        {nextMatch ? (
          <MobileMatchCard
            match={nextMatch}
            matchType="NEXT MATCH"
            onGalleryClick={onGalleryClick}
            onReportClick={onReportClick}
            onTicketClick={onTicketClick}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-separator">
            <div className="text-center text-text-muted">
              <p className="text-sm">No next match to display</p>
            </div>
          </div>
        )}

        {/* 3) Upcoming Match */}
        {upcomingMatch ? (
          <MobileMatchCard
            match={upcomingMatch}
            matchType="UPCOMING MATCH"
            onGalleryClick={onGalleryClick}
            onReportClick={onReportClick}
            onTicketClick={onTicketClick}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-separator">
            <div className="text-center text-text-muted">
              <p className="text-sm">No additional upcoming matches</p>
            </div>
          </div>
        )}

        {/* 4) View All Matches (centered) */}
        <div className="pt-2 text-center">
          <Link
            href="/matches"
            className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors font-medium
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40
                       focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label="View all matches"
          >
            <span>View All Matches</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* League Table Section (divider, then pass through) */}
      <div className="pt-4 border-t border-separator text-center">
        <MobileLeagueTable
          leagueTable={leagueTable}
          /* Legacy prop kept for compatibility */
          banksODeePosition={leagueData?.position || 0}
        />
      </div>
    </div>
  );
}
