import React from 'react';
import { cn } from '@/lib/utils';

interface GradientSeparatorProps {
  className?: string;
}

const GradientSeparator: React.FC<GradientSeparatorProps> = ({
  className
}) => {
  return (
    <div className={cn("py-10 relative flex justify-center items-center", className)}>
      {/* Gradient bar without logo */}
      <div className="w-full h-2 md:h-[8px] bg-gradient-to-r from-[#00105A] to-[#FFD700]"></div>
    </div>
  );
};

export default GradientSeparator;
