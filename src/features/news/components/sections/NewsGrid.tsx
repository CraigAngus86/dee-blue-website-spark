"use client";
import React, { useState, useMemo } from "react";
import { NewsPageCard } from "../../components";
import { NewsArticle } from "../../types";
import { cn } from "@/lib/utils";
import { NewsModal } from "../../components";
import { MatchGalleryModal } from "@/features/galleries";
import { ChevronDown } from "lucide-react";

interface NewsGridProps {
  articles: NewsArticle[];
  galleries?: any[];
  className?: string;
  onArticleClick?: (article: NewsArticle) => void;
}

// 🎨 PRE-DESIGNED TEMPLATES - Each perfectly fills 21 spaces (3×7 grid)
const GRID_TEMPLATES = [
  { name: "hero-focus", pattern: ["2x2","1x1","1x1","1x1","1x1","1x1","1x1","2x1","1x1","1x1","2x1","1x1","1x1","1x1","2x1","1x1"] },
  { name: "balanced", pattern: ["2x1","1x1","1x2","1x1","1x1","2x1","1x1","1x1","1x1","1x1","2x2","1x1","1x1","1x1","1x1","2x1"] },
  { name: "wide-focus", pattern: ["2x1","1x1","2x1","1x1","1x1","1x1","1x1","1x2","2x1","1x1","1x1","2x2","1x1","1x1"] },
  { name: "standard-heavy", pattern: ["1x1","2x1","1x1","1x1","1x1","2x2","1x1","1x1","1x1","1x1","1x1","2x1","1x1","1x1","1x1"] },
  { name: "vertical", pattern: ["1x2","1x1","1x1","2x1","1x1","1x1","1x1","1x1","1x2","1x1","2x1","1x1","1x1","1x1","2x1","1x1"] },
  { name: "corners", pattern: ["2x2","1x1","1x1","1x1","1x1","1x1","1x1","1x1","2x1","1x1","1x1","1x1","1x1","1x1","2x2","1x1"] },
  { name: "alternating", pattern: ["1x1","2x1","2x1","1x1","1x1","1x1","1x1","2x2","1x1","1x1","1x1","2x1","1x1","2x1","1x1"] },
  { name: "central", pattern: ["1x1","1x1","1x1","2x1","1x1","1x1","2x2","1x1","1x1","1x1","1x1","2x1","1x1","1x1","1x1"] },
];

const CARDS_PER_PAGE = 21; // 3×7 grid

const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  galleries = [],
  className,
  onArticleClick,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [displayCount, setDisplayCount] = useState(CARDS_PER_PAGE);

  // Combine articles and galleries
  const allContent = [
    ...articles.map((article) => ({ ...article, contentType: "article" })),
    ...galleries.map((gallery) => ({
      id: gallery._id,
      title: gallery.title,
      slug: gallery.slug || gallery._id,
      publishedAt: gallery.matchDate || gallery.publishedAt || gallery._createdAt,
      mainImage: gallery.coverImage,
      category: "matchGallery",
      contentType: "gallery",
      body: [],
    })),
  ];

  // Sort by date
  const sortedContent = [...allContent].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  // Filter content
  const filteredContent =
    activeFilter === "all"
      ? sortedContent
      : sortedContent.filter((item) => item.category === activeFilter);

  // Paginate content
  const displayedContent = filteredContent.slice(0, displayCount);
  const hasMore = filteredContent.length > displayCount;

  // Categories for filtering
  const categoryMap: Record<string, string> = {
    all: "All News",
    clubNews: "Club News",
    commercialNews: "Commercial",
    communityNews: "Community",
    matchGallery: "Match Gallery",
    matchReport: "Match Reports",
    teamNews: "Team News",
  };

  const uniqueCategories = ["all", ...Array.from(new Set(allContent.map((item) => item.category)))];
  const categories = uniqueCategories
    .map((catId) => ({ id: catId, name: categoryMap[catId] || catId }))
    .sort((a, b) => {
      if (a.id === "all") return -1;
      if (b.id === "all") return 1;
      return a.name.localeCompare(b.name);
    });

  // 🎨 TEMPLATE SELECTION - Random per page load
  const selectedTemplate = useMemo(() => {
    const templateIndex = Math.floor(Math.random() * GRID_TEMPLATES.length);
    return GRID_TEMPLATES[templateIndex];
  }, [displayCount]); // New template when loading more

  // Apply template pattern to content
  const getCardSize = (index: number): string => {
    if (index < selectedTemplate.pattern.length) {
      return selectedTemplate.pattern[index];
    }
    return "1x1"; // Default for any overflow
  };

  // Handle card clicks
  const handleCardClick = (item: any) => {
    if (item.contentType === "article") {
      setSelectedArticle(item);
    } else if (item.contentType === "gallery") {
      setSelectedGalleryId(item.id);
    }
  };

  // Load more handler
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + CARDS_PER_PAGE);
  };

  // Check if mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // 🎨 MOBILE FILTER DROPDOWN
  const renderFilters = () => {
    if (isMobile) {
      const activeCategory = categories.find((cat) => cat.id === activeFilter);

      return (
        <div className="relative mb-6">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className={cn(
              "flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors",
              "bg-white border font-body",
              "border-[rgb(var(--medium-gray))] text-[rgb(var(--brand-black))]",
              "hover:bg-[rgb(var(--brand-gold)/0.10)]"
            )}
          >
            <span className="font-medium">{activeCategory?.name || "All News"}</span>
            <ChevronDown
              className={cn("w-5 h-5 transition-transform", showFilterDropdown && "rotate-180")}
            />
          </button>

          {showFilterDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-10 border-[rgb(var(--medium-gray))]">
              {categories.map((category) => {
                const isActive = activeFilter === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveFilter(category.id);
                      setShowFilterDropdown(false);
                    }}
                    className={cn(
                      "block w-full px-4 py-2 text-left transition-colors font-body",
                      "text-[rgb(var(--brand-black))]",
                      "hover:bg-[rgb(var(--brand-gold)/0.10)]",
                      isActive &&
                        "bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))]"
                    )}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // Desktop: Inline buttons
    return (
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => {
          const isActive = activeFilter === category.id;
          return (
            <button
              key={category.id}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors font-body",
                "border",
                isActive
                  ? "bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))] border-[rgb(var(--brand-gold))]"
                  : "bg-white text-[rgb(var(--brand-black))] border-[rgb(var(--medium-gray))] hover:bg-[rgb(var(--brand-gold)/0.10)]"
              )}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("container mx-auto px-4 py-6 max-w-6xl", className)}>
      {/* Category filters */}
      {renderFilters()}

      {/* 🎨 NEWS GRID - Template-based layout */}
      <div
        className={cn(
          "grid gap-1",
          "grid-cols-1",
          "md:grid-cols-2",
          "lg:grid-cols-3",
          "auto-rows-[280px]",
          "grid-flow-dense"
        )}
      >
        {displayedContent.map((item, index) => {
          const cardSize = getCardSize(index);
          const isFeatured = cardSize === "2x2";

          return (
            <div
              key={item.id}
              className={cn(
                "col-span-1",
                {
                  "lg:col-span-2 lg:row-span-2": cardSize === "2x2",
                  "lg:col-span-2": cardSize === "2x1",
                  "lg:row-span-2": cardSize === "1x2",
                },
                {
                  "md:col-span-2": cardSize === "2x2" || cardSize === "2x1",
                }
              )}
            >
              <NewsPageCard
                article={item}
                cardSize={cardSize}
                isFeatured={isFeatured}
                isGallery={item.contentType === "gallery"}
                className="h-full"
                onClick={() => handleCardClick(item)}
              />
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className={cn(
              "px-8 py-3 rounded-lg font-medium transition-all duration-200 font-body",
              "bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))] border-2 border-[rgb(var(--brand-gold))]",
              "hover:bg-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))] hover:border-[rgb(var(--brand-black))]"
            )}
          >
            Load More Stories
          </button>
        </div>
      )}

      {/* No results message */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <h3 className="font-body font-semibold text-[rgb(var(--dark-gray))] text-xl">
            No content found for this category
          </h3>
          <p className="font-body text-[rgb(var(--gray))] mt-2">
            Try selecting a different category or check back later
          </p>
        </div>
      )}

      {/* Modals */}
      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
      <MatchGalleryModal
        isOpen={!!selectedGalleryId}
        onClose={() => setSelectedGalleryId(null)}
        galleryId={selectedGalleryId || undefined}
      />
    </div>
  );
};

export default NewsGrid;
