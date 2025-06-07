# Matches Feature - Architecture Documentation

**Location**: `src/features/matches/`  
**Purpose**: Manages all match-related functionality across homepage and dedicated matches page  
**Last Updated**: December 2025

---

## 🏗️ **ARCHITECTURE OVERVIEW**

This feature supports **two distinct implementations**:

### **🏠 Homepage Match Centre Section**
**Purpose**: Compact match summary with 7-card carousel and league position  
**Route**: `/` (homepage section)  
**Focus**: Recent results + upcoming fixtures + league summary

### **⚽ Dedicated Matches Page** 
**Purpose**: Full match management with tabs, filters, and detailed views  
**Route**: `/matches`  
**Focus**: Comprehensive match data with fixtures/results/table tabs

---

## 📋 **COMPONENT STRUCTURE**

### **🏠 Homepage Implementation**
Homepage Flow:
src/app/page.tsx
└── src/components/ui/sections/MatchCenter.tsx (wrapper component)
├── @/features/matches/components/home/MatchCarousel.tsx (carousel logic)
│   ├── ../common/MatchCard.tsx (individual match cards)
│   └── ../common/LeaguePositionSummary.tsx (league position display)
├── @/features/galleries (MatchGalleryModal) (modal integration)
└── @/features/news/components (NewsModal) (modal integration)

**Key Features:**
- **7-card carousel**: 3 recent results + 1 next match (centered) + 3 upcoming fixtures
- **Arrow navigation**: Left/right scroll with automatic centering on next match
- **Modal integration**: Gallery/report modals for completed matches, ticket modals for upcoming
- **League summary**: Banks o' Dee position with points, form, and statistics

### **⚽ Matches Page Implementation**
Matches Page Flow:
src/app/matches/page.tsx
├── src/features/matches/components/MatchCentreContainer.tsx (main container)
│   ├── ./tabs/TabNavigation.tsx (fixtures/results/table tabs)
│   ├── ./filters/ (filtering system)
│   │   ├── SeasonFilter.tsx → FilterDropdown.tsx
│   │   ├── MonthFilter.tsx → FilterDropdown.tsx
│   │   └── CompetitionFilter.tsx → FilterDropdown.tsx
│   └── ./panels/ (tab content)
│       ├── FixturesPanel.tsx → FixtureCard.tsx
│       ├── ResultsPanel.tsx → ResultCard.tsx
│       └── TablePanel.tsx (league table display)
└── src/features/matches/components/layout/MatchCentreHero.tsx (page header)

**Key Features:**
- **Three tabs**: Fixtures, Results, League Table
- **Advanced filtering**: Season, month, competition filters
- **Detailed cards**: Separate card types for fixtures vs results
- **Full league table**: Complete Highland League standings

---

## 🔄 **DATA FLOW**

### **Homepage Data Sources**
- **Hook**: `src/features/matches/hooks/useHomeMatchData.ts`
- **Functions**: `getHomepageUpcomingMatches(5)`, `getHomepageRecentMatches(5)`, `getHomepageLeagueTable()`
- **Database**: Supabase views (`vw_upcoming_matches`, `vw_latest_results`, league tables)
- **Integration**: Cloudinary for team logos, Sanity for match reports/galleries

### **Matches Page Data Sources**
- **Direct Supabase calls** within panel components
- **Filter state management** via URL search params
- **Real-time filtering** based on season/month/competition
- **Modal integration**: Same gallery/report system as homepage

---

## 🎯 **MODAL SYSTEM INTEGRATION**

### **Modal Types Used**
- **MatchGalleryModal**: Photo galleries from completed matches
- **NewsModal**: Match reports (linked via Sanity CMS)  
- **Ticket Modals**: External ticket links for upcoming matches

### **Modal Triggers**
- **Homepage**: Click handlers on MatchCard icons (gallery/report/ticket)
- **Matches Page**: Click handlers on FixtureCard/ResultCard components
- **State Management**: Page-level modal state passed down to components

---

## 📁 **FILE ORGANIZATION**
src/features/matches/
├── components/
│   ├── common/                 # Shared components
│   │   ├── MatchCard.tsx       # Used by homepage carousel
│   │   ├── LeaguePositionSummary.tsx  # Used by homepage
│   │   └── TeamLogo.tsx        # Shared team logo component
│   ├── home/                   # Homepage-specific components
│   │   └── MatchCarousel.tsx   # Carousel logic for homepage
│   ├── layout/                 # Matches page layout
│   │   └── MatchCentreHero.tsx # Matches page header
│   ├── panels/                 # Tab content for matches page
│   │   ├── FixturesPanel.tsx   # Upcoming matches tab
│   │   ├── ResultsPanel.tsx    # Match results tab
│   │   └── TablePanel.tsx      # League table tab
│   ├── filters/                # Filter system for matches page
│   │   ├── CompetitionFilter.tsx
│   │   ├── SeasonFilter.tsx
│   │   ├── MonthFilter.tsx
│   │   └── FilterDropdown.tsx  # Shared dropdown component
│   ├── tabs/                   # Tab navigation
│   │   └── TabNavigation.tsx   # Tab switching logic
│   ├── MatchCentreContainer.tsx # Main matches page container
│   ├── FixtureCard.tsx         # Cards for upcoming matches
│   └── ResultCard.tsx          # Cards for completed matches
├── hooks/
│   ├── useHomeMatchData.ts     # Homepage data fetching
│   ├── useMatchesData.ts       # Matches page data fetching
│   └── useLeagueTable.ts       # League table data
├── types/
│   └── index.ts                # TypeScript type definitions
└── constants.ts                # Default values and constants

---

## 🔧 **KEY TECHNICAL PATTERNS**

### **Homepage Carousel Logic**
- **7-card display**: Fixed number with specific ordering
- **Auto-centering**: Next match automatically centered in viewport
- **Drag/scroll**: Arrow navigation (desktop), swipe support (mobile)
- **Responsive**: Different behavior on mobile vs desktop

### **Matches Page State Management**
- **URL-based filtering**: Search params maintain filter state
- **Tab navigation**: Client-side routing between fixtures/results/table
- **Dynamic loading**: Content loads based on active tab and filters

### **Modal Integration Strategy**
- **Page-level state**: Modal state managed at page level, not component level
- **Event handlers**: Passed down through component tree
- **Cross-system**: Same modals used across homepage and matches page

---

## 🎨 **STYLING & DESIGN PATTERNS**

### **Color System (Hex Values)**
- **Primary**: `#00105A` (Deep Navy)
- **Secondary**: `#C5E7FF` (Light Blue)
- **Accent**: `#FFD700` (Gold)
- **Inactive States**: `#9ca3af` (Gray 400)
- **Backgrounds**: `#f9fafb` (Gray 50), `#ffffff` (White)

### **Component Standards**
- **Server components**: Default pattern for data fetching
- **Client components**: Only when interactivity required (carousels, modals)
- **Responsive design**: Mobile-first with desktop optimization
- **Accessibility**: WCAG 2.1 AA compliance throughout

---

## �� **DEVELOPMENT WORKFLOW**

### **Adding New Features**
1. **Identify scope**: Homepage section vs matches page vs shared
2. **Component placement**: Use appropriate directory (common/home/panels/etc)
3. **Data integration**: Extend existing hooks or create new ones
4. **Modal integration**: Follow existing modal patterns
5. **Styling**: Use established hex color system

### **Testing Considerations**
- **Homepage**: Test carousel behavior, modal integration, data loading
- **Matches page**: Test tab switching, filtering, card interactions
- **Cross-browser**: Verify on Chrome, Safari, Firefox, Edge
- **Mobile**: Test touch interactions, responsive layouts

---

## 📚 **RELATED DOCUMENTATION**

- **Design System**: `src/features/*/Design System & Component Patterns.md`
- **Development Workflow**: `src/features/*/Development Workflow & Quick Reference.md`
- **Database Schema**: Supabase views and tables documentation
- **Modal Patterns**: Gallery and news feature documentation

---

**Last Cleanup**: December 2025 - Removed dead code files, clarified architecture, documented component relationships
