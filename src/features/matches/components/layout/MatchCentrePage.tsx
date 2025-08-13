"use client";

import React from 'react';
import { MatchCentreHero } from './MatchCentreHero';
import { TabNavigation } from '../tabs/TabNavigation';
import { CompetitionFilter } from '../filters/CompetitionFilter';
import { MonthFilter } from '../filters/MonthFilter';
import { SeasonFilter } from '../filters/SeasonFilter';
import { useSearchParams } from 'next/navigation';

interface MatchCentrePageProps {
  activeTab: string;
  children: React.ReactNode;
}

export function MatchCentrePage({ activeTab, children }: MatchCentrePageProps) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || activeTab;

  return (
    <div className="min-h-screen pb-8 bg-[rgb(var(--white))]">
      <MatchCentreHero />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div
          className="bg-white rounded-xl p-6 mb-8 border border-[rgb(var(--medium-gray))]"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <TabNavigation />

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 md:mt-0">
              <SeasonFilter />
              {(tab === 'fixtures' || tab === 'results') && (
                <>
                  <MonthFilter />
                  <CompetitionFilter />
                </>
              )}
            </div>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
