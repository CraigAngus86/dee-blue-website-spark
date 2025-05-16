"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TabNavigation } from './tabs/TabNavigation';
import { FixturesPanel } from './panels/FixturesPanel';
import { ResultsPanel } from './panels/ResultsPanel';
import { TablePanel } from './panels/TablePanel';

export function MatchCentreContainer() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') || 'fixtures'
  );
  
  // Update active tab when URL changes
  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'fixtures');
  }, [searchParams]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-heading font-bold text-primary">Match Centre</h1>
      <p className="text-gray-600">View fixtures, results and league standings</p>
      
      <TabNavigation defaultTab="fixtures" />
      
      <div className="mt-6">
        {activeTab === 'fixtures' && <FixturesPanel />}
        {activeTab === 'results' && <ResultsPanel />}
        {activeTab === 'table' && <TablePanel />}
      </div>
    </div>
  );
}
