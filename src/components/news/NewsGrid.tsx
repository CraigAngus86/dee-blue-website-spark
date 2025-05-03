
"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NewsCard from './NewsCard';
import { NewsItem } from '@/types/news';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NewsGridProps {
  news: NewsItem[];
  categories?: string[];
  initialCategory?: string;
}

function NewsGrid({ news, categories = [], initialCategory = 'all' }: NewsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check URL params for category filter
    const categoryParam = searchParams?.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Filter news based on selected category
    if (selectedCategory === 'all') {
      setFilteredNews(news);
    } else {
      setFilteredNews(
        news.filter(item => 
          item.category?.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory, news]);

  // Get unique categories from news items if not provided
  const derivedCategories = categories.length > 0 
    ? categories 
    : Array.from(new Set(news.map(item => item.category || 'Uncategorized')));

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Update URL with category parameter (without full page reload)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (category === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', category);
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  return (
    <div className="space-y-8">
      {/* Category tabs */}
      {derivedCategories.length > 1 && (
        <div className="overflow-x-auto pb-2">
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All</TabsTrigger>
              {derivedCategories.map(category => (
                <TabsTrigger key={category} value={category.toLowerCase()}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* News grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(newsItem => (
            <NewsCard
              key={newsItem.id}
              id={newsItem.id}
              title={newsItem.title}
              date={newsItem.date}
              imageUrl={newsItem.imageUrl}
              category={newsItem.category || 'Uncategorized'}
              excerpt={newsItem.excerpt || ''}
              slug={newsItem.slug || ''}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">No news articles found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default NewsGrid;
