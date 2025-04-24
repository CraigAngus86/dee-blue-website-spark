
import React from 'react';
import { TimelineEntry } from '@/types/timeline';
import { cn } from '@/lib/utils';

interface TimelineExpandedContentProps {
  entry: TimelineEntry | null;
}

const TimelineExpandedContent: React.FC<TimelineExpandedContentProps> = ({ entry }) => {
  if (!entry?.expandedContent) return null;

  return (
    <div className="w-full mt-6 animate-fade-in"> {/* Reduced top margin */}
      <div className="border-t border-[#C5E7FF]"></div>
      
      <div className="py-4 px-4 sm:px-6 bg-[#F8FCFF] rounded-b-md"> {/* Reduced padding */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-base font-bold text-primary font-montserrat mb-2"> {/* Reduced text size and spacing */}
            {entry.title}
          </h3>
          
          <div className="font-inter text-dark-gray leading-relaxed">
            <p className="text-sm mb-3">{entry.expandedContent}</p> {/* Reduced text size and spacing */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineExpandedContent;
