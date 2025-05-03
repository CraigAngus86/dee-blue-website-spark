
"use client";

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MatchCarousel from '@/components/ui/match/MatchCarousel';
import { Match } from '@/types/match';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';

interface MatchCenterProps {
  upcomingMatches: Match[];
  recentResults: Match[];
  highlighedMatch?: Match;
}

const MatchCenter: React.FC<MatchCenterProps> = ({
  upcomingMatches,
  recentResults,
  highlighedMatch
}) => {
  const [activeTab, setActiveTab] = useState("fixtures");

  // Format date for display (can be customized as needed)
  const formatMatchDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return format(date, 'EEEE, MMMM d, yyyy');
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <Heading level={2}>Match Center</Heading>
            <Text color="muted" className="mt-2">
              Latest fixtures and results for Banks o' Dee FC
            </Text>
          </div>
          
          {/* Tabs for fixtures/results */}
          <div className="mt-4 md:mt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Fixtures carousel */}
        {activeTab === "fixtures" && (
          <MatchCarousel 
            title="Upcoming Fixtures"
            fixtures={upcomingMatches}
          />
        )}
        
        {/* Results carousel */}
        {activeTab === "results" && (
          <MatchCarousel 
            title="Recent Results"
            fixtures={recentResults}
          />
        )}
      </div>
    </section>
  );
};

export default MatchCenter;
