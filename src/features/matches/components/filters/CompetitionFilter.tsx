"use client";

import React from 'react';
import { FilterDropdown } from './FilterDropdown';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { competitions, DEFAULT_COMPETITION } from '../../constants';

export function CompetitionFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const selectedCompetition = searchParams.get('competition') || DEFAULT_COMPETITION;
  
  const handleCompetitionChange = (value: string) => {
    console.log('Changing competition to:', value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('competition', value);
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <FilterDropdown
      options={competitions}
      value={selectedCompetition}
      onChange={handleCompetitionChange}
    />
  );
}
