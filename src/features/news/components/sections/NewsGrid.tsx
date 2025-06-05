"use client";
import React, { useState } from "react";
import { NewsPageCard } from "../../components";
import { NewsArticle } from "../../types";
import { cn } from "@/lib/utils";
import { NewsModal } from "../../components";
import { MatchGalleryModal } from "@/features/galleries";

interface NewsGridProps {
  articles: NewsArticle[];
  galleries?: any[];
  className?: string;
  onArticleClick?: (article: NewsArticle) => void;
}

const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  galleries = [],
  className,
  onArticleClick // Added but not used - component manages its own modal state
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Combine articles and galleries (preserve existing logic)
  const allContent = [
    ...articles.map(article => ({ ...article, contentType: "article" })),
    ...galleries.map(gallery => ({
      id: gallery._id,
      title: gallery.title,
      slug: gallery.slug || gallery._id, // Added missing slug property
      publishedAt: gallery.matchDate || gallery.publishedAt || gallery._createdAt,
      mainImage: gallery.coverImage,
      category: "matchGallery",
      contentType: "gallery",
      body: [] // Added missing body property (empty for galleries)
    }))
  ];

  // Sort by date (preserve existing logic)
  const sortedContent = [...allContent].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });
  
  // Filter content (preserve existing logic)
  const filteredContent = activeFilter === "all" 
    ? sortedContent 
    : sortedContent.filter(item => item.category === activeFilter);
  
  // Categories for filtering (preserve existing logic)
  const categoryMap: Record<string, string> = {
    "all": "All News",
    "clubNews": "Club News",
    "commercialNews": "Commercial",
    "communityNews": "Community",
    "matchGallery": "Match Gallery",
    "matchReport": "Match Reports",
    "teamNews": "Team News"
  };
  
  const uniqueCategories = ["all", ...Array.from(new Set(allContent.map(item => item.category)))];
  const categories = uniqueCategories
    .map(catId => ({ id: catId, name: categoryMap[catId] || catId }))
    .sort((a, b) => {
      if (a.id === "all") return -1;
      if (b.id === "all") return 1;
      return a.name.localeCompare(b.name);
    });
  
  // 🎨 OPTIMIZED MOSAIC GENERATOR - For smaller content amounts
  const generateMosaicLayout = (totalItems: number): string[] => {
    if (totalItems === 0) return [];
    
    const layout: string[] = [];
    let remainingItems = totalItems;
    
    while (remainingItems > 0) {
      let cardType = "1x1"; // Default fallback
      
      // End-game logic: Handle final items to prevent gaps
      if (remainingItems === 1) {
        cardType = "2x1"; // Make single item span 2 columns
      }
      else if (remainingItems === 2) {
        cardType = Math.random() > 0.5 ? "2x1" : "1x1"; // Either one 2x1 or start with 1x1
      }
      else if (remainingItems === 3) {
        cardType = Math.random() > 0.4 ? "2x1" : "1x1"; // Prefer 2x1 to handle 3 items nicely
      }
      else if (remainingItems >= 4) {
        // Optimized for smaller content amounts
        const random = Math.random();
        
        // 2x1 cards: Use more frequently for visual impact (35% chance)
        if (random < 0.35) {
          cardType = "2x1";
        }
        // 1x2 cards: Use for vertical variety (25% chance)
        else if (random < 0.6) {
          cardType = "1x2";
        }
        // 1x1 cards: Fill the rest (40% chance)
        else {
          cardType = "1x1";
        }
        
        // TODO: 2x2 cards for when we have more content
        // Uncomment when we have 20+ articles regularly:
        /*
        // 2x2 cards: Use sparingly (8% chance, only when plenty of items remain)
        if (random < 0.08 && remainingItems >= 10) {
          cardType = "2x2";
        }
        */
      }
      
      layout.push(cardType);
      remainingItems--;
      
      // Safety valve
      if (layout.length > totalItems + 10) break;
    }
    
    return layout;
  };

  // Generate the mosaic layout
  const mosaicLayout = generateMosaicLayout(filteredContent.length);
  
  // Handle card clicks (preserve existing logic)
  const handleCardClick = (item: any) => {
    if (item.contentType === "article") {
      setSelectedArticle(item);
    } else if (item.contentType === "gallery") {
      setSelectedGalleryId(item.id);
    }
  };
  
  return (
    <div className={cn("container mx-auto px-4 py-8", className)}>
      {/* Category filters (preserve existing) */}
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
      
      {/* 🎨 BEAUTIFUL MOSAIC GRID - Optimized for current content amount */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
        {filteredContent.map((item, index) => {
          const cardSize = mosaicLayout[index] || "1x1";
          
          return (
            <div 
              key={item.id} 
              className={cn(
                // Base: All cards span 1 column on mobile
                "col-span-1",
                // Desktop mosaic classes
                {
                  // Large horizontal: 2 columns, 1 row
                  "lg:col-span-2": cardSize === "2x1",
                  // Large vertical: 1 column, 2 rows  
                  "lg:row-span-2": cardSize === "1x2",
                  // TODO: Hero card when we have more content
                  // "lg:col-span-2 lg:row-span-2": cardSize === "2x2",
                },
                // Tablet: Simpler layout
                {
                  "md:col-span-2": cardSize === "2x1" // || cardSize === "2x2"
                }
              )}
            >
              <NewsPageCard
                article={item}
                isFeatured={cardSize === "2x1"} // || cardSize === "2x2"
                isGallery={item.contentType === "gallery"}
                className="h-full"
                onClick={() => handleCardClick(item)}
              />
            </div>
          );
        })}
      </div>
      
      {/* No results message (preserve existing) */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No content found for this category</h3>
          <p className="text-gray-500 mt-2">Try selecting a different category or check back later</p>
        </div>
      )}
      
      {/* Modals (preserve existing) */}
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
