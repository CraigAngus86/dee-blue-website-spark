import { Metadata } from "next";
import type { CSSProperties } from "react";

import Section from "@/components/ui/layout/Section";
import { FanZoneSection } from "@/features/fanzone";
import { SponsorsSection, getSponsorsForHomepage } from "@/features/sponsors";
import GradientSeparator from "@/components/ui/separators/GradientSeparator";
import MatchCenter from "@/components/ui/sections/MatchCenter";
import PlayersSection from "@/features/team/components/PlayersSection";

import { fetchSanityData } from "@/lib/sanity/sanityClient";
import {
  getHomepageUpcomingMatches,
  getHomepageRecentMatches,
  getHomepageLeagueTable,
} from "@/features/matches/hooks/useHomeMatchData";
import { HomeHeroSection, OverlappingNewsCards } from "@/features/home";
import { getTeamData } from "@/features/team/services/getTeamData";
import { selectRandomPlayersByPosition } from "@/features/team/services/playerSelection";
import { getActivePoll } from "@/lib/supabase/polls";

// Revalidate frequently for fresh homepage content
export const revalidate = 10;

export const metadata: Metadata = {
  title: "Home | Baynounah Sports Club",
  description:
    "Official website of Baynounah SC — Be Part of the Journey. News, fixtures, results, academy and more.",
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
    photos,
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
    return selectRandomPlayersByPosition(people);
  } catch (error) {
    console.error("Error selecting random players:", error);
    return [];
  }
}

// Mobile "See all News" link (secondary button style)
const MobileNewsLink = () => (
  <div className="block md:hidden bg-[rgb(var(--white))] py-6">
    <div className="container mx-auto px-4 text-center">
      <a
        href="/news"
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200
                   border border-[rgb(var(--medium-gray))] text-[rgb(var(--brand-black))] hover:bg-[rgb(var(--warm-gray))]"
      >
        See all News
      </a>
    </div>
  </div>
);

export default async function HomePage() {
  // Fetch news + galleries in parallel
  const [newsArticles, matchGalleries] = await Promise.all([
    getNewsArticles(20),
    getMatchGalleries(),
  ]);

  // Normalize content to one list
  const allContent = [
    ...newsArticles.map((article) => ({
      ...article,
      id: article._id,
      contentType: "article" as const,
    })),
    ...matchGalleries.map((gallery) => ({
      id: gallery._id,
      _id: gallery._id,
      title: gallery.title,
      slug: gallery._id,
      publishedAt: gallery.matchDate,
      mainImage: gallery.coverImage,
      excerpt: `Match Day photos now available for ${gallery.title}!`,
      category: "matchGallery",
      contentType: "gallery" as const,
      body: [],
      author: gallery.photographer || "Club Photographer",
    })),
  ];

  // Sort by date (newest first)
  const sortedContent = [...allContent].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  // Fetch other data in parallel
  const [
    upcomingMatches,
    recentMatches,
    leagueTable,
    sponsors,
    fanOfMonth,
    galleryPhotos,
    randomPlayers,
    activePoll,
  ] = await Promise.all([
    getHomepageUpcomingMatches(5),
    getHomepageRecentMatches(5),
    getHomepageLeagueTable(),
    getSponsorsForHomepage(),
    getFanOfMonth(),
    getGalleryPhotos(),
    getRandomPlayers(),
    getActivePoll(),
  ]);

  // Mixed content for hero/cards
  const heroItems = sortedContent.slice(0, 5);
  const cardsItems = sortedContent.slice(3, 9);

  // Neutral card shadow variables
  const cardShadowStyle = {
    "--card-shadow":
      "0 10px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.06)",
    "--card-hover-shadow":
      "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.10)",
  } as CSSProperties;

  return (
    <div className="min-h-screen flex flex-col" style={cardShadowStyle}>
      {/* Hero */}
      <HomeHeroSection articles={heroItems} />

      {/* Mobile CTA to News */}
      <MobileNewsLink />

      {/* News cards (desktop) */}
      <Section background="transparent" spacing="md" className="section--white">
        <div className="hidden md:block">
          <OverlappingNewsCards articles={cardsItems} />
        </div>
      </Section>

      <GradientSeparator className="py-6" />

      {/* Match Center */}
      <Section background="transparent" spacing="md" className="section--warm">
        <MatchCenter
          upcomingMatches={upcomingMatches}
          recentResults={recentMatches}
          leagueTable={leagueTable}
        />
      </Section>

      <GradientSeparator className="py-6" />

      {/* Fan Zone */}
      <Section background="transparent" spacing="md" className="section--white">
        <FanZoneSection
          fanOfMonth={fanOfMonth}
          galleryPhotos={galleryPhotos}
          activePoll={activePoll}
        />
      </Section>

      <GradientSeparator className="py-6" />

      {/* Players */}
      <Section background="transparent" spacing="md" className="section--warm">
        <PlayersSection players={randomPlayers} />
      </Section>

      <GradientSeparator className="py-6" />

      {/* Sponsors */}
      <Section background="transparent" spacing="md" className="section--white">
        <SponsorsSection sponsors={sponsors} />
      </Section>
    </div>
  );
}
