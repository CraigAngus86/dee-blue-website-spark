"use client";
import React from "react";

interface TeamLogoProps {
  logoUrl?: string;
  teamName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TeamLogo({
  logoUrl,
  teamName,
  size = "md",
  className = "",
}: TeamLogoProps) {
  const [errored, setErrored] = React.useState(false);

  // Deterministic size classes
  const SIZE_CLASSES: Record<NonNullable<TeamLogoProps["size"]>, string> = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const INITIALS_TEXT: Record<NonNullable<TeamLogoProps["size"]>, string> = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-lg",
  };

  // Up to two initials from first two words
  const getTeamInitials = (name?: string): string => {
    if (!name) return "?";
    const words = name.trim().split(/\s+/).filter(Boolean);
    const firstTwo = words.slice(0, 2).map((w) => w[0]);
    const initials = firstTwo.join("").toUpperCase();
    return initials || name.substring(0, 1).toUpperCase();
  };

  // Resolve Cloudinary/public URL passthrough
  const getFullLogoUrl = (id?: string): string => {
    if (!id) return "";
    if (/^https?:\/\//i.test(id)) return id;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME || "dlkpaw2a0";
    return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${id}`;
  };

  const src = logoUrl ? getFullLogoUrl(logoUrl) : "";
  const showImage = Boolean(src) && !errored;
  const initials = getTeamInitials(teamName);

  return (
    <div
      className={`${SIZE_CLASSES[size]} flex items-center justify-center mx-auto ${className}`}
      aria-label={`${teamName} logo`}
    >
      {showImage ? (
        <img
          src={src}
          alt={`${teamName} logo`}
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
          draggable={false}
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="w-full h-full rounded-md bg-[rgb(var(--warm-gray))] border border-[rgb(var(--separator))] flex items-center justify-center">
          {/* Body font for UI chrome; no Bebas */}
          <span className={`font-semibold text-[rgb(var(--brand-black))] ${INITIALS_TEXT[size]}`}>
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
