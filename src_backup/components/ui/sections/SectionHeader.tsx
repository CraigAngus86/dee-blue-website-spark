
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  viewAllLink?: string;
  viewAllText?: string;
  textColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
  viewAllLink,
  viewAllText,
  textColor,
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
      
      {viewAllLink && (
        <div className="mt-3">
          <a 
            href={viewAllLink}
            className={cn(
              "inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors",
              textColor && `text-${textColor} hover:text-${textColor}-light`
            )}
          >
            {viewAllText || "View All"}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
