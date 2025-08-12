import React from "react";
import CloudinaryImage from "@/components/ui/cloudinary/CloudinaryImage";

interface HeroImageProps {
  image: any;
  title: string;
  category?: string;
}

/**
 * HeroImage
 * - Background image only (no overlays; handled in HomeHeroSection).
 * - Absolute positioning so hero overlays/text sit above.
 */
const HeroImage: React.FC<HeroImageProps> = ({ image, title, category }) => {
  return (
    <div className="absolute inset-0">
      <CloudinaryImage
        image={image}
        variant="hero"
        alt={title}
        category={category}
        responsive
        priority
        containerClassName="absolute inset-0 z-0"
      />
    </div>
  );
};

export default HeroImage;
