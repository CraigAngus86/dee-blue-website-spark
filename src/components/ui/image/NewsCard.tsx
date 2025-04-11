
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "./ResponsiveImage";
import { ChevronRight } from "lucide-react";

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
  // Determine category background color
  const getCategoryBgColor = (category: string) => {
    if (category.includes("MATCH")) return "bg-primary";
    if (category.includes("TEAM")) return "bg-secondary";
    if (category.includes("CLUB")) return "bg-secondary";
    if (category.includes("YOUTH")) return "bg-primary-light";
    return "bg-secondary";
  };

  return (
    <a
      href={url}
      className={cn(
        "block bg-white rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2",
        "h-full flex flex-col border-b-3 border-accent", 
        "shadow-md hover:shadow-lg", 
        className
      )}
      style={{
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
      }}
    >
      <div className="relative">
        {/* Image with square aspect ratio - no padding */}
        <div className="aspect-[4/3] overflow-hidden m-0 p-0">
          <ResponsiveImage
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        {/* Category tag overlapping slightly with the image - reduced space by 70% */}
        <span className={`inline-block ${getCategoryBgColor(category)} text-white text-xs font-semibold px-2 py-1 rounded-sm mt-[-8px] ml-2 relative z-10`}>
          {category}
        </span>
      </div>

      {/* Content section with appropriate padding for legibility */}
      <div className="p-3 pt-2 flex flex-col flex-grow">
        <div className="mb-auto">
          <h3 className="font-montserrat font-bold text-[18px] leading-tight text-primary mb-2 line-clamp-2">
            {title}
          </h3>

          {excerpt && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 font-inter mb-3">
              {excerpt}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
          <span className="text-gray-400 text-xs font-light font-inter">
            {timestamp}
          </span>
          <span className="text-primary font-medium flex items-center gap-1 group">
            Read More
            <ChevronRight 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              strokeWidth={2} 
            />
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
