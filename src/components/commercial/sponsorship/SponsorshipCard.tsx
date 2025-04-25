
import React from 'react';
import { cn } from '@/lib/utils';
import { CardNew, CardNewContent, CardNewMedia } from '@/components/ui/CardNew';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';

interface SponsorshipCardProps {
  title: string;
  price: string;
  description: string;
  benefits: string[];
  image: string;
  className?: string;
  hideViewDetails?: boolean;
  compact?: boolean;
}

const SponsorshipCard: React.FC<SponsorshipCardProps> = ({
  title,
  price,
  description,
  image,
  className,
  compact = false
}) => {
  return (
    <CardNew elevation="md" className={cn("h-full flex flex-col", className)}>
      <CardNewMedia aspectRatio={compact ? "4/3" : "16/9"}>
        <img 
          src={image} 
          alt={`${title} sponsorship option`}
          className="w-full h-full object-cover"
        />
      </CardNewMedia>
      <CardNewContent className={cn(
        "flex flex-col h-full",
        compact ? "p-4" : "p-6"
      )}>
        <div className="space-y-2">
          <Heading level={4} color="primary" className={cn(
            compact ? "text-lg" : "text-xl"
          )}>
            {title}
          </Heading>
          <Text 
            size={compact ? "medium" : "large"} 
            weight="semibold" 
            color="primary"
            className="text-secondary"
          >
            {price}
          </Text>
          <Text 
            size={compact ? "small" : "medium"} 
            color="default"
            className="line-clamp-2"
          >
            {description}
          </Text>
        </div>
      </CardNewContent>
    </CardNew>
  );
};

export default SponsorshipCard;
