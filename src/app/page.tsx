import { Metadata } from "next";
import Section from "@/components/ui/layout/Section";
import { FanZoneSection } from "@/features/fanzone";
import SponsorsSection from "@/components/ui/sections/SponsorsSection";
import GradientSeparator from "@/components/ui/separators/GradientSeparator";
import FadeIn from "@/components/ui/animations/FadeIn";
import MatchCenter from "@/components/ui/sections/MatchCenter";
import PlayersSection from "@/features/team/components/PlayersSection";
import { fetchSanityData } from "@/lib/sanity/sanityClient";
import { supabase } from "@/lib/supabase/client";
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
async function getNewsArticles(limit = 9) {
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

async function getSponsors() {
  try {
    const { data: sponsors, error } = await supabase
      .from("sponsors")
      .select("*")
      .order("featured", { ascending: false });
    if (error) throw error;
    return sponsors || [];
  } catch (error) {
    console.error("Error fetching sponsors:", error);
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

export default async function HomePage() {
  // Fetch all news articles (up to 9 - 3 for hero, 6 for cards)
  const newsArticles = await getNewsArticles(9);
  
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
    getSponsors(),
    getFanOfMonth(),
    getGalleryPhotos(),
    getRandomPlayers()
  ]);
  
  console.log(`HomePage - Retrieved matches: ${upcomingMatches.length} upcoming, ${recentMatches.length} recent`);
  console.log(`HomePage - Selected ${randomPlayers.length} random players`);
  
  // Process news articles for hero (top 3)
  const heroArticles = newsArticles.slice(0, 3).map(article => ({
    ...article,
    id: article._id
  }));
  
  // Process news articles for cards (next 6)
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
      {/* Hero Section */}
      <HomeHeroSection articles={heroArticles} />
      
      {/* News Cards Section - no divider before this section */}
      <OverlappingNewsCards articles={cardsArticles} />
      
      {/* Reduced Gradient Separator */}
      <GradientSeparator className="py-6" />
      
      {/* Match Center Section - Consistent Spacing */}
      <Section 
        background="transparent"
        spacing="md"
        className="bg-[#f5f7fb]"
      > 
        <FadeIn>
          <MatchCenter 
            upcomingMatches={upcomingMatches} 
            recentResults={recentMatches} 
            leagueTable={leagueTable} 
          />
        </FadeIn>
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
      
      {/* Sponsors Section - Using Section Wrapper */}
      <Section
        background="transparent"
        spacing="md"
      >
        <SponsorsSection sponsors={sponsors} />
      </Section>
    </div>
  );
}
