"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
    <div className={cn("inline-flex rounded-md overflow-hidden border border-gray-200", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id as TabOption)}
          className={cn(
            "px-6 py-3 text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "bg-[#00105A] text-white"
              : "bg-white hover:bg-gray-50 text-gray-700"
          )}
          aria-current={activeTab === tab.id ? "page" : undefined}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
