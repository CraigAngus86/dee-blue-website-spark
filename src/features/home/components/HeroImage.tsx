import React from 'react';
import { getImageUrl } from '@/features/news/types';

interface HeroImageProps {
  image: any; // This can be either a Sanity image or Cloudinary object
  title: string;
  className?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ 
  image, 
  title,
  className = ''
}) => {
  // Fallback component
  const renderFallback = () => (
    <div className={`flex items-center justify-center bg-[#00105A] ${className}`}>
      <div className="text-white/50 text-xl">Image not available</div>
    </div>
  );

  // If no image data
  if (!image) {
    return renderFallback();
  }

  try {
    // Use the utility function to get the proper URL
    const imageUrl = getImageUrl(image, {
      width: 1920,
      height: 1080,
      aspect: '16:9',
      gravity: 'auto:faces'
    });
    
    if (!imageUrl) {
      console.error('Could not generate image URL for hero image:', title);
      return renderFallback();
    }

    return (
      <img 
        src={imageUrl}
        alt={image.alt || title}
        className={`object-cover w-full h-full ${className}`}
        onError={(e) => {
          console.error(`Failed to load hero image for ${title} from ${imageUrl}`);
          // Set fallback in case of error
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite loop
          const fallbackElement = document.createElement('div');
          fallbackElement.className = target.className;
          fallbackElement.innerHTML = `<div class="flex items-center justify-center h-full bg-[#00105A] ${className}"><div class="text-white/50 text-xl">Image not available</div></div>`;
          if (target.parentNode) {
            target.parentNode.replaceChild(fallbackElement, target);
          }
        }}
      />
    );
  } catch (error) {
    console.error(`Error processing hero image for ${title}:`, error);
    return renderFallback();
  }
};

export default HeroImage;
