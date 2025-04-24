
import React from 'react';
import { TimelineEntry } from '@/types/timeline';
import { cn } from '@/lib/utils';

interface TimelineExpandedContentProps {
  entry: TimelineEntry | null;
}

const TimelineExpandedContent: React.FC<TimelineExpandedContentProps> = ({ entry }) => {
  if (!entry?.expandedContent) return null;

  return (
    <div className="w-full mt-12 animate-fade-in">
      <div className="border-t border-[#C5E7FF]"></div>
      
      <div className="py-8 px-6 sm:px-8 bg-[#F8FCFF] rounded-b-lg">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-h3 font-bold text-primary font-montserrat mb-4">
            {entry.title}
          </h3>
          
          <div className="font-inter text-dark-gray leading-relaxed">
            <p className="mb-4">{entry.expandedContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineExpandedContent;
