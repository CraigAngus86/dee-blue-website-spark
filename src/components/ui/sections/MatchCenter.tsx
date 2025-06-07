"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { MatchCarousel } from '@/features/matches/components/home/MatchCarousel';
import { LeaguePositionSummary } from '@/features/matches/components/common/LeaguePositionSummary';
import { MobileMatchSection } from '@/features/matches/components/mobile/MobileMatchSection';
import { MatchGalleryModal } from '@/features/galleries';
import { NewsModal } from '@/features/news/components';

interface MatchCenterProps {
  upcomingMatches?: any[];
  recentResults?: any[];
  leagueTable?: any[];
}

export default function MatchCenter({ 
  upcomingMatches = [], 
  recentResults = [], 
  leagueTable = [] 
}: MatchCenterProps) {
  // Gallery modal states
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  
  // News modal states
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [articleLoading, setArticleLoading] = useState(false);

  // Find Banks o' Dee in the league table
  const banksODee = leagueTable.find(team => 
    team?.team_name?.toLowerCase().includes("banks o' dee")
  );

  // Format the league position data if Banks o' Dee is found
  const leaguePosition = banksODee ? {
    position: banksODee.position || 0,
    played: banksODee.matches_played || 0,
    won: banksODee.wins || 0,
    drawn: banksODee.draws || 0,
    lost: banksODee.losses || 0,
    points: banksODee.points || 0,
    form: banksODee.form || []
  } : undefined;

  // Click handlers
  const handleGalleryClick = (galleryId: string) => {
    setSelectedGalleryId(galleryId);
    setGalleryModalOpen(true);
  };

  const handleReportClick = async (reportId: string) => {
    if (reportId.startsWith('http')) {
      // External link - open in new tab
      window.open(reportId, '_blank');
    } else {
      // Sanity document ID - fetch via API route (fixes CORS)
      setArticleLoading(true);
      try {
        const response = await fetch(`/api/news-article/${reportId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch article: ${response.status}`);
        }
        
        const article = await response.json();
        
        setSelectedArticle(article);
        setNewsModalOpen(true);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setArticleLoading(false);
      }
    }
  };

  const handleTicketClick = (ticketUrl: string) => {
    window.open(ticketUrl, '_blank');
  };

  const handleNewsModalClose = () => {
    setNewsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          {/* Header - Desktop keeps "View All", Mobile removes it */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-1.5 h-10 bg-[#00105A] mr-3"></div>
              <h2 className="text-2xl font-bold text-[#00105A]">Match Centre</h2>
            </div>
            <div className="hidden md:block">
              <Link 
                href="/matches" 
                className="text-[#00105A] hover:text-[#FFD700] transition-colors flex items-center gap-2"
              >
                <span className="text-sm font-medium">View All Matches</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Desktop: Current working carousel */}
          <div className="hidden md:block">
            <MatchCarousel 
              recentMatches={recentResults}
              upcomingMatches={upcomingMatches}
              leagueData={leaguePosition}
              onGalleryClick={handleGalleryClick}
              onReportClick={handleReportClick}
              onTicketClick={handleTicketClick}
            />
          </div>

          {/* Mobile: New simplified interface */}
          <div className="block md:hidden">
            <MobileMatchSection
              recentMatches={recentResults}
              upcomingMatches={upcomingMatches}
              leagueData={leaguePosition}
              leagueTable={leagueTable}
              onGalleryClick={handleGalleryClick}
              onReportClick={handleReportClick}
              onTicketClick={handleTicketClick}
            />
          </div>
        </div>
      </div>

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
