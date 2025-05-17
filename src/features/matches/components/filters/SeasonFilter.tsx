"use client";

import React, { useEffect } from 'react';
import { FilterDropdown } from './FilterDropdown';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { seasons, DEFAULT_SEASON } from '../../constants';

export function SeasonFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const selectedSeason = searchParams.get('season') || '';
  
  // Set default season if none selected
  useEffect(() => {
    if (!selectedSeason) {
      handleSeasonChange(DEFAULT_SEASON);
    }
  }, [selectedSeason]);
  
  const handleSeasonChange = (value: string) => {
    console.log('Changing season to:', value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('season', value);
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <FilterDropdown
      options={seasons}
      value={selectedSeason || DEFAULT_SEASON}
      onChange={handleSeasonChange}
    />
  );
}
