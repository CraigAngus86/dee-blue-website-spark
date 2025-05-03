
import { Metadata } from "next";
import { fetchSanityData } from "@/lib/sanity/client";
import NewsHero from "@/components/news/NewsHero";
import NewsGrid from "@/components/news/NewsGrid";
import { NewsItem } from "@/types/news";

export const metadata: Metadata = {
  title: "News | Banks o' Dee FC",
  description: "Latest news from Banks o' Dee Football Club",
};

async function getNewsArticles(): Promise<NewsItem[]> {
  try {
    const query = `*[_type == "newsArticle"] | order(publishedAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      "date": publishedAt,
      "author": author,
      "imageUrl": mainImage.asset->url,
      "category": category,
      excerpt,
      content,
      "tags": tags[]->title
    }`;
    
    return await fetchSanityData(query) || [];
  } catch (error) {
    console.error("Failed to fetch news articles:", error);
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNewsArticles();
  
  return (
    <main className="flex-grow">
      <NewsHero />
      <div className="container mx-auto px-4 py-12">
        <NewsGrid news={news} />
      </div>
    </main>
  );
}
