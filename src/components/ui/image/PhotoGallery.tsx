
import React, { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MatchPhoto } from "@/lib/types";
import ResponsiveImage from "./ResponsiveImage";

interface PhotoGalleryProps {
  photos: MatchPhoto[];
  className?: string;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  aspectRatio?: string;
  gap?: "sm" | "md" | "lg";
  enableLightbox?: boolean;
  categoryFilter?: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  className,
  columns = { default: 2, sm: 3, md: 4, lg: 5 },
  aspectRatio = "1/1",
  gap = "md",
  enableLightbox = true,
  categoryFilter = false,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MatchPhoto | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter photos by category if a filter is active
  const filteredPhotos = activeCategory
    ? photos.filter(photo => photo.category === activeCategory)
    : photos;

  // Extract unique categories for filter buttons
  const categories = categoryFilter 
    ? Array.from(new Set(photos.map(photo => photo.category).filter(Boolean)))
    : [];

  // Determine the grid columns classes
  const columnClasses = [
    `grid-cols-${columns.default}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
  ].filter(Boolean);

  // Determine gap classes
  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  }[gap];

  // Open the lightbox
  const openLightbox = (photo: MatchPhoto) => {
    if (enableLightbox) {
      setSelectedPhoto(photo);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }
  };

  // Close the lightbox
  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = ""; // Enable scrolling
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Category filter buttons */}
      {categoryFilter && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={cn(
              "px-3 py-1 text-sm rounded-full transition-colors",
              activeCategory === null
                ? "bg-primary text-white"
                : "bg-light-gray text-dark-gray hover:bg-medium-gray"
            )}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={cn(
                "px-3 py-1 text-sm rounded-full capitalize transition-colors",
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-light-gray text-dark-gray hover:bg-medium-gray"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Photo grid */}
      <div className={cn("grid", columnClasses.join(" "), gapClasses)}>
        {filteredPhotos.map((photo, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => openLightbox(photo)}
          >
            <ResponsiveImage
              src={photo.thumbnail || photo.src}
              alt={photo.alt || "Match photo"}
              aspectRatio={aspectRatio}
              className="w-full h-full"
              rounded="lg"
              objectFit="cover"
              loading="lazy"
            />
            {photo.caption && (
              <div className="p-2 text-sm text-center text-dark-gray truncate">
                {photo.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredPhotos.length === 0 && (
        <div className="py-12 text-center text-gray">
          <p>No photos found.</p>
          {activeCategory && (
            <button
              className="mt-2 text-primary underline"
              onClick={() => setActiveCategory(null)}
            >
              View all photos
            </button>
          )}
        </div>
      )}

      {/* Lightbox overlay */}
      {selectedPhoto && enableLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt || "Match photo"}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
            {selectedPhoto.caption && (
              <div className="mt-2 text-center text-white">
                <p>{selectedPhoto.caption}</p>
                {selectedPhoto.credit && (
                  <p className="text-sm text-white/70">
                    Photo: {selectedPhoto.credit}
                  </p>
                )}
              </div>
            )}
            <button
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
