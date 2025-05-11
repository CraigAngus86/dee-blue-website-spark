'use client';

import { TeamFilterOption } from '../types';

interface TeamFilterProps {
  options: TeamFilterOption[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export function TeamFilter({ 
  options, 
  activeFilter, 
  onFilterChange, 
  className = '' 
}: TeamFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === option.value
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
