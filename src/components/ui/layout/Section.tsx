
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'light' | 'dark' | 'primary' | 'accent' | 'transparent';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  className,
  background = 'transparent',
  spacing = 'md',
  container = true,
}) => {
  // Background styles
  const getBgClass = () => {
    switch (background) {
      case 'light':
        return 'bg-gray-50';
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'primary':
        return 'bg-primary text-white';
      case 'accent':
        return 'bg-accent text-white';
      case 'transparent':
      default:
        return 'bg-transparent';
    }
  };
  
  // Spacing styles
  const getSpacingClass = () => {
    switch (spacing) {
      case 'none':
        return 'py-0';
      case 'sm':
        return 'py-6';
      case 'md':
        return 'py-12';
      case 'lg':
        return 'py-16 md:py-20';
      case 'xl':
        return 'py-20 md:py-24';
      default:
        return 'py-12';
    }
  };

  return (
    <section
      id={id}
      className={cn(
        getBgClass(),
        getSpacingClass(),
        className
      )}
    >
      {container ? (
        <div className="container mx-auto px-4">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export default Section;
