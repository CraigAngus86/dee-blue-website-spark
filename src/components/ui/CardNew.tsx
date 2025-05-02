
import React from 'react';
import { cn } from '@/lib/utils';

interface CardNewProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'none' | 'flat' | 'sm' | 'md' | 'lg';
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const CardNew = ({
  children,
  className,
  elevation = 'sm',
  hoverEffect = false,
  onClick,
}: CardNewProps) => {
  const elevationClasses = {
    none: '',
    flat: 'border border-gray-100',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden',
        elevationClasses[elevation],
        hoverEffect && 'transition-all duration-200 hover:-translate-y-1 hover:shadow-md',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Adding the missing CardNewContent component
export const CardNewContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('p-4', className)}>
      {children}
    </div>
  );
};

// Adding the missing CardNewMedia component
export const CardNewMedia = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('relative w-full', className)}>
      {children}
    </div>
  );
};
