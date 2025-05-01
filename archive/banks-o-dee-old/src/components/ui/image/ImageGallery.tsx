
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
    isVideo?: boolean;
  }[];
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  gap = "md",
  className,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  // Map for grid columns
  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  // Map for gap sizes
  const gapClasses = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Restore scrolling when lightbox is closed
    document.body.style.overflow = "";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className={className}>
      {/* Thumbnail Grid - Enforcing perfect square aspect ratio */}
      <div className={cn("grid", columnClasses[columns], gapClasses[gap])}>
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square relative overflow-hidden rounded-md cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 bg-gray-100"
            onClick={() => openLightbox(index)}
          >
            {/* Loading Skeleton */}
            {!imageLoaded[index] && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}
            
            {/* Actual Image - Forced square aspect ratio */}
            <div className="w-full h-full">
              <ResponsiveImage
                src={image.src}
                alt={image.alt}
                className={cn(
                  "w-full h-full transition-opacity",
                  imageLoaded[index] ? "opacity-100" : "opacity-0"
                )}
                objectFit="cover"
                aspectRatio="1/1"
                onLoad={() => handleImageLoad(index)}
                loading="lazy"
              />
            </div>
            
            {/* Video Play Button Overlay */}
            {image.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/80 hover:bg-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white z-10"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white text-4xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>

          <button
            className="absolute right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white text-4xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>

          {/* Main Image */}
          <div className="max-w-4xl max-h-[80vh] relative" onClick={(e) => e.stopPropagation()}>
            <ResponsiveImage
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="w-full h-full"
              objectFit="contain"
            />

            {/* Caption */}
            {images[currentImageIndex].caption && (
              <div className="bg-black bg-opacity-70 text-white p-3 absolute bottom-0 w-full">
                {images[currentImageIndex].caption}
              </div>
            )}
          </div>
          
          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
