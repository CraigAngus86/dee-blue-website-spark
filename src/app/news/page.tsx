
import React from 'react';
import { Metadata } from 'next';
import NewsHero from '@/components/news/NewsHero';
import NewsGrid from '@/components/news/NewsGrid';

// Mock news data for development
const mockNews = [
  {
    id: "1",
    title: "Banks o' Dee Secure Important Victory",
    date: "2024-04-20T15:30:00",
    imageUrl: "/assets/images/news/News1.jpg",
    category: "Match Report",
    excerpt: "A comprehensive win keeps title hopes alive as the team puts in a stellar performance.",
    slug: "banks-o-dee-secure-important-victory"
  },
  {
    id: "2",
    title: "New Signing Announcement",
    date: "2024-04-18T10:15:00",
    imageUrl: "/assets/images/news/News2.jpg",
    category: "Club News",
    excerpt: "The club is delighted to announce the signing of a promising young talent to strengthen the squad.",
    slug: "new-signing-announcement"
  },
  {
    id: "3",
    title: "Youth Academy Roundup",
    date: "2024-04-15T14:00:00",
    imageUrl: "/assets/images/news/News3.jpg",
    category: "Academy",
    excerpt: "Our youth teams continue to impress with strong performances across all age groups.",
    slug: "youth-academy-roundup"
  }
];

export const metadata: Metadata = {
  title: 'News | Banks o\' Dee FC',
  description: 'Latest news and updates from Banks o\' Dee Football Club',
};

export default async function NewsPage() {
  // In a real implementation, you'd fetch news from Sanity or another source
  // But for now, we'll use the mock data
  
  return (
    <main className="min-h-screen">
      <NewsHero />
      <div className="container mx-auto px-4 py-12">
        <NewsGrid news={mockNews} />
      </div>
    </main>
  );
}
