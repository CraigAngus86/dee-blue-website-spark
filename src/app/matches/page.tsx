import { Metadata } from 'next';
import { Suspense } from 'react';
import { MatchCentreContainer } from '@/features/matches/components/MatchCentreContainer';
import { MatchCentreHero } from '@/features/matches/components/layout/MatchCentreHero';

export const metadata: Metadata = {
  title: 'Match Centre | Baynounah SC',
  description: 'View fixtures, results and league standings for Baynounah SC',
};

function MatchCentreLoading() {
  return (
    <div className="container mx-auto px-4 section section--white">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="h-10 bg-[rgb(var(--warm-gray))] rounded animate-pulse w-64" />
          <div className="flex gap-4">
            <div className="h-10 bg-[rgb(var(--warm-gray))] rounded animate-pulse w-36" />
            <div className="h-10 bg-[rgb(var(--warm-gray))] rounded animate-pulse w-40" />
            <div className="h-10 bg-[rgb(var(--warm-gray))] rounded animate-pulse w-64" />
          </div>
        </div>
        <div className="h-96 bg-[rgb(var(--warm-gray))] rounded animate-pulse" />
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
        <div className="container mx-auto px-4 section section--white">
          <MatchCentreContainer />
        </div>
      </Suspense>
    </main>
  );
}
