
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats match data for use in components
 */
export function formatMatchData(matches: any[], isResults = false) {
  return (matches || []).map(match => {
    const homeTeam = match.home_team_id;
    const awayTeam = match.away_team_id;
    const competition = match.competition_id;

    return {
      id: match.id,
      date: match.match_date,
      time: match.match_time,
      venue: match.venue || "Spain Park",
      homeTeam: {
        id: homeTeam?.id,
        name: homeTeam?.name || "Unknown Team",
        logo: homeTeam?.logo_url || "/assets/images/logos/BOD_Logo_Navy_square.png"
      },
      awayTeam: {
        id: awayTeam?.id,
        name: awayTeam?.name || "Unknown Team",
        logo: awayTeam?.logo_url || "/assets/images/logos/BOD_Logo_White_square.png"
      },
      competition: {
        id: competition?.id,
        name: competition?.name || "Unknown Competition",
        shortName: competition?.short_name,
        logo: competition?.logo_url
      },
      result: isResults ? {
        homeScore: match.home_score,
        awayScore: match.away_score,
        matchReportLink: match.match_report_link
      } : undefined,
      ticketLink: match.ticket_link || null,
      status: match.status || "scheduled"
    };
  });
}

/**
 * Formats currency amounts
 */
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Formats dates in the UK format
 */
export function formatDate(date: Date | string) {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
