
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
}) => {
  return (
    <div 
      className={cn(
        "mb-8",
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className
      )}
    >
      <h2 
        className={cn(
          "text-3xl md:text-4xl font-bold font-montserrat text-primary mb-3",
          titleClassName
        )}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p 
          className={cn(
            "text-lg text-gray-600",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
