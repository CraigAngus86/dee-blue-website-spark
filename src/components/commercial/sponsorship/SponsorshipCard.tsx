
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
      <CardNewMedia aspectRatio="4/3">
        <img 
          src={image} 
          alt={`${title} sponsorship option`}
          className="w-full h-full object-cover"
        />
      </CardNewMedia>
      <CardNewContent className={cn(
        "flex flex-col flex-grow",
        compact ? "p-3" : "p-6"
      )}>
        <div className="space-y-1">
          <Heading level={5} color="primary" className={cn(
            compact ? "text-base" : "text-xl"
          )}>
            {title}
          </Heading>
          <Text 
            size={compact ? "medium" : "large"} 
            weight="semibold" 
            color="primary"
            className="block"
          >
            {price}
          </Text>
          <Text 
            size="small"
            color="default"
            className="line-clamp-2 text-gray-600"
          >
            {description}
          </Text>
        </div>
      </CardNewContent>
    </CardNew>
  );
};

export default SponsorshipCard;
