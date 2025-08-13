"use client";

import React from 'react';

interface TeamLogoProps {
  logoId: string | null;
  teamName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TeamLogo({ logoId, teamName, size = 'md', className = '' }: TeamLogoProps) {
  // Determine size dimensions (unchanged)
  const dimensions =
    {
      sm: 'w-6 h-6',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    }[size];

  // Cloudinary transformations (unchanged)
  const width = size === 'sm' ? 24 : size === 'md' ? 48 : 64;
  const transforms = `c_fit,w_${width},h_${width},q_auto,f_auto`;

  // If no logo ID, render tokenized initial-based fallback
  if (!logoId) {
    return (
      <div
        className={`flex items-center justify-center rounded-full ${dimensions} ${className}`}
        style={{ background: 'rgb(var(--warm-gray))' }}
        aria-label={`${teamName} logo`}
      >
        <span className="text-xs" style={{ color: 'rgb(var(--gray))' }}>
          {teamName?.substring(0, 2) || '?'}
        </span>
      </div>
    );
  }

  // Error handling → tokenized, no hard-coded grays
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load team logo for ${teamName}`, e);
    const img = e.currentTarget;
    img.style.display = 'none'; // Hide broken image
    const parent = img.parentElement!;
    // Set warm-gray background for fallback
    parent.setAttribute(
      'style',
      `${parent.getAttribute('style') || ''};background: rgb(var(--warm-gray));`
    );

    // Add team initials as fallback (tokenized color)
    const initials = document.createElement('span');
    initials.className = 'text-xs';
    initials.style.color = 'rgb(var(--gray))';
    initials.innerText = teamName?.substring(0, 2) || '?';
    parent.appendChild(initials);
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full overflow-hidden ${dimensions} ${className}`}
      aria-label={`${teamName} logo`}
    >
      <img
        src={`https://res.cloudinary.com/dlkpaw2a0/image/upload/${transforms}/${logoId}`}
        alt={`${teamName} logo`}
        className="max-w-full max-h-full p-1"
        onError={handleError}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
