
import { fetchSanityData } from '@/lib/sanity/client';
import { HeroSlide } from '@/types/hero';

/**
 * Fetches hero slides from Sanity CMS
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const query = `*[_type == "newsArticle" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "subtitle": excerpt,
    "imageUrl": mainImage.asset->url,
    publishedAt,
    slug,
    "category": category
  }`;

  try {
    const slides = await fetchSanityData(query);
    return slides || getFallbackSlides();
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return getFallbackSlides();
  }
}

/**
 * Provides fallback slides when Sanity data is unavailable
 */
export function getFallbackSlides(): HeroSlide[] {
  return [
    {
      _id: '1',
      title: 'BANKS O\' DEE AIMING FOR LEAGUE GLORY',
      subtitle: 'Squad Prepares for Highland League Cup',
      imageUrl: '/assets/images/matchday/MatchDay1.jpg',
      publishedAt: new Date().toISOString(),
      slug: { current: 'league-glory' },
      category: 'CLUB NEWS'
    },
    {
      _id: '2',
      title: 'MATCH PREVIEW: BANKS O\' DEE VS FRASERBURGH FC',
      subtitle: 'Critical Highland League fixture this Saturday at Spain Park',
      imageUrl: '/assets/images/team/Squad1.jpg',
      publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      slug: { current: 'match-preview-fraserburgh' },
      category: 'MATCH PREVIEW'
    },
    {
      _id: '3',
      title: 'NEW SIGNING ANNOUNCEMENT',
      subtitle: 'Banks o\' Dee strengthens squad with exciting new talent',
      imageUrl: '/assets/images/team/Training3_Square.jpg',
      publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      slug: { current: 'new-signing-announcement' },
      category: 'TRANSFER NEWS'
    }
  ];
}
