"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type TabOption = 'fixtures' | 'results' | 'table';

interface TabNavigationProps {
  defaultTab?: TabOption;
  className?: string;
}

export function TabNavigation({ defaultTab = 'fixtures', className = '' }: TabNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get tab from URL or use default
  const [activeTab, setActiveTab] = useState<TabOption>(
    searchParams.get('tab') as TabOption || defaultTab
  );
  
  // Update URL when tab changes
  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    // Set the tab parameter
    current.set('tab', activeTab);
    
    // Create new URL
    const search = current.toString();
    const query = search ? `?${search}` : '';
    
    router.push(`${pathname}${query}`);
  }, [activeTab, pathname, router, searchParams]);
  
  const handleTabChange = (tab: TabOption) => {
    setActiveTab(tab);
  };
  
  const tabs = [
    { id: 'fixtures', label: 'Fixtures' },
    { id: 'results', label: 'Results' },
    { id: 'table', label: 'League Table' }
  ];
  
  return (
    <div className={cn("border-b", className)}>
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as TabOption)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              activeTab === tab.id
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-primary hover:bg-primary/5"
            )}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
