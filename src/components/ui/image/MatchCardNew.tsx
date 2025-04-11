
import React from "react";
import CompetitorLogo from "@/components/ui/image/CompetitorLogo";
import { cn } from "@/lib/utils";
import Text from "@/components/ui/typography/Text";
import { ButtonNew } from "@/components/ui/ButtonNew";
import { MapPin, Clock } from "lucide-react";

interface MatchCardNewProps {
  match: {
    id: string;
    competition: string;
    round?: string;
    date: string;
    time?: string;
    homeTeam: string;
    awayTeam: string;
    venue: string;
    status: string;
    result?: {
      homeScore: number;
      awayScore: number;
    };
    ticketLink?: string;
    matchReportLink?: string;
  };
  variant: "past" | "next" | "future";
  className?: string;
}

const MatchCardNew: React.FC<MatchCardNewProps> = ({ match, variant, className }) => {
  const isPast = variant === "past";
  const isNext = variant === "next";
  
  // Format date nicely
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    }).format(date);
  };

  return (
    <div 
      className={cn(
        "rounded-lg overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        isNext ? 
          "border-accent border-2" : 
          "border-gray-200",
        isNext ? "bg-primary" : "bg-white",
        className
      )}
    >
      {/* Match Status Badge */}
      <div className={cn(
        "px-3 py-1 text-xs font-semibold uppercase",
        isPast ? "bg-gray-100 text-gray-600" : 
        isNext ? "bg-accent text-primary" : 
        "bg-gray-50 text-gray-600"
      )}>
        {isPast ? "Final Result" : isNext ? "Next Match" : "Upcoming"}
      </div>
      
      {/* Match Content */}
      <div className="p-3">
        {/* Competition */}
        <Text 
          as="div" 
          size="xs" 
          className={cn(
            "uppercase font-medium mb-3", 
            isNext ? "text-white/80" : "text-gray"
          )}
        >
          {match.competition} {match.round ? `· ${match.round}` : ''}
        </Text>
        
        {/* Teams */}
        <div className="flex items-center justify-between mb-4">
          {/* Home Team */}
          <div className="flex flex-col items-center text-center">
            <CompetitorLogo name={match.homeTeam} size="sm" />
            <Text 
              as="span" 
              size="xs" 
              weight="medium" 
              className={cn("mt-2 max-w-[70px] line-clamp-2", isNext ? "text-white" : "text-primary")}
            >
              {match.homeTeam}
            </Text>
          </div>
          
          {/* Score or VS */}
          <div className="flex items-center px-2">
            {isPast && match.result ? (
              <div className={cn("text-xl font-bold", isNext ? "text-white" : "text-primary")}>
                {match.result.homeScore} - {match.result.awayScore}
              </div>
            ) : (
              <Text 
                as="span" 
                weight="bold" 
                className={cn(isNext ? "text-white" : "text-primary")}
              >
                VS
              </Text>
            )}
          </div>
          
          {/* Away Team */}
          <div className="flex flex-col items-center text-center">
            <CompetitorLogo name={match.awayTeam} size="sm" />
            <Text 
              as="span" 
              size="xs" 
              weight="medium" 
              className={cn("mt-2 max-w-[70px] line-clamp-2", isNext ? "text-white" : "text-primary")}
            >
              {match.awayTeam}
            </Text>
          </div>
        </div>
        
        {/* Date, Time, Venue */}
        <div className="flex flex-col space-y-1 mb-3">
          <div className="flex items-center">
            <Clock className={cn("h-3 w-3 mr-1", isNext ? "text-white/80" : "text-gray")} />
            <Text 
              as="span" 
              size="xs" 
              className={isNext ? "text-white/80" : "text-gray"}
            >
              {formatDate(match.date)} {match.time ? `· ${match.time}` : ''}
            </Text>
          </div>
          <div className="flex items-center">
            <MapPin className={cn("h-3 w-3 mr-1", isNext ? "text-white/80" : "text-gray")} />
            <Text 
              as="span" 
              size="xs" 
              className={isNext ? "text-white/80" : "text-gray"}
            >
              {match.venue}
            </Text>
          </div>
        </div>
        
        {/* Action Button */}
        {!isPast && (
          <ButtonNew 
            variant={isNext ? "accent" : "primary"} 
            size="sm"
            className="w-full"
            href={match.ticketLink}
          >
            {match.ticketLink ? "GET TICKETS" : "MATCH DETAILS"}
          </ButtonNew>
        )}
        {isPast && match.matchReportLink && (
          <ButtonNew 
            variant="secondary" 
            size="sm"
            className="w-full"
            href={match.matchReportLink}
          >
            MATCH REPORT
          </ButtonNew>
        )}
      </div>
    </div>
  );
};

export default MatchCardNew;
