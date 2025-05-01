
import React from 'react';
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton';
  count?: number;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  variant = 'skeleton', 
  count = 3,
  className = ''
}) => {
  if (variant === 'spinner') {
    return (
      <div className={`flex justify-center items-center py-12 ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-6 w-36" />
          <div className="grid gap-4">
            {Array.from({ length: i === 0 ? 3 : 2 }).map((_, j) => (
              <Skeleton key={j} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
