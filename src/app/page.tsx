import { Metadata } from "next";
import Section from "@/components/ui/layout/Section";
import { FanZoneSection } from "@/features/fanzone";
import { SponsorsSection, getSponsorsForHomepage, type SanitySponsors } from "@/features/sponsors";
import GradientSeparator from "@/components/ui/separators/GradientSeparator";
import FadeIn from "@/components/ui/animations/FadeIn";
import MatchCenter from "@/components/ui/sections/MatchCenter";
import PlayersSection from "@/features/team/components/PlayersSection";
import { fetchSanityData } from "@/lib/sanity/sanityClient";
import { getHomepageUpcomingMatches, getHomepageRecentMatches, getHomepageLeagueTable } from "@/features/matches/hooks/useHomeMatchData";
import { HomeHeroSection, OverlappingNewsCards } from "@/features/home";
import { getTeamData } from "@/features/team/services/getTeamData";
import { selectRandomPlayersByPosition } from "@/features/team/services/playerSelection";
import { getActivePoll } from "@/lib/supabase/polls";

// Set the revalidation time to ensure fresh data
export const revalidate = 10; // Revalidate every 10 seconds

export const metadata: Metadata = {
  title: "Home | Banks o' Dee FC",
  description:
    "Welcome to the official website of Banks o' Dee Football Club",
};

// Fetch all news articles for homepage ordered by date
async function getNewsArticles(limit = 11) {
  const query = `*[_type == "newsArticle" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    excerpt,
    category,
    author,
    body
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
  const query = `*[_type == "matchGallery" && !(_id in path("drafts.**"))] | order(matchDate desc) {
    _id,
    title,
    matchDate,
    homeTeam,
    awayTeam,
    coverImage,
    galleryImages,
    photographer
  }`;
  
  try {
    const galleries = await fetchSanityData(query, {}, false);
    return galleries || [];
  } catch (error) {
    console.error("Error fetching match galleries:", error);
    return [];
  }
}

async function getFanOfMonth() {
  const query = `*[_type == "fanOfMonth" && status == "featured"][0] {
    fanName,
    category,
    story,
    photos,
    supporterSince,
    submittedAt
  }`;
  
  try {
    const fanOfMonth = await fetchSanityData(query, {}, false);
    return fanOfMonth || null;
  } catch (error) {
    console.error("Error fetching fan of the month:", error);
    return null;
  }
}

async function getGalleryPhotos() {
  const query = `*[_type == "fanPhoto" && approvalStatus == "approved"] | order(displayOrder asc, submittedAt desc)[0...6] {
    fanName,
    photo,
    context,
    submittedAt
  }`;
  
  try {
    const galleryPhotos = await fetchSanityData(query, {}, false);
    return galleryPhotos || [];
  } catch (error) {
    console.error("Error fetching gallery photos:", error);
    return [];
  }
}

async function getRandomPlayers() {
  try {
    const { people, error } = await getTeamData();
    
    if (error) {
      console.error("Error fetching team data:", error);
      return [];
    }
    
    // Select random players by position
    const randomPlayers = selectRandomPlayersByPosition(people);
    return randomPlayers;
  } catch (error) {
    console.error("Error selecting random players:", error);
    return [];
  }
}

// Mobile News Link Component
const MobileNewsLink = () => (
  <div className="block md:hidden bg-white py-6">
    <div className="container mx-auto px-4 text-center">
      <a 
        href="/news" 
        className="inline-flex items-center justify-center px-6 py-3 bg-[#C5E7FF] text-[#00105A] rounded-lg font-semibold hover:bg-[#00105A] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
      >
        See all News
      </a>
    </div>
  </div>
);

export default async function HomePage() {
  // Fetch both news articles and match galleries in parallel
  const [newsArticles, matchGalleries] = await Promise.all([
    getNewsArticles(20), // Fetch more to ensure we have enough mixed content
    getMatchGalleries()
  ]);

  // COPY EXACT NewsGrid pattern for normalization
  const allContent = [
    ...newsArticles.map(article => ({ ...article, id: article._id, contentType: "article" })),
    ...matchGalleries.map(gallery => ({
      id: gallery._id,
      _id: gallery._id,
      title: gallery.title,
      slug: gallery._id,
      publishedAt: gallery.matchDate,
      mainImage: gallery.coverImage,
      excerpt: `Match Day photos now available for ${gallery.title}!`,
      category: "matchGallery",
      contentType: "gallery",
      body: [],
      author: gallery.photographer || 'Club Photographer'
    }))
  ];

  // Sort by date (most recent first)
  const sortedContent = [...allContent].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  // Fetch all other data in parallel
  const [
    upcomingMatches, 
    recentMatches,
    leagueTable,
    sponsors,
    fanOfMonth,
    galleryPhotos,
    randomPlayers,
    activePoll
  ] = await Promise.all([
    getHomepageUpcomingMatches(5),
    getHomepageRecentMatches(5),
    getHomepageLeagueTable(),
    getSponsorsForHomepage(),
    getFanOfMonth(),
    getGalleryPhotos(),
    getRandomPlayers(),
    getActivePoll()
  ]);
  
  // Apply same slicing logic to mixed content:
  // Mobile: 5 items for hero, 0 for cards
  // Desktop: 3 items for hero, 6 for cards (with overlap)
  const heroItems = sortedContent.slice(0, 5);
  const cardsItems = sortedContent.slice(3, 9);
  
  // Convert to the format expected by components
  const cardShadowStyle = {
    "--card-shadow": "0 10px 25px -5px rgba(0, 16, 90, 0.1), 0 8px 10px -6px rgba(0, 16, 90, 0.05)",
    "--card-hover-shadow": "0 20px 25px -5px rgba(0, 16, 90, 0.15), 0 10px 10px -5px rgba(0, 16, 90, 0.1)"
  } as React.CSSProperties;
  
  return (
    <div className="min-h-screen flex flex-col" style={cardShadowStyle}>
      {/* Hero Section - now handles 5 items on mobile, 3 on desktop (mixed articles + galleries) */}
      <HomeHeroSection articles={heroItems} />
      
      {/* Mobile News Link - only shows on mobile when cards are hidden */}
      <MobileNewsLink />
      
      {/* News Cards Section - hidden on mobile, visible on desktop (mixed articles + galleries) */}
      <div className="hidden md:block">
        <OverlappingNewsCards articles={cardsItems} />
      </div>
      
      {/* Reduced Gradient Separator */}
      <GradientSeparator className="py-6" />
      
      {/* Match Center Section - Consistent Spacing */}
      <Section 
        background="transparent"
        spacing="md"
        className="bg-[#f5f7fb]"
      > 
        <MatchCenter 
          upcomingMatches={upcomingMatches} 
          recentResults={recentMatches} 
          leagueTable={leagueTable} 
        />
      </Section>
      
      {/* Reduced Gradient Separator */}
      <GradientSeparator className="py-6" />
      
      {/* Fan Zone Section - Using Section Component for Consistency */}
      <Section 
        background="transparent"
        spacing="md"
      >
        <FanZoneSection 
          fanOfMonth={fanOfMonth} 
          galleryPhotos={galleryPhotos} 
          activePoll={activePoll}
        />
      </Section>
      
      {/* Reduced Gradient Separator */}
      <GradientSeparator className="py-6" />
      
      {/* Players Section - NEW Barcelona-style Cards */}
      <Section
        background="transparent"
        spacing="md"
        className="bg-[#f5f7fb]"
      >
        <PlayersSection players={randomPlayers} />
      </Section>
      
      {/* Reduced Gradient Separator */}
      <GradientSeparator className="py-6" />
      
      {/* Sponsors Section - NEW Barcelona-style with Sanity Data */}
      <Section
        background="transparent"
        spacing="md"
      >
        <SponsorsSection sponsors={sponsors} />
      </Section>
    </div>
  );
}
