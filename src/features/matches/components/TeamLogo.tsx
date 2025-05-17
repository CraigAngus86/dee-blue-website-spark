"use client";

import React from 'react';

interface TeamLogoProps {
  logoId: string | null;
  teamName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TeamLogo({ logoId, teamName, size = 'md', className = '' }: TeamLogoProps) {
  // Skip rendering if no logo ID
  if (!logoId) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-full ${className}`}>
        <span className="text-xs text-gray-400">{teamName?.substring(0, 2) || "?"}</span>
      </div>
    );
  }
  
  // Determine size dimensions
  const dimensions = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }[size];
  
  // Cloudinary transformations
  const width = size === 'sm' ? 24 : size === 'md' ? 48 : 64;
  const transforms = `c_fit,w_${width},h_${width},q_auto,f_auto`;
  
  // Basic error handling
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load team logo for ${teamName}`, e);
    const img = e.currentTarget;
    img.style.display = 'none'; // Hide broken image
    img.parentElement!.classList.add('bg-gray-100'); // Add background color
    
    // Add team initials as fallback
    const initials = document.createElement('span');
    initials.className = 'text-xs text-gray-400';
    initials.innerText = teamName?.substring(0, 2) || "?";
    img.parentElement!.appendChild(initials);
  };
  
  return (
    <div className={`flex items-center justify-center rounded-full overflow-hidden ${dimensions} ${className}`}>
      <img
        src={`https://res.cloudinary.com/dlkpaw2a0/image/upload/${transforms}/${logoId}`}
        alt={`${teamName} logo`}
        className="max-w-full max-h-full p-1"
        onError={handleError}
      />
    </div>
  );
}
