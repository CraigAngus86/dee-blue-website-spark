"use client";

import React from 'react';
import { FilterDropdown } from './FilterDropdown';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { months, DEFAULT_MONTH } from '../../constants';

export function MonthFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const selectedMonth = searchParams.get('month') || DEFAULT_MONTH;
  
  const handleMonthChange = (value: string) => {
    console.log('Changing month to:', value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('month', value);
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <FilterDropdown
      options={months}
      value={selectedMonth}
      onChange={handleMonthChange}
    />
  );
}
