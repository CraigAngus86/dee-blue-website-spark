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
  // Fetch more news articles to accommodate mobile (5) + desktop cards (6) = 11 total
  const newsArticles = await getNewsArticles(11);
  
  // Fetch all data in parallel
  const [
    upcomingMatches, 
    recentMatches,
    leagueTable,
    sponsors,
    fanOfMonth,
    galleryPhotos,
    randomPlayers
  ] = await Promise.all([
    getHomepageUpcomingMatches(5),
    getHomepageRecentMatches(5),
    getHomepageLeagueTable(),
    getSponsorsForHomepage(),
    getFanOfMonth(),
    getGalleryPhotos(),
    getRandomPlayers()
  ]);
  
  // Responsive article distribution:
  // Mobile: 5 articles for hero, 0 for cards
  // Desktop: 3 articles for hero, 6 for cards
  const heroArticles = newsArticles.slice(0, 5).map(article => ({
    ...article,
    id: article._id
  }));
  
  const cardsArticles = newsArticles.slice(3, 9).map(article => ({
    ...article,
    id: article._id
  }));
  
  // Convert to the format expected by components
  const cardShadowStyle = {
    "--card-shadow": "0 10px 25px -5px rgba(0, 16, 90, 0.1), 0 8px 10px -6px rgba(0, 16, 90, 0.05)",
    "--card-hover-shadow": "0 20px 25px -5px rgba(0, 16, 90, 0.15), 0 10px 10px -5px rgba(0, 16, 90, 0.1)"
  } as React.CSSProperties;
  
  return (
    <div className="min-h-screen flex flex-col" style={cardShadowStyle}>
      {/* Hero Section - now handles 5 articles on mobile, 3 on desktop */}
      <HomeHeroSection articles={heroArticles} />
      
      {/* Mobile News Link - only shows on mobile when cards are hidden */}
      <MobileNewsLink />
      
      {/* News Cards Section - hidden on mobile, visible on desktop */}
      <div className="hidden md:block">
        <OverlappingNewsCards articles={cardsArticles} />
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
        <FanZoneSection fanOfMonth={fanOfMonth} galleryPhotos={galleryPhotos} />
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
