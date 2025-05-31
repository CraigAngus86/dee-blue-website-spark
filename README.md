# Banks o' Dee FC Website

## Overview

Official website for Banks o' Dee Football Club - a modern, full-featured football club website built with Next.js 14. Serving Aberdeen's most ambitious community football club (Est. 1902) with comprehensive match information, news, fan engagement, and commercial opportunities.

**Current Status**: 95% Complete - Production Ready
**Development Environment**: GitHub Codespaces
**Launch Timeline**: 8-10 weeks

## 🚀 Key Features (Implemented)

### ✅ Core Features Complete
- **Match Centre**: Fixtures, results, league tables with real-time updates
- **News System**: Rich articles with mosaic layout and categorization  
- **Team Management**: Player profiles with Cloudinary integration
- **Gallery System**: Cross-platform galleries with modal viewing
- **Match Reports**: Integrated through news system
- **Homepage**: Hero sections, news feeds, match carousels

### ✅ Advanced Integrations
- **BBC League Table Scraper**: Automated Highland League standings
- **Fan Zone**: Fan submissions, polls, photo uploads (75% complete)
- **Cross-System Data**: Sanity ↔ Supabase ↔ Frontend integration
- **Image Optimization**: Cloudinary with smart transformations
- **Responsive Design**: Mobile-first across all features

### 📋 Remaining Work (5%)
- Homepage sections completion (Fanzone, Players, Sponsors)
- Spain Park heritage page
- Commercial opportunities page  
- Admin interface refinements
- Production deployment

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with hex color system
- **CMS**: Sanity CMS for editorial content
- **Database**: Supabase for operational data
- **Media**: Cloudinary for image management
- **Development**: GitHub Codespaces

### Data Architecture (Hybrid Approach)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Sanity CMS    │    │    Supabase     │    │   Cloudinary    │
│   Editorial     │    │  Operational    │    │     Media       │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • News Articles │    │ • Match Results │    │ • All Images    │
│ • Player Profs  │    │ • League Tables │    │ • Transformatn  │
│ • Match Gallery │    │ • Competitions  │    │ • Optimization  │
│ • Stadium Info  │    │ • Teams Data    │    │ • Folder Struct │
│ • Fan Content   │    │ • Seasons       │    │ • Face Detect   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure (Feature-Based)

```
src/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Homepage
│   ├── news/page.tsx          # News page
│   ├── matches/page.tsx       # Match centre
│   ├── team/page.tsx          # Team page
│   └── api/                   # API routes
│       ├── scrape-league-table/ # BBC scraper
│       └── fan-submission/     # Fan Zone API
├── features/                   # Feature-based organization
│   ├── news/                  # News components & logic
│   ├── matches/               # Match centre features
│   ├── galleries/             # Gallery modal system  
│   ├── team/                  # Team & player components
│   └── fanzone/               # Fan engagement (75% complete)
├── lib/                       # Utilities & integrations
│   ├── sanity/               # Sanity client & queries
│   ├── supabase/             # Supabase client & types
│   └── cloudinary/           # Image transformations
└── components/                # Shared UI components
    └── ui/                   # Base UI components
```

## 🛠️ Development Setup

### Prerequisites
- **Development Environment**: GitHub Codespaces (recommended)
- **Alternative**: Node.js 18+, npm 9+, Git
- **Accounts Needed**: Sanity, Supabase, Cloudinary

### Quick Start (GitHub Codespaces)
1. **Open in Codespaces**: Use GitHub Codespaces for instant development environment
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start development servers**:
   ```bash
   # Main application (port 3000)
   npm run dev
   
   # Sanity Studio (port 3333)
   cd sanity-studio && npm run dev
   ```

### Environment Configuration
Create `.env.local` with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development Workflow
- **Implementation**: Direct file updates via terminal (`cat > file << 'EOF'`)
- **Testing**: Real-time testing with live data
- **Integration**: Cross-system testing (Sanity ↔ Supabase ↔ Frontend)
- **Version Control**: Frequent commits with working features

## 🎯 Current Implementation Status

### ✅ Completed (95%)
| Feature | Status | Notes |
|---------|--------|-------|
| Team Feature | ✅ Complete | Player profiles, staff management |
| News Feature | ✅ Complete | Articles, categories, rich text |
| Match Centre | 95% Complete | BBC scraper pending |
| Gallery System | ✅ Complete | Cross-system integration |
| Match Reports | ✅ Complete | Via news system |
| Homepage Core | ✅ Complete | Hero, news, match sections |
| Fan Submissions | ✅ Complete | Full submission workflow |

### 📋 Next Priorities
1. **BBC League Table Scraper**: Automated Highland League standings
2. **Homepage Sections**: Fanzone display, Players, Sponsors
3. **New Pages**: Spain Park, Commercial opportunities
4. **Admin Interface**: Sanity Studio enhancements
5. **Production Deployment**: Vercel deployment

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start Next.js dev server (port 3000)
npm run build           # Build for production
npm run start           # Start production server

# Sanity Studio
cd sanity-studio && npm run dev  # Start Sanity Studio (port 3333)

# Database
npm run db:migrate      # Run Supabase migrations
npm run db:seed         # Seed database with test data

# Code Quality
npm run lint            # ESLint
npm run type-check      # TypeScript checking
```

## 🏆 Key Achievements

### Technical Excellence
- **Server Components**: Optimized performance with React Server Components
- **Cross-System Integration**: Seamless Sanity ↔ Supabase ↔ Frontend data flow
- **Image Optimization**: Smart Cloudinary transformations with face detection
- **Responsive Design**: Mobile-first approach across all features
- **Type Safety**: Full TypeScript implementation

### Business Features
- **Fan Engagement**: Complete submission and moderation workflow
- **Content Management**: Dual CMS approach for optimal content control  
- **Match Data**: Real-time updates with BBC integration
- **Commercial Ready**: Framework for sponsor and hospitality integration

## 📚 Documentation

- **Architecture**: `./docs/ARCHITECTURE.md` - Technical architecture details
- **Contributing**: `./docs/CONTRIBUTING.md` - Development guidelines
- **Project Status**: `./docs/BanksODee-ProjectStatus.md` - Detailed status
- **Handover**: `./docs/HANDOVER.md` - Team handover information

## 🤝 Contributing

This project uses a collaborative development approach:

1. **One Issue at a Time**: Focus deeply on single problems
2. **Immediate Validation**: Test each change before proceeding  
3. **Clear Success Criteria**: Define "done" before starting
4. **Direct Implementation**: CAT << 'EOF' pattern for file updates

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for detailed guidelines.

## 🚀 Production Deployment

**Target Platform**: Vercel
**Timeline**: Ready for deployment after remaining 5% completion
**Performance Targets**: 
- Lighthouse score > 90
- Page load < 2 seconds
- Mobile responsive across all devices

## 📞 Support

**For Development Issues**:
- Check GitHub Issues for existing problems
- Review documentation in `/docs/` folder
- Follow development workflow in `./docs/CONTRIBUTING.md`

**For Club Content**:
- Use Sanity Studio for news, players, galleries
- Use Supabase dashboard for match data
- Follow content guidelines in documentation

## 📜 License

Copyright © 2025 Banks o' Dee FC. All rights reserved.

---

**Banks o' Dee FC** - Aberdeen's most ambitious community football club
**Est. 1902** - "Banks of the River Dee"