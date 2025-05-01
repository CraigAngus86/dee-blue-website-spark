import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Match } from "@/types/match";

/**
 * Merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely transforms data with proper error handling
 * @param data Data to transform
 * @param transformFn Function to transform the data
 * @param fallback Fallback value if transformation fails
 * @returns Transformed data or fallback
 */
export function safeTransform<T, R>(
  data: T | null | undefined, 
  transformFn: (data: T) => R, 
  fallback: R
): R {
  try {
    if (data === null || data === undefined) {
      console.warn("No data provided for transformation");
      return fallback;
    }
    
    return transformFn(data);
  } catch (error) {
    console.error("Error transforming data:", error, { inputData: data });
    return fallback;
  }
}

/**
 * Formats match data from Supabase to the format expected by components
 * Enhanced with better error handling
 */
export function formatMatchData(matches: any[], isCompleted: boolean = false): Match[] {
  if (!matches || !Array.isArray(matches)) {
    console.warn("Invalid matches data provided:", matches);
    return [];
  }
  
  try {
    return matches.map(match => {
      try {
        // Ensure we have required properties
        if (!match || !match.match_date || !match.home_team_id || !match.away_team_id) {
          console.warn("Match is missing required properties:", match);
          throw new Error("Invalid match data structure");
        }
        
        // Transform match data to expected shape
        const formattedMatch: Match = {
          id: match.id,
          date: match.match_date,
          time: match.match_time || "",
          venue: match.venue || "TBC",
          homeTeam: {
            id: match.home_team_id?.id || "unknown",
            name: match.home_team_id?.name || "Unknown Team",
            logo: match.home_team_id?.logo_url || "",
          },
          awayTeam: {
            id: match.away_team_id?.id || "unknown",
            name: match.away_team_id?.name || "Unknown Team",
            logo: match.away_team_id?.logo_url || "",
          },
          competition: {
            id: match.competition_id?.id || "unknown",
            name: match.competition_id?.name || "Unknown Competition",
            shortName: match.competition_id?.short_name || "",
            logo: match.competition_id?.logo_url || "",
          },
          ticketLink: match.ticket_link || "",
          status: match.status || "scheduled",
          isCompleted: isCompleted
        };
        
        // Add result if this is a completed match
        if (isCompleted && typeof match.home_score === 'number' && typeof match.away_score === 'number') {
          formattedMatch.result = {
            homeScore: match.home_score,
            awayScore: match.away_score,
            matchReportLink: match.match_report_link || "",
          };
        }
        
        return formattedMatch;
      } catch (error) {
        console.error("Error formatting individual match:", error, { match });
        // Return a placeholder match object instead of failing completely
        return {
          id: match?.id || `error-${Date.now()}`,
          date: match?.match_date || new Date().toISOString().split('T')[0],
          time: match?.match_time || "",
          venue: "Data Error",
          homeTeam: { id: "error", name: "Error", logo: "" },
          awayTeam: { id: "error", name: "Error", logo: "" },
          competition: { id: "error", name: "Error", shortName: "", logo: "" },
          ticketLink: "",
          status: "error",
          isCompleted
        };
      }
    });
  } catch (error) {
    console.error("Error formatting match data:", error);
    return [];
  }
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
export function formatDate(date: Date | string, includeYear: boolean = true) {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: includeYear ? 'numeric' : undefined
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Formats time from 24h to 12h format
 */
export function formatTime(time: string): string {
  if (!time) return '';
  
  const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
  
  if (isNaN(hours) || isNaN(minutes)) {
    return time;
  }
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}
