"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MatchCard } from "../common/MatchCard";
import { LeaguePositionSummary } from "../common/LeaguePositionSummary";
import SectionHeader from "@/components/ui/sections/SectionHeader";

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

interface MatchCarouselProps {
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
    // Optional extras (for League header/KPIs)
    goalDifference?: number;
    competitionName?: string; // Supabase: competition_name
    seasonName?: string;      // Supabase: season_name
    clubName?: string;        // Supabase: team_name
  };
  showHeader?: boolean;
  onGalleryClick?: (galleryId: string) => void;
  onReportClick?: (reportId: string) => void;
  onTicketClick?: (ticketUrl: string) => void;
}

const CARD_W = 360; // must match Tailwind width classes below
const GAP_PX = 24;  // space-x-6 (1.5rem)

export function MatchCarousel({
  recentMatches = [],
  upcomingMatches = [],
  leagueData,
  showHeader = false,
  onGalleryClick,
  onReportClick,
  onTicketClick,
}: MatchCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasInitiallyCentered, setHasInitiallyCentered] = useState(false);

  // Organize matches (results → next → upcoming)
  const { matches: organizedMatches, nextMatchIndex } = React.useMemo(() => {
    try {
      const sortedRecent = [...recentMatches]
        .filter((m) => !!m && (m.status === "completed" || m.home_score !== undefined))
        .sort((a, b) => {
          if (!a.match_date || !b.match_date) return 0;
          return new Date(b.match_date).getTime() - new Date(a.match_date).getTime();
        })
        .slice(0, 3)
        .reverse();

      const sortedUpcoming = [...upcomingMatches]
        .filter((m) => !!m && m.status !== "completed" && m.home_score === undefined)
        .sort((a, b) => {
          if (!a.match_date || !b.match_date) return 0;
          return new Date(a.match_date).getTime() - new Date(b.match_date).getTime();
        });

      const nextMatch = sortedUpcoming.length > 0 ? [sortedUpcoming[0]] : [];
      const additionalUpcoming = sortedUpcoming.slice(1, 4);

      return {
        matches: [...sortedRecent, ...nextMatch, ...additionalUpcoming],
        nextMatchIndex: sortedRecent.length,
      };
    } catch {
      return { matches: [], nextMatchIndex: -1 };
    }
  }, [recentMatches, upcomingMatches]);

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -(CARD_W + GAP_PX), behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: CARD_W + GAP_PX, behavior: "smooth" });
    }
  };

  const checkScrollState = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 0);
      setCanScrollRight(
        carouselRef.current.scrollLeft <
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth
      );
    }
  };

  // Keyboard nav on the scroller
  const handleKeyNav: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleScrollLeft();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleScrollRight();
    }
  };

  // Center the next match card on initial load ONLY (respect reduced motion)
  useEffect(() => {
    if (carouselRef.current && nextMatchIndex >= 0 && !hasInitiallyCentered) {
      const scrollTo = nextMatchIndex * (CARD_W + GAP_PX);
      const containerWidth = carouselRef.current.offsetWidth;
      const centerOffset = (containerWidth - CARD_W) / 2;

      const id = window.setTimeout(() => {
        const prefersReduced =
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
          setHasInitiallyCentered(true);
          return;
        }

        if (carouselRef.current) {
          carouselRef.current.scrollLeft = Math.max(0, scrollTo - centerOffset);
          checkScrollState();
          setHasInitiallyCentered(true);
        }
      }, 100);

      return () => window.clearTimeout(id);
    }
  }, [nextMatchIndex, organizedMatches, hasInitiallyCentered]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);
    checkScrollState();
    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, []);

  if (organizedMatches.length === 0) {
    return (
      <div className="w-full bg-white rounded-md shadow-sm p-8 flex items-center justify-center border border-separator">
        <p className="text-text-muted">No upcoming or recent matches to display</p>
      </div>
    );
  }

  return (
    <div>
      {showHeader && (
        <SectionHeader
          title="Match Centre"
          rightSlot={
            <Link
              href="/matches"
              className="text-link hover:text-link-hover transition-colors inline-flex items-center gap-2
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40
                         focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label="View all matches"
            >
              <span className="text-sm font-medium">View All Matches</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          }
        />
      )}

      <div
        className="relative w-full overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Match carousel"
      >
        {/* Left navigation arrow */}
        <button
          type="button"
          onClick={handleScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-separator rounded-full shadow-sm p-2
                      hover:bg-[rgb(var(--light-gray))] focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                      ${canScrollLeft ? "opacity-100" : "opacity-40 cursor-not-allowed pointer-events-none"}`}
          disabled={!canScrollLeft}
          aria-disabled={!canScrollLeft}
          aria-controls="match-carousel-track"
          aria-label="Previous matches"
        >
          <ChevronLeft className="h-5 w-5 text-text-strong" />
        </button>

        {/* Match carousel */}
        <div
          ref={carouselRef}
          id="match-carousel-track"
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-6 pt-2 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          aria-label="Match carousel items"
          tabIndex={0}
          onKeyDown={handleKeyNav}
        >
          {organizedMatches.map((match, index) => {
            const isResult =
              match.status === "completed" || match.home_score !== undefined;
            const matchType =
              isResult && index < nextMatchIndex
                ? "FINAL RESULT"
                : index === nextMatchIndex
                ? "NEXT MATCH"
                : "UPCOMING MATCH";

            return (
              <div
                key={match.id ?? `${match.match_date}-${index}`}
                className="min-w-[360px] w-[360px] flex-shrink-0"
              >
                <MatchCard
                  match={match}
                  matchType={
                    matchType as "FINAL RESULT" | "NEXT MATCH" | "UPCOMING MATCH"
                  }
                  isCurrentMatch={index === nextMatchIndex}
                  onGalleryClick={onGalleryClick}
                  onReportClick={onReportClick}
                  onTicketClick={onTicketClick}
                />
              </div>
            );
          })}
        </div>

        {/* Right navigation arrow */}
        <button
          type="button"
          onClick={handleScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-separator rounded-full shadow-sm p-2
                      hover:bg-[rgb(var(--light-gray))] focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                      ${canScrollRight ? "opacity-100" : "opacity-40 cursor-not-allowed pointer-events-none"}`}
          disabled={!canScrollRight}
          aria-disabled={!canScrollRight}
          aria-controls="match-carousel-track"
          aria-label="Next matches"
        >
          <ChevronRight className="h-5 w-5 text-text-strong" />
        </button>
      </div>

      {/* League table summary section */}
      {leagueData && (
        <div
          className="mt-8 pt-6 border-t border-separator"
          role="region"
          aria-label="League table summary"
          aria-live="polite"
        >
          <LeaguePositionSummary
            position={leagueData.position}
            played={leagueData.played}
            won={leagueData.won}
            drawn={leagueData.drawn}
            lost={leagueData.lost}
            points={leagueData.points}
            form={leagueData.form}
            goalDifference={leagueData.goalDifference ?? 0}
            competitionName={leagueData.competitionName}
            seasonName={leagueData.seasonName}
            clubName={leagueData.clubName ?? "Baynounah SC"}
          />
        </div>
      )}
    </div>
  );
}
