
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";
import Text from "@/components/ui/typography/Text";
import Heading from "@/components/ui/typography/Heading";
import { fansOfTheMonth } from "@/mock-data/fanContentData";

interface FanOfTheMonthProps {
  className?: string;
  fanId?: number;
}

const FanOfTheMonth: React.FC<FanOfTheMonthProps> = ({ 
  className,
  fanId = 1 // Default to first fan
}) => {
  // Get the fan data based on the ID, or use the first one as fallback
  const fanData = fansOfTheMonth.find(fan => fan.id === fanId) || fansOfTheMonth[0];

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col md:flex-row", 
        className
      )}
    >
      {/* Fan image - 40% width on desktop, full width on mobile */}
      <div className="w-full md:w-2/5 relative">
        <div className="aspect-square h-full w-full">
          <ResponsiveImage
            src={fanData.image}
            alt={`Fan of the Month: ${fanData.name}`}
            aspectRatio="1/1"
            className="w-full h-full"
            objectFit="cover"
          />
        </div>
      </div>
      
      {/* Content area */}
      <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold mb-4">
            Fan of the Month
          </span>
          
          <div className="mb-4">
            <Text as="p" className="italic text-gray-700 mb-4 relative">
              <span className="text-2xl font-serif text-accent absolute -left-2 -top-2">"</span>
              {fanData.quote}
              <span className="text-2xl font-serif text-accent">"</span>
            </Text>
          </div>
        </div>
        
        <div>
          <Heading level={4} className="font-bold mb-1">{fanData.name}</Heading>
          <Text size="small" color="muted">
            Supporter since {fanData.supporterSince}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default FanOfTheMonth;
