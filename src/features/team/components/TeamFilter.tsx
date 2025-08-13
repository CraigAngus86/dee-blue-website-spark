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
  className = '',
}: TeamFilterProps) {
  // Mobile-first ordering: All, Players, Management & Staff
  const primaryLabels = ['All', 'Players', 'Management & Staff'];

  // Match by label (case-insensitive, trimmed) to be robust
  const norm = (s: string) => s?.toLowerCase().trim();
  const primary = options.filter((o) => primaryLabels.map(norm).includes(norm(o.label)));
  const secondary = options.filter((o) => !primaryLabels.map(norm).includes(norm(o.label)));

  const Button = ({ option }: { option: TeamFilterOption }) => {
    const isActive = activeFilter === option.value;
    return (
      <button
        key={option.value}
        onClick={() => onFilterChange(option.value)}
        className={[
          'px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200',
          'border',
          isActive
            ? 'bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))] border-[rgb(var(--brand-gold))]'
            : 'bg-[rgb(var(--white))] text-[rgb(var(--brand-black))] border-[rgb(var(--medium-gray))] hover:bg-[rgb(var(--brand-gold)/0.10)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--white))]',
        ].join(' ')}
      >
        {option.label}
      </button>
    );
  };

  return (
    <div className={className}>
      {/* Mobile (<= md): 2 centered rows */}
      <div className="grid grid-cols-3 gap-2 justify-items-center md:hidden">
        {primary.map((option) => (
          <Button key={option.value} option={option} />
        ))}
        {/* Force a new row by spanning all columns with an invisible separator */}
        <div className="col-span-3 h-0" aria-hidden="true" />
        {secondary.map((option) => (
          <Button key={option.value} option={option} />
        ))}
      </div>

      {/* Desktop (>= md): centered wrapped row like before */}
      <div className="hidden md:flex md:flex-wrap md:gap-2 md:justify-center">
        {[...primary, ...secondary].map((option) => (
          <Button key={option.value} option={option} />
        ))}
      </div>
    </div>
  );
}
