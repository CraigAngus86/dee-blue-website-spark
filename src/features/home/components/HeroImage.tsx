import React from 'react';
import CloudinaryImage from '@/components/ui/cloudinary/CloudinaryImage';

interface HeroImageProps {
  image: any;
  title: string;
  category?: string;
}

/**
 * HeroImage
 * - Keeps the same props/signature.
 * - Adds a soft readability overlay (black → transparent).
 * - Adds a very subtle gold vignette for brand warmth.
 * - Leaves CloudinaryImage config as-is to avoid regressions.
 */
const HeroImage: React.FC<HeroImageProps> = ({ image, title, category }) => {
  return (
    <div className="absolute inset-0">
      {/* Background Image */}
      <CloudinaryImage
        image={image}
        variant="hero"
        alt={title}
        category={category}
        responsive={true}  // Enable mobile/desktop aspects
        priority={true}
        containerClassName="absolute inset-0"
      />

      {/* Readability overlay (black gradient, subtle) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        {/* top-to-bottom: stronger at bottom to help text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        {/* soft gold vignette for brand feel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 60% at 70% 85%, rgba(252,199,67,0.17) 0%, rgba(252,199,67,0.0) 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default HeroImage;
