import React from 'react';
import { Metadata } from 'next';
import { NewsHero } from '@/features/news/components';
import { getNewsData } from '@/features/news/hooks/getNewsData.server';
import ClientWrapper from './client-wrapper';

export const metadata: Metadata = {
  title: 'News | Banks o\' Dee FC',
  description: 'Latest news and updates from Banks o\' Dee Football Club',
};

export default async function NewsPage() {
  // Fetch news data from Sanity using our server component hook
  const { data: news, error } = await getNewsData({ limit: 100 });
  
  // Add debugging logs for server component
  console.log('SERVER page - News article IDs:', news.map(n => n.id).join(', '));
  console.log('SERVER page - Number of articles:', news.length);
  
  // Check for duplicate IDs in the server data
  const idCounts = {};
  news.forEach(article => {
    idCounts[article.id] = (idCounts[article.id] || 0) + 1;
  });

  const duplicateIds = Object.entries(idCounts)
    .filter(([id, count]) => count > 1)
    .map(([id]) => id);

  console.log('SERVER page - Duplicate IDs:', duplicateIds);
  console.log('SERVER page - Duplicate articles:', 
    news.filter(article => duplicateIds.includes(article.id))
      .map(a => ({ id: a.id, title: a.title }))
  );
  
  if (error) {
    console.error('Error loading news data:', error);
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800">Unable to load news</h2>
        <p className="text-gray-600 mt-2">Please try again later</p>
        <p className="text-gray-500 mt-1">Error: {error.message}</p>
      </div>
    );
  }
  
  // Pass the data to a client wrapper for interactive features
  return (
    <main className="min-h-screen">
      <NewsHero />
      <ClientWrapper initialNews={news} />
    </main>
  );
}