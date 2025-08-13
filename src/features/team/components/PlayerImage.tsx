'use client';
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
  className = '',
}) => {
  // Brand-compliant fallback (black bg + gold icon)
  const renderFallback = () => (
    <div
      className={`flex items-center justify-center bg-[rgb(var(--brand-black))] ${className}`}
      aria-label={`${name} placeholder image`}
    >
      <svg
        className="w-1/2 h-1/2 text-[rgb(var(--brand-gold))]"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
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

  if (!image || !image.public_id) {
    return renderFallback();
  }

  const getVariant = () => {
    switch (size) {
      case 'card':
        return 'playerCard';
      case 'homepage':
        return 'portrait';
      case 'modal':
        return 'playerModal';
      case 'large':
        return 'card';
      default:
        return 'playerCard';
    }
  };

  const imageUrl = getCloudinaryImageUrl(image, {
    variant: getVariant(),
    contentType: 'player',
    width: size === 'modal' ? 600 : 400,
  });

  return (
    <img
      src={imageUrl}
      alt={name}
      loading="lazy"
      decoding="async"
      className={`w-full h-full ${className}`}
      onError={(e) => {
        console.error('Failed to load image for', name);
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src =
          'data:image/svg+xml;utf8,' +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
               <rect width="100" height="100" fill="#000000"/>
               <path d="M50 42a12 12 0 1 0 0-24 12 12 0 0 0 0 24Zm-28 46c0-17 13-26 28-26s28 9 28 26H22Z" fill="#FCC743"/>
             </svg>`
          );
      }}
    />
  );
};

export default PlayerImage;
