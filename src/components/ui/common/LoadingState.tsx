
import React from 'react';

interface LoadingStateProps {
  variant?: 'skeleton' | 'spinner';
  count?: number;
  height?: string;
  width?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'skeleton',
  count = 1,
  height = '200px',
  width = '100%',
}) => {
  if (variant === 'spinner') {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${width}, 1fr))` }}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-200 rounded-lg"
          style={{ height }}
        ></div>
      ))}
    </div>
  );
};

export default LoadingState;
