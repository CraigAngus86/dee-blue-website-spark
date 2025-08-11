"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import { MatchCarousel } from "@/features/matches/components/home/MatchCarousel";
import { MobileMatchSection } from "@/features/matches/components/mobile/MobileMatchSection";
import { MatchGalleryModal } from "@/features/galleries";
import { NewsModal } from "@/features/news/components";
import { getLeagueTable, getCurrentSeason } from "@/features/matches/hooks/useLeagueTable";

interface MatchCenterProps {
  upcomingMatches?: any[];
  recentResults?: any[];
  leagueTable?: any[];
}

export default function MatchCenter({
  upcomingMatches = [],
  recentResults = [],
  leagueTable = [],
}: MatchCenterProps) {
  // Gallery modal states
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  
  // News modal states
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [articleLoading, setArticleLoading] = useState(false);
  
  // League table data fetching state
  const [fetchedLeagueTable, setFetchedLeagueTable] = useState<any[]>([]);
  
  // Fetch league table data if not provided via props
  useEffect(() => {
    async function loadLeagueTable() {
      // If leagueTable prop is provided and not empty, use it
      if (leagueTable && leagueTable.length > 0) {
        setFetchedLeagueTable(leagueTable);
        return;
      }
      
      // Otherwise fetch from database
      try {
        const season = await getCurrentSeason();
        const table = await getLeagueTable(season?.id);
        setFetchedLeagueTable(table || []);
      } catch (error) {
        console.error('Error fetching league table:', error);
        setFetchedLeagueTable([]);
      }
    }
    
    loadLeagueTable();
  }, [leagueTable]);
  
  // Use fetched data if available, otherwise fall back to prop
  const effectiveLeagueTable = fetchedLeagueTable.length > 0 ? fetchedLeagueTable : leagueTable;

  // Build the league data once (find Baynounah, fallback to first row; zero-safe)
  const leagueData = useMemo(() => {
    const rows = Array.isArray(effectiveLeagueTable) ? effectiveLeagueTable : [];
    if (rows.length === 0) {
      return {
        position: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        points: 0,
        form: [] as ("W" | "D" | "L")[],
        goalDifference: 0,
        competitionName: undefined as string | undefined,
        seasonName: undefined as string | undefined,
        clubName: "Baynounah SC",
      };
    }
    
    const found =
      rows.find((team) => {
        const name = team?.team_name?.toString().trim().toLowerCase();
        return name?.includes("baynounah");
      }) || rows[0];
    
    const goalDiff =
      typeof found?.goal_difference === "number"
        ? found.goal_difference
        : (found?.goals_for ?? 0) - (found?.goals_against ?? 0);
    
    return {
      position: found?.position ?? 0,
      played: found?.matches_played ?? 0,
      won: found?.wins ?? 0,
      drawn: found?.draws ?? 0,
      lost: found?.losses ?? 0,
      points: found?.points ?? 0,
      form: Array.isArray(found?.form) ? (found.form as ("W" | "D" | "L")[]) : [],
      goalDifference: goalDiff,
      competitionName: found?.competition_name ?? undefined,
      seasonName: found?.season_name ?? undefined,
      clubName: found?.team_name ?? "Baynounah SC",
    };
  }, [effectiveLeagueTable]);

  // Click handlers
  const handleGalleryClick = useCallback((galleryId: string) => {
    setSelectedGalleryId(galleryId);
    setGalleryModalOpen(true);
  }, []);

  const handleReportClick = useCallback(async (reportId: string) => {
    if (reportId?.startsWith?.("http")) {
      window.open(reportId, "_blank");
      return;
    }
    setArticleLoading(true);
    try {
      const response = await fetch(`/api/news-article/${reportId}`);
      if (!response.ok) throw new Error(`Failed to fetch article: ${response.status}`);
      const article = await response.json();
      setSelectedArticle(article);
      setNewsModalOpen(true);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setArticleLoading(false);
    }
  }, []);

  const handleTicketClick = useCallback((ticketUrl: string) => {
    window.open(ticketUrl, "_blank");
  }, []);

  const handleNewsModalClose = useCallback(() => {
    setNewsModalOpen(false);
    setSelectedArticle(null);
  }, []);

  return (
    <>
      <section
        className="bg-white rounded-lg shadow-sm border border-separator"
        aria-label="Match Centre"
        aria-busy={articleLoading ? "true" : undefined}
      >
        <div className="p-6">
          <SectionHeader
            title="Match Centre"
            align="left"
            className="justify-start md:justify-between"
            rightSlot={
              <Link
                href="/matches"
                className="text-link hover:text-link-hover transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="View all matches"
              >
                <span className="text-sm font-medium">View All Matches</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            }
          />

          {/* Desktop: Carousel */}
          <div className="hidden md:block">
            <MatchCarousel
              recentMatches={recentResults}
              upcomingMatches={upcomingMatches}
              leagueData={leagueData}
              onGalleryClick={handleGalleryClick}
              onReportClick={handleReportClick}
              onTicketClick={handleTicketClick}
            />
          </div>

          {/* Mobile: Simplified interface */}
          <div className="block md:hidden">
            <MobileMatchSection
              recentMatches={recentResults}
              upcomingMatches={upcomingMatches}
              leagueData={leagueData}
              leagueTable={effectiveLeagueTable}
              onGalleryClick={handleGalleryClick}
              onReportClick={handleReportClick}
              onTicketClick={handleTicketClick}
            />
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <MatchGalleryModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        galleryId={selectedGalleryId || undefined}
      />

      {/* News Modal */}
      <NewsModal
        article={selectedArticle}
        isOpen={newsModalOpen}
        onClose={handleNewsModalClose}
      />
    </>
  );
}