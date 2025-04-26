
import React, { Suspense } from 'react';
import NewsCard from './NewsCard';
import { getNews } from '@/lib/server/getNews';
import LoadingState from '../ui/common/LoadingState';

async function NewsGridContent() {
  const { articles } = await getNews();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          isFeatured={false}
        />
      ))}
    </div>
  );
}

export default function NewsGrid() {
  return (
    <Suspense fallback={<LoadingState variant="skeleton" count={6} />}>
      <NewsGridContent />
    </Suspense>
  );
}
