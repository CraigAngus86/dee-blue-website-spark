"use client";
import React, { useState } from 'react';
import { NewsGrid, NewsModal } from '@/features/news/components';
import { NewsArticle } from '@/features/news/types';

interface ClientWrapperProps {
  initialNews: NewsArticle[];
}

export default function ClientWrapper({ initialNews }: ClientWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  
  // Filter news by category if selected
  const filteredNews = selectedCategory 
    ? initialNews.filter(article => article.category === selectedCategory)
    : initialNews;
  
  // Categories for filter buttons
  const categories = [
    { id: null, label: 'All News' },
    { id: 'matchReport', label: 'Match Reports' },
    { id: 'clubNews', label: 'Club News' },
    { id: 'teamNews', label: 'Team News' },
    { id: 'communityNews', label: 'Community' }
  ];
  
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id || 'all'}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-800 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* News grid */}
        <NewsGrid 
          articles={filteredNews} 
          onArticleClick={(article) => setSelectedArticle(article)}
        />
      </div>
      
      {/* News modal */}
      <NewsModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  );
}
