
import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { cloudinary } from '@/lib/cloudinary';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

interface CloudinaryImageProps {
  publicId: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  width = 500,
  height = 500,
  alt,
  className,
}) => {
  const img = cloudinary
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  return (
    <AdvancedImage 
      cldImg={img} 
      alt={alt}
      className={className}
    />
  );
};

export default CloudinaryImage;
