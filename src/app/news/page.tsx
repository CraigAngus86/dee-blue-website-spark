import { Metadata } from "next";
import { fetchSanityData } from "@/lib/sanity/sanityClient";
import { NewsGrid } from "@/features/news/components";

// Set the revalidation time to ensure fresh data
export const revalidate = 10; // Revalidate every 10 seconds

export const metadata: Metadata = {
  title: "News | Banks o' Dee FC",
  description: "Latest news, match reports, and updates from Banks o' Dee Football Club",
};

// Fetch all news articles
async function getAllNews() {
  const query = `*[_type == "newsArticle" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage{
      "url": asset->url,
      "alt": coalesce(alt, "News image")
    },
    excerpt,
    "category": category
  }`;
  
  try {
    const news = await fetchSanityData(query, {}, false);
    return news || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// Fetch match galleries
async function getMatchGalleries() {
  // Note: Update this query based on your actual Sanity schema for galleries
  const query = `*[_type == "matchGallery" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    "mainImage": coverImage{
      "url": asset->url,
      "alt": coalesce(alt, title)
    },
    "match": match->title
  }`;
  
  try {
    const galleries = await fetchSanityData(query, {}, false);
    return galleries || [];
  } catch (error) {
    console.error("Error fetching match galleries:", error);
    return [];
  }
}

export default async function NewsPage() {
  // Add a cache-busting timestamp to force fetch
  const timestamp = Date.now();
  
  // Fetch all news articles and galleries in parallel
  const [newsArticles, matchGalleries] = await Promise.all([
    getAllNews(),
    getMatchGalleries()
  ]);
  
  // Process articles
  const processedArticles = newsArticles.map(article => ({
    ...article,
    id: article._id,
    // Ensure correct image format
    mainImage: article.mainImage || undefined
  }));
  
  return (
    <main>
      <div className="bg-[#00105A] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center font-montserrat">Club News</h1>
        </div>
      </div>
      
      <NewsGrid 
        articles={processedArticles} 
        galleries={matchGalleries}
      />
    </main>
  );
}
