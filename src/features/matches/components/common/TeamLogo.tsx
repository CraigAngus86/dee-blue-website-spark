"use client";
import React from 'react';
interface TeamLogoProps {
  logoUrl?: string;
  teamName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export function TeamLogo({ logoUrl, teamName, size = 'md', className = '' }: TeamLogoProps) {
  // Sizes for different display contexts
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 64, height: 64 },
    lg: { width: 96, height: 96 }
  };
  const { width, height } = sizes[size];
  
  // Get team initials for fallback
  const getTeamInitials = (name: string): string => {
    if (!name) return "?";
    return name.substring(0, 1).toUpperCase();
  };
  
  // Function to build the full Cloudinary URL from the logo ID if needed
  const getFullLogoUrl = (logoId: string) => {
    // Check if it's already a full URL
    if (logoId.startsWith('http')) return logoId;
    
    // Otherwise build Cloudinary URL
    const cloudName = 'dlkpaw2a0';
    return `https://res.cloudinary.com/${cloudName}/image/upload/${logoId}`;
  };
  
  // The URL to use
  const imageUrl = logoUrl ? getFullLogoUrl(logoUrl) : '';
  
  return (
    <div className={`w-${width/4} h-${height/4} flex items-center justify-center mx-auto ${className}`}>
      {imageUrl ? (
        <img 
          src={imageUrl}
          alt={`${teamName} logo`} 
          className="w-full h-full object-contain" 
          onError={(e) => {
            // On error, replace with team initial
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop
            target.style.display = 'none';
            // Create a span with the initial
            const parent = target.parentElement;
            if (parent) {
              const span = document.createElement('span');
              span.className = 'text-[#4b5563] font-semibold text-xl';
              span.textContent = getTeamInitials(teamName);
              parent.appendChild(span);
            }
          }}
        />
      ) : (
        <span className="text-[#4b5563] font-semibold text-xl">
          {getTeamInitials(teamName)}
        </span>
      )}
    </div>
  );
}
