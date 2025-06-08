"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { NewsPageCard } from "../../components";
import { NewsArticle } from "../../types";
import { cn } from "@/lib/utils";
import { NewsModal } from "../../components";
import { MatchGalleryModal } from "@/features/galleries";
import { ChevronDown } from "lucide-react";

// 🎯 MASONRY TYPE DEFINITIONS
interface VirtualGrid {
  columns: number;
  cellWidth: number;
  cellHeight: number;
  occupiedCells: boolean[][];
}

interface CardSize {
  width: number;
  height: number;
}

interface CardPlacement {
  gridX: number;
  gridY: number;
  width: number;
  height: number;
  pixelX: number;
  pixelY: number;
  pixelWidth: number;
  pixelHeight: number;
}

interface NewsGridProps {
  articles: NewsArticle[];
  galleries?: any[];
  className?: string;
  onArticleClick?: (article: NewsArticle) => void;
}

// 🧠 MASONRY LAYOUT ENGINE - SIMPLIFIED FOR ABUNDANCE
class MasonryLayoutEngine {
  private virtualGrid: VirtualGrid;
  private placements: CardPlacement[] = [];
  
  constructor(containerWidth: number, columns: number) {
    // Tighter spacing: reduced padding for maximum content density
    const padding = 16; // Reduced from 32
    const effectiveWidth = containerWidth - padding;
    const cellWidth = Math.floor(effectiveWidth / columns);
    const cellHeight = Math.floor(cellWidth * 0.5625); // 16:9 ratio
    
    this.virtualGrid = {
      columns,
      cellWidth,
      cellHeight,
      occupiedCells: []
    };
  }
  
  // 🎯 MAIN ALGORITHM: Place all content with zero gaps
  calculateLayout(content: any[]): CardPlacement[] {
    this.placements = [];
    this.virtualGrid.occupiedCells = [];
    
    // Step 1: Analyze content and assign sizes
    const cardSizes = this.assignCardSizes(content);
    
    // Step 2: Place cards using intelligent positioning
    content.forEach((item, index) => {
      const size = cardSizes[index];
      const placement = this.findOptimalPosition(size, index, content.length);
      this.placements.push(placement);
      this.markOccupied(placement);
    });
    
    return this.placements;
  }
  
  // 🎨 SIMPLIFIED SIZE ASSIGNMENT - OPTIMIZED FOR ABUNDANCE
  private assignCardSizes(content: any[]): CardSize[] {
    const sizes: CardSize[] = [];
    const totalItems = content.length;
    let heroCardsPlaced = 0;
    const maxHeroCards = Math.floor(totalItems / 8); // 1 hero per 8 items
    
    content.forEach((item, index) => {
      // Featured articles get 2x2 (still respect the ratio)
      if (item.isFeatured === true && heroCardsPlaced < maxHeroCards) {
        sizes.push({ width: 2, height: 2 });
        heroCardsPlaced++;
      }
      // Match reports love being wide
      else if (item.category === 'matchReport' && Math.random() > 0.4) {
        sizes.push({ width: 2, height: 1 });
      }
      // Pure variety distribution - no restrictions!
      else {
        const random = Math.random();
        if (random < 0.15) {
          sizes.push({ width: 1, height: 2 }); // 15% tall
        } else if (random < 0.45) {
          sizes.push({ width: 2, height: 1 }); // 30% wide
        } else {
          sizes.push({ width: 1, height: 1 }); // 55% standard
        }
      }
    });
    
    return sizes;
  }
  
  // 🎯 OPTIMAL POSITION FINDER
  private findOptimalPosition(size: CardSize, index: number, total: number): CardPlacement {
    let bestPosition = { x: 0, y: 0 };
    let minY = Infinity;
    let bestScore = -Infinity;
    
    // Scan for the topmost, leftmost position that fits
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x <= this.virtualGrid.columns - size.width; x++) {
        if (this.canPlaceAt(x, y, size)) {
          const score = this.calculatePositionScore(x, y, size, index, total);
          
          // Prefer positions that are higher up and have better scores
          if (y < minY || (y === minY && score > bestScore)) {
            minY = y;
            bestScore = score;
            bestPosition = { x, y };
          }
        }
      }
      // Early exit if we've found a position and we're looking too far down
      if (minY < Infinity && y > minY + 2) break;
    }
    
    // Convert grid position to pixels
    return {
      gridX: bestPosition.x,
      gridY: bestPosition.y,
      width: size.width,
      height: size.height,
      pixelX: bestPosition.x * this.virtualGrid.cellWidth,
      pixelY: bestPosition.y * this.virtualGrid.cellHeight,
      pixelWidth: size.width * this.virtualGrid.cellWidth,
      pixelHeight: size.height * this.virtualGrid.cellHeight
    };
  }
  
  // 📊 POSITION SCORING
  private calculatePositionScore(x: number, y: number, size: CardSize, index: number, total: number): number {
    let score = 0;
    
    // Strongly prefer completing rows
    if (this.isRowCompleting(x, y, size.width)) score += 200;
    
    // Prefer left positions for reading flow
    score -= x * 10;
    
    // Prefer positions that don't create gaps
    if (x === 0) score += 30;
    if (x + size.width === this.virtualGrid.columns) score += 30;
    
    // Check if this position would create isolated gaps
    const wouldCreateGap = this.checkForPotentialGaps(x, y, size);
    if (wouldCreateGap) score -= 100;
    
    return score;
  }
  
  // Check if placing here would create hard-to-fill gaps
  private checkForPotentialGaps(x: number, y: number, size: CardSize): boolean {
    // Check if we're creating a 1-cell gap that would be hard to fill
    if (x > 0) {
      // Check left side
      const leftGap = !this.isOccupied(x - 1, y);
      if (leftGap && x === 1) return true; // Single cell gap on left edge
    }
    
    if (x + size.width < this.virtualGrid.columns) {
      // Check right side
      const rightSpace = this.virtualGrid.columns - (x + size.width);
      if (rightSpace === 1) return true; // Single cell gap on right
    }
    
    return false;
  }
  
  // 🧩 ROW COMPLETION INTELLIGENCE
  private isRowCompleting(x: number, y: number, width: number): boolean {
    // Check if placing here completes a row perfectly
    if (x === 0 && width === this.virtualGrid.columns) return true;
    
    if (x + width === this.virtualGrid.columns) {
      // Check if everything to the left is filled
      for (let i = 0; i < x; i++) {
        if (!this.isOccupied(i, y)) return false;
      }
      return true;
    }
    return false;
  }
  
  // ✅ CHECK IF POSITION CAN ACCOMMODATE CARD
  private canPlaceAt(x: number, y: number, size: CardSize): boolean {
    // Check bounds
    if (x + size.width > this.virtualGrid.columns) return false;
    
    // Check all cells that would be occupied
    for (let dy = 0; dy < size.height; dy++) {
      for (let dx = 0; dx < size.width; dx++) {
        if (this.isOccupied(x + dx, y + dy)) return false;
      }
    }
    return true;
  }
  
  // ✅ CHECK IF CELL IS OCCUPIED
  private isOccupied(x: number, y: number): boolean {
    if (!this.virtualGrid.occupiedCells[y]) return false;
    return this.virtualGrid.occupiedCells[y][x] === true;
  }
  
  // ✅ MARK CELLS AS OCCUPIED
  private markOccupied(placement: CardPlacement): void {
    for (let y = placement.gridY; y < placement.gridY + placement.height; y++) {
      if (!this.virtualGrid.occupiedCells[y]) {
        this.virtualGrid.occupiedCells[y] = new Array(this.virtualGrid.columns).fill(false);
      }
      for (let x = placement.gridX; x < placement.gridX + placement.width; x++) {
        this.virtualGrid.occupiedCells[y][x] = true;
      }
    }
  }
  
  // 📏 CALCULATE CONTAINER HEIGHT
  getContainerHeight(): number {
    const maxRow = this.virtualGrid.occupiedCells.length;
    return maxRow * this.virtualGrid.cellHeight;
  }
}

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
  const [layout, setLayout] = useState<{ placements: CardPlacement[], containerHeight: number }>({
    placements: [],
    containerHeight: 0
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  // Combine articles and galleries (preserve existing logic)
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
  
  // 📐 RESPONSIVE COLUMNS
  const getResponsiveColumns = useCallback((): number => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 768) return 1;   // Mobile: Single column
    if (width < 1024) return 2;  // Tablet: 2 columns
    return 3;                     // Desktop: 3 columns
  }, []);
  
  // 🎯 CALCULATE MASONRY LAYOUT
  const calculateMasonryLayout = useCallback((
    items: any[], 
    container: HTMLDivElement | null
  ): { placements: CardPlacement[], containerHeight: number } => {
    if (!container || items.length === 0) {
      return { placements: [], containerHeight: 0 };
    }
    
    const containerWidth = container.offsetWidth;
    const columns = getResponsiveColumns();
    
    // Don't use masonry on mobile (single column)
    if (columns === 1) {
      return { placements: [], containerHeight: 0 };
    }
    
    const engine = new MasonryLayoutEngine(containerWidth, columns);
    const placements = engine.calculateLayout(items);
    const containerHeight = engine.getContainerHeight();
    
    return { placements, containerHeight };
  }, [getResponsiveColumns]);
  
  // 🔄 UPDATE LAYOUT WITH DEBOUNCE
  const updateLayout = useCallback(() => {
    if (containerRef.current) {
      const newLayout = calculateMasonryLayout(filteredContent, containerRef.current);
      setLayout(newLayout);
    }
  }, [filteredContent, calculateMasonryLayout]);
  
  // 📱 DEBOUNCED RESIZE HANDLER
  const handleResize = useCallback(() => {
    // Clear existing timeout
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    // Set new timeout for debounced update
    resizeTimeoutRef.current = setTimeout(() => {
      updateLayout();
    }, 300); // 300ms debounce
  }, [updateLayout]);
  
  // 🎯 INITIAL LAYOUT & RESIZE LISTENER
  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [updateLayout, handleResize]);
  
  // Handle card clicks (preserve existing logic)
  const handleCardClick = (item: any) => {
    if (item.contentType === "article") {
      setSelectedArticle(item);
    } else if (item.contentType === "gallery") {
      setSelectedGalleryId(item.id);
    }
  };
  
  // 🎨 MOBILE FILTER DROPDOWN
  const renderFilters = () => {
    const isMobile = getResponsiveColumns() === 1;
    const activeCategory = categories.find(cat => cat.id === activeFilter);
    
    if (isMobile) {
      return (
        <div className="relative">
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
    
    // Desktop: Keep existing inline buttons
    return (
      <div className="flex flex-wrap gap-3">
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
  
  // 🎨 SIMPLIFIED FALLBACK GRID
  const renderFallbackGrid = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
        {filteredContent.map((item) => (
          <div key={item.id} className="col-span-1">
            <NewsPageCard
              article={item}
              isFeatured={false}
              isGallery={item.contentType === "gallery"}
              className="h-full"
              onClick={() => handleCardClick(item)}
            />
          </div>
        ))}
      </div>
    );
  };
  
  // 🎨 RENDER MASONRY OR FALLBACK
  const renderContent = () => {
    const isMobile = getResponsiveColumns() === 1;
    
    // Use simple grid on mobile or if no placements calculated
    if (isMobile || layout.placements.length === 0) {
      return renderFallbackGrid();
    }
    
    // Render masonry layout with tighter spacing
    return (
      <div 
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${layout.containerHeight}px` }}
      >
        {filteredContent.map((item, index) => {
          const placement = layout.placements[index];
          if (!placement) return null;
          
          // Safe property check for TypeScript
          const isFeatured = placement.width === 2 && placement.height === 2;
          
          return (
            <div
              key={item.id}
              className="absolute transition-all duration-500 ease-out p-2"
              style={{
                transform: `translate(${placement.pixelX}px, ${placement.pixelY}px)`,
                width: `${placement.pixelWidth}px`,
                height: `${placement.pixelHeight}px`,
              }}
            >
              <NewsPageCard
                article={item}
                isFeatured={isFeatured}
                isGallery={item.contentType === "gallery"}
                className="h-full"
                onClick={() => handleCardClick(item)}
              />
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className={cn("container mx-auto px-4 py-6", className)}>
      {/* Category filters with mobile dropdown */}
      <div className="mb-6">
        {renderFilters()}
      </div>
      
      {/* Content Grid/Masonry */}
      {renderContent()}
      
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