"use client";
import React, { useState, useEffect } from 'react';
import { NewsGrid, NewsModal } from '@/features/news/components';
import { NewsArticle } from '@/features/news/types';

interface ClientWrapperProps {
  initialNews: NewsArticle[];
}

export default function ClientWrapper({ initialNews }: ClientWrapperProps) {
  // Debug logging
  console.log('News data received:', initialNews);
  console.log('Number of articles:', initialNews.length);
  
  // State for filtered content
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [uniqueNews, setUniqueNews] = useState<NewsArticle[]>([]);
  
  // Deduplicate news articles on component mount
  useEffect(() => {
    // Use a Map to guarantee uniqueness by ID
    const uniqueArticlesMap = new Map();
    
    initialNews.forEach(article => {
      if (!uniqueArticlesMap.has(article.id)) {
        uniqueArticlesMap.set(article.id, article);
      }
    });
    
    // Convert Map back to array
    setUniqueNews(Array.from(uniqueArticlesMap.values()));
    
    // Log the deduplication results
    console.log('After deduplication:', uniqueArticlesMap.size);
  }, [initialNews]);
  
  // Filter news by category if selected
  const filteredNews = selectedCategory 
    ? uniqueNews.filter(article => article.category === selectedCategory)
    : uniqueNews;
  
  // Get available categories from the actual data
  const availableCategories = new Set(uniqueNews.map(article => article.category));
  
  // Categories for filter buttons - updated to match Sanity
  const categories = [
    { id: null, label: 'All News' },
    { id: 'matchReport', label: 'Match Reports' },
    { id: 'clubNews', label: 'Club News' },
    { id: 'commercialNews', label: 'Commercial News' }
  ].filter(category => category.id === null || availableCategories.has(category.id));
  
  // Log detailed article information
  console.log("DETAILED ARTICLES BEING RENDERED:", filteredNews.map(article => ({
    id: article.id,
    title: article.title,
    category: article.category,
    featured: article.isFeature ? "YES" : "No"
  })));
  
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id || 'all'}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#00105A] text-white'
                  : 'bg-white text-[#00105A] border border-[#00105A] hover:bg-[#FFD700] hover:border-[#FFD700] hover:text-[#00105A]'
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