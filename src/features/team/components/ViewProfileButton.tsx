'use client';
import React from 'react';

interface ViewProfileButtonProps {
  onClick: () => void;
  className?: string;
}

export const ViewProfileButton: React.FC<ViewProfileButtonProps> = ({
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full p-3 text-[#00105a] font-medium hover:bg-gray-50 transition-colors ${className}`}
    >
      View Profile
      <svg 
        className="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 5l7 7-7 7" 
        />
      </svg>
    </button>
  );
};

export default ViewProfileButton;
