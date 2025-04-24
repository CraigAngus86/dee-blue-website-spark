
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
          "w-4 h-4 rounded-full mb-2 transition-all duration-300 flex items-center justify-center", // Reduced size and spacing
          isActive ? "bg-accent border-2 border-accent scale-110" : "bg-white border border-[#C5E7FF]"
        )}
        aria-label={`Go to ${entry.year}: ${entry.title}`}
      >
        {!isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#00105A]" />}
      </button>
      
      <div className="text-center w-[180px] md:w-[220px]"> {/* Reduced widths */}
        <p className="text-base font-bold text-primary mb-1"> {/* Reduced text size and spacing */}
          {entry.year}
        </p>
        <h4 className="text-sm font-semibold mb-2"> {/* Reduced text size and spacing */}
          {entry.title}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2"> {/* Reduced text size, lines, and spacing */}
          {entry.description}
        </p>
        
        {entry.expandedContent && (
          <button
            onClick={onExpandToggle}
            className="text-xs text-primary hover:text-primary/80 underline transition-colors flex items-center justify-center gap-1"
          >
            {isExpanded ? 'Read less' : 'Read more'}
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-300", // Reduced icon size
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
