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
  // Template 1: Hero Focus
  {
    name: 'hero-focus',
    pattern: [
      '2x2', '1x1',      // Row 1-2 start (hero takes 2 rows)
      '1x1', '1x1',      // Row 2 complete
      '1x1', '1x1', '1x1',  // Row 3
      '2x1', '1x1',      // Row 4
      '1x1', '2x1',      // Row 5
      '1x1', '1x1', '1x1',  // Row 6
      '2x1', '1x1'       // Row 7
    ]
  },
  // Template 2: Balanced Mix
  {
    name: 'balanced',
    pattern: [
      '2x1', '1x1',      // Row 1
      '1x2', '1x1', '1x1',  // Row 2-3 (tall spans 2)
      '2x1', '1x1',      // Row 3
      '1x1', '1x1', '1x1',  // Row 4
      '2x2', '1x1',      // Row 5-6 start
      '1x1', '1x1',      // Row 6 complete
      '1x1', '2x1'       // Row 7
    ]
  },
  // Template 3: Wide Focus
  {
    name: 'wide-focus',
    pattern: [
      '2x1', '1x1',      // Row 1
      '2x1', '1x1',      // Row 2
      '1x1', '1x1', '1x1',  // Row 3
      '1x2', '2x1',      // Row 4-5
      '1x1', '1x1',      // Row 5
      '2x2', '1x1',      // Row 6-7
      '1x1', '1x1'       // Row 7
    ]
  },
  // Template 4: Standard Heavy
  {
    name: 'standard-heavy',
    pattern: [
      '1x1', '2x1',      // Row 1
      '1x1', '1x1', '1x1',  // Row 2
      '2x2', '1x1',      // Row 3-4
      '1x1', '1x1',      // Row 4
      '1x1', '1x1', '1x1',  // Row 5
      '2x1', '1x1',      // Row 6
      '1x1', '1x1', '1x1'   // Row 7
    ]
  },
  // Template 5: Vertical Rhythm
  {
    name: 'vertical',
    pattern: [
      '1x2', '1x1', '1x1',  // Row 1-2
      '2x1', '1x1',      // Row 2
      '1x1', '1x1', '1x1',  // Row 3
      '1x1', '1x2', '1x1',  // Row 4-5
      '2x1', '1x1',      // Row 5
      '1x1', '1x1', '1x1',  // Row 6
      '2x1', '1x1'       // Row 7
    ]
  },
  // Template 6: Corner Heroes
  {
    name: 'corners',
    pattern: [
      '2x2', '1x1',      // Row 1-2
      '1x1', '1x1',      // Row 2
      '1x1', '1x1', '1x1',  // Row 3
      '1x1', '2x1',      // Row 4
      '1x1', '1x1', '1x1',  // Row 5
      '1x1', '2x2',      // Row 6-7
      '1x1'              // Row 7
    ]
  },
  // Template 7: Alternating
  {
    name: 'alternating',
    pattern: [
      '1x1', '2x1',      // Row 1
      '2x1', '1x1',      // Row 2
      '1x1', '1x1', '1x1',  // Row 3
      '2x2', '1x1',      // Row 4-5
      '1x1', '1x1',      // Row 5
      '1x1', '2x1',      // Row 6
      '2x1', '1x1'       // Row 7
    ]
  },
  // Template 8: Central Hero
  {
    name: 'central',
    pattern: [
      '1x1', '1x1', '1x1',  // Row 1
      '2x1', '1x1',      // Row 2
      '1x1', '2x2',      // Row 3-4
      '1x1',             // Row 4
      '1x1', '1x1', '1x1',  // Row 5
      '2x1', '1x1',      // Row 6
      '1x1', '1x1', '1x1'   // Row 7
    ]
  }
];

const CARDS_PER_PAGE = 21; // 3×7 grid

// 🎯 MAIN COMPONENT
const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  galleries = [],
  className,
  onArticleClick
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [displayCount, setDisplayCount] = useState(CARDS_PER_PAGE);

  // Combine articles and galleries
  const allContent = [
    ...articles.map(article => ({ ...article, contentType: "article" })),
    ...galleries.map(gallery => ({
      id: gallery._id,
      title: gallery.title,
      slug: gallery.slug || gallery._id,
      publishedAt: gallery.matchDate || gallery.publishedAt || gallery._createdAt,
      mainImage: gallery.coverImage,
      category: "matchGallery",
      contentType: "gallery",
      body: []
    }))
  ];

  // Sort by date
  const sortedContent = [...allContent].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });
  
  // Filter content
  const filteredContent = activeFilter === "all" 
    ? sortedContent 
    : sortedContent.filter(item => item.category === activeFilter);
  
  // Paginate content
  const displayedContent = filteredContent.slice(0, displayCount);
  const hasMore = filteredContent.length > displayCount;
  
  // Categories for filtering
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
    return '1x1'; // Default for any overflow
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
    setDisplayCount(prev => prev + CARDS_PER_PAGE);
  };
  
  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // 🎨 MOBILE FILTER DROPDOWN
  const renderFilters = () => {
    if (isMobile) {
      const activeCategory = categories.find(cat => cat.id === activeFilter);
      
      return (
        <div className="relative mb-6">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center justify-between w-full px-4 py-2 bg-white border border-[#00105A]/20 rounded-md text-[#00105A] hover:bg-[#00105A]/5 transition-colors"
          >
            <span className="font-medium">{activeCategory?.name || 'All News'}</span>
            <ChevronDown className={cn(
              "w-5 h-5 transition-transform",
              showFilterDropdown && "rotate-180"
            )} />
          </button>
          
          {showFilterDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#00105A]/20 rounded-md shadow-lg z-10">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveFilter(category.id);
                    setShowFilterDropdown(false);
                  }}
                  className={cn(
                    "block w-full px-4 py-2 text-left hover:bg-[#00105A]/5 transition-colors",
                    activeFilter === category.id && "bg-[#00105A] text-white hover:bg-[#00105A]"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    // Desktop: Inline buttons
    return (
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
    );
  };
  
  return (
    <div className={cn("container mx-auto px-4 py-6 max-w-6xl", className)}>
      {/* Category filters */}
      {renderFilters()}
      
      {/* 🎨 NEWS GRID - Template-based layout */}
      <div className={cn(
        "grid gap-1", // Minimal gap for clean look
        "grid-cols-1", // Mobile: Single column
        "md:grid-cols-2", // Tablet: 2 columns
        "lg:grid-cols-3", // Desktop: 3 columns
        "auto-rows-[280px]", // Fixed height for consistency
        "grid-flow-dense" // Fill gaps automatically
      )}>
        {displayedContent.map((item, index) => {
          const cardSize = getCardSize(index);
          const isFeatured = cardSize === '2x2';
          
          return (
            <div 
              key={item.id} 
              className={cn(
                // Base: All cards span 1 column on mobile
                "col-span-1",
                // Desktop sizing based on template
                {
                  // 2x2 Hero cards
                  "lg:col-span-2 lg:row-span-2": cardSize === '2x2',
                  // 2x1 Wide cards
                  "lg:col-span-2": cardSize === '2x1',
                  // 1x2 Tall cards
                  "lg:row-span-2": cardSize === '1x2',
                  // 1x1 Standard cards (default)
                },
                // Tablet: Simpler layout
                {
                  "md:col-span-2": cardSize === '2x2' || cardSize === '2x1'
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
            className="px-8 py-3 bg-[#00105A] text-white rounded-md hover:bg-[#00105A]/90 transition-colors font-medium"
          >
            Load More Stories
          </button>
        </div>
      )}
      
      {/* No results message */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No content found for this category</h3>
          <p className="text-gray-500 mt-2">Try selecting a different category or check back later</p>
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
