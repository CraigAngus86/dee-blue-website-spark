
import React from "react";
import CompetitorLogo from "@/components/ui/image/CompetitorLogo";
import { cn } from "@/lib/utils";
import Text from "@/components/ui/typography/Text";
import { ButtonNew } from "@/components/ui/ButtonNew";
import { MapPin, Clock } from "lucide-react";
import HoverEffect from "@/components/ui/animations/HoverEffect";

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
  
  // Determine border and background styles based on variant
  const cardStyles = {
    past: "bg-white border border-gray-200",
    next: "bg-white border-2 border-accent",
    future: "bg-white border border-gray-200",
  };
  
  // Determine text color based on variant
  const textColor = "text-primary";
  const mutedTextColor = "text-gray";
  
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
    <HoverEffect effect="lift" className={cn(
      "rounded-lg overflow-hidden transition-all duration-300",
      cardStyles[variant],
      className
    )}>
      {/* Match Status Badge */}
      <div className={cn(
        "px-3 py-1 text-xs font-semibold uppercase",
        isPast ? "bg-gray-100 text-gray-600" : 
        isNext ? "bg-accent text-primary" : 
        "bg-gray-100 text-gray-600"
      )}>
        {isPast ? "Final Result" : isNext ? "Next Match" : "Upcoming"}
      </div>
      
      {/* Match Content */}
      <div className="p-3">
        {/* Competition */}
        <Text 
          as="div" 
          size="xs" 
          className={cn("uppercase font-medium mb-2", mutedTextColor)}
        >
          {match.competition} {match.round ? `· ${match.round}` : ''}
        </Text>
        
        {/* Teams */}
        <div className="flex items-center justify-between mb-3">
          {/* Home Team */}
          <div className="flex flex-col items-center text-center w-[30%]">
            <CompetitorLogo name={match.homeTeam} size="sm" />
            <Text as="span" size="small" weight="medium" className={cn("mt-1 max-w-[80px] line-clamp-2", textColor)}>
              {match.homeTeam}
            </Text>
          </div>
          
          {/* Score or VS */}
          <div className="flex items-center w-[40%] justify-center">
            {isPast && match.result ? (
              <div className={cn("text-xl font-bold px-2", textColor)}>
                {match.result.homeScore} - {match.result.awayScore}
              </div>
            ) : (
              <Text as="span" size="small" weight="bold" className={cn("px-2", textColor)}>
                VS
              </Text>
            )}
          </div>
          
          {/* Away Team */}
          <div className="flex flex-col items-center text-center w-[30%]">
            <CompetitorLogo name={match.awayTeam} size="sm" />
            <Text as="span" size="small" weight="medium" className={cn("mt-1 max-w-[80px] line-clamp-2", textColor)}>
              {match.awayTeam}
            </Text>
          </div>
        </div>
        
        {/* Date, Time, Venue */}
        <div className="flex flex-col space-y-1 mb-3">
          <div className="flex items-center">
            <Clock className={cn("h-3.5 w-3.5 mr-1", mutedTextColor)} />
            <Text as="span" size="xs" className={mutedTextColor}>
              {formatDate(match.date)} {match.time ? `· ${match.time}` : ''}
            </Text>
          </div>
          <div className="flex items-center">
            <MapPin className={cn("h-3.5 w-3.5 mr-1", mutedTextColor)} />
            <Text as="span" size="xs" className={mutedTextColor}>
              {match.venue}
            </Text>
          </div>
        </div>
        
        {/* Action Button */}
        {!isPast && (
          <ButtonNew 
            variant={isNext ? "accent" : "primary"} 
            size="sm"
            className="w-full mt-1"
          >
            {match.ticketLink ? "GET TICKETS" : "MATCH DETAILS"}
          </ButtonNew>
        )}
        {isPast && match.matchReportLink && (
          <ButtonNew 
            variant="secondary" 
            size="sm"
            className="w-full mt-1"
          >
            MATCH REPORT
          </ButtonNew>
        )}
      </div>
    </HoverEffect>
  );
};

export default MatchCardNew;
