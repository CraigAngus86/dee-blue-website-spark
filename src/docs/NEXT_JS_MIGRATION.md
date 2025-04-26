
# Next.js Migration Guide

This document outlines the plan for migrating the Banks o' Dee FC website from a React/Vite application to Next.js.

## Migration Overview

### Current Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Data Fetching**: TanStack Query
- **Backend**: Supabase

### Target Stack
- **Framework**: Next.js 15+
- **Routing**: Next.js App Router
- **Styling**: Tailwind CSS (unchanged)
- **Component Library**: shadcn/ui (unchanged)
- **Data Fetching**: Next.js data fetching + TanStack Query
- **Backend**: Supabase (unchanged)

## Migration Strategy

### 1. Preparation Phase (Current)

- [x] Organize project structure to match Next.js conventions
- [ ] Document current routing and data fetching patterns
- [ ] Set up directory placeholders for Next.js structure

### 2. Initial Setup

- [ ] Create new Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Install and configure shadcn/ui
- [ ] Set up Supabase integration

### 3. Component Migration

- [ ] Migrate UI components with minimal changes
- [ ] Update image components to use Next.js Image
- [ ] Ensure responsive design consistency
- [ ] Migrate layout components

### 4. Routing Migration

- [ ] Convert routes to Next.js file-based routing
- [ ] Implement dynamic routes
- [ ] Set up redirects for any changed URLs
- [ ] Create proper error and loading states

### 5. Data Fetching Migration

- [ ] Convert API routes to Next.js API routes
- [ ] Implement server components for data fetching
- [ ] Configure proper caching strategies
- [ ] Set up Supabase client for server components

### 6. Optimization

- [ ] Implement static site generation where appropriate
- [ ] Set up incremental static regeneration
- [ ] Optimize image loading and delivery
- [ ] Configure proper metadata for SEO

### 7. Testing and Deployment

- [ ] Test functionality across all pages
- [ ] Test responsive design
- [ ] Test performance metrics
- [ ] Deploy to production

## Key Migration Considerations

### File Structure Changes

Current structure:
```
src/
├── components/
├── pages/
├── data/
├── lib/
└── assets/
```

Next.js structure:
```
src/
├── app/                  # Routes
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   └── [routes]/         # Other routes
├── components/           # React components
├── lib/                  # Utility functions
└── public/               # Static assets
```

### Route Migration Mapping

| Current Route | Next.js Route |
|---------------|---------------|
| `/` | `src/app/page.tsx` |
| `/news` | `src/app/news/page.tsx` |
| `/news/:id` | `src/app/news/[slug]/page.tsx` |
| `/match-centre` | `src/app/match-centre/page.tsx` |
| `/team-and-management` | `src/app/team-and-management/page.tsx` |
| `/spain-park` | `src/app/spain-park/page.tsx` |
| `/commercial-opportunities` | `src/app/commercial-opportunities/page.tsx` |

### Component Changes

#### Image Components

Current:
```tsx
import Image from "next/image";

<Image
  src={imagePath}
  alt={alt}
  width={width}
  height={height}
  className={className}
/>
```

Next.js (unchanged, but with proper configuration):
```tsx
import Image from "next/image";

<Image
  src={imagePath}
  alt={alt}
  width={width}
  height={height}
  className={className}
/>
```

#### Link Components

Current:
```tsx
import { Link } from "react-router-dom";

<Link to="/news" className={className}>
  News
</Link>
```

Next.js:
```tsx
import Link from "next/link";

<Link href="/news" className={className}>
  News
</Link>
```

### Data Fetching Changes

#### Current:
```tsx
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['news'],
  queryFn: fetchNews
});
```

#### Next.js Server Component:
```tsx
import { getNews } from '@/lib/data';

export default async function NewsPage() {
  const news = await getNews();
  
  return <NewsGrid articles={news} />;
}
```

#### Next.js Client Component:
```tsx
'use client';

import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['news'],
  queryFn: fetchNews
});
```

### API Routes Changes

#### Current:
```tsx
// Separate API server or serverless functions
```

#### Next.js:
```tsx
// src/app/api/news/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Handle request
  return NextResponse.json({ data });
}
```

## Timeline and Phases

1. **Planning and Preparation**: 1-2 weeks
   - Document current architecture
   - Finalize migration strategy
   - Set up project structure

2. **Core Framework Migration**: 2-3 weeks
   - Set up Next.js project
   - Migrate core components
   - Set up basic routing

3. **Feature Migration**: 3-4 weeks
   - Migrate page components
   - Implement data fetching
   - Convert API routes

4. **Optimization and Testing**: 1-2 weeks
   - Performance optimization
   - Cross-browser testing
   - Accessibility validation

5. **Deployment and Monitoring**: 1 week
   - Production deployment
   - Analytics setup
   - Performance monitoring

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Migration Guide](https://nextjs.org/docs/migrating/from-react-to-nextjs)
- [React to Next.js Migration Examples](https://github.com/vercel/next.js/tree/canary/examples)
