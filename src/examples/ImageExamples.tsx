
import React from 'react';
import ResponsiveImage from '../components/ui/image/ResponsiveImage';

const ImageExamples = () => {
  return (
    <div className="space-y-4">
      {/* Basic usage */}
      <ResponsiveImage
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
        alt="Example image"
        loading="lazy"
      />
      
      {/* With custom dimensions */}
      <ResponsiveImage
        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
        alt="Example image with custom dimensions"
        width={800}
        height={600}
      />
      
      {/* With different aspect ratio */}
      <ResponsiveImage
        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
        alt="Example image with 4:3 ratio"
        aspectRatio="4/3"
      />
    </div>
  );
};

export default ImageExamples;
