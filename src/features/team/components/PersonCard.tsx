'use client';
import React from 'react';
import { Person } from '@/features/team/types';
import PlayerImage from './PlayerImage';

interface PersonCardProps {
  person: Person;
  onProfileClick: (person: Person) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ 
  person,
  onProfileClick
}) => {
  const firstName = person.firstName;
  const lastName = person.lastName;
  
  return (
    <div className="rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Card with overlay text */}
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer group bg-[#00105A]"
        onClick={() => onProfileClick(person)}
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
        
        {/* Name overlay - improved contrast and typography */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="p-4 text-white">
            <p className="text-sm font-medium uppercase tracking-wider opacity-80 mb-1">{firstName}</p>
            <p className="text-xl font-bold tracking-wide">{lastName}</p>
          </div>
        </div>
      </div>
      
      {/* View Profile button */}
      <button
        onClick={() => onProfileClick(person)}
        className="flex items-center justify-between w-full p-3 text-[#00105A] font-medium hover:bg-gray-50 transition-colors bg-white"
      >
        <span>View Profile</span>
        <svg 
          className="h-5 w-5 text-[#00105A]" 
          viewBox="0 0 24 24" 
          fill="none" 
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
