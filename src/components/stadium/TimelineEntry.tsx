
import React from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown } from 'lucide-react';
import { TimelineEntry as TimelineEntryType } from '@/types/timeline';

interface TimelineEntryProps {
  entry: TimelineEntryType;
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
  onExpandToggle: () => void;
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({
  entry,
  isActive,
  isExpanded,
  onClick,
  onExpandToggle,
}) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center transition-transform duration-300">
      <button
        onClick={onClick}
        className={cn(
          "w-5 h-5 rounded-full mb-4 transition-all duration-300 flex items-center justify-center",
          isActive ? "bg-accent border-2 border-accent scale-125" : "bg-white border border-[#C5E7FF]"
        )}
        aria-label={`Go to ${entry.year}: ${entry.title}`}
      >
        {!isActive && <div className="w-2 h-2 rounded-full bg-[#00105A]" />}
      </button>
      
      <div className="text-center w-[200px] md:w-[250px]">
        <p className="text-lg font-bold text-primary">
          {entry.year}
        </p>
        <h4 className="text-h4 font-semibold mt-2 mb-3">
          {entry.title}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {entry.description}
        </p>
        
        {entry.expandedContent && (
          <button
            onClick={onExpandToggle}
            className="text-sm text-primary hover:text-primary/80 underline transition-colors flex items-center justify-center gap-2"
          >
            {isExpanded ? 'Read less' : 'Read more'}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default TimelineEntry;
