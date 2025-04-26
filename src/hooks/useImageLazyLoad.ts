
import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useImageLazyLoad = (options: UseLazyLoadOptions = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const currentImageRef = imageRef.current;
    
    if (!currentImageRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(currentImageRef);
        }
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || '50px'
      }
    );
    
    observer.observe(currentImageRef);
    
    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef);
      }
    };
  }, [options.threshold, options.rootMargin]);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  return {
    imageRef,
    isInView,
    isLoaded,
    handleLoad
  };
};
