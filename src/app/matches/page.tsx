import { Metadata } from 'next';
import { Suspense } from 'react';
import { MatchCentreContainer } from '@/features/matches/components/MatchCentreContainer';
import { MatchCentreHero } from '@/features/matches/components/layout/MatchCentreHero';

export const metadata: Metadata = {
  title: 'Match Centre | Banks o\' Dee FC',
  description: 'View fixtures, results and league standings for Banks o\' Dee FC',
};

function MatchCentreLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="h-10 bg-[#f3f4f6] rounded animate-pulse w-64"></div>
          <div className="flex gap-4">
            <div className="h-10 bg-[#f3f4f6] rounded animate-pulse w-36"></div>
            <div className="h-10 bg-[#f3f4f6] rounded animate-pulse w-40"></div>
            <div className="h-10 bg-[#f3f4f6] rounded animate-pulse w-64"></div>
          </div>
        </div>
        <div className="h-96 bg-[#f3f4f6] rounded animate-pulse"></div>
      </div>
    </div>
  );
}

export default function MatchesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <MatchCentreHero />
      
      {/* Content Container with Suspense */}
      <Suspense fallback={<MatchCentreLoading />}>
        <div className="container mx-auto px-4 py-8">
          <MatchCentreContainer />
        </div>
      </Suspense>
    </main>
  );
}
