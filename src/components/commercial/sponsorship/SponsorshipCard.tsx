
"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { CardNew, CardNewContent, CardNewMedia } from '@/components/ui/CardNew';
import Image from 'next/image';

interface SponsorshipCardProps {
  title: string;
  price: string;
  description: string;
  benefits?: string[];
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
        <div className="relative w-full h-full">
          <Image 
            src={image} 
            alt={`${title} sponsorship option`}
            className="object-cover"
            fill
          />
        </div>
      </CardNewMedia>
      <CardNewContent className={cn(
        "flex flex-col flex-grow",
        compact ? "p-3" : "p-6"
      )}>
        <div className="space-y-1">
          <h5 className={cn(
            "font-montserrat font-bold text-primary",
            compact ? "text-base" : "text-xl"
          )}>
            {title}
          </h5>
          <p className={cn(
            compact ? "text-base" : "text-lg", 
            "font-semibold text-primary block"
          )}>
            {price}
          </p>
          <p className="line-clamp-2 text-sm text-gray-600">
            {description}
          </p>
        </div>
      </CardNewContent>
    </CardNew>
  );
};

export default SponsorshipCard;
