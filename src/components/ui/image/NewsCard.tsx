
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";

interface NewsCardProps {
  image: string;
  title: string;
  category: string;
  timestamp: string;
  excerpt?: string;
  url?: string;
  elevation?: "sm" | "md" | "lg";
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  image,
  title,
  category,
  timestamp,
  excerpt,
  url = "#",
  elevation = "md",
  className,
}) => {
  // Map elevation to shadow classes
  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <a
      href={url}
      className={cn(
        "block bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105",
        "h-full flex flex-col", // Ensure consistent height
        shadowClasses[elevation],
        className
      )}
    >
      {/* Image with consistent aspect ratio */}
      <div className="aspect-[16/9] overflow-hidden">
        <ResponsiveImage
          src={image}
          alt={title}
          className="w-full h-full transition-transform duration-500 hover:scale-105"
          objectFit="cover"
        />
      </div>

      {/* Content with improved typography hierarchy */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-auto">
          <span className="inline-block bg-secondary text-primary text-xs font-semibold px-2 py-1 rounded mb-3">
            {category}
          </span>

          <h3 className="font-montserrat font-bold text-lg text-primary mb-3 line-clamp-2">
            {title}
          </h3>

          {excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{excerpt}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t border-gray-100">
          <span className="text-gray-500">{timestamp}</span>
          <span className="text-primary font-medium flex items-center gap-1">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
