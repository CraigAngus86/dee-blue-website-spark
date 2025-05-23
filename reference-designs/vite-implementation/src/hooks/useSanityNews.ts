
import { useQuery } from '@tanstack/react-query';
import { fetchSanityData } from '../../sanity-studio/client.js';

export type SanityNewsItem = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  excerpt: string;
  body: any;
  supabaseId?: string; // Optional supabaseId for linking to a Supabase record
};

const getNewsQuery = `
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    body,
    supabaseId
  }
`;

export function useSanityNews() {
  return useQuery({
    queryKey: ['sanityNews'],
    queryFn: async () => {
      const news = await fetchSanityData(getNewsQuery);
      return news as SanityNewsItem[] || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
