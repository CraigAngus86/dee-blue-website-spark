
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientSeparatorProps {
  className?: string;
  height?: string;
  colors?: {
    from: string;
    via?: string;
    to: string;
  };
}

const GradientSeparator: React.FC<GradientSeparatorProps> = ({
  className,
  height = '8px',
  colors = {
    from: 'from-primary',
    via: 'via-primary-light',
    to: 'to-accent',
  },
}) => {
  return (
    <div 
      className={cn(
        "w-full bg-gradient-to-r",
        colors.from,
        colors.via,
        colors.to,
        className
      )}
      style={{ height }}
    />
  );
};

export default GradientSeparator;
