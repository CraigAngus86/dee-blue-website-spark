import { Metadata } from 'next';
import { MatchCentreContainer } from '@/features/matches/components/MatchCentreContainer';
import { MatchCentreHero } from '@/features/matches/components/layout/MatchCentreHero';

export const metadata: Metadata = {
  title: 'Match Centre | Banks o\' Dee FC',
  description: 'View fixtures, results and league standings for Banks o\' Dee FC',
};

export default function MatchesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <MatchCentreHero />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 py-8">
        <MatchCentreContainer />
      </div>
    </main>
  );
}
