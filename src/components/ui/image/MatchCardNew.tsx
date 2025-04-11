
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
  
  // Determine background color based on variant
  const bgColor = {
    past: "bg-gray-100",
    next: "bg-primary",
    future: "bg-white",
  };
  
  // Determine text color based on variant
  const textColor = isNext ? "text-white" : "text-primary";
  const mutedTextColor = isNext ? "text-white/80" : "text-gray";
  
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
        "rounded-lg overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        bgColor[variant],
        className
      )}
    >
      {/* Match Status Badge */}
      <div className={cn(
        "px-4 py-1.5 text-xs font-semibold uppercase",
        isPast ? "bg-gray-200 text-gray-600" : 
        isNext ? "bg-accent text-primary" : 
        "bg-gray-100 text-gray-600"
      )}>
        {isPast ? "Final Result" : isNext ? "Next Match" : "Upcoming"}
      </div>
      
      {/* Match Content */}
      <div className="p-4">
        {/* Competition */}
        <Text 
          as="div" 
          size="xs" 
          className={cn("uppercase font-medium mb-4", mutedTextColor)}
        >
          {match.competition} {match.round ? `· ${match.round}` : ''}
        </Text>
        
        {/* Teams */}
        <div className="flex items-center justify-between mb-6">
          {/* Home Team */}
          <div className="flex flex-col items-center text-center">
            <CompetitorLogo name={match.homeTeam} size="md" />
            <Text as="span" size="small" weight="medium" className={cn("mt-2 max-w-[80px]", textColor)}>
              {match.homeTeam}
            </Text>
          </div>
          
          {/* Score or VS */}
          <div className="flex items-center">
            {isPast && match.result ? (
              <div className={cn("text-2xl font-bold px-4", textColor)}>
                {match.result.homeScore} - {match.result.awayScore}
              </div>
            ) : (
              <Text as="span" size="large" weight="bold" className={cn("px-4", textColor)}>
                VS
              </Text>
            )}
          </div>
          
          {/* Away Team */}
          <div className="flex flex-col items-center text-center">
            <CompetitorLogo name={match.awayTeam} size="md" />
            <Text as="span" size="small" weight="medium" className={cn("mt-2 max-w-[80px]", textColor)}>
              {match.awayTeam}
            </Text>
          </div>
        </div>
        
        {/* Date, Time, Venue */}
        <div className="flex flex-col space-y-1 mb-4">
          <div className="flex items-center">
            <Clock className={cn("h-3.5 w-3.5 mr-1.5", mutedTextColor)} />
            <Text as="span" size="small" className={mutedTextColor}>
              {formatDate(match.date)} {match.time ? `· ${match.time}` : ''}
            </Text>
          </div>
          <div className="flex items-center">
            <MapPin className={cn("h-3.5 w-3.5 mr-1.5", mutedTextColor)} />
            <Text as="span" size="small" className={mutedTextColor}>
              {match.venue}
            </Text>
          </div>
        </div>
        
        {/* Action Button */}
        {!isPast && (
          <ButtonNew 
            variant={isNext ? "accent" : "primary"} 
            size="sm"
            className="w-full mt-2"
          >
            {match.ticketLink ? "GET TICKETS" : "MATCH DETAILS"}
          </ButtonNew>
        )}
        {isPast && match.matchReportLink && (
          <ButtonNew 
            variant="secondary" 
            size="sm"
            className="w-full mt-2"
          >
            MATCH REPORT
          </ButtonNew>
        )}
      </div>
    </div>
  );
};

export default MatchCardNew;
