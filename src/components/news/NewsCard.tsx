
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";

interface NewsCardProps {
  image: string;
  title: string;
  category?: string;
  date?: string;
  excerpt?: string;
  isFeatured?: boolean;
  onClick?: () => void;
}

/**
 * News card component with hover effects and click interaction
 * Client component as it has onClick handler and interactive UI
 */
const NewsCard: React.FC<NewsCardProps> = ({
  image,
  title,
  date,
  excerpt,
  isFeatured = false,
  onClick,
}) => {
  return (
    <div 
      className={`group cursor-pointer h-full flex flex-col overflow-hidden rounded-lg ${
        isFeatured ? "shadow-lg" : "shadow-md"
      } hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
      onClick={onClick}
    >
      <div className="relative flex-grow flex flex-col">
        {/* Image container with full height */}
        <div className={cn(
          "relative flex-grow",
          isFeatured ? "aspect-[2/1]" : "aspect-square"
        )}>
          <ResponsiveImage
            src={image}
            alt={title}
            className="w-full h-full transform transition-transform duration-500 group-hover:scale-105"
            aspectRatio={isFeatured ? "2/1" : "1/1"}
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className={cn(
            "font-bold text-white mb-2 line-clamp-3",
            isFeatured ? "text-2xl md:text-3xl" : "text-lg"
          )}>
            {title}
          </h3>

          {date && (
            <span className="text-white/70 text-sm">
              {date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
