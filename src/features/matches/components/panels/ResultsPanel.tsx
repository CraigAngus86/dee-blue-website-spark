"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { DEFAULT_SEASON, DEFAULT_COMPETITION, DEFAULT_MONTH } from '../../constants';
import { ResultCard } from '../ResultCard';
import { MobileResultCard } from '../mobile/MobileResultCard';
import { MatchGalleryModal } from "@/features/galleries";
import { NewsModal } from "@/features/news/components";
import { sanityClient } from '@/lib/sanity/client';

export function ResultsPanel() {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  
  // News modal state
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [articleLoading, setArticleLoading] = useState(false);
  
  const handleGalleryClick = (galleryId: string) => {
    setSelectedGalleryId(galleryId);
    setGalleryModalOpen(true);
  };
  
  const handleGalleryModalClose = () => {
    setGalleryModalOpen(false);
    setSelectedGalleryId(null);
  };
  
  // Handle report click
  const handleReportClick = async (reportId: string) => {
    console.log('Report clicked with ID:', reportId);
    
    if (reportId.startsWith('http')) {
      // External link - open in new tab
      window.open(reportId, '_blank');
    } else {
      // Sanity document ID - fetch article and open modal
      setArticleLoading(true);
      try {
        const query = `*[_type == "newsArticle" && _id == $articleId][0] {
          _id,
          title,
          "slug": slug.current,
          publishedAt,
          mainImage,
          excerpt,
          category,
          body,
          author,
          "matchId": matchId,
          "relatedPlayers": relatedPlayers[]-> {
            "_id": _id,
            "name": name,
            "slug": slug.current,
            "profileImage": profileImage
          },
          gallery
        }`;
        
        const article = await sanityClient.fetch(query, { articleId: reportId });
        
        if (article) {
          setSelectedArticle({
            ...article,
            id: article._id
          });
          setNewsModalOpen(true);
        } else {
          console.error('Article not found:', reportId);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setArticleLoading(false);
      }
    }
  };
  
  const handleNewsModalClose = () => {
    setNewsModalOpen(false);
    setSelectedArticle(null);
  };
  
  const searchParams = useSearchParams();
  const season = searchParams.get('season') || DEFAULT_SEASON;
  const competition = searchParams.get('competition') || DEFAULT_COMPETITION;
  const month = searchParams.get('month') || DEFAULT_MONTH;
  
  const [results, setResults] = useState<any[]>([]);
  const [groupedResults, setGroupedResults] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        let query = supabase
          .from('vw_latest_results')
          .select('*');
        
        // Add season filter
        if (season) {
          query = query.eq('season', season);
        }
        
        // Add competition filter if not "all"
        if (competition !== 'all') {
          query = query.eq('competition', competition);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        console.log(`Fetched ${data?.length || 0} results`);
        
        // Filter by month if not "all"
        let filteredData = data || [];
        
        if (month !== 'all') {
          const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'];
          const monthIndex = monthNames.indexOf(month.toLowerCase());
          
          if (monthIndex !== -1) {
            filteredData = filteredData.filter(result => {
              const resultDate = new Date(result.match_date);
              return resultDate.getMonth() === monthIndex;
            });
          }
        }
        
        setResults(filteredData);
        
        // Group results by month
        const grouped = groupMatchesByMonth(filteredData);
        setGroupedResults(grouped);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchResults();
  }, [season, competition, month]);
  
  function groupMatchesByMonth(matches: any[]) {
    const grouped: Record<string, any[]> = {};
    
    matches.forEach(match => {
      const date = new Date(match.match_date);
      const monthYear = format(date, 'MMMM yyyy');
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(match);
    });
    
    return grouped;
  }
  
  if (loading) {
    return <div className="py-8 text-center">Loading results...</div>;
  }
  
  if (Object.keys(groupedResults).length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-[#6b7280]">No recent results found</p>
        <p className="text-xs text-[#9ca3af] mt-2">
          Using filters: Season: {season},
          Competition: {competition},
          Month: {month}
        </p>
      </div>
    );
  }
  
  return (
    <>
      {/* Desktop: Existing layout */}
      <div className="hidden md:block">
        <div className="space-y-8">
          {Object.entries(groupedResults).map(([month, monthResults]) => (
            <div key={month}>
              <div className="bg-[#e5e7eb] py-3 px-4 rounded mb-6 border-b border-[#d1d5db]">
                <h3 className="text-xl font-bold text-[#1f2937]">{month}</h3>
              </div>
              
              <div className="grid gap-6">
                {monthResults.map(result => (
                  <ResultCard 
                    key={result.id} 
                    result={result} 
                    onGalleryClick={handleGalleryClick}
                    onReportClick={handleReportClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Added grey backgrounds to match desktop */}
      <div className="block md:hidden">
        <div className="space-y-6">
          {Object.entries(groupedResults).map(([month, monthResults]) => (
            <div key={month}>
              <div className="bg-[#e5e7eb] py-3 px-4 rounded mb-6">
                <h3 className="text-lg font-bold text-[#1f2937]">{month}</h3>
              </div>
              
              <div className="space-y-4">
                {monthResults.map(result => (
                  <MobileResultCard 
                    key={result.id} 
                    result={result}
                    onGalleryClick={handleGalleryClick}
                    onReportClick={handleReportClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <MatchGalleryModal
        isOpen={galleryModalOpen}
        onClose={handleGalleryModalClose}
        galleryId={selectedGalleryId || undefined}
      />
      
      <NewsModal
        article={selectedArticle}
        isOpen={newsModalOpen}
        onClose={handleNewsModalClose}
      />
    </>
  );
}
