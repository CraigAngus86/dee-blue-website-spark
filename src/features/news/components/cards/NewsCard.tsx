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
        // Card base + brand tokens
        "bg-[rgb(var(--white))] text-[rgb(var(--brand-black))] rounded-lg shadow-md transition-all duration-300 h-full flex flex-col",
        "hover:shadow-lg hover:-translate-y-[2px]",
        // Focus ring in brand gold with white offset for contrast
        "focus-within:ring-2 focus-within:ring-[rgb(var(--brand-gold))] focus-within:ring-offset-2 focus-within:ring-offset-[rgb(var(--white))]",
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
            className="transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-[rgb(var(--white))]" />
        )}

        {/* Neutral black gradient (brand token) */}
        {article.mainImage && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgb(var(--brand-black)/0.45) 0%, rgb(var(--brand-black)/0.10) 55%, transparent 85%)",
            }}
          />
        )}

        {/* Category chip: black bg + gold text (brand tokens) */}
        <div className="absolute left-4 top-4">
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider",
              "bg-[rgb(var(--brand-black))] text-[rgb(var(--brand-gold))]"
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
          "focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--white))]"
        )}
      >
        {/* Title (Bebas via global h3) */}
        <h3 className="mb-2">{article.title}</h3>

        {/* Subheader / excerpt */}
        {article.excerpt && (
          <p className="text-sm mb-4 leading-relaxed text-[rgb(var(--brand-black))/0.72]">
            {article.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto">
          {/* Strong gold divider */}
          <div className="h-[1px] bg-[rgb(var(--brand-gold))] mb-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-[rgb(var(--brand-black))/0.65]">
              {published ?? "Just now"}
            </span>
            <span className="group inline-flex items-center font-medium text-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))] transition-colors">
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
