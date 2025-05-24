"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { MatchCarousel } from '@/features/matches/components/home/MatchCarousel';
import { LeaguePositionSummary } from '@/features/matches/components/common/LeaguePositionSummary';
import { MatchGalleryModal } from '@/features/galleries';

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
  // Modal states
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);

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

  const handleReportClick = (reportId: string) => {
    // For now, open external links or handle match reports via news system
    if (reportId.startsWith('http')) {
      window.open(reportId, '_blank');
    } else {
      // TODO: Implement news modal for match reports
      console.log('Match report clicked:', reportId);
    }
  };

  const handleTicketClick = (ticketUrl: string) => {
    window.open(ticketUrl, '_blank');
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          {/* Header with title and view all link */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-1.5 h-10 bg-[#00105A] mr-3"></div>
              <h2 className="text-2xl font-bold text-[#00105A]">Match Centre</h2>
            </div>
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

          {/* Match Carousel with click handlers */}
          <MatchCarousel 
            recentMatches={recentResults}
            upcomingMatches={upcomingMatches}
            leagueData={leaguePosition}
            onGalleryClick={handleGalleryClick}
            onReportClick={handleReportClick}
            onTicketClick={handleTicketClick}
          />
        </div>
      </div>

      {/* Gallery Modal */}
      <MatchGalleryModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        galleryId={selectedGalleryId || undefined}
      />
    </>
  );
}
