import React from 'react';

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
    let imageUrl = '';
    
    // For Cloudinary assets from Sanity
    if (image._type === 'cloudinary.asset') {
      if (image.public_id) {
        const publicId = image.public_id;
        const format = image.format || 'jpg';
        const baseUrl = 'https://res.cloudinary.com/dlkpaw2a0/image/upload';
        // Enhanced transformation: responsive sizing, progressive loading
        const transformation = 'c_fill,g_auto:subject,ar_21:9,w_auto,dpr_auto,q_auto:good,f_auto,fl_progressive';
        imageUrl = `${baseUrl}/${transformation}/${publicId}.${format}`;
      } else if (image.secure_url) {
        imageUrl = image.secure_url;
      }
    } 
    // Handle regular URLs
    else if (image.url) {
      imageUrl = image.url;
    }
    // Handle direct string URLs
    else if (typeof image === 'string') {
      imageUrl = image;
    }
    
    // If we couldn't determine a URL, use fallback
    if (!imageUrl) {
      return renderFallback();
    }
    
    return (
      <div className="relative w-full h-full">
        <img 
          src={imageUrl}
          alt={image.alt || title}
          className={`object-cover w-full h-full ${className}`}
          onError={(e) => {
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
      </div>
    );
  } catch (error) {
    console.error(`Error processing hero image for ${title}:`, error);
    return renderFallback();
  }
};

export default HeroImage;