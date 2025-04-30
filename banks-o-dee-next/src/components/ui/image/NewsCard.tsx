"use client";

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
  hasLogo?: boolean;
  logoOverlayText?: string;
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
  hasLogo = false,
  logoOverlayText = "",
  elevation = "md",
  className,
}) => {
  return (
    <a
      href={url}
      className={cn(
        "group flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg h-full",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {hasLogo ? (
          <div className="relative bg-primary aspect-[16/9] flex items-center justify-center">
            <img
              src="/assets/images/logos/BOD_Logo_White_square.png"
              alt="Banks o' Dee FC"
              className="w-24 h-24 opacity-90"
            />
            {logoOverlayText && (
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold text-center px-6">
                  {logoOverlayText}
                </h2>
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-[16/9]">
            <ResponsiveImage
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className={cn(
              "text-xs font-bold px-3 py-1 rounded",
              hasLogo ? "bg-white text-primary" : "bg-primary text-white"
            )}>
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 md:p-5 flex-grow">
        {/* Title */}
        <h3 className="font-montserrat font-bold text-xl leading-tight text-primary mb-2.5 line-clamp-2">
          {title}
        </h3>

        {/* Excerpt - only show if provided */}
        {excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {excerpt}
          </p>
        )}

        {/* Footer - Date and Read More */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <span className="text-gray-500 text-xs">
            {timestamp}
          </span>
          <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:text-primary-light transition-colors">
            Read More
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
