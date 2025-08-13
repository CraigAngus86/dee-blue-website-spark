import { Metadata } from "next";
import { fetchSanityData } from "@/lib/sanity/sanityClient";
import { NewsGrid } from "@/features/news/components";
import { NewsHero } from "@/features/news/components/NewsHero";

// Revalidate to keep content fresh
export const revalidate = 10;

export const metadata: Metadata = {
  title: "News | Baynounah SC",
  description:
    "Latest Baynounah SC news, match reports, and club updates — be part of the journey.",
};

// Fetch all news articles
async function getAllNews() {
  const query = `*[_type == "newsArticle" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt, matchDate,
    mainImage,
    excerpt,
    category,
    body,
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
    // (Keep any debugging logs you need locally)
    return news || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// Fetch match galleries
async function getMatchGalleries() {
  const query = `*[_type == "matchGallery" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    publishedAt, matchDate,
    coverImage,
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
  const [newsArticles, matchGalleries] = await Promise.all([
    getAllNews(),
    getMatchGalleries(),
  ]);

  const processedArticles = newsArticles.map((article: any) => ({
    ...article,
    id: article._id,
  }));

  return (
    <main className="min-h-screen">
      {/* Hero Section (uses global heading + brand tokens) */}
      <NewsHero />

      {/* News Grid Section — standardized spacing + warm gray alternation per global.css */}
      <section className="section section--white">
        <div className="container mx-auto px-4">
          <NewsGrid articles={processedArticles} galleries={matchGalleries} />
        </div>
      </section>
    </main>
  );
}
