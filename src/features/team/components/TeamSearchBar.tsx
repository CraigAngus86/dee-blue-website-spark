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
  placeholder = 'Search players and staff...'
}: TeamSearchBarProps) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Real-time search as user types
  };
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}
