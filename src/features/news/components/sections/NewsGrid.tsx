"use client";
import React, { useState } from "react";
import { NewsPageCard } from "../../components";
import { NewsArticle } from "../../types";
import { cn } from "@/lib/utils";
import { NewsModal } from "../../components";
import { MatchGalleryModal } from "@/features/galleries";

interface NewsGridProps {
  articles: NewsArticle[];
  galleries?: any[]; // Match galleries from Sanity
  className?: string;
}

const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  galleries = [],
  className
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Combine articles and galleries into a single content array
  const allContent = [
    ...articles.map(article => ({
      ...article,
      contentType: "article"
    })),
    ...galleries.map(gallery => ({
      id: gallery._id,
      title: gallery.title,
      publishedAt: gallery.matchDate || gallery.publishedAt || gallery._createdAt, // ✅ FIXED: Use matchDate first
      mainImage: gallery.coverImage,
      category: "matchGallery",
      contentType: "gallery"
    }))
  ];

  // Sort all content by date (newest first)
  const sortedContent = [...allContent].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });
  
  // Filter content based on selected category
  const filteredContent = activeFilter === "all" 
    ? sortedContent 
    : sortedContent.filter(item => item.category === activeFilter);
  
  // Available categories for filtering
  const categoryMap: Record<string, string> = {
    "all": "All News",
    "clubNews": "Club News",
    "commercialNews": "Commercial",
    "communityNews": "Community",
    "matchGallery": "Match Gallery",
    "matchReport": "Match Reports",
    "teamNews": "Team News"
  };
  
  // Get unique categories from content and sort alphabetically
  const uniqueCategories = ["all", ...new Set(allContent.map(item => item.category))];
  
  // Create category objects for the filter buttons
  const categories = uniqueCategories
    .map(catId => ({
      id: catId,
      name: categoryMap[catId] || catId
    }))
    .sort((a, b) => {
      // Keep "All News" first, then alphabetical
      if (a.id === "all") return -1;
      if (b.id === "all") return 1;
      return a.name.localeCompare(b.name);
    });
  
  // Smart layout algorithm to avoid gaps with limited content
  const getCardSize = (index: number, totalItems: number) => {
    // For a very small number of items, use larger cards to fill the space
    if (totalItems <= 3) {
      if (index === 0) return "large-horizontal";
      return "standard";
    }
    
    // For a medium number of items, use a simpler pattern
    if (totalItems <= 6) {
      if (index === 0 || index === 3) return "large-horizontal";
      return "standard";
    }
    
    // For larger sets, use the full pattern
    if (index === 0 || index % 6 === 0) {
      return "large-horizontal"; // 2x1 ratio, spans 2 columns
    } else if (index % 6 === 3 && totalItems > index + 2) {
      // Only use vertical cards if we have enough items after it to avoid gaps
      return "large-vertical"; // 1x2 ratio, spans 2 rows (desktop only)
    } else {
      return "standard"; // 1x1 ratio
    }
  };
  
  // Handle card click based on content type
  const handleCardClick = (item: any) => {
    if (item.contentType === "article") {
      setSelectedArticle(item);
    } else if (item.contentType === "gallery") {
      setSelectedGalleryId(item.id);
    }
  };
  
  return (
    <div className={cn("container mx-auto px-4 py-8", className)}>
      {/* Category filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              activeFilter === category.id 
                ? "bg-[#00105A] text-white" 
                : "bg-white text-[#00105A] border border-[#00105A]/20 hover:bg-[#00105A]/10"
            )}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Dynamic news grid with varied card sizes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
        {filteredContent.map((item, index) => {
          const cardSize = getCardSize(index, filteredContent.length);
          
          return (
            <div 
              key={item.id} 
              className={cn(
                // On mobile, all cards are full width
                "col-span-1",
                // On tablet+, apply dynamic sizing
                {
                  "md:col-span-2": cardSize === "large-horizontal",
                  "lg:row-span-2": cardSize === "large-vertical"
                }
              )}
              style={{ 
                // Set height based on grid auto-rows
                height: cardSize === "large-vertical" ? "auto" : undefined
              }}
            >
              <NewsPageCard
                article={item}
                isFeatured={cardSize === "large-horizontal"}
                isGallery={item.contentType === "gallery"}
                className="h-full"
                onClick={() => handleCardClick(item)}
              />
            </div>
          );
        })}
      </div>
      
      {/* No results message */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No content found for this category</h3>
          <p className="text-gray-500 mt-2">Try selecting a different category or check back later</p>
        </div>
      )}
      
      {/* News Modal */}
      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Match Gallery Modal - ✅ TEMPORARY: Comment out to test */}
      {/* <MatchGalleryModal
        isOpen={!!selectedGalleryId}
        onClose={() => setSelectedGalleryId(null)}
        galleryId={selectedGalleryId || undefined}
      /> */}
    </div>
  );
};

export default NewsGrid;
