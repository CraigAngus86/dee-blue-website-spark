
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Commercial opportunities error:', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Failed to load commercial opportunities</h2>
      <Button
        onClick={reset}
        variant="default"
        className="bg-primary hover:bg-primary/90"
      >
        Try again
      </Button>
    </div>
  );
}
