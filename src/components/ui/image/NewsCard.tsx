
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
        shadowClasses[elevation],
        className
      )}
    >
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden">
        <ResponsiveImage
          src={image}
          alt={title}
          className="w-full h-full transition-transform duration-500 hover:scale-105"
          objectFit="cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="inline-block bg-secondary text-primary text-xs font-semibold px-2 py-1 rounded mb-2">
          {category}
        </span>

        <h3 className="font-montserrat font-bold text-lg text-primary mb-2 line-clamp-2">
          {title}
        </h3>

        {excerpt && (
          <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{excerpt}</p>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{timestamp}</span>
          <span className="text-primary font-medium">Read More →</span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
