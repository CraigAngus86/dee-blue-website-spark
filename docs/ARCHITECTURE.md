# Banks o' Dee FC Website - Technical Architecture

## System Overview

The Banks o' Dee FC website is a modern Next.js 14 application using a hybrid data architecture that combines operational data (Supabase) with editorial content (Sanity CMS), integrated with smart media management (Cloudinary). This multi-system approach provides both operational efficiency and content flexibility for a community football club with commercial ambitions.

**Current Status**: Production-ready architecture supporting 95% of planned features
**Development Environment**: GitHub Codespaces with direct terminal implementation
**Deployment Target**: Vercel with optimized build configuration

## Core Architecture Components

### 1. Frontend Framework (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Components**: React Server Components (default) with selective Client Components
- **Styling**: Tailwind CSS with hex color system (`#00105A`, `#C5E7FF`, `#FFD700`)
- **TypeScript**: Full type safety across all systems
- **Performance**: Server-side rendering with optimized client hydration

### 2. Data Management Systems

#### Supabase (Operational Database)
```sql
-- Core operational tables
teams, match, league_table, competitions, seasons

-- Key database views for frontend
vw_latest_results, vw_upcoming_matches, vw_current_league_table

-- Authentication & user management
auth.users, profiles, user_roles
Primary Role: Structured data, real-time updates, authentication
Data Types: Match results, league tables, fixtures, team data, user accounts
Key Features: Row-level security, real-time subscriptions, automated BBC scraper integration
Sanity CMS (Editorial Content)
typescript// Core content schemas
newsArticle, playerProfile, matchGallery, fanSubmission, fanOfMonth
Primary Role: Content management for editorial staff
Data Types: News articles, player profiles, galleries, fan content
Key Features: Rich text editing, image management, moderation workflows, draft/publish system
Cloudinary (Media Management)
Folder Structure:
├── /teams/           # Team logos and group photos
├── /players/         # Player profile images (face detection)
├── /news/            # Article hero images and content
├── /galleries/       # Match day and event galleries
├── /fans/            # User-generated content
│   ├── /submissions/ # Fan submissions (pending)
│   ├── /featured/    # Fan of the month photos
│   └── /gallery/     # Approved fan photos
└── /commercial/      # Sponsor logos and marketing
Primary Role: Image optimization, transformations, content delivery
Key Features: Face detection, responsive images, auto-optimization, smart cropping
3. Hybrid Data Architecture
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
Cross-System References: Unidirectional Sanity → Supabase via ID fields

match.gallery_idsanity - Links to Sanity gallery documents
match.match_report_link - Links to Sanity news articles
Manual linking provides editorial control without complex webhooks

Feature-Based Architecture
Directory Structure
src/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Homepage (server component)
│   ├── news/page.tsx          # News listing
│   ├── matches/page.tsx       # Match centre
│   ├── team/page.tsx          # Team & players
│   └── api/                   # API routes
│       ├── scrape-league-table/ # BBC Highland League scraper
│       └── fan-submission/     # Fan Zone submission handler
├── features/                   # Feature-based organization
│   ├── news/                  # News system
│   │   ├── components/        # NewsGrid, NewsModal, NewsCard
│   │   └── hooks/             # useNewsData
│   ├── matches/               # Match centre
│   │   ├── components/        # MatchCard, LeagueTable, panels
│   │   └── hooks/             # useMatchesData, useHomeMatchData
│   ├── galleries/             # Gallery modal system
│   │   ├── components/        # GalleryViewer, MatchGalleryModal
│   │   └── hooks/             # useGallery
│   ├── team/                  # Team & player management
│   │   ├── components/        # PlayerCard, TeamGrid
│   │   └── hooks/             # useTeamData
│   └── fanzone/               # Fan engagement (75% complete)
│       ├── components/        # FanSubmissionModal, FanOfTheMonth
│       └── hooks/             # useFanSubmission
├── lib/                       # Core integrations
│   ├── sanity/               # Sanity client & queries
│   ├── supabase/             # Supabase client & database types
│   └── cloudinary/           # Image transformations & optimization
└── components/                # Shared UI components
    └── ui/                   # Base UI components (buttons, modals, etc.)
Key Integration Patterns
1. Server vs Client Components
Server Components (Default):

Homepage sections with data fetching
News listings and article pages
Match centre with league tables
Team pages with player profiles
SEO-optimized content rendering

Client Components (Selective):

Interactive modals (news, galleries, fan submissions)
Form submissions and validation
Image carousels and galleries
State management for UI interactions

2. Modal Integration Pattern
typescript// State management at section level
const [galleryModalOpen, setGalleryModalOpen] = useState(false);
const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);

// Event handlers with data fetching
const handleGalleryClick = async (galleryId: string) => {
  setSelectedGalleryId(galleryId);
  setGalleryModalOpen(true);
};

// Render modal at appropriate level
<MatchGalleryModal 
  isOpen={galleryModalOpen}
  onClose={() => setGalleryModalOpen(false)}
  galleryId={selectedGalleryId}
/>
3. Cross-System Data Fetching
typescript// Example: Match with related content
const match = await supabase
  .from('vw_latest_results')
  .select('*')
  .eq('id', matchId)
  .single();

// Fetch related gallery if exists
if (match.gallery_link) {
  const gallery = await sanityClient.fetch(
    `*[_type == "matchGallery" && _id == $id][0]`,
    { id: match.gallery_link }
  );
}
Specialized Systems
1. BBC Highland League Scraper
typescript// API Route: /api/scrape-league-table
// Target: BBC Sport Highland League table
// Method: Smart timestamp checking → data parsing → validation → database update

Architecture:
BBC Table → Parse & Validate → Staging Table → Production Update → Frontend Display
     ↓              ↓               ↓              ↓              ↓
  Timestamp      Team UUID      Temp Storage   Replace Season   vw_current_table
  Check Only     Mapping        + Validation   Data Only       Auto Updates
Key Features:

Intelligent timestamp checking (only update when BBC data changes)
Team name mapping via bbc_name column in teams table
Staging table protection against data corruption
Season transition detection and safety mechanisms

2. Fan Zone System (75% Complete)
typescript// Fan engagement workflow
User Submission → Cloudinary Upload → Sanity Storage → Admin Moderation → Homepage Display

Components:
├── FanSubmissionModal.tsx     # Full form with photo upload ✅ COMPLETE
├── FanOfTheMonth.tsx         # Display current featured fan (next priority)
├── FanGallery.tsx           # Photo carousel (to implement)
└── PhotoUploadModal.tsx     # Gallery photo submissions (to implement)
Moderation Workflow:

Three-stage approval: approve/reject/feature
Admin photo selection from user submissions
Automated Cloudinary cleanup for rejected content
History preservation with isActive triggers

3. Gallery System Integration
typescript// Cross-system gallery flow
Match Data (Supabase) → Gallery Link → Sanity Gallery → Cloudinary Images → Modal Display

Features:
├── Match galleries linked via gallery_idsanity
├── Modal viewing with image optimization
├── Social sharing functionality
└── Responsive image delivery
Performance Architecture
1. Image Optimization Strategy
typescript// Content-specific Cloudinary transformations
const TRANSFORMS = {
  playerProfile: 'g_auto:face,y_30,c_fill,ar_3:4,q_auto,f_auto',
  newsArticle: 'g_auto:subject,c_fill,ar_16:9,q_auto,f_auto',
  matchGallery: 'c_limit,w_1920,q_auto,f_auto',
  teamLogo: 'c_pad,w_128,h_128,q_auto,f_auto'
};
2. Database Optimization
sql-- Optimized views for frontend consumption
CREATE VIEW vw_latest_results AS
SELECT 
  m.*, ht.name as home_team, at.name as away_team,
  ht.logo_url as home_team_logo, at.logo_url as away_team_logo,
  m.match_report_link, m.gallery_idsanity
FROM match m
JOIN teams ht ON m.home_team_id = ht.id
JOIN teams at ON m.away_team_id = at.id
WHERE m.status = 'completed'
ORDER BY m.match_date DESC;
3. Caching Strategy

Server Components: Natural caching through Next.js
Static Assets: Cloudinary CDN with long-term caching
Database Views: Optimized queries with minimal joins
API Routes: Efficient data processing with error handling

Security Architecture
1. Authentication & Authorization

Supabase Auth: Row-level security for user data
API Protection: Server-side validation for all mutations
Environment Variables: Secure credential management
CORS Configuration: Restricted to allowed domains

2. Content Security

File Upload Validation: Size, format, content type checking
Moderation Workflow: All user content requires admin approval
Sanitized Input: All user-generated content is sanitized
Rate Limiting: API endpoints protected against abuse

3. Data Protection

Backup Strategy: Automated database backups
Access Logging: Comprehensive audit trails
Privacy Compliance: GDPR-compliant data handling
Secure Communications: HTTPS enforcement

Development Workflow Architecture
1. GitHub Codespaces Integration

Instant Environment: Pre-configured development containers
Direct Implementation: CAT << 'EOF' pattern for file updates
Real-time Testing: Live data integration during development
Version Control: Frequent commits with working features

2. Testing Strategy

Component Testing: Individual feature testing
Integration Testing: Cross-system data flow verification
Performance Testing: Load time and responsiveness
User Acceptance Testing: Real-world usage scenarios

3. Deployment Architecture
GitHub Repository → Build Process → Vercel Deployment → Production
       ↓                ↓              ↓              ↓
  Code Changes    Next.js Build   Environment     Live Website
  Auto Deploy     Optimization     Variables      Performance
                  Bundle Size      SSL Certs      Monitoring
Technical Decisions & Rationale
1. Hybrid Data Architecture
Decision: Separate operational data (Supabase) from editorial content (Sanity)
Rationale: Leverages strengths of each system, provides optimal user experience for different user types
Outcome: Clean data separation, efficient content management, scalable architecture
2. Feature-Based Organization
Decision: Organize code by features rather than file types
Rationale: Improves discoverability, reduces coupling, enables team scalability
Outcome: Faster development, easier maintenance, clear boundaries
3. Server Components First
Decision: Default to Server Components with selective Client Components
Rationale: Better performance, SEO optimization, reduced client bundle
Outcome: Fast initial page loads, excellent SEO, optimal user experience
4. Manual Content Linking
Decision: Manual linking between systems rather than automated webhooks
Rationale: Simpler implementation, editorial control, fewer failure points
Outcome: Reliable cross-system references, reduced complexity
Future Architecture Considerations
1. Scalability Enhancements

Caching Layer: Redis for session and API caching
CDN Strategy: Enhanced static asset delivery
Database Optimization: Query optimization and indexing
Load Balancing: Multi-region deployment if needed

2. Feature Expansions

Real-time Features: WebSocket integration for live match updates
Mobile App: React Native or Progressive Web App
Advanced Analytics: User behavior tracking and insights
AI Integration: Automated content tagging and recommendations

3. Operational Improvements

Monitoring: Comprehensive application monitoring
Error Tracking: Advanced error reporting and alerting
Performance Metrics: Real-time performance dashboards
Automated Testing: Continuous integration and deployment


This architecture supports Banks o' Dee FC's mission as Aberdeen's most ambitious community football club, providing a scalable foundation for both current needs and future growth.