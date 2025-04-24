
import React from 'react';
import { TimelineEntry } from '@/types/timeline';
import ResponsiveImage from '@/components/ui/image/ResponsiveImage';

interface TimelineExpandedContentProps {
  entry: TimelineEntry | null;
}

const TimelineExpandedContent: React.FC<TimelineExpandedContentProps> = ({ entry }) => {
  if (!entry?.expandedContent) return null;

  return (
    <div className="w-full mt-12 py-8 border-t border-[#C5E7FF] animate-fade-in">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            <ResponsiveImage
              src={entry.imageUrl}
              alt={entry.title}
              aspectRatio="16/9"
              className="rounded-lg shadow-md"
              shadow="md"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-h3 font-semibold mb-4">{entry.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{entry.expandedContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineExpandedContent;
