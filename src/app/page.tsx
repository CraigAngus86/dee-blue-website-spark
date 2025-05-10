import { Metadata } from "next";
import HeroSection from "@/components/ui/hero/HeroSection";
import Section from "@/components/ui/layout/Section";
import FanZoneSection from "@/components/ui/sections/FanZoneSection";
import SponsorsSection from "@/components/ui/sections/SponsorsSection";
import GradientSeparator from "@/components/ui/separators/GradientSeparator";
import FadeIn from "@/components/ui/animations/FadeIn";
import PatternOverlay from "@/components/ui/backgrounds/PatternOverlay";
import MatchCenter from "@/components/ui/sections/MatchCenter";
import PlayersSection from "@/components/ui/sections/PlayersSection";
import { fetchSanityData } from "@/lib/sanity/sanityClient";
import { supabase } from "@/lib/supabase/client";
import { getUpcomingMatches, getRecentMatches } from "@/lib/data-fetchers/match";
import { Match, Competition, Team } from "@/types/match";
import HomeNewsSection from "@/features/news/components/HomeNewsSection";

export const metadata: Metadata = {
  title: "Home | Banks o' Dee FC",
  description:
    "Welcome to the official website of Banks o' Dee Football Club",
};

// Fetch featured news article for hero section
async function getFeaturedNewsArticle() {
  const query = `*[_type == "newsArticle" && !(_id in path("drafts.**")) && featured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url,
    excerpt,
    "category": category
  }`;

  try {
    const featuredNews = await fetchSanityData(query);
    return featuredNews;
  } catch (error) {
    console.error("Error fetching featured news:", error);
    return null;
  }
}

// Fetch recent news articles
async function getRecentNews(limit = 6) {
  const query = `*[_type == "newsArticle" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url,
    excerpt,
    "category": category
  }`;

  try {
    const news = await fetchSanityData(query);
    return news;
  } catch (error) {
    console.error("Error fetching recent news:", error);
    return [];
  }
}

// Fetch upcoming and recent matches with proper type mapping
async function getMatches() {
  try {
    // Fetch upcoming matches and map to proper type
    const upcomingMatchesRaw = await getUpcomingMatches(5);
    const upcomingMatches = upcomingMatchesRaw.map(match => {
      return {
        id: match.id,
        match_date: match.match_date,
        match_time: match.match_time,
        venue: match.venue || '',
        status: match.status,
        ticket_link: match.ticket_link,
        home_team: {
          id: match.home_team.id,
          name: match.home_team.name,
          logo_url: match.home_team.logo_url
        },
        away_team: {
          id: match.away_team.id,
          name: match.away_team.name,
          logo_url: match.away_team.logo_url
        },
        competition: {
          id: match.competition.id,
          name: match.competition.name,
          short_name: match.competition.short_name,
          logo_url: match.competition.logo_url
        }
      } as Match;
    });

    // Fetch recent matches and map to proper type
    const recentMatchesRaw = await getRecentMatches(5);
    const recentMatches = recentMatchesRaw.map(match => {
      return {
        id: match.id,
        match_date: match.match_date,
        match_time: match.match_time,
        venue: match.venue || '',
        status: match.status,
        home_score: match.home_score,
        away_score: match.away_score,
        match_report_link: match.match_report_link,
        home_team: {
          id: match.home_team.id,
          name: match.home_team.name,
          logo_url: match.home_team.logo_url
        },
        away_team: {
          id: match.away_team.id,
          name: match.away_team.name,
          logo_url: match.away_team.logo_url
        },
        competition: {
          id: match.competition.id,
          name: match.competition.name,
          short_name: match.competition.short_name,
          logo_url: match.competition.logo_url
        }
      } as Match;
    });

    return {
      upcoming: upcomingMatches,
      recent: recentMatches
    };
  } catch (error) {
    console.error("Error fetching matches:", error);
    return { upcoming: [], recent: [] };
  }
}

// Fetch league table
async function getLeagueTable() {
  try {
    const { data: leagueTable, error } = await supabase
      .from("vw_current_league_table")
      .select("*")
      .order("position", { ascending: true });

    if (error) throw error;
    return leagueTable || [];
  } catch (error) {
    console.error("Error fetching league table:", error);
    return [];
  }
}

// Fetch sponsors
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

// Fetch fan of the month
async function getFanOfMonth() {
  try {
    const { data: fanOfMonth, error } = await supabase
      .from("vw_current_fan_of_month")
      .select("*")
      .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;
    return fanOfMonth;
  } catch (error) {
    console.error("Error fetching fan of the month:", error);
    return null;
  }
}

// Fetch featured players
async function getFeaturedPlayers() {
  try {
    const { data: players, error } = await supabase
      .from("people")
      .select("*")
      .not("player_position", "is", null)
      .order("jersey_number", { ascending: true })
      .limit(8);

    if (error) throw error;
    return players || [];
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
}

export default async function HomePage() {
  // Fetch all data in parallel
  const [
    featuredNewsArticle, 
    recentNews, 
    matches, 
    leagueTable,
    sponsors,
    fanOfMonth,
    featuredPlayers
  ] = await Promise.all([
    getFeaturedNewsArticle(),
    getRecentNews(),
    getMatches(),
    getLeagueTable(),
    getSponsors(),
    getFanOfMonth(),
    getFeaturedPlayers()
  ]);

  // Convert to the format expected by components
  const cardShadowStyle = {
    "--card-shadow": "0 10px 25px -5px rgba(0, 16, 90, 0.1), 0 8px 10px -6px rgba(0, 16, 90, 0.05)",
    "--card-hover-shadow": "0 20px 25px -5px rgba(0, 16, 90, 0.15), 0 10px 10px -5px rgba(0, 16, 90, 0.1)"
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex flex-col" style={cardShadowStyle}>
      {/* Hero Section */}
      {featuredNewsArticle && (
        <HeroSection
          title={featuredNewsArticle.title}
          category={featuredNewsArticle.category || "CLUB NEWS"}
          timestamp={new Date(featuredNewsArticle.publishedAt).toLocaleString()}
          backgroundImage={featuredNewsArticle.mainImage}
        />
      )}
      
      {/* News Cards Section */}
      <div className="py-12">
        <FadeIn>
          <HomeNewsSection articles={recentNews} />
        </FadeIn>
      </div>
      
      {/* Gradient Separator */}
      <GradientSeparator />
      
      {/* Match Center Section */}
      <Section 
        background="light"
        spacing="lg"
      >
        <FadeIn>
          <MatchCenter 
            upcomingMatches={matches.upcoming} 
            recentResults={matches.recent} 
            leagueTable={leagueTable} 
          />
        </FadeIn>
      </Section>
      
      {/* Gradient Separator */}
      <GradientSeparator />
      
      {/* Fan Zone Section */}
      <div className="py-12">
        <FanZoneSection fanOfMonth={fanOfMonth} />
      </div>
      
      {/* Gradient Separator before Players Section */}
      <GradientSeparator />
      
      {/* Players Section */}
      <PlayersSection players={featuredPlayers} />
      
      {/* Gradient Separator before Sponsors Section */}
      <GradientSeparator />
      
      {/* Sponsors Section */}
      <SponsorsSection sponsors={sponsors} />
    </div>
  );
}