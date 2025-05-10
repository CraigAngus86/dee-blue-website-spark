
import React from 'react';
import { cn } from '@/lib/utils';

interface PatternOverlayProps {
  children?: React.ReactNode;
  className?: string;
  pattern?: 'dots' | 'grid' | 'diagonal' | 'hexagons';
  color?: string;
  opacity?: number;
}

const PatternOverlay: React.FC<PatternOverlayProps> = ({
  children,
  className,
  pattern = 'dots',
  color = 'currentColor',
  opacity = 0.05,
}) => {
  // Define pattern styles
  const getPatternStyles = () => {
    switch (pattern) {
      case 'dots':
        return {
          backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        };
      case 'grid':
        return {
          backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), 
                           linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        };
      case 'diagonal':
        return {
          backgroundImage: `repeating-linear-gradient(45deg, ${color}, ${color} 1px, transparent 1px, transparent 10px)`,
        };
      case 'hexagons':
        return {
          backgroundImage: `repeating-radial-gradient(${color} 0, ${color} 1px, transparent 1px, transparent 100%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        };
      default:
        return {};
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          ...getPatternStyles(),
          opacity,
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PatternOverlay;
