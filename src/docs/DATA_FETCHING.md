
# Data Fetching Patterns

This document outlines the data fetching patterns used in the Banks o' Dee FC website.

## Overview

The application uses a combination of:

1. **TanStack Query (React Query)** - For client-side data fetching with caching
2. **Supabase Client** - For database interactions
3. **Custom Hooks** - For encapsulating data fetching logic
4. **Mock Data** - For development and testing

## Data Fetching Methods

### TanStack Query

We use TanStack Query for most data fetching operations to benefit from its caching, retrying, and stale-while-revalidate features:

```typescript
import { useQuery } from '@tanstack/react-query';

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      return response.json();
    }
  });
}
```

### Supabase Client

For direct database interactions, we use the Supabase client:

```typescript
import { supabase } from '@/integrations/supabase/client';

export async function fetchFixtures(type = 'upcoming') {
  const { data, error } = await supabase
    .from('fixtures')
    .select('*')
    .eq('type', type)
    .order('date', { ascending: true });
    
  if (error) throw error;
  return data;
}
```

### API Routes

Server-side API routes handle data fetching and processing:

```typescript
// src/app/api/news/route.ts
import { NextResponse } from 'next/server';
import { newsArticles } from '@/mock-data/newsData';

export async function GET() {
  try {
    return NextResponse.json({ articles: newsArticles });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}
```

## Data Fetching Patterns

### Component-Level Data Fetching

For component-specific data needs:

```tsx
const NewsSection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['latestNews'],
    queryFn: fetchLatestNews
  });
  
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorMessage error={error} />;
  
  return <NewsGrid articles={data.articles} />;
};
```

### Page-Level Data Fetching

For data needed by an entire page:

```tsx
const NewsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: fetchAllNews
  });
  
  if (isLoading) return <PageLoadingState />;
  if (error) return <PageErrorState error={error} />;
  
  return (
    <Layout>
      <NewsHero />
      <NewsGrid articles={data.articles} />
    </Layout>
  );
};
```

### Custom Data Fetching Hooks

Encapsulating data fetching logic in custom hooks:

```typescript
// src/hooks/useMatchData.ts
export function useMatchData(type: 'fixtures' | 'results') {
  return useQuery({
    queryKey: ['matches', type],
    queryFn: () => getFixtures(type),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

## Error Handling

We handle errors consistently across data fetching operations:

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  onError: (error) => {
    console.error('Fetch error:', error);
    toast.error('Failed to load data. Please try again later.');
  }
});
```

## Data Fetching Optimizations

### Caching Strategy

- **Cache Time**: 5 minutes for frequently changing data, longer for static data
- **Stale Time**: 1 minute for dynamic data, longer for semi-static data

### Prefetching

For anticipated data needs:

```typescript
// Prefetch team data when hovering over a link
const queryClient = useQueryClient();
const prefetchTeamData = () => {
  queryClient.prefetchQuery({
    queryKey: ['team'],
    queryFn: fetchTeamData
  });
};
```

### Parallel Queries

For multiple independent data needs:

```typescript
const results = useQueries({
  queries: [
    { queryKey: ['fixtures'], queryFn: fetchFixtures },
    { queryKey: ['news'], queryFn: fetchNews },
    { queryKey: ['team'], queryFn: fetchTeamData }
  ]
});
```

### Pagination

For large data sets:

```typescript
const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
  queryKey: ['news', 'infinite'],
  queryFn: ({ pageParam = 1 }) => fetchNewsPage(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextPage || undefined
});
```

## Mock Data Integration

During development, we use mock data:

```typescript
// Development environment
const fetchNews = async () => {
  if (process.env.NODE_ENV === 'development') {
    return { articles: newsArticles }; // from mock-data/newsData.ts
  } else {
    // Production: fetch from real API
    const response = await fetch('/api/news');
    return response.json();
  }
};
```

## Future Considerations

With the planned migration to Next.js:

1. **Server Components**: Move data fetching to React Server Components
2. **Data Fetching Methods**: Use Next.js's built-in data fetching methods
3. **Static Generation**: Leverage static generation for suitable pages
4. **Incremental Static Regeneration**: For semi-dynamic content
