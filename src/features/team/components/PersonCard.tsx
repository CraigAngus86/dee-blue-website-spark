'use client';
import React from 'react';
import { Person } from '@/features/team/types';
import PlayerImage from './PlayerImage';
import { cn } from '@/lib/utils';

interface PersonCardProps {
  person: Person;
  onProfileClick: (person: Person) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  person,
  onProfileClick,
}) => {
  const firstName = person.firstName;
  const lastName = person.lastName;

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden border border-[rgb(var(--medium-gray))] bg-[rgb(var(--white))]',
        'shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1'
      )}
    >
      {/* Clickable media area */}
      <div
        className="relative aspect-square overflow-hidden cursor-pointer group bg-[rgb(var(--brand-black))]"
        onClick={() => onProfileClick(person)}
        aria-label={`${firstName} ${lastName} profile`}
        role="button"
      >
        {/* Image */}
        <div className="w-full h-full">
          <PlayerImage
            image={person.profileImage}
            name={`${firstName} ${lastName}`}
            size="card"
            className="transition-transform duration-500 group-hover:scale-105 w-full h-full object-cover"
          />
        </div>

        {/* Brand gradient overlay (matches news cards) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgb(var(--brand-black)/0.45) 0%, rgb(var(--brand-black)/0.10) 55%, transparent 85%)',
          }}
        />

        {/* Name overlay content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
          <p className="font-body text-xs md:text-sm font-medium uppercase tracking-wider opacity-85 mb-1">
            {firstName}
          </p>
          <p className="font-heading tracking-[0.02em] leading-tight text-xl md:text-2xl">
            {lastName}
          </p>
        </div>
      </div>

      {/* View Profile — secondary button style */}
      <button
        onClick={() => onProfileClick(person)}
        className={cn(
          'flex items-center justify-between w-full p-3 font-body font-medium transition-all duration-200',
          'bg-[rgb(var(--white))] text-[rgb(var(--brand-black))] border-t border-[rgb(var(--medium-gray))]',
          'hover:bg-[rgb(var(--brand-gold)/0.10)] focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[rgb(var(--brand-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--white))]'
        )}
      >
        <span>View Profile</span>
        <svg
          className="h-5 w-5 text-[rgb(var(--brand-black))]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
