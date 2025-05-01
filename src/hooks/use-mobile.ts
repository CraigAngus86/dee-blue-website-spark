
'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if the current viewport is a mobile device
 * Safe for server-side rendering
 */
export function useIsMobile(): boolean {
  // Initialize with false to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setHasMounted(true);
    
    // Set initial value
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initial value
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Return false during SSR, actual value after hydration
  return hasMounted ? isMobile : false;
}
