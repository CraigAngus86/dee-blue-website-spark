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
  // FIXED: Updated query to preserve full structure including body
  const query = `*[_type == "newsArticle" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage, // Keep full Cloudinary structure
    excerpt,
    category,
    body, // Include the body content
    author,
    "matchId": matchId,
    "relatedMatchId": relatedMatchId,
    featured,
    isFeature,
    "relatedPlayers": relatedPlayers[]-> {
      "_id": _id,
      "name": name,
      "slug": slug.current,
      "profileImage": profileImage
    },
    gallery
  }`;
  
  try {
    const news = await fetchSanityData(query, {}, false);
    console.log('First article body type:', news && news.length > 0 ? typeof news[0].body : 'No articles');
    if (news && news.length > 0 && news[0].body) {
      console.log('First article body sample:', JSON.stringify(news[0].body).substring(0, 100) + '...');
    }
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
    coverImage, // Keep full structure
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
  
  // Process articles - preserve the full structure
  const processedArticles = newsArticles.map(article => ({
    ...article,
    id: article._id,
    // No transformation needed - keep original structure
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
