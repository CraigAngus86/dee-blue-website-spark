import { useMemo } from 'react';

export interface HeroItemBase {
  id: string;
  title: string;
  slug?: string;
  mainImage?: any;
  publishedAt: string;
  isFeature?: boolean;
  contentType: 'news' | 'gallery';
  [key: string]: any;
}

export interface HomeHeroData {
  featuredItems: HeroItemBase[];
  regularItems: HeroItemBase[];
}

export function useHomeHeroData(allItems: HeroItemBase[]): HomeHeroData {
  return useMemo(() => {
    if (!allItems || allItems.length === 0) {
      return { featuredItems: [], regularItems: [] };
    }

    // Sort everything by publishedAt descending
    const sortedItems = [...allItems].sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });

    // Featured: items explicitly marked as featured (up to 3)
    const featuredItems = sortedItems.filter(item => item.isFeature).slice(0, 3);

    // Fill up to 3 if less than 3
    if (featuredItems.length < 3) {
      const featuredIds = new Set(featuredItems.map(i => i.id));
      const additionalItems = sortedItems
        .filter(item => !featuredIds.has(item.id))
        .slice(0, 3 - featuredItems.length);
      featuredItems.push(...additionalItems);
    }

    const featuredIds = new Set(featuredItems.map(i => i.id));
    const regularItems = sortedItems.filter(item => !featuredIds.has(item.id));

    return { featuredItems, regularItems };
  }, [allItems]);
}
