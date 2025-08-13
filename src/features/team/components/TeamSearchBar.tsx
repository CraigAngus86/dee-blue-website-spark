'use client';

import { useState } from 'react';

interface TeamSearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export function TeamSearchBar({
  onSearch,
  className = '',
  placeholder = 'Search players and staff...',
}: TeamSearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // real-time search
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={[
          // layout
          'w-full p-3 pr-10 rounded-lg',
          // brand colors + borders
          'bg-[rgb(var(--white))] text-[rgb(var(--brand-black))]',
          'border border-[rgb(var(--medium-gray))]',
          // typography
          'font-body text-base placeholder:text-[rgb(var(--dark-gray))]',
          // focus ring in brand gold
          'focus:outline-none focus:ring-2 focus:ring-[rgb(var(--brand-gold))] focus:border-transparent',
          // subtle hover
          'hover:border-[rgb(var(--brand-gold))]',
        ].join(' ')}
        aria-label="Search players and staff"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--dark-gray))] hover:text-[rgb(var(--brand-black))] transition-colors"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
        </svg>
      </button>
    </form>
  );
}
