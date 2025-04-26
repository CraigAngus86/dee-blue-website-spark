
# Routing Structure Documentation

This document outlines the routing structure of the Banks o' Dee FC website and provides guidance for navigation implementation.

## Current Routing Structure

The application currently uses client-side routing with React Router. Here's the structure of the main routes:

### Main Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage` | Homepage with featured content |
| `/news` | `NewsPage` | News articles listing |
| `/news/:id` | `NewsArticlePage` | Individual news article |
| `/match-centre` | `MatchCentre` | Fixtures and results |
| `/team-and-management` | `TeamAndManagement` | Team and staff information |
| `/spain-park` | `SpainParkPage` | Stadium information |
| `/commercial-opportunities` | `CommercialOpportunitiesPage` | Sponsorship information |

### Route Parameters and Query Strings

Some routes accept parameters or query strings:

- **News Articles**: `/news/:id` - Dynamic route for individual news articles
- **Match Centre**: `/match-centre?type=fixtures` or `/match-centre?type=results` - Filter matches by type
- **Team**: `/team-and-management?position=forward` - Filter players by position

## Navigation Components

### Header Navigation

The main site navigation is implemented in the `Header` component with navigation links for each main section.

### Footer Navigation

The footer contains grouped links to various sections of the site, implemented in the `FooterNavColumn` component.

## Planned Next.js Routing Structure

For the planned migration to Next.js, the routing structure will be adapted to Next.js's file-based routing system:

### Next.js App Router Structure

```
src/app/
├── page.tsx                        # Home page (/)
├── news/
│   ├── page.tsx                    # News page (/news)
│   └── [slug]/
│       └── page.tsx                # News article page (/news/[slug])
├── match-centre/
│   └── page.tsx                    # Match centre page (/match-centre)
├── team-and-management/
│   └── page.tsx                    # Team & management page (/team-and-management)
├── spain-park/
│   └── page.tsx                    # Spain Park page (/spain-park)
├── commercial-opportunities/
│   └── page.tsx                    # Commercial opportunities page (/commercial-opportunities)
└── api/                            # API routes
    ├── news/
    │   ├── route.ts               # News API endpoint (/api/news)
    │   └── [id]/
    │       └── route.ts           # News article API endpoint (/api/news/[id])
    └── fixtures/
        └── route.ts               # Fixtures API endpoint (/api/fixtures)
```

## Route Groups and Layouts

In the Next.js migration, we'll use route groups and layouts:

### Layouts

- `RootLayout`: Applied to all pages, includes header and footer
- `NewsLayout`: Applied to all news pages, includes sidebar
- `MatchCentreLayout`: Applied to match centre, includes filters

### Route Groups

- `(marketing)`: Groups public-facing pages
- `(authenticated)`: Groups pages requiring authentication
- `(admin)`: Groups administration pages

## Route Handlers

For API routes and server-side functionality:

```typescript
// src/app/api/news/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Handle GET request
  return NextResponse.json({ articles: [] });
}

export async function POST(request: Request) {
  // Handle POST request
  const data = await request.json();
  // Process data...
  return NextResponse.json({ success: true });
}
```

## Navigation Implementation

### Client Navigation

Using Next.js `Link` component for client-side navigation:

```tsx
import Link from 'next/link';

<Link href="/news" className="nav-link">
  News
</Link>
```

### Programmatic Navigation

Using the `useRouter` hook for programmatic navigation:

```tsx
'use client';

import { useRouter } from 'next/navigation';

const router = useRouter();

const handleSubmit = (e) => {
  e.preventDefault();
  router.push(`/search?q=${searchTerm}`);
};
```

## Route Guards and Authentication

For protected routes requiring authentication:

```tsx
// src/app/(authenticated)/profile/page.tsx
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function ProfilePage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return <ProfileContent user={session.user} />;
}
```

## SEO and Metadata

Page-specific metadata is defined using the Next.js metadata API:

```typescript
// src/app/news/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News | Banks O\' Dee FC',
  description: 'Latest news and updates from Banks O\' Dee FC'
};

export default function NewsPage() {
  // Component implementation...
}
```

## Future Considerations

1. **Dynamic Routes**: Implement catch-all routes for content categories
2. **Internationalization**: Prepare for multi-language support with locale-based routes
3. **Authentication**: Add middleware for protected routes
4. **Analytics**: Add route change tracking for analytics
