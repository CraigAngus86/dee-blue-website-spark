
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate, formatTime, cn } from "@/lib/utils";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

interface MatchCardProps {
  match: any;
  variant?: "next" | "future" | "past";
  className?: string;
}

const MatchCardNew: React.FC<MatchCardProps> = ({
  match,
  variant = "future",
  className,
}) => {
  if (!match) return null;
  
  const isPast = variant === "past";
  const isNext = variant === "next";
  const isFuture = variant === "future";
  
  // Determine result for home team (win, loss, draw)
  let resultStatus = null;
  if (isPast && match.homeScore !== undefined && match.awayScore !== undefined) {
    if (match.homeScore > match.awayScore) {
      resultStatus = "win";
    } else if (match.homeScore < match.awayScore) {
      resultStatus = "loss";
    } else {
      resultStatus = "draw";
    }
  }
  
  // Card background color based on variant
  const cardBgColor = isNext ? "bg-gradient-to-br from-primary-50 to-white" : "bg-white";
  
  // Border color based on result (for past matches) or variant
  let borderClass = "border-gray-100";
  if (isPast) {
    if (resultStatus === "win") {
      borderClass = "border-green-400";
    } else if (resultStatus === "loss") {
      borderClass = "border-red-400";
    } else if (resultStatus === "draw") {
      borderClass = "border-yellow-400";
    }
  } else if (isNext) {
    borderClass = "border-primary-300";
  }

  return (
    <div 
      className={cn(
        "flex flex-col rounded-lg border-2 shadow-sm overflow-hidden transition-all",
        cardBgColor,
        borderClass,
        className
      )}
    >
      {/* Competition Banner */}
      <div className="bg-gray-100 px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {match.competitionImage && (
            <div className="w-5 h-5 relative">
              <Image 
                src={match.competitionImage} 
                alt={match.competition}
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          )}
          <span className="text-xs md:text-sm font-medium text-gray-700">
            {match.competitionShort || match.competition}
          </span>
        </div>
        
        {/* Date and time */}
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          <span>{formatDate(match.date, false)}</span>
          {match.time && (
            <span className="ml-1">{formatTime(match.time)}</span>
          )}
        </div>
      </div>
      
      {/* Teams and scores */}
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex flex-col items-center w-5/12">
            <div className="w-12 h-12 relative mb-2">
              <Image 
                src={match.homeTeamLogo || '/placeholder.svg'}
                alt={match.homeTeam}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-center text-xs md:text-sm font-semibold">
              {match.homeTeam}
            </span>
          </div>
          
          {/* Score or VS */}
          <div className="flex flex-col items-center justify-center w-2/12">
            {isPast ? (
              <div className="flex items-center text-lg font-bold">
                <span className={resultStatus === "win" ? "text-green-600" : "text-gray-700"}>
                  {match.homeScore}
                </span>
                <span className="mx-1">-</span>
                <span className={resultStatus === "loss" ? "text-red-600" : "text-gray-700"}>
                  {match.awayScore}
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold text-gray-500">VS</span>
            )}
            
            {/* Next match indicator */}
            {isNext && (
              <span className="mt-1 inline-block bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                Next
              </span>
            )}
          </div>
          
          {/* Away Team */}
          <div className="flex flex-col items-center w-5/12">
            <div className="w-12 h-12 relative mb-2">
              <Image 
                src={match.awayTeamLogo || '/placeholder.svg'}
                alt={match.awayTeam}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-center text-xs md:text-sm font-semibold">
              {match.awayTeam}
            </span>
          </div>
        </div>
      </div>
      
      {/* Location */}
      <div className="px-4 py-2 bg-gray-50 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
        <div className="flex items-center">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span>{match.venue}</span>
        </div>
        
        {/* Action links */}
        <div>
          {isPast && match.matchReportLink && (
            <Link 
              href={match.matchReportLink}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              Report <ExternalLink className="ml-1 w-3 h-3" />
            </Link>
          )}
          
          {!isPast && match.ticketLink && (
            <Link
              href={match.ticketLink}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              Tickets <ExternalLink className="ml-1 w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCardNew;
