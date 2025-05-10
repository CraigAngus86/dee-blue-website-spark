
import React from 'react';
import { cn } from '@/lib/utils';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';

interface SponsorshipTierProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const SponsorshipTier: React.FC<SponsorshipTierProps> = ({
  title,
  description,
  children,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="max-w-2xl mx-auto text-center">
        <Heading level={3} color="primary" className="mb-3">
          {title}
        </Heading>
        <Text color="default">
          {description}
        </Text>
      </div>
      {children}
    </div>
  );
};

export default SponsorshipTier;
