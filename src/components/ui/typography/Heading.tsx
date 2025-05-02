
import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'muted';
  className?: string;
}

const Heading = ({ 
  level = 2, 
  children, 
  color = 'default', 
  className 
}: HeadingProps) => {
  const colorClasses = {
    default: 'text-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted-foreground',
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseClasses = {
    h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
    h2: 'text-3xl font-bold tracking-tight lg:text-4xl',
    h3: 'text-2xl font-bold tracking-tight',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
  }[`h${level}`];

  return (
    <Tag className={cn(baseClasses, colorClasses[color], className)}>
      {children}
    </Tag>
  );
};

export default Heading;
