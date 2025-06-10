import React from 'react';

interface HeroImageProps {
  image: any;
  title: string;
  category?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ image, title, category }) => {
  // Updated Cloudinary transform with face detection for match content
  const getImageUrl = (image: any): string => {
    if (!image) return '';
    
    // For Cloudinary assets from Sanity
    if (image._type === 'cloudinary.asset') {
      if (image.public_id) {
        const publicId = image.public_id;
        const format = image.format || 'jpg';
        const baseUrl = 'https://res.cloudinary.com/dlkpaw2a0/image/upload';
        
        // Use face detection for match content, subject for others
        if (category === 'matchReport' || category === 'matchGallery') {
          // Face detection with slight downward adjustment for hero 21:9
          return `${baseUrl}/c_fill,g_face,y_10,ar_21:9,q_auto:good,f_auto,w_auto/${publicId}.${format}`;
        } else {
          // Standard hero transform for non-match content
          return `${baseUrl}/c_fill,g_auto:subject,ar_21:9,q_auto:good,f_auto,w_auto/${publicId}.${format}`;
        }
      } else if (image.secure_url) {
        return image.secure_url;
      }
    } 
    // Handle regular URLs
    else if (image.url) {
      return image.url;
    }
    // Handle direct string URLs
    else if (typeof image === 'string') {
      return image;
    }
    
    return '';
  };

  return (
    <img 
      src={getImageUrl(image)}
      alt={title}
      className="w-full h-full object-cover"
      onError={(e) => {
        console.error(`Failed to load hero image for ${title}`);
        // Set fallback in case of error
        const target = e.target as HTMLImageElement;
        target.onerror = null; // Prevent infinite loop
        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDAxMDVBIi8+Cjx0ZXh0IHg9IjUiIHk9IjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiPkJvRDwvdGV4dD4KPHN2Zz4K';
      }}
    />
  );
};

export default HeroImage;
