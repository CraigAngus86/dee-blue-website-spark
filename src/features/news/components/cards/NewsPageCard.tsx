"use client";
import React from "react";
import { NewsArticle } from "../../types";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import {
  getCloudinaryImageUrl,
  getContentType,
  getMosaicVariant,
} from "@/lib/cloudinary/imageTransforms";

interface NewsPageCardProps {
  article: NewsArticle & { contentType?: string };
  className?: string;
  cardSize?: string; // grid size (1x1, 2x1, 1x2, 2x2)
  isFeatured?: boolean;
  isGallery?: boolean;
  onClick?: (article: NewsArticle) => void;
}

const NewsPageCard: React.FC<NewsPageCardProps> = ({
  article,
  className,
  cardSize = "1x1",
  isFeatured = false,
  isGallery = false,
  onClick,
}) => {
  const categoryDisplay: Record<string, string> = {
    matchReport: "MATCH REPORT",
    clubNews: "CLUB NEWS",
    teamNews: "TEAM NEWS",
    communityNews: "COMMUNITY NEWS",
    commercialNews: "COMMERCIAL NEWS",
    matchGallery: "MATCH GALLERY",
  };

  const formattedDate = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : "";

  const contentType = getContentType(article.category);
  const variant = getMosaicVariant(cardSize);

  const getWidth = () => {
    switch (cardSize) {
      case "2x2":
        return 1200;
      case "2x1":
        return 800;
      case "1x2":
        return 400;
      case "1x1":
      default:
        return 600;
    }
  };

  const imageUrl = article.mainImage
    ? getCloudinaryImageUrl(article.mainImage, {
        variant,
        contentType,
        width: getWidth(),
      })
    : "";

  return (
    <div
      className={cn(
        // Card container (brand spec)
        "group relative overflow-hidden rounded-xl border border-[rgb(var(--medium-gray))] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full",
        className
      )}
      onClick={() => onClick?.(article)}
    >
      {/* Media layer */}
      <div className="absolute inset-0">
        {article.mainImage && imageUrl ? (
          <img
            src={imageUrl}
            alt={article.mainImage.alt || article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              console.error(`Failed to load news page card image for ${article.title}`);
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNhM2E3YjAiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+";
            }}
          />
        ) : (
          <div className="w-full h-full bg-[rgb(var(--brand-black))] flex items-center justify-center">
            <img src="/assets/logo.svg" alt="Baynounah SC" className="w-1/3 h-1/3 opacity-20" />
          </div>
        )}

        {/* Brand gradient overlay (multi-stop, matches home card) */}
        {article.mainImage && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgb(var(--brand-black)/0.45) 0%, rgb(var(--brand-black)/0.10) 55%, transparent 85%)",
            }}
          />
        )}
      </div>

      {/* Content layer */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 text-white">
        {/* Category chip — match home card (black bg + gold text) */}
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-[11px] md:text-xs font-body font-semibold tracking-wider uppercase",
              "bg-[rgb(var(--brand-black))] text-[rgb(var(--brand-gold))]"
            )}
          >
            {categoryDisplay[article.category] || article.category}
          </span>
        </div>

        {/* Title — one step bigger across sizes */}
        <h3
          className={cn(
            "font-heading tracking-[0.02em] text-white leading-tight mb-2",
            cardSize === "2x2"
              ? "text-3xl md:text-4xl"
              : cardSize === "2x1"
              ? "text-2xl md:text-3xl"
              : "text-xl md:text-2xl"
          )}
        >
          {article.title}
        </h3>

        {/* Metadata */}
        <div className="flex items-center justify-between">
          <p className="font-body text-sm text-white/85">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPageCard;
