
import React from 'react';
import { cn } from '@/lib/utils';

interface TextProps {
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'muted';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Text = ({ 
  children, 
  color = 'default', 
  size = 'base', 
  className,
  as: Component = 'p' 
}: TextProps) => {
  const colorClasses = {
    default: 'text-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted-foreground',
  };
  
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <Component className={cn(sizeClasses[size], colorClasses[color], className)}>
      {children}
    </Component>
  );
};

export default Text;
