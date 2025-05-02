
import React from 'react';

type GradientSeparatorProps = {
  className?: string;
};

const GradientSeparator = ({ className = "" }: GradientSeparatorProps) => {
  return (
    <div 
      className={`h-1 w-full bg-gradient-to-r from-primary via-accent to-primary ${className}`}
      aria-hidden="true"
    />
  );
};

export default GradientSeparator;
