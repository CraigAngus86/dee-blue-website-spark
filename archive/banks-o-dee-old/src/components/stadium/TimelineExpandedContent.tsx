
import React from 'react';
import { TimelineEntry } from '@/types/timeline';
import { cn } from '@/lib/utils';

interface TimelineExpandedContentProps {
  entry: TimelineEntry | null;
}

const TimelineExpandedContent: React.FC<TimelineExpandedContentProps> = ({ entry }) => {
  if (!entry?.expandedContent) return null;

  return (
    <div className="w-full mt-8 animate-fade-in">
      <div className="border-t border-[#C5E7FF]"></div>
      
      <div className="py-6 px-6 bg-[#F8FCFF] rounded-b-md">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-base font-bold text-primary font-montserrat mb-2">
            {entry.title}
          </h3>
          
          <div className="font-inter text-dark-gray leading-relaxed">
            <p className="text-sm mb-4">{entry.expandedContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineExpandedContent;
