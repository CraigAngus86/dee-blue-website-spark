"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { TabNavigation } from './tabs/TabNavigation';
import { SeasonFilter } from './filters/SeasonFilter';
import { MonthFilter } from './filters/MonthFilter';
import { CompetitionFilter } from './filters/CompetitionFilter';
import { FixturesPanel } from './panels/FixturesPanel';
import { ResultsPanel } from './panels/ResultsPanel';
import { TablePanel } from './panels/TablePanel';
import { DEFAULT_SEASON, DEFAULT_COMPETITION, DEFAULT_MONTH } from '../constants';
export function MatchCentreContainer() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') || 'fixtures'
  );
  // Reset filter parameters on first load
  useEffect(() => {
    // Create fresh parameters with defaults
    const params = new URLSearchParams();
    // Set tab from URL or default to fixtures
    params.set('tab', searchParams.get('tab') || 'fixtures');
    // Set default filters
    params.set('season', DEFAULT_SEASON);
    params.set('competition', DEFAULT_COMPETITION);
    params.set('month', DEFAULT_MONTH);
    // Update URL only if different from current
    const currentParams = searchParams.toString();
    const newParams = params.toString();
    if (currentParams !== newParams) {
      console.log('Resetting URL parameters to defaults');
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);
  // Update active tab when URL changes
  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'fixtures');
  }, [searchParams]);
  return (
    <div className="space-y-8">
      {/* Tabs and Filters Row - Flexbox for responsive layout */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <TabNavigation defaultTab="fixtures" />
        </div>
        <div className="flex flex-wrap gap-4">
          {/* Only show Season filter for results and table tabs */}
          {(activeTab === 'results' || activeTab === 'table') && (
            <div className="w-full md:w-36">
              <SeasonFilter />
            </div>
          )}
          {/* Only show Month filter for fixtures and results tabs */}
          {(activeTab === 'fixtures' || activeTab === 'results') && (
            <div className="w-full md:w-40">
              <MonthFilter />
            </div>
          )}
          {/* Only show Competition filter for fixtures and results tabs */}
          {(activeTab === 'fixtures' || activeTab === 'results') && (
            <div className="w-full md:w-64">
              <CompetitionFilter />
            </div>
          )}
        </div>
      </div>
      {/* Content Panels */}
      <div>
        {activeTab === 'fixtures' && <FixturesPanel />}
        {activeTab === 'results' && <ResultsPanel />}
        {activeTab === 'table' && <TablePanel />}
      </div>
    </div>
  );
}
