
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const NewsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All News' },
    { id: 'match-reports', label: 'Match Reports' },
    { id: 'club-news', label: 'Club News' },
    { id: 'community', label: 'Community' }
  ];
  
  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map(filter => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            onClick={() => setActiveFilter(filter.id)}
            size="lg"
            className="font-medium"
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured Article (2x2) */}
        <div className="bg-gray-100 rounded-lg md:col-span-2 md:row-span-2 aspect-[16/9] md:aspect-auto min-h-[400px] flex items-center justify-center p-8 text-center">
          <p className="text-gray-600 font-medium">Featured Article</p>
        </div>
        
        {/* Standard Articles */}
        {Array(5).fill(0).map((_, index) => (
          <div 
            key={index} 
            className="bg-gray-100 rounded-lg aspect-[4/3] flex items-center justify-center p-4 text-center"
          >
            <p className="text-gray-600 font-medium">Article {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
