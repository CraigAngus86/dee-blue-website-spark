import React from 'react';
import CloudinaryImage from '@/components/ui/cloudinary/CloudinaryImage';

interface HeroImageProps {
  image: any;
  title: string;
  category?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ image, title, category }) => {
  return (
    <CloudinaryImage
      image={image}
      variant="hero"
      alt={title}
      category={category}
      responsive={true} // Enable mobile/desktop aspects
      priority={true}
      containerClassName="absolute inset-0"
    />
  );
};

export default HeroImage;
