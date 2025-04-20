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
        "block bg-white rounded-lg overflow-hidden transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg h-full flex flex-col",
        className
      )}
    >
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <ResponsiveImage
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <span 
          className={cn(
            "absolute top-4 left-4 inline-block",
            getCategoryBgColor(category),
            "text-white text-xs font-semibold px-3 py-1.5 rounded"
          )}
        >
          {category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-auto">
          <h3 className="font-montserrat font-bold text-lg leading-tight text-primary mb-3 line-clamp-2">
            {title}
          </h3>

          {excerpt && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
              {excerpt}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-gray-400 text-xs">
            {timestamp}
          </span>
          <span className="text-primary font-medium flex items-center gap-1 group text-sm">
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
