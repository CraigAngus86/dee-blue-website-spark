# News Feature Documentation

## 📋 Overview
The news feature handles all news-related functionality across the Banks o' Dee FC website, including homepage integration and dedicated news page.

---

## 🏗️ Architecture

### **Homepage Integration** (Cross-Feature)
🏠 HOMEPAGE USES (@/features/home):
├── HomeHeroSection.tsx
│   ├── imports: NewsArticle, NewsModal from @/features/news
│   └── displays: Hero carousel with latest 3-5 articles
│
└── OverlappingNewsCards.tsx
├── imports: NewsArticle, NewsCard, NewsModal from @/features/news
├── uses: NewsCard component (lighter gradient)
└── layout: Simple 3-column grid, clean presentation

### **News Page Components** (@/features/news)
📰 NEWS PAGE STRUCTURE:
├── src/app/news/page.tsx (Server Component)
│   ├── imports: NewsHero, NewsGrid from @/features/news/components
│   ├── fetches: Articles + galleries from Sanity
│   └── passes: Data to client components
│
├── NewsHero.tsx ✅
│   └── displays: News page hero section
│
└── NewsGrid.tsx (sections/NewsGrid.tsx) ✅
├── features: Complex mosaic layout + category filtering
├── uses: NewsPageCard component
├── imports: NewsModal, MatchGalleryModal
└── handles: Article/gallery clicks and modal state

---

## 🎨 Component Types & Usage

### **Card Components**
| Component | Used By | Gradient | Purpose |
|-----------|---------|----------|---------|
| `NewsCard.tsx` | Homepage | Light (`from-[#00105A]/40`) | Clean homepage cards |
| `NewsPageCard.tsx` | News Page | Heavy (`from-[#00105A]/90`) | Mosaic news cards |

### **Shared Components** (CRITICAL - Cross-Feature)
| Component | Used By | Purpose |
|-----------|---------|---------|
| `NewsModal.tsx` | Homepage + News Page | Article reading modal |
| `NewsArticle` type | Homepage + News Page | Core data structure |
| `types/index.ts` | Homepage + News Page | Image types & utilities |

---

## 📁 File Structure
src/features/news/
├── components/
│   ├── cards/
│   │   ├── NewsCard.tsx           # Homepage cards (light gradient)
│   │   └── NewsPageCard.tsx       # News page cards (heavy gradient)
│   ├── sections/
│   │   └── NewsGrid.tsx           # Main news page grid (mosaic + filters)
│   ├── portable-text/
│   │   └── PortableTextComponents.tsx  # Sanity rich text rendering
│   ├── NewsHero.tsx               # News page hero
│   ├── NewsModal.tsx              # Shared article modal
│   └── index.ts                   # Component exports
├── types/
│   └── index.ts                   # TypeScript definitions
└── index.ts                       # Feature exports

---

## �� Data Flow

### **Homepage** (Server → Client)

src/app/page.tsx (Server Component)
├── fetches: getNewsArticles(11) from Sanity
├── splits: heroArticles(0-5) + cardsArticles(3-9)
└── passes: to HomeHeroSection + OverlappingNewsCards


### **News Page** (Server → Client)

src/app/news/page.tsx (Server Component)
├── fetches: getAllNews() + getMatchGalleries() from Sanity
├── processes: articles with full body content
└── passes: to NewsHero + NewsGrid


---

## 🎯 Category System

### **News Categories** (Sanity Schema)
| Category ID | Display Name | Used In |
|-------------|--------------|---------|
| `clubNews` | Club News | News page filters |
| `commercialNews` | Commercial | News page filters |
| `communityNews` | Community | News page filters |
| `matchReport` | Match Reports | News page filters |
| `matchGallery` | Match Gallery | News page filters (from galleries) |

### **Filter Implementation**
- **Desktop**: Inline button filters with active state
- **Mobile**: TODO - Convert to dropdown (using existing FilterDropdown pattern)

---

## 🎨 Design Standards

### **Brand Colors** (Hex Only - Codespaces Compatible)
```typescript
const BRAND_COLORS = {
  primary: '#00105A',      // Deep Navy
  secondary: '#C5E7FF',    // Light Blue  
  accent: '#FFD700',       // Gold
  // ... other colors
};
Gradient Specifications
css/* Homepage Cards (Correct) */
.homepage-card-gradient {
  background: linear-gradient(to top, #00105A40, transparent);
}

/* News Page Cards (Too Heavy - Needs Fix) */
.news-page-card-gradient {
  background: linear-gradient(to top, #00105A90 0%, #00105A50 50%, transparent 100%);
}

🚨 Current Issues (Doc 4 Reference)
High Priority Fixes Needed

Gradient Too Heavy: NewsPageCard gradient should match NewsCard intensity
Mosaic White Space: Gap-6 creating unwanted spacing between cards
Mobile Filter Dropdown: Convert inline filters to dropdown on mobile

Cloudinary Transform Audit Required

Verify consistent transforms across NewsCard, NewsPageCard, NewsModal
Ensure alignment with design system standards from project docs


⚠️ Development Guidelines
Cross-Feature Dependencies

NEVER modify: NewsModal, NewsArticle type, types/index.ts without homepage testing
Safe to modify: NewsPageCard, NewsGrid, NewsHero (news page only)
Shared imports: Always test both homepage and news page after changes

Proven Patterns

Component Splitting: Server fetching → Client interactivity
Conditional Rendering: Desktop/mobile component separation
Modal State: Local state management in parent components


�� Performance Notes

Server Components: All data fetching done server-side for SEO/performance
Client Components: Only for interactivity (modals, filters, clicks)
Image Optimization: Cloudinary transforms for responsive images
Caching: 10-second revalidation on news page for fresh content


Last Updated: June 8, 2025
Status: Clean architecture post-dead code removal ✅
