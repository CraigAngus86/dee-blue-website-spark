"use client";

import React from "react";
import { NewsArticle } from "@/features/news/types";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CloudinaryImage from "@/components/ui/cloudinary/CloudinaryImage";

interface NewsCardProps {
  article: NewsArticle;
  onClick?: (article: NewsArticle) => void;
  className?: string;
}

const categoryLabel = (raw?: string) => {
  if (!raw) return "NEWS";
  const map: Record<string, string> = {
    matchReport: "MATCH REPORT",
    clubNews: "CLUB NEWS",
    teamNews: "TEAM NEWS",
    commercialNews: "COMMERCIAL NEWS",
    matchGallery: "MATCH GALLERY",
  };
  return (map[raw] ?? raw).toUpperCase();
};

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick, className }) => {
  // Match hero’s explicit date format (e.g., 20 September 2025)
  const published = article.publishedAt
    ? format(new Date(article.publishedAt), "d MMMM yyyy")
    : null;

  const handleClick = () => onClick?.(article);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(article);
    }
  };

  return (
    <article
      className={cn(
        "bg-white rounded-lg shadow-md transition-all duration-300 h-full flex flex-col",
        "hover:shadow-lg hover:-translate-y-[2px]",
        "focus-within:ring-2 focus-within:ring-[#FCC743] focus-within:ring-offset-2 focus-within:ring-offset-white",
        className
      )}
    >
      {/* Media */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
        {article.mainImage ? (
          <CloudinaryImage
            image={article.mainImage}
            variant="card"
            alt={article.mainImage?.alt || article.title}
            category={article.category}
            className="transition-transform duration-300" /* no image zoom */
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}

        {/* Neutral black gradient (no navy) */}
        {article.mainImage && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        )}

        {/* Category chip: gold on black */}
        <div className="absolute left-4 top-4">
          <span
            className={cn(
              "inline-block rounded-full bg-black text-[#FCC743]",
              "px-3 py-1 text-[11px] font-semibold tracking-wider"
            )}
          >
            {categoryLabel(article.category)}
          </span>
        </div>
      </div>

      {/* Content (clickable area for keyboard/mouse) */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Open ${article.title}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex flex-col flex-grow p-5 outline-none rounded-b-lg",
          "focus-visible:ring-2 focus-visible:ring-[#FCC743] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        )}
      >
        {/* Title (Bebas via global h3) */}
        <h3 className="mb-2 text-black">{article.title}</h3>

        {/* Subheader / excerpt (one size smaller) */}
        {article.excerpt && (
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto">
          {/* Strong gold divider (no opacity, thicker) */}
          <div className="h-[1px] bg-[#FCC743] mb-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{published ?? "Just now"}</span>
            <span className="group inline-flex items-center font-medium text-black hover:text-[#FCC743] transition-colors">
              Read more
              <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
