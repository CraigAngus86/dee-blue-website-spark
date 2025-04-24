
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
          "w-3 h-3 rounded-full mb-1.5 transition-all duration-300 flex items-center justify-center", // Reduced size and spacing
          isActive ? "bg-accent border border-accent scale-105" : "bg-white border border-[#C5E7FF]"
        )}
        aria-label={`Go to ${entry.year}: ${entry.title}`}
      >
        {!isActive && <div className="w-1 h-1 rounded-full bg-[#00105A]" />} {/* Reduced dot size */}
      </button>
      
      <div className="text-center w-[160px] md:w-[200px]"> {/* Reduced widths */}
        <p className="text-sm font-bold text-primary mb-0.5"> {/* Reduced text and spacing */}
          {entry.year}
        </p>
        <h4 className="text-xs font-semibold mb-1 text-dark-gray"> {/* Reduced text and spacing */}
          {entry.title}
        </h4>
        <p className="text-xs text-gray line-clamp-2 mb-1"> {/* Reduced text and spacing */}
          {entry.description}
        </p>
        
        {entry.expandedContent && (
          <button
            onClick={onExpandToggle}
            className="text-xs text-primary hover:text-primary/80 underline transition-colors flex items-center justify-center gap-0.5"
          >
            {isExpanded ? 'Read less' : 'Read more'}
            <ChevronDown
              className={cn(
                "h-2.5 w-2.5 transition-transform duration-300", // Reduced icon size
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
