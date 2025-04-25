
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { CardNew, CardNewContent, CardNewMedia } from '@/components/ui/CardNew';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import { ButtonNew } from '@/components/ui/ButtonNew';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SponsorshipCardProps {
  title: string;
  price: string;
  description: string;
  benefits: string[];
  image: string;
  className?: string;
}

const SponsorshipCard: React.FC<SponsorshipCardProps> = ({
  title,
  price,
  description,
  benefits,
  image,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CardNew elevation="md" className={cn("h-full", className)}>
      <CardNewMedia aspectRatio="16/9">
        <img 
          src={image} 
          alt={`${title} sponsorship option`}
          className="w-full h-full object-cover"
        />
      </CardNewMedia>
      <CardNewContent>
        <div className="space-y-4">
          <Heading level={4} color="primary">
            {title}
          </Heading>
          <Text size="large" weight="semibold" color="primary">
            {price}
          </Text>
          <Text color="default">
            {description}
          </Text>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <ButtonNew 
                variant="secondary" 
                className="w-full"
                iconRight={isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              >
                {isOpen ? 'Hide Details' : 'View Details'}
              </ButtonNew>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-2">
                <Text weight="semibold" color="primary">Key Benefits:</Text>
                <ul className="list-disc list-inside space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index}>
                      <Text color="default">{benefit}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardNewContent>
    </CardNew>
  );
};

export default SponsorshipCard;
