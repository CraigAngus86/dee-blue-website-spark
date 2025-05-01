
import React from "react";
import { cn } from "@/lib/utils";
import Text from "@/components/ui/typography/Text";

interface LeaguePositionStripProps {
  position: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
  className?: string;
}

const LeaguePositionStrip: React.FC<LeaguePositionStripProps> = ({
  position,
  points,
  form,
  className
}) => {
  // Determine form indicators with proper colors
  const getFormColor = (result: string) => {
    switch(result) {
      case 'W': return 'bg-green-500';
      case 'D': return 'bg-yellow-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className={cn("flex items-center p-4 bg-white rounded-md shadow-sm", className)}>
      {/* Position and team name */}
      <div className="flex items-center mr-8">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
          {position}
        </div>
        <div>
          <Text as="div" weight="bold" color="primary">Banks o' Dee FC</Text>
          <Text as="div" size="small" color="muted">Highland League</Text>
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex items-center space-x-8 ml-auto">
        {/* Points */}
        <div className="text-center">
          <Text as="div" size="large" weight="bold" color="primary">{points}</Text>
          <Text as="div" size="xs" color="muted">POINTS</Text>
        </div>
        
        {/* Form */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-1.5">
            {form.map((result, index) => (
              <div 
                key={index} 
                className={cn(
                  "w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-semibold",
                  getFormColor(result)
                )}
              >
                {result}
              </div>
            ))}
          </div>
          <Text as="div" size="xs" color="muted" className="mt-1">FORM</Text>
        </div>
      </div>
    </div>
  );
};

export default LeaguePositionStrip;
