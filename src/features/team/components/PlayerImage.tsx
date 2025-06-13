import React from 'react';
import { getCloudinaryImageUrl } from '@/lib/cloudinary/imageTransforms';

interface PlayerImageProps {
  image: any;
  name: string;
  size?: 'card' | 'modal' | 'large' | 'homepage';
  className?: string;
}

export const PlayerImage: React.FC<PlayerImageProps> = ({ 
  image, 
  name, 
  size = 'card',
  className = ''
}) => {
  // Fallback component
  const renderFallback = () => (
    <div className={`flex items-center justify-center bg-[#00105A] ${className}`}>
      <svg 
        className="w-1/2 h-1/2 text-[#001C8C]" 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fillRule="evenodd" 
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
          clipRule="evenodd" 
        />
      </svg>
    </div>
  );
  
  // If no image data
  if (!image || !image.public_id) {
    return renderFallback();
  }
  
  // Map size to variant
  const getVariant = () => {
    switch(size) {
      case 'card': return 'playerCard';
      case 'homepage': return 'portrait';
      case 'modal': return 'playerModal';
      case 'large': return 'card';
      default: return 'playerCard';
    }
  };
  
  const imageUrl = getCloudinaryImageUrl(image, {
    variant: getVariant(),
    contentType: 'player',
    width: size === 'modal' ? 600 : 400
  });
  
  return (
    <img 
      src={imageUrl}
      alt={name}
      className={`w-full h-full ${className}`}
      onError={(e) => {
        console.error(`Failed to load image for ${name}`);
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDAxMDVBIi8+PHBhdGggZD0iTTUwIDI1QzQzLjEgMjUgMzcuNSAzMC42IDM3LjUgMzcuNVM0My4xIDUwIDUwIDUwIDYyLjUgNDQuNCA2Mi41IDM3LjUgNTYuOSAyNSA1MCAyNXpNMjUgODcuNUM1IDY4LjggMzkuOCA2Mi41IDUwIDYyLjVDNjkuMiA2Mi41IDc1IDY4LjggNzUgODcuNUgyNVoiIGZpbGw9IiMwMDFDOEMiLz48L3N2Zz4=';
      }}
    />
  );
};

export default PlayerImage;
