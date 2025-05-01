
import React from "react";
import { cn } from "@/lib/utils";
import CompetitorLogo from "./CompetitorLogo";

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string;
  time?: string;
  venue: string;
  status?: "upcoming" | "live" | "finished" | "completed";
  result?: {
    homeScore: number;
    awayScore: number;
  };
  ticketLink?: string;
  matchReportLink?: string;
  className?: string;
}

const MatchCard: React.FC<MatchCardProps> = ({
  homeTeam,
  awayTeam,
  competition,
  date,
  time,
  venue,
  status = "upcoming",
  result,
  ticketLink = "#",
  matchReportLink = "#",
  className,
}) => {
  // Determine if Banks o' Dee is home or away
  const isBodHome = homeTeam.toLowerCase().includes("banks") || homeTeam.toLowerCase().includes("bod");

  // Normalize status: treat "completed" and "finished" the same way
  const normalizedStatus = status === "finished" ? "completed" : status;

  return (
    <div className={cn("bg-white rounded-lg shadow-md overflow-hidden", className)}>
      {/* Competition Header */}
      <div className="bg-primary py-3 px-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold">{competition}</h3>
          {normalizedStatus === "upcoming" && (
            <span className="bg-secondary text-primary px-2 py-1 text-xs font-bold rounded">
              UPCOMING
            </span>
          )}
          {normalizedStatus === "live" && (
            <span className="bg-accent text-primary px-2 py-1 text-xs font-bold rounded animate-pulse">
              LIVE
            </span>
          )}
        </div>
      </div>

      {/* Match Content */}
      <div className="p-5">
        {/* Teams with improved logo presentation */}
        <div className="flex items-center justify-between my-5">
          {/* Home Team */}
          <div className="flex flex-col items-center text-center w-1/3">
            <div className="bg-white p-2 rounded-full shadow-md inline-flex items-center justify-center">
              <CompetitorLogo
                name={homeTeam}
                size="md"
                className="w-16 h-16"
              />
            </div>
            <span className="mt-3 font-medium text-primary text-sm">
              {homeTeam}
            </span>
          </div>

          {/* Score or VS - Enhanced presentation */}
          <div className="text-center w-1/3 px-2">
            {normalizedStatus === "completed" && result ? (
              <div className="text-3xl font-bold">
                {result.homeScore} - {result.awayScore}
              </div>
            ) : (
              <div className="text-3xl font-black bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">
                VS
              </div>
            )}
            {normalizedStatus === "completed" && <div className="text-sm text-gray-500 mt-1">Full Time</div>}
            {normalizedStatus === "live" && <div className="text-sm text-accent font-medium mt-1">In Progress</div>}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center text-center w-1/3">
            <div className="bg-white p-2 rounded-full shadow-md inline-flex items-center justify-center">
              <CompetitorLogo
                name={awayTeam}
                size="md"
                className="w-16 h-16"
              />
            </div>
            <span className="mt-3 font-medium text-primary text-sm">
              {awayTeam}
            </span>
          </div>
        </div>

        {/* Date, Time, Venue with improved spacing and icons */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-gray-500 text-sm my-5 bg-gray-50 py-3 px-4 rounded-md">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date}
          </span>

          {time && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {time}
            </span>
          )}

          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {venue}
          </span>
        </div>

        {/* Action Button with improved styling */}
        <div className="mt-5">
          {normalizedStatus === "upcoming" ? (
            <a
              href={ticketLink}
              className="block w-full py-2.5 px-4 bg-accent text-primary font-bold text-center rounded transition hover:bg-accent-dark shadow-md"
            >
              Get Tickets
            </a>
          ) : normalizedStatus === "completed" ? (
            <a
              href={matchReportLink}
              className="block w-full py-2.5 px-4 bg-secondary text-primary font-bold text-center rounded transition hover:bg-secondary-dark shadow-md"
            >
              Match Report
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
